import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* Left-aligned content */}
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} MyWebsite. All Rights Reserved.</p>
        </div>

        {/* Center-aligned links */}
        <div className="footer-center">
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>

        {/* Empty right section for balance */}
        <div className="footer-right"></div>
      </div>
    </div>
  );
};

export default Footer;
