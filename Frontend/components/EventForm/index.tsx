"use client";
import { useMutation } from "@apollo/client";
import { handleEventDelete } from "../../hooks/eventDelete";
import { handleSubmit } from "../../hooks/submit";
import { handleUpdate } from "../../hooks/update";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from "@/graphql/mutations";
import { useContext } from "react";
import { SocketContext } from "@/app/layout"; // Import Socket.io Context

export default function Form({
  data,
  selectedEvent,
  setSelectedEvent,
  setFormData,
  formData,
  refetch,
}: any) {
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [createEvent] = useMutation(CREATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const socket = useContext(SocketContext); // Get Socket.io instance

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const validateEventTimes = () => {
    const { start, end } = formData;
    return new Date(start) < new Date(end);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome {data?.user?.firstName}
      </h1>
      <h4 className="font-semibold text-gray-600 mt-4">
        {selectedEvent ? "Update Event:" : "Create New Event:"}
      </h4>

      <form
        onSubmit={
          selectedEvent
            ? (e) => e.preventDefault()
            : async (e) => {
                const newEvent: any = await handleSubmit(
                  e,
                  validateEventTimes,
                  formData,
                  createEvent,
                  data,
                  setFormData,
                  refetch,
                  socket
                );

                if (newEvent) socket?.emit("newEvent", newEvent); // Emit real-time event creation
              }
        }
        className="mt-4 space-y-4 flex-1"
      >
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <div className="flex space-x-4">
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {selectedEvent ? (
          <>
            <button
              type="button"
              onClick={async () => {
                const updatedEvent: any = await handleUpdate(
                  validateEventTimes,
                  formData,
                  updateEvent,
                  selectedEvent,
                  setSelectedEvent,
                  setFormData,
                  refetch,
                  socket
                );

                if (updatedEvent) socket?.emit("updateEvent", updatedEvent); // Emit real-time event update
              }}
              className="w-full bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none transition duration-200"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={async () => {
                await handleEventDelete(
                  deleteEvent,
                  selectedEvent,
                  setSelectedEvent,
                  setFormData,
                  refetch,
                  socket
                );
                socket?.emit("deleteEvent", { id: selectedEvent.id }); // Emit real-time event deletion
              }}
              className="w-full bg-red-600 text-white p-2 rounded-lg mt-2 hover:bg-red-700 focus:outline-none transition duration-200"
            >
              Delete Event
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none transition duration-200"
          >
            Add Event
          </button>
        )}
      </form>
    </div>
  );
}
