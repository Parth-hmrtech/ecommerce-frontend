import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from '../actions/productActions';

const initialState = {
    loading: false,
    products: [],
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_PRODUCTS_SUCCESS:
            const fetchedProducts = Array.isArray(action.payload?.data)
                ? action.payload.data
                : [];

            console.log('Products fetched:', fetchedProducts);

            return {
                ...state,
                loading: false,
                products: fetchedProducts,
            };

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:            
            return state;
    }
};

export default productsReducer;
