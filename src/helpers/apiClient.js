import apiConfig from '../config/index.js';
import axios from 'axios';

const _API = axios.create();

_API.interceptors.response.use(response => {
    return Promise.resolve(response.data);
});

_API.interceptors.request.use(config => {
    config.url = `${apiConfig.API_URL}${config.url}`;
    return config;
});

export default _API;
