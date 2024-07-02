import axios from 'axios';


const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';
// function to seacrh for GIFS by query 
export const searchGifs = async (query) => {
try {
    const response = await axios.get(`${BASE_URL}/search`,{
     params: {
        q: query,
        api_key: giphyApiKey,
     }
    });
    console.log(response.data);
    return response.data;
} catch (error) {
     console.error('Error fetching GIFs:', error);
    throw error;
}
}