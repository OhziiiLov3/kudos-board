import axios from "axios";
import { getToken } from "./UserApi";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";



const spaceApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

// Space API from backend
// -> fecth all spaces
export const getSpaces = async (filters) => {
  try {
    const token = getToken();
    const response = await spaceApi.get(`${API_BASE_URL}/spaces`,{
       params: filters ,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching spaces:", error);
    throw error;
  }
};

// -> create new space
export const createSpace = async (spaceData) => {
  try {
    const token = getToken();
    const response = await spaceApi.post(`${API_BASE_URL}/spaces`, spaceData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating space:", error);
    throw error;
  }
};
// -> fetcch space by Id
export const getSpace = async (id) => {
  try {
      const response = await spaceApi.get(`${API_BASE_URL}/spaces/${id}`, {
          headers: {
              'Authorization': `Bearer ${getToken()}`,
          },
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("Error fetching space:", error);
      throw error;
  }
};


export const deleteSpace = async (spaceId) => {
  try {
      const response = await spaceApi.delete(`${API_BASE_URL}/spaces/${spaceId}`, {
          headers: {
              'Authorization': `Bearer ${getToken()}`,
          },
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("Error deleting space:", error);
      throw error;
  }
};

// const api = axios.create({
//     baseURL: 'https://site-kudos-board-exemplar.onrender.com'
// });
