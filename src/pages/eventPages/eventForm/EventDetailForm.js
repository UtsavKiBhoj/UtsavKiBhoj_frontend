import React, { useState } from "react";
import { createEvent, createLocation } from "../../../services/api";
import "./eventdetailsform.css"

const EventDetailForm = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
  });

  const [locationDetails, setLocationDetails] = useState({
    location_name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEventChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (e) => {
    setLocationDetails({
      ...locationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // First, create the event
      const eventResponse = await createEvent(eventData);

      // Now create the location, passing the event_id from the eventResponse
      const locationData = {
        ...locationDetails,
        event: eventResponse.event_id, // Assuming the API returns event_id
      };
      const locationResponse = await createLocation(locationData);

      setSuccessMessage("Event and location created successfully!");
      console.log(
        "Event and location created:",
        eventResponse,
        locationResponse
      );
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the event."
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

        <h2 className="event-section-title">Event Location Details</h2>
        <label className="event-label">
          Location Name:
          <input
            type="text"
            name="location_name"
            className="event-input"
            value={locationDetails.location_name}
            onChange={handleLocationChange}
            required
          />
        </label>
        <label className="event-label">
          Address:
          <textarea
            name="address"
            className="event-textarea"
            value={locationDetails.address}
            onChange={handleLocationChange}
            required
          />
        </label>
        <label className="event-label">
          Latitude:
          <input
            type="number"
            name="latitude"
            className="event-input"
            value={locationDetails.latitude}
            onChange={handleLocationChange}
            required
          />
        </label>
        <label className="event-label">
          Longitude:
          <input
            type="number"
            name="longitude"
            className="event-input"
            value={locationDetails.longitude}
            onChange={handleLocationChange}
            required
          />
        </label>

        <button type="submit" className="event-button">Create Event</button>
      </form>
    </div>
  );
};

export default EventDetailForm;
