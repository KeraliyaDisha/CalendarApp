/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useContext, useState } from "react";
import { useRouter } from "next/navigation"; 
import { handleEventLogout } from "@/hooks/logout";
import FullCalendar from "@fullcalendar/react";
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

  const [updateEvent] = useMutation(UPDATE_EVENT);
  const socket = useContext(SocketContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentViewLabel, setCurrentViewLabel] = useState("Month");
  const [currentTitle, setCurrentTitle] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    handleEventLogout(router); 
  };
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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleViewChange = (viewName: string) => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setShowDropdown(false);
  };

  const handlePrev = () => {
    if (!calendarRef.current) return;
    calendarRef.current.getApi().prev();
  };

  const handleNext = () => {
    if (!calendarRef.current) return;
    calendarRef.current.getApi().next();
  };

  const handleToday = () => {
    if (!calendarRef.current) return;
    calendarRef.current.getApi().today();
  };

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
  return (
    <div className="w-full h-full">
      {/* Custom Toolbar */}
      <CalendarToolbar
        currentViewLabel={currentViewLabel}
        currentTitle={currentTitle}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
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
        dateClick={(info) => handleDateClick(info, setFormData, setSelectedEvent)}
        select={(info) => handleSelect(info, setFormData)}
        eventResize={(eventResizeInfo) =>
          handleEventResize(eventResizeInfo, updateEvent, refetch, socket)
        }
      />
    </div>
  );
}
