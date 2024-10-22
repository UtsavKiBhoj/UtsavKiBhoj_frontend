import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // used for linking to the event details page
import { fetchEventsList } from '../../services/api';
import './eventdeatails.css'; // Import your CSS file

const EventDetails = () => {
  const [events, setEvents] = useState([]); // state to store the list of events
  const [loading, setLoading] = useState(true); // state for showing a loading indicator
  const [error, setError] = useState(null); // state to handle errors

  // useEffect to fetch the list of events when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchEventsList(); // assuming this is your API endpoint
        setEvents(response);
        setLoading(false); // stop loading once the data is fetched
      } catch (err) {
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (events.length === 0) { 
    return (
      <div className="no-events">
        <h2>No Events Found</h2>
        <p>It seems there are no events available at the moment.</p>
        <p>Please check back later!</p>
      </div>
    );
  }

  return (
    <div className="event-details">
      <h1>All Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id} className="event-item">
            <h2>{event.event_name}</h2>
            <p><strong>Location:</strong> {event.location_name}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <Link to={`/events/${event.id}`} className="view-details">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
