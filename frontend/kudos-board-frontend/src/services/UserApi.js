import axios from "axios";



const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Function to retrieve token from localStorage
export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    return token;
};

// authentication-related API calls
const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Function to fetch current user details
export const getCurrentUser = async () => {
 try {
    const token = getToken();
    if(!token){
        throw new Error('No token found'); 
    }
 const response = await authApi.get('/current-user',{
    headers:{
        'Authorization': `Bearer ${token}`,
    }
 });
    return response.data
 } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        console.error("Error fetching current user:", errorMessage);
        throw new Error(errorMessage);
 }
};

export const getUserById = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await authApi.get(`/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        console.error("Error fetching user details:", errorMessage);
        throw new Error(errorMessage);
    }
};

// user login
export const login = async (email, password) => {
    try {
        const response = await authApi.post('/login', { email, password });
        console.log("Backend Response:", response);
        const token = response.data.token;
        console.log("Received Token:", token);
        localStorage.setItem('token', token);
        console.log("Stored Token in localStorage:", localStorage.getItem('token')); 
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        console.error("Login error:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const register = async (email,username, password, ) => {
    try {
        const response = await authApi.post('/register', { email,username, password });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const logout = async () => {
    try {
        await authApi.post('/logout');
        localStorage.removeItem('token');
    } catch (error) {
        throw error.response.data.error;
    }
};


export default { getCurrentUser, login, register, logout, getToken };
