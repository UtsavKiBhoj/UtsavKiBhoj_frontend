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

// Event creation API
// export const createEvent = async (eventData) => {
//     // console.log("eventData---------------", eventData.event_id )
//     // console.log("eventData ot---------------", eventData )
//       try {
//           const accessToken = localStorage.getItem("accessToken");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//         const response = await api.post('event/Create-form/', eventData, config, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
    
//         if (response.status === 200) {
//           return response.data;
//         }
//       } catch (err) {
//         throw err.response ? err.response.data : { message: 'Something went wrong with creating the event' };
//       }
//     };
    
//     // Location creation API
//     export const createLocation = async (locationData) => {
//     // console.log("eventLocation000---------------", locationData )
//     // console.log("eventLocation 123---------------", locationData.location_id )
//         try {
//         const accessToken = localStorage.getItem("accessToken");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//         const response = await api.post('event/event-locations/', locationData, config, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
    
//         if (response.status === 200) {
//           return response.data;
//         }
//       } catch (err) {
//         throw err.response ? err.response.data : { message: 'Something went wrong with creating the location' };
//       }
//     };
  
  
//     // Event list API
//     export const fetchEventsList = async () => {
//         try {
//         const accessToken = localStorage.getItem("accessToken");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//         const response = await api.get('event/all-list/', config, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         // console.log("000000000000000000000000",response)
//         console.log("-------------------------",response.data)
//         if (response.status === 200) {
//           return response.data;
//         }
//       } catch (err) {
//         throw err.response ? err.response.data : { message: 'Something went wrong to show the event details' };
//       }
//     };

// Full Event Details page fetch API 
export const fetchEventById = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // Assuming 'api.get' uses Axios
    const response = await api.get(`event/${id}`, config);
    if (response.status !== 200) {
      throw new Error('Event not found');
    }
    console.log("Response data:", response.data);
    return response.data; // Return the event data
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error(error.response ? error.response.data.message : 'An error occurred');
  }
};
