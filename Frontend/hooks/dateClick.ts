/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleDateClick = async (
  info: any,
  setFormData: any,
  setSelectedEvent:any
) => {
  setSelectedEvent(null);
  // Check the current view type
  const calendarApi = info.view.calendar;
  const currentView = calendarApi.view.type;
  let startTime, endTime;
  if (currentView === "multiMonthYear") {
    startTime = new Date(info.dateStr);
    endTime = new Date(info.dateStr);
    endTime.setDate(endTime.getDate() + 1); 
  } else if (currentView === "dayGridMonth") {
    startTime = new Date(info.dateStr);
    endTime = new Date(info.dateStr);
    endTime.setDate(endTime.getDate() + 1); 
  } else {
    startTime = new Date(info.dateStr);
    endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  }
  setFormData({
    title: "",
    description: "",
    start: startTime.toISOString().slice(0, 16),
    end: endTime.toISOString().slice(0, 16),
  });
};