import axios from "axios";

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
    const response = await api.get(`event/details/${id}`, config);
    if (response.status !== 200) {
      throw new Error('Event not found');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response ? error.response.data.message : 'An error occurred');
  }
};
