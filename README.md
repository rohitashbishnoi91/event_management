# Event Management Platform - Frontend

This repository contains the frontend code for the Event Management Platform, which allows users to register, log in, create events, view upcoming events, and more. The platform uses a responsive design to work seamlessly on all devices.

## Features

1. **User Authentication:**
   - Users can register and log in.
   - Option for "Guest Login" with limited access to features.

2. **Event Dashboard:**
   - Displays a list of upcoming and past events.
   - Includes filters for categories and dates.

3. **Event Creation:**
   - Users can create an event with fields like event name, description, date/time, etc.

4. **Real-Time Attendee List:**
   - Displays the number of attendees for each event in real-time.

5. **Responsive Design:**
   - The platform works seamlessly across all devices, including desktops, tablets, and mobile phones.

## Tech Stack

- **React** for frontend framework
- **Axios** for HTTP requests
- **WebSockets** for real-time updates

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/rohitashbishnoi91/event_management
   cd https://github.com/rohitashbishnoi91/event_management

 2. Install dependencies:



npm install
Run the development server:


npm start
The app will be running at http://localhost:3000.

Deployment
Frontend Hosting: Deployed on Vercel or Netlify for free hosting.
API Integration
The frontend interacts with the backend API using JWT for secure authentication and WebSockets for real-time updates.

