import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3009/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async ({ method, url, headers = {}, data = null, params = null }) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url,
      headers: {
        ...axiosInstance.defaults.headers,
        ...headers,
      },
      params,
    };

    if (['post', 'put'].includes(method.toLowerCase()) && data) {
      config.data = data;
    }

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || 'Request failed.',
        error: error.response.data, // optional: useful for debugging
      };
    }

    if (error.request) {
      throw { message: 'No response from server.' };
    }

    throw { message: 'Unexpected error occurred.' };
  }
};
