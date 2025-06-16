import axios from 'axios';

export const apiRequest = async ({ method, url, headers = {}, data = null }) => {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // merge custom headers if passed
      },
      data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
