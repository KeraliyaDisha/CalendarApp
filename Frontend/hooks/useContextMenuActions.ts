import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { SocketContext } from "@/app/layout";
import { DELETE_EVENT } from "@/graphql/mutations";

export function useContextMenuActions(refetch: () => void) {
  const socket = useContext(SocketContext);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDeleteAction = async (eventId: string | null) => {
    if (!eventId) return;
    try {
      await deleteEvent({ variables: { id: eventId } });
      socket?.emit("deleteEvent", { id: eventId });
      refetch();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCopyAction = (eventId: string | null) => {
    if (!eventId) return;
    navigator.clipboard
      .writeText(eventId)
      .then(() => console.log("Copied event:", eventId))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleCutAction = (eventId: string | null) => {
    if (!eventId) return;
    navigator.clipboard
      .writeText(eventId)
      .then(() => {
      })
      .catch((err) => console.error("Failed to cut:", err));
  };

  const handleDuplicateAction = (eventId: string | null) => {
    if (!eventId) return;
  };

  return {
    handleDeleteAction,
    handleCopyAction,
    handleCutAction,
    handleDuplicateAction,
  };
}
