import React from "react";
import Modal from "react-modal";
import "./eventsAllDetails.css";

const EventDetailUpdateModel = ({
  isModalOpen,
  handleModalClose,
  updatedEvent,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleModalClose}
      className="modal"
    >
      <h2>Edit Event</h2>
      <form onSubmit={handleFormSubmit} className="form-fields">
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
        <div className="button-group">
          <button type="submit" className="btn btn-save">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventDetailUpdateModel;
