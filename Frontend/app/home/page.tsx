/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useContext } from "react";
import { event } from "@/types";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import Calendar from "../../components/Calendar";
import Form from "../../components/EventForm";
import MiniCalendar from "@/components/MiniCalendar/MiniCalendar";
import Loader from "../loading";
import { SocketContext } from "@/app/ClientProvider";

export default function CalendarPage() {
  const { data, loading, error, refetch } = useQuery(GET_USER);
  const socket = useContext(SocketContext);

  const [formData, setFormData] = useState<event>({
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [gotoDate, setGotoDate] = useState<(date: string | Date) => void>(
    () => () => {}
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("newEvent", () => {
      console.log("New event received via Socket.io");
      refetch();
    });

    socket.on("updateEvent", () => {
      console.log("Event updated via Socket.io");
      refetch();
    });

    socket.on("deleteEvent", () => {
      console.log("Event deleted via Socket.io");
      refetch();
    });

    return () => {
      socket.off("newEvent");
      socket.off("updateEvent");
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  if (loading) return <Loader />;
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
      <div className="w-1/4 p-4 h-full flex flex-col border-r">
        <div className=" mt-4 mb-1">

        <MiniCalendar />
        </div>
        <div className="flex-1 w-full">
          <Form
            data={data}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setFormData={setFormData}
            formData={formData}
            refetch={refetch}
          />
        </div>
      </div>

      <div className="w-3/4 h-screen p-8">
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
