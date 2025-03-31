/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export default function MiniCalendar() {
  const [calendarRef, setCalendarRef] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateDate = (newDate: Date) => {
    setCurrentDate(new Date(newDate)); // Ensures a new Date object is used
    if (calendarRef) calendarRef.getApi().gotoDate(newDate);
  };

  const handlePrev = () => updateDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNext = () => updateDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleToday = () => updateDate(new Date());

  return (
    <div className="w-full">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </span>

        <div className="flex gap-1">
          <button onClick={handleToday} className="p-1 rounded-sm hover:bg-gray-200">
            <CalendarDays className="w-3.5 h-3.5" />
          </button>
          <button onClick={handlePrev} className="p-1 rounded-sm hover:bg-gray-200">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleNext} className="p-1 rounded-sm hover:bg-gray-200">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mini Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        height={250}
        contentHeight={200}
        aspectRatio={1}
        ref={(calendar) => setCalendarRef(calendar)}
        selectable={true}
        dayMaxEvents={true}
        initialDate={currentDate}
        nowIndicator={true}
        dayHeaderContent={(arg) => (
          <div className="text-[12px] font-semibold text-gray-900">{arg.text}</div> 
        )}
        dayCellContent={(arg) => (
          <div className="text-[12px] text-gray-800">{arg.date.getDate()}</div>
        )}
      />
    </div>
  );
}
