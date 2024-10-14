import React, { useEffect, useState } from 'react'
import "../pages/landingPage/LandingPage.css"
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  const navigate = useNavigate();

  console.log(isLoggedIn)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);  // Set to true if accessToken exists, otherwise false
    console.log(isLoggedIn)
  }, []);

  const handleLogout = async () => {
    try {
      // Get the refresh token from local storage or your state management
      const refreshToken = localStorage.getItem('refreshToken'); 

      // Call the API to log out the user
      await logoutUser(refreshToken);

      // Clear tokens or any user data from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      console.log(isLoggedIn)

      // Navigate the user to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
    {/* Navbar */}
    <nav className="navbar">
        <div className="navbar-logo">UtsavKiBhoj</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          {/* Show Logout button only if the user is logged in */}
          {isLoggedIn && <li><button className='Logout-button'  onClick={handleLogout}>Logout</button></li>}
        </ul>
      </nav>
      
    </>
  )
}

export default Navbar
