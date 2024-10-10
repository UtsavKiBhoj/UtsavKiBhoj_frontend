import React from "react";
import "./home.css"; // Ensure the CSS is properly linked
import Navbar from "../../components/navbar"; // Ensure the Navbar component is correct
import Footer from "../../components/footer/footer"; // Ensure the Footer component is correct
import NgoServices from "../ngoServices/ngoServices";
import AboutUsNgo from "../aboutUsNgo/aboutUsNgo";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <Navbar />

      {/* Banner Section */}
      <div className="banner">
        <img
          src={require("../../assets/images/banner_img.png")}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Welcome to Our Website UtsavKiBhoj</h1>
          <p></p>
        </div>
      </div>

      {/* Additional Sections */}

      {/* Images Section */}
      <NgoServices/>
      
      {/* About Us Section */}
      <AboutUsNgo/>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
