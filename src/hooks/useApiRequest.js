import axios from 'axios';

export const apiRequest = async ({ method, url, headers = {}, data = null }) => {
  
  try {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (method !== 'DELETE' && data) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};
