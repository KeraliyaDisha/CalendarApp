/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@apollo/client";
import { useRef, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import ContextMenu from "../ContextMenu";
import { CalendarToolbar } from "../CalenderToolbar";
import { handleEventLogout } from "@/hooks/logout";
import { handleSelect } from "../../hooks/Select";
import { handleDateClick } from "../../hooks/dateClick";
import { handleEventClick } from "../../hooks/eventClick";
import { handleEventDrop } from "../../hooks/eventDrop";
import { handleEventResize } from "../../hooks/eventResize";
import useOutsideClick from "../../hooks/useOutsideClick";
import { cellStyle } from "../../hooks/cellStyle";
import { festivals } from "@/festival";
import { UPDATE_EVENT } from "@/graphql/mutations";
import { SocketContext } from "@/app/layout";
import { useContextMenuActions } from "@/hooks/useContextMenuActions";

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

  // GraphQL
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const socket = useContext(SocketContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentViewLabel, setCurrentViewLabel] = useState("Month");
  const [currentTitle, setCurrentTitle] = useState("");

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null as string | null,
  });

  const handleLogout = () => {
    handleEventLogout(router);
  };

  useOutsideClick(dropdownRef, () => setShowDropdown(false));
  useOutsideClick(contextMenuRef, () =>
    setContextMenu((prev) => ({ ...prev, visible: false }))
  );

  const handleViewChange = (viewName: string) => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setShowDropdown(false);
  };

  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleToday = () => calendarRef.current?.getApi().today();

  useState(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setGotoDate(() => (date: string | Date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        calendarApi.gotoDate(formattedDate);
      });
    }
  });

  // Socket events
  useState(() => {
    if (!socket) return;
    socket.on("newEvent", refetch);
    socket.on("updateEvent", refetch);
    socket.on("deleteEvent", refetch);
    return () => {
      socket.off("newEvent", refetch);
      socket.off("updateEvent", refetch);
      socket.off("deleteEvent", refetch);
    };
  });

  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
    const viewLabels: { [key: string]: string } = {
      dayGridMonth: "Month",
      timeGridWeek: "Week",
      timeGridDay: "Day",
      multiMonthYear: "Year",
    };
    setCurrentViewLabel(viewLabels[arg.view.type] || "Month");
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

  // Handle normal left-click on an event
  const onEventClick = (info: any) => {
    setSelectedEventId(info.event.id);
    handleEventClick(info, data, setSelectedEvent, setFormData);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Delete" && selectedEventId) {
        actions.handleDeleteAction(selectedEventId);
        setSelectedEventId(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEventId]);

  // Get the common actions from our custom hook
  const actions = useContextMenuActions(refetch);

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
        selectable
        editable
        eventResizableFromStart
        events={[...events, ...festivals]}
        eventClick={onEventClick}
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
        <div ref={contextMenuRef}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            id={contextMenu.eventId}
            onCut={() => {
              actions.handleCutAction(contextMenu.eventId);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onCopy={() => {
              actions.handleCopyAction(contextMenu.eventId);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onDuplicate={() => {
              actions.handleDuplicateAction(contextMenu.eventId);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onDelete={() => {
              actions.handleDeleteAction(contextMenu.eventId);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onClose={() =>
              setContextMenu((prev) => ({ ...prev, visible: false }))
            }
          />
        </div>
      )}
    </div>
  );
}
