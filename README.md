
# Calendar React App

A modern React application for displaying and managing calendar events with a clean, responsive interface.

## Features

- **Event Listing**: View upcoming events in a sortable list format
- **Event Details**: Click on any event to see full details including location, time, and description
- **Calendar Export**: Download events as ICS files to add to your personal calendar
- **Responsive Design**: Works on all devices from mobile to desktop

## Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript 5.8.3
- **UI Components**: Microsoft Fluent UI (@fluentui/react)
- **State Management**: React Context API with Reducers
- **API Integration**: Axios for API requests
- **Data Fetching**: TanStack React Query for efficient data fetching with caching
- **Build Tool**: Vite 7.1.2
- **Date Handling**: Luxon for date/time manipulation
- **Calendar Export**: ICS file generation with the ics library
- **Security**: DOMPurify for sanitizing HTML content

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```
   git clone https://github.com/harrisnic/calendar-react-app.git
   cd calendar-react-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
    - Create `.env.development` and `.env.production` files based on the provided examples
    - Configure the `VITE_API_BASE_URL` to point to your API endpoint

### Development

Start the development server:
   ```
   npm run dev
   ```
This will start the app in development mode at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

### Building for Production

Build the application:
   ```
   npm run build
   ```

Preview the production build:
   ```
   npm run preview
   ```
## Project Structure

- `/src`: Source code
    - `/components`: UI components
        - `/EventList`: Components for listing events
        - `/EventModal`: Modal components for displaying event details
    - `/hooks`: Custom React hooks
        - `useEvents.ts`: Hook for fetching event data
    - `/services`: API services
        - `APIClient.ts`: Axios-based API client
    - `/stores`: State management
        - `/calendar`: Calendar context and reducer
    - `/types`: TypeScript type definitions
    - `/utils`: Utility functions for dates, addresses, etc.

## Environment Variables

The application uses the following environment variables:

- `VITE_API_BASE_URL`: Base URL for the API endpoints
- `VITE_REACT_APP_BASE_URL`: Base URL for the application (used for static assets)

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
