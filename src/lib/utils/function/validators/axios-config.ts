import axios from 'axios';
import https from 'https';
import { ENVIRONMENT, API_BASE_URL } from '$env/static/private';

export const httpsAgent = new https.Agent({
	rejectUnauthorized: ENVIRONMENT === 'production'
});

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	httpsAgent
});

export default axiosInstance;
