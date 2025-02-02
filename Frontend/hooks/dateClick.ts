export const handleDateClick = async (
  info: any,
  setFormData: any,
  setSelectedEvent:any
) => {
  setSelectedEvent(null);
  console.log("Raw Date from FullCalendar:", info.dateStr);
  // Check the current view type
  const calendarApi = info.view.calendar;
  const currentView = calendarApi.view.type;
  let startTime, endTime;
  if (currentView === "multiMonthYear") {
    // If in month view, set the event to be an all-day event
    startTime = new Date(info.dateStr);
    endTime = new Date(info.dateStr);
    endTime.setDate(endTime.getDate() + 1); // End at the start of the next day
  } else if (currentView === "dayGridMonth") {
    // If in month view, set the event to be an all-day event
    startTime = new Date(info.dateStr);
    endTime = new Date(info.dateStr);
    endTime.setDate(endTime.getDate() + 1); // End at the start of the next day
  } else {
    // For week/day view, add a 30-minute timespan
    startTime = new Date(info.dateStr);
    endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  }
  console.log("Start Time:", startTime.toISOString());
  console.log("End Time:", endTime.toISOString());
  setFormData({
    title: "",
    description: "",
    start: startTime.toISOString().slice(0, 16),
    end: endTime.toISOString().slice(0, 16),
  });
};