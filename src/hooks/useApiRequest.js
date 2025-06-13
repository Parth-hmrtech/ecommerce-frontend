import axios from 'axios';

export const apiRequest = async ({ method, url, headers = {}, body = null }) => {
  try {
    const response = await axios({ method, url, headers, data: body });
    return response.data;
  } catch (error) {
    throw error;
  }
};
