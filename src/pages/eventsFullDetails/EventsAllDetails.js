import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../../services/eventsAllApi";
import "./eventsAllDetails.css";

const EventsAllDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch the event details by ID
        const response = await fetchEventById(id);
        if (response) {
          setEvent(response);
        } else {
          setError("Event data not found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details.");
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
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {event.address}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Organizer Name:</strong> {event.name}
          </p>
          <p>
            <strong>Organizer Email:</strong> {event.email}
          </p>
          <p>
            <strong>Phone:</strong> {event.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsAllDetails;
