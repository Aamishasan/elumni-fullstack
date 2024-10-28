import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',   });


    api.interceptors.request.use(
        (config) => {
           const token = localStorage.getItem('access_token');
           if (token) {
               config.headers.Authorization = `JWT ${token}`;
           }
           return config

        },
        (error) => {
            return Promise.reject(error);
    })




export default api