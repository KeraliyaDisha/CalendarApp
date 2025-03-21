/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useContext } from "react";
import { event } from "@/types";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
// import { useRouter } from "next/navigation";
import Calendar from "../../components/Calendar";
// import EventList from "../../components/EventList";
import Form from "../../components/EventForm";
import { SocketContext } from "@/app/layout";

export default function CalendarPage() {
  const { data, loading, error, refetch } = useQuery(GET_USER);
  // const router = useRouter();
  const socket = useContext(SocketContext);

  const [formData, setFormData] = useState<event>({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [setGotoDate] = useState<(date: string | Date) => void>(
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
      <div className="w-1/4 p-6 h-ful flex flex-col border-r">
        <Form
          data={data}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setFormData={setFormData}
          formData={formData}
          refetch={refetch}
        />
        {/* <EventList
          router={router}
          events={events}
          gotoDate={gotoDate}
          refetch={refetch}
        /> */}
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
