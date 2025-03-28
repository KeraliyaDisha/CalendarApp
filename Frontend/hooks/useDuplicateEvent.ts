/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { duplicateEvent } from "../hooks/duplicateEventUtil";

export function useDuplicateEvent({
  selectedEventId,
  localEvents,
  createEvent,
  refetch,
  setLocalEvents,
  data,
  setSelectedEventId,
}: {
  selectedEventId: string | null;
  localEvents: any[];
  createEvent: any;
  refetch: () => void;
  setLocalEvents: (update: (prev: any[]) => any[]) => void;
  data: any;
  setSelectedEventId: (id: string | null) => void;
}) {
  useEffect(() => {
    const handleDuplicateKey = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d" && selectedEventId) {
        // Avoid duplicating when focus is on an input or textarea
        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
        ) {
          return;
        }
        e.preventDefault();
        await duplicateEvent({
          eventId: selectedEventId,
          localEvents,
          createEvent,
          refetch,
          setLocalEvents,
          data,
          setSelectedEventId,
        });
      }
    };
    window.addEventListener("keydown", handleDuplicateKey);
    return () => window.removeEventListener("keydown", handleDuplicateKey);
  }, [
    selectedEventId,
    localEvents,
    createEvent,
    refetch,
    setLocalEvents,
    data,
    setSelectedEventId,
  ]);
}
