import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // used for linking to the event details page
import { fetchEventsList } from '../../services/api';

const EventDetails = () => {
  const [events, setEvents] = useState([]);   // state to store the list of events
  const [loading, setLoading] = useState(true);   // state for showing a loading indicator
  const [error, setError] = useState(null);   // state to handle errors

  console.log("events-----------events",events)

  // useEffect to fetch the list of events when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchEventsList();  // assuming this is your API endpoint
        setEvents(response);
        console.log("EventDetails-------------57",response.data)
        setLoading(false);  // stop loading once the data is fetched
      } catch (err) {
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (events.length === null) { 
    return <div>No events found.</div>;
  }

  return (
        <div>
      <h1>All Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h2>{event.event_name}</h2>
            <p><strong>Location:</strong> {event.location_name}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            {/* Link to the event details page */}
            {/* <Link to={`/events/${event.id}`}>View Details</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;