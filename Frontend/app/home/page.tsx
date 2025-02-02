"use client";

import React, { useState, useEffect, useContext } from "react";
import { event } from "@/types/types";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import Calendar from "./components/calendar";
import EventList from "./components/eventList";
import Form from "./components/form";
import { SocketContext } from "@/app/layout"; // Import SocketContext

export default function CalendarPage() {
  const { data, loading, error, refetch } = useQuery(GET_USER);
  const router = useRouter();
  const socket = useContext(SocketContext); // Get Socket.io instance

  const [formData, setFormData] = useState<event>({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [gotoDate, setGotoDate] = useState<(date: string | Date) => void>(
    () => () => {}
  );

  // Listen for real-time updates from Socket.io
  useEffect(() => {
    if (!socket) return;

    socket.on("newEvent", () => {
      console.log("New event received via Socket.io");
      refetch(); // Refresh events
    });

    socket.on("updateEvent", () => {
      console.log("Event updated via Socket.io");
      refetch(); // Refresh events
    });

    socket.on("deleteEvent", () => {
      console.log("Event deleted via Socket.io");
      refetch(); // Refresh events
    });

    return () => {
      socket.off("newEvent");
      socket.off("updateEvent");
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  if (loading) return <>Loading...</>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const events =
    data?.user?.events?.map((event: any) => ({
      id: event.id,
      description: event.description,
      title: event.title,
      start: event.start,
      end: event.end,
    })) || [];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar (Form & Event List) */}
      <div className="w-1/4 p-6 h-full bg-white shadow-lg rounded-lg flex flex-col">
        <Form
          data={data}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setFormData={setFormData}
          formData={formData}
          refetch={refetch}
        />
        <EventList
          router={router}
          events={events}
          gotoDate={gotoDate}
          refetch={refetch}
        />
      </div>

      {/* Calendar Section */}
      <div className="w-3/4 h-full p-9">
        <Calendar
          events={events}
          data={data}
          refetch={refetch}
          setFormData={setFormData}
          setSelectedEvent={setSelectedEvent}
          setGotoDate={setGotoDate}
        />
      </div>
    </div>
  );
}
