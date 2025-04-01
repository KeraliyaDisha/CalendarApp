/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EventDetails({ events, gotoDate }: any) {
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);

  function handleListItemClick(event: any) {
    const eventDate = new Date(event.start).toISOString().split("T")[0];
    gotoDate(eventDate);
  }

  return (
    <div className="flex-1 overflow-hidden">
      <h4 className="font-semibold text-gray-700 mb-2">Your Events:</h4>
      <div className="overflow-y-auto max-h-[250px] bg-gray-100 rounded-lg shadow-md p-4">
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
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                className="relative border border-gray-300 p-3 rounded-lg hover:shadow-md hover:bg-gray-200 transition duration-300 flex justify-between items-center cursor-pointer select-none"
              >
                <div>
                  <strong className="text-lg text-gray-800">{event.title}</strong>
                  <br />
                  <span className="text-gray-600 text-sm">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "UTC",
                    }).format(new Date(event.start))}
                  </span>
                </div>

                {/* Tooltip - Shows on Hover */}
                {hoveredEvent?.id === event.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white shadow-lg p-3 rounded-lg w-64 text-sm border"
                  >
                    <p className="text-blue-600 font-bold">
                      {new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(event.start))}{" "}
                      -{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(event.end))}
                    </p>
                    <p className="font-semibold">{event.title || "No Title"}</p>
                    <p className="text-gray-600">{event.description || "No description available"}</p>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
