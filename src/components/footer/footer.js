import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="inline-footer-content"></div>
      <p>&copy; {new Date().getFullYear()} MyWebsite. All Rights Reserved.</p>
      <p className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </p>
    </div>
  );
};

export default Footer;
