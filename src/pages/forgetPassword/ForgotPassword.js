import React, { useEffect, useState } from "react";
import { forgetPassword } from "../../services/api";
import "./forgetpassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const [successMessage, setSuccessMessage] = useState(""); // State to hold success message

  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("accessToken");
    if (isAuthenticated) {
      // Redirect to another page if the user is authenticated
      navigate("/");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    try {
      // Pass the email as an object to the API
      const response = await forgetPassword({ email });
      setSuccessMessage(response.message); // Set success message from response
    } catch (err) {
      // Display the error message properly
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}{" "}
          {/* Display success message */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
