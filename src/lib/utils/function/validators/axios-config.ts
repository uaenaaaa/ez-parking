import axios from 'axios';
import https from 'https';
import { ENVIRONMENT, API_BASE_URL } from '$env/static/private';

export const httpsAgent = new https.Agent({
    rejectUnauthorized: ENVIRONMENT === 'production'
});

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    httpsAgent,
    headers: {
        Accept: 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export default axiosInstance;
