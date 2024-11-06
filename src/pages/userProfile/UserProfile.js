import React, { useEffect, useState } from "react";
import {
  deleteUserProfile,
  fetchUserData,
  updateUserProfile,
} from "../../services/api";
import "./userprofile.css";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Extract user_id from token payload
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user_id;

      // Fetch user data and update state
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          setUser({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDelete = async (e) => {
    // Delete user profile
    e.preventDefault();
    try {
      await deleteUserProfile(user);
    } catch (error) {
      console.error("Error Deleting profile:", error);
      alert("Failed to delete profile.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user); // Send updated user data to the backend
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="button-container">
          <button type="submit" className="update-button">
            Update
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
