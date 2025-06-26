import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async ({ method, url, headers = {}, data = null, params = null }) => {
  try {
    const config = {
      method: method,
      url,
      headers,
      params,
    };

    if ((method === 'POST' || method === 'PUT') && data) {
      config.data = data;
    }



    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || 'Request failed.',
      };
    }

    if (error.request) {
      throw { message: 'No response from server.' };
    }

    throw { message: 'Unexpected error occurred.' };
  }
};
