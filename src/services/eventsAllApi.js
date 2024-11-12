import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// Set the base URL for the API
const API_URL = "http://localhost:8000/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Full Event Details page fetch API
export const fetchEventById = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.get(`event/detail/${id}`, config);
    if (response.status !== 200) {
      throw new Error("Event not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(
      error.response ? error.response.data.message : "An error occurred"
    );
  }
};

// Delete Event by ID.
export const deleteEventById = async (id) => {
  console.log("deleteEventById----------id-------",id)
  try {
    const accessToken = localStorage.getItem("accessToken");
    // Extract user_id from token payload
    // const decodedToken = jwtDecode(accessToken);
    // const eventId = decodedToken.event_id;
    // Set the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await api.delete(`event/delete/${id}`, config);
    console.log("event delete response-------",response)
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", JSON.stringify(error, null, 2));
    throw error.response ? error.response.data : { message: "Network error" };
  }
};
