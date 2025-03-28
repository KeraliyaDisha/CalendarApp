/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface UseKeyboardShortcutsProps {
  selectedEventId: string | null;
  localEvents: any[];
  setCopiedEvent: (event: any) => void;
  setSelectedEventId: (id: string | null) => void;
  actions: any;
}

export const useKeyboardShortcuts = ({
  selectedEventId,
  localEvents,
  setCopiedEvent,
  setSelectedEventId,
  actions,
}: UseKeyboardShortcutsProps) => {
  
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedEventId) return;
      
      const eventData = localEvents.find((event) => event.id === selectedEventId);
      if (!eventData) return;

      if (e.key === "Delete") {
        actions.handleDeleteAction(eventData.id);
        setSelectedEventId(null);
      }

      if (e.ctrlKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        setCopiedEvent(eventData);
        actions.handleDeleteAction(eventData.id);
        setSelectedEventId(null);
      }

      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setCopiedEvent(eventData);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEventId, localEvents, setCopiedEvent, setSelectedEventId, actions]);
};
