/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { handleEventLogout } from "../../hooks/logout";
import { DELETE_EVENT } from "@/graphql/mutations";
import { useEffect, useContext } from "react";
import { SocketContext } from "@/app/layout"; // Import Socket.io Context

export default function EventList({ events, router, gotoDate, refetch }: any) {
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const socket = useContext(SocketContext); // Get Socket.io instance

  function handleListItemClick(event: any) {
    console.log("Navigating to event:", event);
    const eventDate = new Date(event.start).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    gotoDate(eventDate);
  }

  async function handleListItemDelete(id: any) {
    await deleteEvent({ variables: { id } });
    refetch();
    socket?.emit("deleteEvent", { id }); // Notify other clients
  }

  // Listen for real-time event deletions
  useEffect(() => {
    if (!socket) return;

    socket.on("deleteEvent", (event: any) => {
      console.log("Event deleted via Socket.io:", event);
      refetch(); // Refresh events
    });

    return () => {
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  return (
    <>
      <div className="mt-4 flex-1 overflow-hidden">
        <h4 className="font-semibold text-gray-700 mb-2">Your Events:</h4>
        <div className="overflow-y-auto max-h-[250px] bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 p-4">
          {events.length === 0 ? (
            <div className="flex justify-center items-center h-full text-lg text-gray-600">
              No events to display
            </div>
          ) : (
            <ul className="space-y-4">
              {events.map((event: any) => (
                <li
                  key={event.id}
                  onClick={() => handleListItemClick(event)}
                  className="border border-gray-300 p-3 rounded-lg hover:shadow-md hover:bg-gray-100 transition duration-300 flex justify-between items-center cursor-pointer select-none"
                >
                  <div>
                    <strong className="text-lg text-gray-800">
                      {event.title}
                    </strong>{" "}
                    <br />
                    <span className="text-lg text-gray-800">
                      {event.description}
                    </span>
                    <br />
                    <span className="text-gray-600 text-sm">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(event.start))}
                    </span>
                    <br />
                    <span className="text-gray-600 text-sm">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(event.end))}
                    </span>
                  </div>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 hover:scale-110 transition duration-300 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering list item click
                      handleListItemDelete(event.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={() => handleEventLogout(router)}
        className="w-full bg-red-500 text-white p-3 rounded-lg mt-6 hover:bg-red-600 focus:outline-none transition duration-200"
      >
        Log out
      </button>
    </>
  );
}
