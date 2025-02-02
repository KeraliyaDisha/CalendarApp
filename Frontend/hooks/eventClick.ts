export const handleEventClick = (
    clickInfo: any,
    data: any,
    setSelectedEvent: any,
    setFormData: any
) => {
    const event = data?.user?.events.find(
        (e: any) => e.id === clickInfo.event.id
    );
    if (event) {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            start: new Date(event.start).toISOString().slice(0, 16),
            end: new Date(event.end).toISOString().slice(0, 16),
        });
    }
};