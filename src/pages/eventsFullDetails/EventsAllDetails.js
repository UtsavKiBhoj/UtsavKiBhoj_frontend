// EventDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the event ID from the route
import { fetchEventById } from '../../services/eventsAllApi'; // Fetch event by ID API
import './eventsAllDetails.css'; // Custom CSS for attractive styling

const EventsAllDetails = () => {
  const { id } = useParams(); // Getting the event ID from URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetchEventById(id); // Fetch the event details by ID
        console.log()
        setEvent("response----------fetchEventDetails------", response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details.');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!event) {
    return <div className="no-event">Event not found.</div>;
  }

  return (
    <div className="event-detail-page">
      <div className="event-container">
        <h1 className="event-title">{event.event_name}</h1>
        <div className="event-details">
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location_name}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Organizer Name:</strong> {event.organizer?.name}</p>
          <p><strong>Organizer Email:</strong> {event.organizer?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default EventsAllDetails;
