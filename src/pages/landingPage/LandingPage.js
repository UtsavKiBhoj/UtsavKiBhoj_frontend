import React from "react";
import "./LandingPage.css"; // Ensure the CSS is properly linked
import NgoServices from "../ngoServices/ngoServices";
import AboutUsNgo from "../aboutUsNgo/aboutUsNgo";
import BannerImg from "../bannerImg/BannerImg";

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Banner Section */}
      <BannerImg />

      {/* Additional Sections */}

      {/* Images Section */}
      <NgoServices />

      {/* About Us Section */}
      <AboutUsNgo />
    </div>
  );
};

export default LandingPage;
