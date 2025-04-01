# Calendar Application with Authentication and Event Management

This calendar application, inspired by Notion, enables users to manage personal and professional events. It includes user authentication, multiple calendar views (Day, Week, Month), event creation by dragging over dates, live updates for events, and an interactive sidebar for event management.

## Key Features

### User Authentication
- **Sign Up & Login**: Secure user authentication with session management via cookies.
- **Protected Routes**: Only authenticated users can access event management features.

### Calendar Functionality
- **Multiple Views**: Switch between Day, Week, and Month views.
- **"Today" Button**: Quickly navigate to the current date.

### Event Management
- **Event Creation**: Create events by dragging over dates on the calendar.
- **Live Event Updates**: Changes to event titles or dates reflect instantly on the calendar.
- **Drag and Drop**: Move events by dragging and dropping them on the calendar.

### Sidebar & Date Management
- **Event Details**: View and edit event details (name, title, date range).
- **Popup Calendar**: Modify event start and end dates through a popup calendar.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Apollo Client, WebSocket
- **Backend**: GraphQL API (Node.js, Express), WebSocket Server
- **Database**: MongoDB

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/KeraliyaDisha/CalendarApp.git
cd CalendarApp
npm install
