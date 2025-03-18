import React from "react";
import UserProfileMenu from "../UserProfile";

interface CalendarToolbarProps {
  currentViewLabel: string;
  currentTitle: string;
  showDropdown: boolean;
  toggleDropdown: () => void;
  handleViewChange: (viewName: string) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleToday: () => void;
  onLogout: () => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  currentViewLabel,
  currentTitle,
  showDropdown,
  toggleDropdown,
  handleViewChange,
  handlePrev,
  handleNext,
  handleToday,
  onLogout,
}) => {
  return (
    <div className="flex items-center justify-between mb-0">
      <div className="flex items-center gap-2">
        {/* Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center px-4 py-2 
                       bg-white border border-gray-300 rounded-md shadow-sm 
                       text-sm font-semibold text-gray-700 
                       hover:bg-gray-100 focus:outline-none focus:ring-1 
                       focus:ring-gray-500"
          >
            {currentViewLabel}
            <svg
              className="ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 
                   10.586l3.293-3.293a1 1 0 011.414 
                   1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showDropdown && (
            <div
              className="origin-top-left absolute left-0 mt-2 w-32 
                         rounded-md shadow-lg bg-white ring-1 
                         ring-black ring-opacity-5 z-50"
            >
              <div className="py-1">
                <button
                  onClick={() => handleViewChange("dayGridMonth")}
                  className="block w-full text-left px-4 py-2 text-sm 
                             text-gray-700 hover:bg-gray-100"
                >
                  Month
                </button>
                <button
                  onClick={() => handleViewChange("timeGridWeek")}
                  className="block w-full text-left px-4 py-2 text-sm 
                             text-gray-700 hover:bg-gray-100"
                >
                  Week
                </button>
                <button
                  onClick={() => handleViewChange("timeGridDay")}
                  className="block w-full text-left px-4 py-2 text-sm 
                             text-gray-700 hover:bg-gray-100"
                >
                  Day
                </button>
                <button
                  onClick={() => handleViewChange("multiMonthYear")}
                  className="block w-full text-left px-4 py-2 text-sm 
                             text-gray-700 hover:bg-gray-100"
                >
                  Year
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="px-3 py-1 bg-gray-600 text-white rounded-md 
                     hover:bg-gray-500"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-1 bg-gray-600 text-white rounded-md 
                     hover:bg-gray-500"
        >
          &gt;
        </button>
        <button
          onClick={handleToday}
          className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm 
                     hover:bg-gray-200"
        >
          today
        </button>
      </div>

      <div className="text-lg font-medium text-gray-800">{currentTitle}</div>
      <UserProfileMenu onLogout={onLogout} />
    </div>
  );
};
