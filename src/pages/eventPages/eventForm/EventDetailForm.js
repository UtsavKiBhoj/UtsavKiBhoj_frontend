import React, { useState } from "react";
import { createEvent } from "../../../services/api";
import "./eventdetailsform.css";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../../components/context/EventContext";

const EventDetailForm = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
  });

  const navigate = useNavigate();
  const { setEventId } = useEvent();

  // console.log("eventData-----------------dd", eventData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const eventResponse = await createEvent(eventData);
      console.log("eventResponse---------------------------",eventResponse)
      console.log("eventResponse---------------------------",eventResponse.event_id)
      if (eventResponse && eventResponse.event_id) {
        setEventId(eventResponse.event_id);
        setSuccessMessage("Event and location created successfully!");
        navigate("/event/location-details/");
      } else {
        throw new Error("Invalid response from server");
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the event"
      );
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-detail-form">
      <h1 className="event-title">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="event-section-title">Event Details</h2>
        <label className="event-label">
          Event Name:
          <input
            type="text"
            name="event_name"
            className="event-input"
            value={eventData.event_name}
            onChange={handleEventChange}
            required
          />
        </label>
        <label className="event-label">
          Description:
          <textarea
            name="description"
            className="event-textarea"
            value={eventData.description}
            onChange={handleEventChange}
            required
          />
        </label>
        <label className="event-label">
          Date:
          <input
            type="date"
            name="date"
            className="event-input"
            value={eventData.date}
            onChange={handleEventChange}
            required
          />
        </label>
        <button type="submit" className="event-button" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EventDetailForm;
