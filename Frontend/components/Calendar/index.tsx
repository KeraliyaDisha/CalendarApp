/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { handleEventLogout } from "@/hooks/logout";
import FullCalendar from "@fullcalendar/react";
import { Clipboard, Copy, Scissors, Trash2 } from "lucide-react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";

import { handleSelect } from "../../hooks/Select";
import { handleDateClick } from "../../hooks/dateClick";
import { handleEventClick } from "../../hooks/eventClick";
import { handleEventDrop } from "../../hooks/eventDrop";
import { handleEventResize } from "../../hooks/eventResize";
import { festivals } from "@/festival";
import { useMutation } from "@apollo/client";
import { UPDATE_EVENT } from "@/graphql/mutations";
import { cellStyle } from "../../hooks/cellStyle";
import { SocketContext } from "@/app/layout";
import { CalendarToolbar } from "../CalenderToolbar";

export default function Calendar({
  events,
  data,
  refetch,
  setFormData,
  setSelectedEvent,
  setGotoDate,
}: any) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [updateEvent] = useMutation(UPDATE_EVENT);
  const socket = useContext(SocketContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentViewLabel, setCurrentViewLabel] = useState("Month");
  const [currentTitle, setCurrentTitle] = useState("");

  // Context Menu State
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  });

  // Logout Handler
  const handleLogout = () => {
    handleEventLogout(router);
  };

  // Close Dropdown on Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contextMenu.visible &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const handleViewChange = (viewName: string) => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setShowDropdown(false);
  };

  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleToday = () => calendarRef.current?.getApi().today();

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setGotoDate(() => (date: string | Date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        calendarApi.gotoDate(formattedDate);
      });
    }
  }, [setGotoDate]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newEvent", () => refetch());
    socket.on("updateEvent", () => refetch());
    socket.on("deleteEvent", () => refetch());
    return () => {
      socket.off("newEvent");
      socket.off("updateEvent");
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
    switch (arg.view.type) {
      case "dayGridMonth":
        setCurrentViewLabel("Month");
        break;
      case "timeGridWeek":
        setCurrentViewLabel("Week");
        break;
      case "timeGridDay":
        setCurrentViewLabel("Day");
        break;
      case "multiMonthYear":
        setCurrentViewLabel("Year");
        break;
      default:
        setCurrentViewLabel("Month");
    }
  };

  const handleEventRightClick = (eventInfo: any, e: any) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      eventId: eventInfo.event.id,
    });
  };

  return (
    <div className="w-full h-full">
      {/* Custom Toolbar */}
      <CalendarToolbar
        currentViewLabel={currentViewLabel}
        currentTitle={currentTitle}
        showDropdown={showDropdown}
        toggleDropdown={() => setShowDropdown(!showDropdown)}
        handleViewChange={handleViewChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToday={handleToday}
        onLogout={handleLogout}
      />

      {/* FullCalendar Component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          multiMonthPlugin,
        ]}
        headerToolbar={{ left: "", center: "", right: "" }}
        titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
        datesSet={handleDatesSet}
        initialView="dayGridMonth"
        dayCellDidMount={(info) => cellStyle(info)}
        timeZone="UTC"
        height="98%"
        selectable={true}
        editable={true}
        eventResizableFromStart={true}
        events={[...events, ...festivals]}
        eventClick={(info) =>
          handleEventClick(info, data, setSelectedEvent, setFormData)
        }
        eventDrop={(eventDropInfo) =>
          handleEventDrop(eventDropInfo, updateEvent, refetch, socket)
        }
        dateClick={(info) =>
          handleDateClick(info, setFormData, setSelectedEvent)
        }
        select={(info) => handleSelect(info, setFormData)}
        eventResize={(eventResizeInfo) =>
          handleEventResize(eventResizeInfo, updateEvent, refetch, socket)
        }
        eventDidMount={(info) => {
          info.el.addEventListener("contextmenu", (e) =>
            handleEventRightClick(info, e)
          );
        }}
      />

      {/* Context Menu */}
      {contextMenu.visible && (
  <div
    ref={contextMenuRef}
    className="absolute bg-[#F5F5F5] shadow-lg border border-gray-200 rounded-lg p-2 w-52 z-50"
    style={{ top: contextMenu.y, left: contextMenu.x }}
  >
    {/* Cut Option */}
    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md">
      <Scissors className="w-4 h-4 text-gray-500" /> 
      <span className="ml-2">Cut</span> 
      <span className="ml-auto text-gray-400 text-xs">Ctrl+X</span>
    </button>

    {/* Copy Option */}
    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md">
      <Copy className="w-4 h-4 text-gray-500" /> 
      <span className="ml-2">Copy</span> 
      <span className="ml-auto text-gray-400 text-xs">Ctrl+C</span>
    </button>

    {/* Duplicate Option */}
    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md">
      <Clipboard className="w-4 h-4 text-gray-500" /> 
      <span className="ml-2">Duplicate</span> 
      <span className="ml-auto text-gray-400 text-xs">Ctrl+D</span>
    </button>

    {/* Divider */}
    <div className="border-t border-gray-200 my-1"></div>

    {/* Delete Option */}
    <button className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-red-50 transition rounded-md">
      <Trash2 className="w-4 h-4 text-red-500" /> 
      <span className="ml-2">Delete</span> 
      <span className="ml-auto text-gray-400 text-xs">Delete</span>
    </button>
  </div>
)}

    </div>
  );
}
