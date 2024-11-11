import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { fetchEventById } from "../../services/eventsAllApi";
import "./eventsAllDetails.css";


const EventsAllDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch the event details by ID
        const response = await fetchEventById(id);
        if (response) {
          setEvent(response);
          setUpdatedEvent(response);
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
        <button onClick={handleEditButtonClick} className="edit-button">
          Edit
        </button>
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
            <strong>Organizer Name:</strong> {event.organizer.name}
          </p>
          <p>
            <strong>Organizer Email:</strong> {event.organizer.email}
          </p>
          <p>
            <strong>Phone:</strong> {event.organizer.phone}
          </p>
        </div>
      </div>

      {/* Update details Model  */}
      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} className="modal">
        <h2>Edit Event</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Event Name:
            <input
              type="text"
              name="event_name"
              value={updatedEvent.event_name || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={updatedEvent.date || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="address"
              value={updatedEvent.address || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={updatedEvent.description || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Organizer Name:
            <input
              type="text"
              name="organizer_name"
              value={updatedEvent.organizer?.name || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Organizer Email:
            <input
              type="email"
              name="organizer_email"
              value={updatedEvent.organizer?.email || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="organizer_phone"
              value={updatedEvent.organizer?.phone || ""}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn btn-save">Save Changes</button>
          <button type="button" className="btn btn-cancel" onClick={handleModalClose}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default EventsAllDetails;
