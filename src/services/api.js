import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:8000/'; // Change to your API URL

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function for user registration
export const registerUser = async (userData) => {
    try {
        const response = await api.post('user/signup/', userData);
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

// Function for user login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('user/login/', credentials);
        return response.data; // Return the response data

    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};


// Function for user logout
export const logoutUser = async (refreshToken) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        // Set the Authorization header
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        console.log("API  ---",refreshToken)
        const response = await api.post('user/logout/', { refreshToken: refreshToken }, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};
