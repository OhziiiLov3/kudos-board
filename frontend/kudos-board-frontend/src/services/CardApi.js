import axios from "axios";
import {getToken} from '../services/UserApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


export const createCard = async (cardData) => {
 try {
  const token = getToken();
  console.log("Token:", token);
  console.log("Card Data:", cardData);

 const response = await axios.post(`${API_BASE_URL}/${cardData.spaceId}/cards`,
   cardData,{
  headers:{
    'Authorization': `Bearer ${token}`,
  },
 });
 console.log("Response:", response);
 return response.data;
 } catch (error) {
    console.error('Error creating card:', error);
    throw error;
 }
};


// Function to get all cards for a space
export const getCards = async (spaceId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/${spaceId}/cards`,{
      headers:{
        'Authorization' : `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};


// Function to upvote a card
export const upvoteCard = async (spaceId, cardId) => {
    try {
     const token = getToken();
        const response = await axios.patch(`${API_BASE_URL}/${spaceId}/cards/${cardId}/votes`,{},{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response.data); 
        return response.data  
    } catch (error) {
        console.error('Error upvoting card:', error);
    }
};

// Function to delete a card
export const deleteCard = async (spaceId, cardId) => {
    try {
      const token = getToken();
        const response = await axios.delete(`${API_BASE_URL}/${spaceId}/cards/${cardId}`,{
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response.data); 
        return response.data  
    } catch (error) {
        console.error('Error upvoting card:', error);
    }
};


// function to add comment to card 
export const addComment = async(spaceId, cardId, commentData) => {
 try {
  const token = getToken();

  console.log("comment data",commentData);
  const response = await axios.post(`${API_BASE_URL}/${spaceId}/cards/${cardId}/comments`,commentData,{
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log("RESPONSE",response.data);
  return response.data;
 } catch (error) {
  console.error('Error adding comment:', error);
    throw error;
 }
};

// function to read all comments 
export const getComments = async( spaceId,cardId) =>{
  try {
    const token = getToken();
    const response = await  axios.get(`${API_BASE_URL}/${spaceId}/cards/${cardId}/comments`,{
      headers:{
      'Authorization' : `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// function to delete comments 
export const deleteComment = async( spaceId,cardId, commentId) =>{
  try {
    const token = getToken();
    const response = await  axios.delete(`${API_BASE_URL}/${spaceId}/cards/${cardId}/comments/${commentId}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};



