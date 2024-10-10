import React from 'react'
import "../pages/home/home.css"

const Navbar = () => {
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
        </ul>
      </nav>
      
    </>
  )
}

export default Navbar