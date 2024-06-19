import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Space API from backend
// fecth all spaces

export const getSpaces = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/spaces`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching spaces:", error);
      throw error;
    }
  };

//   create new space
export const createSpace = async (spaceData)=>{
 try {
    const response = await axios.post(`${API_BASE_URL}/spaces`, spaceData)
    return response.data;
 } catch (error) {
    console.error("Error creating space:", error)
    throw error
 }
}




// const api = axios.create({
//     baseURL: 'https://site-kudos-board-exemplar.onrender.com'
// });
