/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleSubmit = async (
    e: React.FormEvent,
    validateEventTimes: any,
    formData: any,
    createEvent: any,
    data: any,
    setFormData: any,
    refetch: any,
    socket: any // Pass Socket.io instance
  ) => {
    e.preventDefault();
    
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
        
        const { data: eventData } = await createEvent({
            variables: {
                userId: data?.user?.id,
                start: new Date(start + "Z").toISOString(), // Ensure it's ISO format
                end: new Date(end + "Z").toISOString(), // Ensure it's ISO format
                description,
                title,
            },
        });
  
  
        // Emit real-time event creation
        if (socket) {
            socket.emit("newEvent", eventData.createEvent);
        }
  
        await refetch();
        setFormData({ title: "", description: "", start: "", end: "" });
  
    } catch (err) {
        console.error("Error creating event:", err);
        alert("Failed to create event");
    }
  };
  