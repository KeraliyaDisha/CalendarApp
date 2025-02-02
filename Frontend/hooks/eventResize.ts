export const handleEventResize = async (
    eventResizeInfo: any,
    updateEvent: any,
    refetch: any,
    socket: any // Pass Socket.io instance
) => {
    const { id } = eventResizeInfo.event;
    const start = eventResizeInfo.event.start?.toISOString();
    const end = eventResizeInfo.event.end?.toISOString();

    if (!start || !end) {
        alert("Invalid date range for the event.");
        return;
    }

    try {
        const { data } = await updateEvent({
            variables: {
                id,
                title: eventResizeInfo.event.title,
                description: eventResizeInfo.event.extendedProps?.description || "", // Ensure description exists
                start,
                end,
            },
        });

        // Emit real-time event update
        if (socket) {
            socket.emit("updateEvent", data.updateEvent);
        }

       await refetch();
    } catch (err) {
        console.error("Error updating event on resize:", err);
        alert("Failed to update event.");
    }
};
