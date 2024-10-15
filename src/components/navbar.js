import React, { useEffect, useState } from "react";
import "../pages/landingPage/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showDropdown, setShowDropdown] = useState(false); // To toggle profile dropdown
  const navigate = useNavigate();

  console.log(isLoggedIn);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken); // Set to true if accessToken exists, otherwise false
    console.log(isLoggedIn);
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

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown); // Toggle dropdown visibility
    } else {
      navigate("/login"); // Redirect to login/signup page
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">UtsavKiBhoj</div>
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
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
                    <a href="/userprofile">Profile</a>
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
