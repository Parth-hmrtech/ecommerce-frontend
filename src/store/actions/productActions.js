import { apiRequest } from '../../hooks/useApiRequest';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const response = await apiRequest({
      method: 'GET',
      url: 'http://localhost:3008/api/buyer/products',
    });

    // console.log('Fetched products:', response);

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response
    });

  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message || 'Failed to fetch products',
    });
  }
};
