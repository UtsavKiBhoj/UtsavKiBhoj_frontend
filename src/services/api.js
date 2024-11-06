import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Set the base URL for the API
const API_URL = "http://localhost:8000/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function for user registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("user/signup/", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Function for user login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("user/login/", credentials);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Function for user logout
export const logoutUser = async (refreshToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem('refreshToken');
    console.log("refreshToken------------------", refreshToken);
    // Set the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.post(
      "user/logout/",
      { refreshToken: refreshToken },
      config
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

export const fetchUserData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken--------------------", accessToken);

    // Extract user_id from token payload
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.user_id;
    // console.log("userId---------fetchUserData------------userId", userId);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.get(`user/details/${userId}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", JSON.stringify(error, null, 2));
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

export const updateUserProfile = async (user) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Extract user_id from token payload
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.user_id;
    console.log("userId---------updateUserProfile------------userId", userId);

    // Set the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.put(`user/update/${userId}/`, user, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", JSON.stringify(error, null, 2));
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Delete User Profile.
export const deleteUserProfile = async (user) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Extract user_id from token payload
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.user_id;
    console.log("userId---------updateUserProfile------------userId", userId);

    // Set the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.put(`user/delete/${userId}/`, user, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", JSON.stringify(error, null, 2));
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Forget Password API.
export const forgetPassword = async (user) => {
  try {
    // Make a POST request to your Django API
    const response = await api.post("user/forgot-password/", {
      email: user.email,
    });

    // Handle success response
    if (response.status === 200) {
      return response.data; // Return success message
    }
  } catch (err) {
    // Handle error response
    if (err.response && err.response.status === 400) {
      throw err.response.data || { message: "Invalid email address" };
    } else {
      throw err.response
        ? err.response.data
        : { message: "Something went wrong" }; // Generic error message
    }
  }
};

// Reset Password API call
export const resetPassword = async (user, uid, token) => {
  try {
    const response = await api.post(`user/reset-password/${uid}/${token}/`, {
      password: user.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw err.response
      ? err.response.data
      : { message: "Something went wrong" };
  }
};

// Event details form APIs
// Event creation API
export const createEvent = async (eventData) => {
  // console.log("eventData---------------", eventData.event_id )
  console.log("eventData ot---------------", eventData);
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await api.post("event/Create-form/", eventData, config, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Server response:", response);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (err) {
    throw err.response
      ? err.response.data
      : { message: "Something went wrong with creating the event" };
  }
};

// Location creation API
export const createLocation = async (locationData) => {
  console.log("eventLocation000---------------", locationData);
  console.log("eventLocation 123---------------", locationData.location_id);
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.post(
      "event/event-locations/",
      locationData,
      config,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw err.response
      ? err.response.data
      : { message: "Something went wrong with creating the location" };
  }
};

// Event list API
export const fetchEventsList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.get("event/list/", config, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("-------------------------", response.data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw err.response
      ? err.response.data
      : { message: "Something went wrong to show the event details" };
  }
};
