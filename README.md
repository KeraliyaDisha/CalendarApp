# Calendar Application with Authentication and Event Management

This is a calendar application inspired by Notion, where users can manage their personal and professional events with ease. The application includes user authentication, multiple calendar views (Day, Week, Month), event creation by dragging over dates, and live updates for events. Users can also manage event details, such as start and end dates, through an interactive sidebar and popup calendar. 

## Features and Functionalities

### User Authentication

- **Sign Up**: Users can create a new account by providing a username and password. Passwords are securely hashed before being stored in the database.
- **Login**: Users can log in using their credentials. Upon successful authentication, a session cookie is set, allowing the user to remain logged in.
- **Session-based Authentication**: The application uses cookies to manage user sessions. Each session is securely stored on the server, and users must be authenticated to access protected routes.
- **Protected Routes**: Routes related to viewing or editing events are protected and accessible only to authenticated users. Unauthorized users will be redirected to the login page.

### Calendar Functionality

- **Calendar Display**: A calendar that displays dates for the current month and year, with today's date highlighted.
- **Switch Views**: Users can switch between different views: Day, Week, or Month.
- **"Today" Button**: A "Today" button that takes users directly to the current date for easy navigation.

### Event Management

- **Creating Events**: Users can create events by dragging over a date range on the calendar. While dragging, the selected date range (start date to end date) is displayed in the sidebar.
- **Event Display**: When users drag over a date range, an event line is instantly displayed on the calendar for the selected range. Changes made to the event title in the sidebar should reflect instantly on the calendar. Events visually span the selected date range (e.g., if the event spans from the 6th to the 8th, it will display as a line from the 6th to the 8th with the event name inside).
- **Drag and Drop**: After creating an event, users can drag and drop the event to a different date range. The updated date range should immediately reflect in the sidebar.

### Sidebar Details

- **Event Information**: The sidebar displays more information about a selected event.
- **Fields**: The sidebar contains multiple fields, such as the name of the event (e.g., birthday, interview, or other events), event title, and date range (start and end dates).
- **Start and End Date Management**: Clicking on the start or end date opens a popup calendar for selecting the respective date. The selected date should be editable through this calendar, and any changes should instantly reflect on the main calendar as a live preview.

### Start and End Date Management

- Users can manage the event's start and end dates in the sidebar after dragging.
- Clicking on the start or end date opens a popup calendar for selecting the respective date.

## Tech Stack

- **Frontend**: 
  - React.js
  - TypeScript
  - Tailwind CSS
  - Apollo Client (for GraphQL)
  - WebSocket (for real-time updates)
  - React Router (for routing)
- **Backend**:
  - GraphQL API (Node.js, Express)
  - WebSocket Server (for real-time event updates)
- **Database**:
  - MongoDB (for user and event data storage)

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
