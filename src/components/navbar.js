import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = async () => {
    try {
      // Get the refresh token from local storage or your state management
      const refreshToken = localStorage.getItem("refreshToken");

      // Call the API to log out the user
      await logoutUser(refreshToken);

      // Clear tokens or any user data from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      console.log(isLoggedIn);

      // Navigate the user to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleEventFormClick = () => {
    if (isLoggedIn) {
      navigate("event/Create-form/");
    } else {
      navigate("/login");
    }
  };
  const handleEventsList = () => {
    if (isLoggedIn) {
      navigate("/event");
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">UtsavKiBhoj</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button
              onClick={handleEventFormClick}
              className="event-form-button"
            >
              Event Form
            </button>
          </li>
          <li>
            <button onClick={handleEventsList} className="event-form-button">
              Events
            </button>
          </li>

          {/* Show Logout button only if the user is logged in */}
          <li className="navbar-profile">
            {/* Tooltip and Icon */}
            {!isLoggedIn && (
              <div className="tooltip">
                <FaUserCircle
                  size={30}
                  onClick={handleProfileClick}
                  className="profile-icon"
                />
                <span className="tooltiptext">Login</span>
              </div>
            )}
            {isLoggedIn && (
              <FaUserCircle
                size={30}
                onClick={handleProfileClick}
                className="profile-icon"
              />
            )}
            {isLoggedIn && showDropdown && (
              // Dropdown with profile and logout options
              <div className="profile-dropdown">
                <ul>
                  <li>
                    <Link to="/userprofile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
