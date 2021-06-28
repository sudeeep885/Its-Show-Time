import axios from 'axios';

export const instanceTMD = axios.create({
    baseURL: `https://api.themoviedb.org/3`
});

export const instanceBE = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`
});

export const instanceREFRESH = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`
});