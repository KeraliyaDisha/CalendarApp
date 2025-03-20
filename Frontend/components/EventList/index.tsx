/* eslint-disable @typescript-eslint/no-explicit-any */

export default function EventList({ events, gotoDate }: any) {
  function handleListItemClick(event: any) {
    console.log("Navigating to event:", event);
    const eventDate = new Date(event.start).toISOString().split("T")[0];
    gotoDate(eventDate);
  }

  return (
    <>
      <div className=" flex-1 overflow-hidden">
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
                    {/* <br />
                    <span className="text-lg text-gray-800">
                      {event.description}
                    </span> */}
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
