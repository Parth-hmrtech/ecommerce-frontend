import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3009/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async ({ method, url, headers = {}, data = null }) => {
  try {
    const config = {
      method,
      url, // endpoint only, like '/auth/login'
      headers,
    };

    if (method !== 'DELETE' && data) {
      config.data = data;
    }

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    throw error;
  }
};
