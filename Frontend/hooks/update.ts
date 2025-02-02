export const handleUpdate = async (
    validateEventTimes: any,
    formData: any,
    updateEvent: any,
    selectedEvent: any,
    setSelectedEvent: any,
    setFormData: any,
    refetch: any,
    socket: any // Pass Socket.io instance
) => {
    if (!validateEventTimes()) {
        alert("Start time must be earlier than end time.");
        return;
    }

    const { title, description, start, end } = formData;
    if (!title || !description || !start || !end) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const { data } = await updateEvent({
            variables: {
                id: selectedEvent.id,
                title,
                description,
                start: new Date(start + "Z").toISOString(),
                end: new Date(end + "Z").toISOString(),
            },
        });

        // Emit real-time event update
        if (socket) {
            socket.emit("updateEvent", data.updateEvent);
        }

        // Reset form state
        setSelectedEvent(null);
        setFormData({ title: "", description: "", start: "", end: "" });
      await refetch();
    } catch (err) {
        console.error("Error updating event:", err);
        alert("Failed to update event");
    }
};
