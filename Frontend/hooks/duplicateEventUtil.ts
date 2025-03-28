/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid4 } from "uuid";

export async function duplicateEvent({
  eventId,
  localEvents,
  createEvent,
  refetch,
  setLocalEvents,
  data,
  setSelectedEventId,
}: {
  eventId: string;
  localEvents: any[];
  createEvent: any;
  refetch: () => void;
  setLocalEvents: (update: (prev: any[]) => any[]) => void;
  data: any;
  setSelectedEventId: (id: string | null) => void;
}) {
  const eventToDuplicate = localEvents.find((event) => event.id === eventId);
  if (!eventToDuplicate) {
    console.error("No event found with the selected ID:", eventId);
    return;
  }

  const userId = eventToDuplicate.userId || data?.user?.id;
  if (!userId) {
    console.error("No userId found. Cannot duplicate event.");
    return;
  }

  const newId = uuid4();
  const newEventInput = {
    id: newId,
    userId,
    title: eventToDuplicate.title,
    description: eventToDuplicate.description || "",
    start: eventToDuplicate.start,
    end: eventToDuplicate.end,
  };

  // Optimistically update local events
  setLocalEvents((prev: any[]) => [...prev, newEventInput]);

  try {
    const response = await createEvent({
      variables: newEventInput,
      errorPolicy: "all",
    });
    if (response?.data?.createEvent) {
      setLocalEvents((prev: any[]) =>
        prev.map((event) =>
          event.id === newId
            ? { ...event, id: response.data.createEvent.id }
            : event
        )
      );
      refetch();
      // Clear selection after duplication
      setSelectedEventId(null);
    }
  } catch (error) {
    console.error("Error duplicating event:", error);
  }
}
