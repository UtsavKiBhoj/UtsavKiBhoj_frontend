import React, { useState } from "react";
import { createEvent, createLocation } from "../../../services/api";
import "./eventdetailsform.css";

const EventDetailForm = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
  });

  console.log("eventData-----------------dd", eventData);
  // console.log("eventData-----------------dd", eventData);

  const [locationDetails, setLocationDetails] = useState({
    location_name: "",
    address: "",
    landmark: "",
    pin_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEventChange = (e) => {
    setEventData({...eventData, [e.target.name]: e.target.value,
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
      // Step 1: First, create the event
      const eventResponse = await createEvent(eventData);
      console.log("eventData--eventDetailForm.js-------------", eventData)
      console.log("Event eventResponse:-------------", eventResponse);

      if (!eventResponse.event_id) {
        throw new Error("Event creation failed. No event ID returned.");
      }

      // Step 2: Now create the location, passing the event_id from the eventResponse
      const locationData = {
        ...locationDetails,
        event: eventResponse.event_id, // Pass event_id to location API
      };
      const locationResponse = await createLocation(locationData);
      console.log("Location created successfully:------------", locationResponse);

      // Show success message
      setSuccessMessage("Event and location created successfully!");
    } catch (error) {
      // Handle errors
      setErrorMessage(error.message || "An error occurred while creating the event and location.");
      console.error("Error creating event and location:", error);
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
          Landmark:
          <input
            type="text"
            name="landmark"
            className="event-input"
            value={locationDetails.landmark}
            onChange={handleLocationChange}
            required
          />
        </label>
        <label className="event-label">
          Pin Code:
          <input
            type="number"
            name="pin_code"
            className="event-input"
            value={locationDetails.pin_code}
            onChange={handleLocationChange}
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
