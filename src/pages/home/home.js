import React from "react";
import "./home.css"; // Ensure the CSS is properly linked
import NgoServices from "../ngoServices/ngoServices";
import AboutUsNgo from "../aboutUsNgo/aboutUsNgo";
import BannerImg from "../bannerImg/BannerImg";

const Home = () => {
  return (
    <div className="home-container">

      {/* Banner Section */}
      <BannerImg/>

      {/* Additional Sections */}
      

      {/* Images Section */}
      <NgoServices/>
      
      {/* About Us Section */}
      <AboutUsNgo/>
    </div>
  );
};

export default Home;
