import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";


export const createCard = async (cardData) => {
 try {
 const response = await axios.post(`${API_BASE_URL}/${cardData.spaceId}/cards`, cardData);
 return response.data;
 } catch (error) {
    console.error('Error creating card:', error);
    throw error;
 }
};