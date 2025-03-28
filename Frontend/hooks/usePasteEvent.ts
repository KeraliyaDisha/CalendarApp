/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface PasteEventOptions {
  copiedEvent: any;
  selectedDate: Date | null;
  data: any;
  createEvent: (options: any) => Promise<any>;
  refetch: () => void;
  setLocalEvents: (update: (prev: any[]) => any[]) => void;
}

export function usePasteEvent({
  copiedEvent,
  selectedDate,
  data,
  createEvent,
  refetch,
  setLocalEvents,
}: PasteEventOptions) {
  useEffect(() => {
    const handlePaste = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "v" &&
        copiedEvent &&
        selectedDate
      ) {
        e.preventDefault();
        const newStart = selectedDate;
        let newEnd = copiedEvent.end;
        if (copiedEvent.end) {
          const originalStart = new Date(copiedEvent.start);
          const originalEnd = new Date(copiedEvent.end);
          const duration = originalEnd.getTime() - originalStart.getTime();
          newEnd = new Date(newStart.getTime() + duration).toISOString();
        }
        const userId = data?.user?.id;
        if (!userId) {
          console.error("No userId found! Cannot create event.");
          return;
        }
        const newEventInput = {
          userId,
          title: copiedEvent.title || "Untitled Event",
          description: copiedEvent.description || "",
          start: newStart.toISOString(),
          end: newEnd,
        };
        setLocalEvents((prevEvents: any[]) => [...prevEvents, newEventInput]);

        createEvent({
          variables: newEventInput,
          errorPolicy: "all",
        })
          .then(({ errors }: any) => {
            if (errors && errors.length > 0) {
              console.error("GraphQL Errors:", errors);
            } else {
              refetch();
            }
          })
          .catch((error: any) => {
            console.error("Mutation error:", error);
          });
      }
    };

    window.addEventListener("keydown", handlePaste);
    return () => window.removeEventListener("keydown", handlePaste);
  }, [copiedEvent, selectedDate, data, createEvent, refetch, setLocalEvents]);
}
