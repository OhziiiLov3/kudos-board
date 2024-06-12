import axios from 'axios';


const api = axios.create({
    baseURL: 'https://site-kudos-board-exemplar.onrender.com'
});

// Board API

export const getSpaces = () => api.get('/boards');