import axios from 'axios';

// Create base axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3009/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Main API utility function
export const apiRequest = async ({ method, url, headers = {}, data = null, params = null }) => {
  try {
    const config = {
      method: method.toLowerCase(), // Ensures consistency
      url,                          // Example: '/auth/login'
      headers,
      params,                       // Optional query params
    };

    // Only attach body data for methods that support it
    if (['post', 'put', 'patch'].includes(method.toLowerCase()) && data) {
      config.data = data;
    }

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    // Optional: Custom error structure
    if (error.response) {
      // Server responded with status code not in the 2xx range
      throw {
        status: error.response.status,
        message: error.response.data?.message || 'Request failed.',
        data: error.response.data,
      };
    } else if (error.request) {
      // Request was made but no response received
      throw { message: 'No response received from the server.', error };
    } else {
      // Other errors (like config errors)
      throw { message: error.message || 'Unexpected error', error };
    }
  }
};
