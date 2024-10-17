import React, { useState } from "react";
import { resetPassword } from "../../services/api";
import { useParams } from "react-router-dom";
import "./resetpassword.css"

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const { uid, token } = useParams(); // Get uid and token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ password }, uid, token);
      alert("Password reset successfully.");
    } catch (err) {
      alert("Error resetting password.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
