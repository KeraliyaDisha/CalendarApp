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
    console.log("Copy action", eventId);
    // Add your copy logic here
  };

  const handleCutAction = (eventId: string | null) => {
    console.log("Cut action", eventId);
    // Add your cut logic here
  };

  // Duplicate action
  const handleDuplicateAction = (eventId: string | null) => {
    console.log("Duplicate action", eventId);
    // Add your duplicate logic here
  };

  return {
    handleDeleteAction,
    handleCopyAction,
    handleCutAction,
    handleDuplicateAction,
  };
}
