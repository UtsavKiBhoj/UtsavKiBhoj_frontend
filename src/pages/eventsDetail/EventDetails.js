import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // used for linking to the event details page
// import { fetchEventsList } from '../../services/api';
import './eventdetails.css'; // Import your CSS file
import { fetchEventsList } from '../../services/api';

const EventDetails = () => {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 


  // useEffect to fetch the list of events when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchEventsList();
        setEvents(response);
        console.log("response----------------", response)
        // navigate("")
        setLoading(false);
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
          <li key={event.event_id} className="event-item">
            <h2>{event.event_name}</h2>
            <p><strong>Location:</strong> {event.location_name}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Organizer Name:</strong> {event.organizer?.name}</p>
            <p><strong>Organizer Email:</strong> {event.organizer?.email}</p>
            <p><strong>Organizer Phone No:</strong> {event.organizer?.phone}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <Link to={`/event/${event.event_id}`} className="view-details">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
