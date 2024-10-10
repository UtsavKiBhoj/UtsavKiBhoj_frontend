import React, { useState } from 'react';
import { registerUser } from '../../services/api'; 
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      navigate("/") 
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p>Click here to <Link to='/login'>login!</Link></p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
