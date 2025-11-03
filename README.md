# Accessibility Map - Frontend

A React-based web application for accessibility mapping and safe navigation for people with disabilities.

## Features

- **Authentication**: Login, register, and profile management
- **Interactive Map**: OpenStreetMap integration with route planning
- **Community Reports**: Crowd-sourced hazard reporting
- **Report Verification**: Admin dashboard for report approval
- **Safe Navigation**: Route recommendations avoiding hazards
- **Real-time Alerts**: Proximity warnings for reported hazards

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test Accounts

### Admin Account
- Email: `admin@test.com`
- Password: `admin123`
- Access: Full access including admin dashboard

### Regular User
- Email: `user@test.com`  
- Password: `user123`
- Access: Standard user features

## Features Overview

### Home Page
- Modern gradient design
- Feature cards with icons
- Quick navigation to map and reports

### Map Page
- Interactive OpenStreetMap
- Search bar with address autocomplete
- Report markers with color coding by severity
- Click markers to see details
- Side panel showing all reports

### Admin Dashboard
- View pending reports for verification
- Approve or reject reports
- Color-coded severity indicators
- Modern card-based UI

### Reports Page
- View all community reports
- Filter by type and severity
- Create new reports with image upload
- Responsive card layout

## Tech Stack

- React 18
- Vite
- React Router v6
- Leaflet & React-Leaflet
- Material-UI
- Axios
- React Hook Form

## Mock Data

The application includes mock data for testing:
- 3 approved reports on the map (test markers)
- 2 pending reports for admin verification
- Demo routes and navigation

## API Configuration

The frontend is ready to connect to a backend. Update the API base URL in `src/api/index.js` or use environment variables:

```javascript
const BASE_URL = import.meta.env.VITE_API_URL

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3001/api
```

## Project Structure

```
src/
├── api/              # API calls to backend
├── components/       # Reusable React components
├── contexts/         # React Context for state management
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── utils/            # Utility functions
```

## UI Improvements

- Modern gradient backgrounds
- Card-based layouts with hover effects
- Color-coded severity indicators
- Responsive design for all screen sizes
- Smooth animations and transitions
- Professional Material-UI components

