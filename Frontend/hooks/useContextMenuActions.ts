import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { SocketContext } from "@/app/ClientProvider";
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
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleCutAction = (eventId: string | null) => {
    if (!eventId) return;
    navigator.clipboard
      .writeText(eventId)
      .catch((err) => console.error("Failed to cut:", err));
  };

  return {
    handleDeleteAction,
    handleCopyAction,
    handleCutAction,
  };
}
