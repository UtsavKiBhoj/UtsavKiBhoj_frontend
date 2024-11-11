import React, { useState } from "react";
import { createLocation } from "../../../services/api";
import "../eventForm/eventdetailsform.css";
import { useEvent } from "../../../components/context/EventContext";

const EventLocationForm = () => {
  // Get event ID from useContext state
  const { eventId } = useEvent();
  console.log("eventId in location------------------------", eventId);

  console.log("eventId-------------------33 ", eventId);

  const [locationDetails, setLocationDetails] = useState({
    location_name: "",
    address: "",
    landmark: "",
    pin_code: "",
    event_id: eventId, // Initialize with event ID
  });
  console.log("locationDetails--------------33", locationDetails);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLocationChange = (e) => {
    setLocationDetails({ ...locationDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const locationResponse = await createLocation(locationDetails);
      setSuccessMessage("Location created successfully!");
      console.log("Location created:", locationResponse);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the location."
      );
      console.error("Error creating location:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-detail-form">
      <h1 className="event-title">Event Location</h1>
      <form onSubmit={handleSubmit}>
        {/* Location fields */}
        <h2 className="event-section-title">Add Location Details</h2>
        <label className="event-label">Location Name:</label>
        <input
          type="text"
          name="location_name"
          className="event-input"
          value={locationDetails.location_name}
          onChange={handleLocationChange}
          required
        />

        <label className="event-label">Address:</label>
        <textarea
          name="address"
          className="event-textarea"
          value={locationDetails.address}
          onChange={handleLocationChange}
          required
        />

        <label className="event-label">Landmark:</label>
        <input
          type="text"
          name="landmark"
          className="event-input"
          value={locationDetails.landmark}
          onChange={handleLocationChange}
          required
        />

        <label className="event-label">Pin Code:</label>
        <input
          type="number"
          name="pin_code"
          className="event-input"
          value={locationDetails.pin_code}
          onChange={handleLocationChange}
          required
        />

        <button type="submit" className="event-button" disabled={loading}>
          {loading ? "Creating..." : "Add Location"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EventLocationForm;
