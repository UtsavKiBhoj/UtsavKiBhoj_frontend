import React from 'react'
import "./ngoServices.css"

const NgoServices = () => {
  return (
    <section className="three-images-section">
        <h2 className="section-title" id="services">Services We Provide</h2>
        <div className="image-grid">
          <div className="image-item">
            <img
              src={require("../../assets/images/food_donation.jpg")}
              alt="Food Donation"
            />
            <p className="image-description">Food Donation Services</p>
          </div>
          <div className="image-item">
            <img
              src={require("../../assets/images/ngos_helping.jpg")}
              alt="NGOs Helping"
            />
            <p className="image-description">Connecting NGOs with Events</p>
          </div>
          <div className="image-item">
            <img
              src={require("../../assets/images/community_event.jpg")}
              alt="Community Event"
            />
            <p className="image-description">Community Event Support</p>
          </div>
        </div>
    </section>
  )
}

export default NgoServices
