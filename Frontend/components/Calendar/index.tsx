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
import { format } from "date-fns";
import ContextMenu from "../ContextMenu";
import { CalendarToolbar } from "../CalenderToolbar";
import { handleEventLogout } from "@/hooks/logout";
import { handleSelect } from "../../hooks/Select";
import { handleDateClick as baseDateClick } from "../../hooks/dateClick";
import { handleEventClick } from "../../hooks/eventClick";
import { handleEventDrop } from "../../hooks/eventDrop";
import { handleEventResize } from "../../hooks/eventResize";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useContextMenuActions } from "@/hooks/useContextMenuActions";
import { cellStyle } from "../../hooks/cellStyle";
import { duplicateEvent } from "@/hooks/duplicateEventUtil";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { festivals } from "@/festival";
import { UPDATE_EVENT, CREATE_EVENT } from "@/graphql/mutations";
import { SocketContext } from "@/app/ClientProvider";
import { usePasteEvent } from "@/hooks/usePasteEvent";
import { useDuplicateEvent } from "@/hooks/useDuplicateEvent";

interface CalendarProps {
  events: any[];
  data: any;
  refetch: () => void;
  setFormData: (data: any) => void;
  setSelectedEvent: (event: any) => void;
  setGotoDate: (fn: (date: string | Date) => void) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  sidebarOpen: boolean;
  isSelectedFromMiniCalendar: boolean;
  setIsSelectedFromMiniCalendar: (isSelected: boolean) => void;
}

export default function Calendar({
  events,
  selectedDate,
  data,
  refetch,
  setFormData,
  setSelectedEvent,
  setSelectedDate,
  setGotoDate,
  sidebarOpen,
  isSelectedFromMiniCalendar,
  setIsSelectedFromMiniCalendar,
}: CalendarProps) {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [createEvent] = useMutation(CREATE_EVENT);
  const socket = useContext(SocketContext);

  const [localEvents, setLocalEvents] = useState<any[]>([...events]);
  useEffect(() => {
    setLocalEvents([...events]);
  }, [events]);

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
  const [copiedEvent, setCopiedEvent] = useState<any>(null);

  const actions = useContextMenuActions(refetch);
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

  useEffect(() => {
    if (!socket) return;
    socket.on("newEvent", refetch);
    socket.on("updateEvent", refetch);
    socket.on("deleteEvent", refetch);
    return () => {
      socket.off("newEvent", refetch);
      socket.off("updateEvent", refetch);
      socket.off("deleteEvent", refetch);
    };
  }, [socket, refetch]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  }, [sidebarOpen]);

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

  const onEventClick = (info: any) => {
    setSelectedEventId(info.event.id);
    handleEventClick(info, data, setSelectedEvent, setFormData);
  };

  const selectedEventData =
    localEvents.find((event: any) => event.id === contextMenu.eventId) || null;

  const handleDateClick = (info: any) => {
    setSelectedDate(new Date(info.date));
    setIsSelectedFromMiniCalendar(false);
    if (!copiedEvent) {
      baseDateClick(info, setFormData, setSelectedEvent);
    }
  };

  useKeyboardShortcuts({
    selectedEventId,
    localEvents,
    setCopiedEvent,
    setSelectedEventId,
    actions,
  });

  usePasteEvent({
    copiedEvent,
    selectedDate,
    data,
    createEvent,
    refetch,
    setLocalEvents,
  });

  useDuplicateEvent({
    selectedEventId,
    localEvents,
    createEvent,
    refetch,
    setLocalEvents,
    data,
    setSelectedEventId,
  });

  return (
    <div className="w-full h-full overflow-visible">
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
        dayCellClassNames={(arg) => {
          if (
            isSelectedFromMiniCalendar &&
            selectedDate &&
            format(arg.date, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd")
          ) {
            return "selected-cell";
          }
          return "";
        }}
        timeZone="UTC"
        height="95%"
        selectable
        editable
        eventResizableFromStart
        events={[...localEvents, ...festivals]}
        eventClick={onEventClick}
        eventDrop={(eventDropInfo) =>
          handleEventDrop(eventDropInfo, updateEvent, refetch, socket)
        }
        dateClick={handleDateClick}
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
            eventData={selectedEventData}
            refetch={refetch}
            onCut={() => {
              setCopiedEvent(selectedEventData);
              actions.handleDeleteAction(selectedEventData.id);
            }}
            onCopy={() => {
              setCopiedEvent(selectedEventData);
              actions.handleCopyAction(selectedEventData);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onDuplicate={async () => {
              if (!selectedEventData?.id) return;
              await duplicateEvent({
                eventId: selectedEventData.id,
                localEvents,
                createEvent,
                refetch,
                setLocalEvents,
                data,
                setSelectedEventId,
              });
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
            onDelete={() => {
              actions.handleDeleteAction(selectedEventData.id);
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
