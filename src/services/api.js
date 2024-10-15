import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// Set the base URL for the API
const API_URL = 'http://localhost:8000/'; 

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
        // const refreshToken = localStorage.getItem('refreshToken');
        console.log("refreshToken------------------",refreshToken)
        // Set the Authorization header
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await api.post('user/logout/', { refreshToken: refreshToken }, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};


export const fetchUserData = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        console.log("accessToken--------------------", accessToken)

        // Extract user_id from token payload
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user_id; 
        console.log("userId---------fetchUserData------------userId",userId);

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await api.get(`user/details/${userId}/`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', JSON.stringify(error, null, 2));
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const updateUserProfile = async (user) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        // Extract user_id from token payload
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user_id; 
        console.log("userId---------updateUserProfile------------userId",userId);

        // Set the Authorization header
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await api.put(`user/update/${userId}/`,user, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', JSON.stringify(error, null, 2));
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};
