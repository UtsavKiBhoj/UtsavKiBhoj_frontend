import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { fetchEventById, deleteEventById } from "../../services/eventsAllApi";
import "./eventsAllDetails.css";
import { useNavigate } from "react-router-dom";
import EventDetailUpdateModel from "./EventDetailUpdateModel";

const EventsAllDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [deleteEvent, setDeleteEvent] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch the event details by ID
        const response = await fetchEventById(id);
        if (response) {
          setEvent(response);
          setUpdatedEvent(response);
          setDeleteEvent(response);
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

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      await deleteEventById(id);
      alert("Event deleted successfully.");
      navigate("/events"); // Redirect to the event list page
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await updateEventById(id, updatedEvent);
    //   if (response) {
    //     setEvent(response);
    //     setIsModalOpen(false);
    //   } else {
    //     setError("Failed to update event.");
    //   }
    // } catch (err) {
    //   setError("Failed to update event.");
    // }
  };

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
          {event.location_name && event.location_name.length > 0 ? (
            event.location_name.map((location) => (
              <div key={location.location_id} className="event-location">
                <p><strong>Location Name:</strong> {location.location_name}</p>
                <p><strong>Address:</strong> {location.address}</p>
                <p><strong>Pin Code:</strong> {location.pin_code}</p>
                <p><strong>Landmark:</strong> {location.landmark}</p>
              </div>
            ))
          ) : (
            <p>No location information available.</p>
          )}
          
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Organizer Name:</strong> {event.organizer.name}
          </p>
          <p>
            <strong>Organizer Email:</strong> {event.organizer.email}
          </p>
          <p>
            <strong>Phone:</strong> {event.organizer.phone}
          </p>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn btn-update"
            onClick={handleEditButtonClick}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Update details Model  */}
      <EventDetailUpdateModel
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        updatedEvent={updatedEvent}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EventsAllDetails;
