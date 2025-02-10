import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();

    // Listen for real-time attendee updates
    socket.on("attendeeUpdated", ({ eventId, attendees }) => {
      setAttendees((prev) => ({ ...prev, [eventId]: attendees }));
    });

    return () => {
      socket.off("attendeeUpdated");
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
      
      // Initialize attendee counts
      const attendeeData = {};
      data.forEach(event => attendeeData[event._id] = event.attendees.length);
      setAttendees(attendeeData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in to join an event.");

    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/attend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });

      if (res.ok) {
        socket.emit("updateAttendees", eventId);
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const filteredEvents = () => {
    const now = new Date();
    return events.filter(event => {
      if (filter === "upcoming") return new Date(event.date) > now;
      if (filter === "past") return new Date(event.date) < now;
      return true;
    });
  };

  const handleLeaveEvent = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in to leave an event.");
  
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Assuming token is stored in localStorage
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        socket.emit("updateAttendees", eventId); // Notify other users
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error leaving event:", error);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div>
      <h2>Event Dashboard</h2>
      <div>
        <button onClick={() => setFilter("all")}>All Events</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
        <button onClick={() => setFilter("past")}>Past</button>
      </div>
      <ul>
        {filteredEvents().map(event => (
          <li key={event._id} style={{ border: "1px solid", padding: "10px", marginBottom: "10px" }}>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <p><strong>Attendees:</strong> {attendees[event._id] || 0}</p>
            <button onClick={() => handleJoinEvent(event._id)}>Join Event</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDashboard;
