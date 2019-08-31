import {
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    CART_ERROR,
    DELETE_CART,
    DELETE_CART_SUCCESS,
    LOADING_CART,
    LOADING_CART_SUCCESS,
    UPDATE_CART,
    UPDATE_CART_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingCart: false,
    addingToCart: false,
    updatingCart: false,
    cart: {},
    error: null,
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case LOADING_CART:
            return {
                ...state,
                loadingCart: true
            };
        case LOADING_CART_SUCCESS:
            return {
                ...state,
                loadingCart: false,
                cart: action.result
            };
        case ADD_TO_CART:
            return {
                ...state,
                addingToCart: true
            };
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: action.result,
                addingToCart: false

            };

        case UPDATE_CART:
            return {
                ...state,
                updatingCart: true
            };
        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                cart: action.result,
                updatingCart: false

            };

        case CART_ERROR:
            return {
                ...state,
                error: action.result,
                loadingCart: false
            };

    }
};

export default reducer;


export const getCart = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CART
        });
        return ApiClient().get('/cart')
                          .then(response => {
                              dispatch({
                                  type: LOADING_CART_SUCCESS,
                                  result: response.data.cart.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const addToCart = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_TO_CART
        });
        return ApiClient().post('/cart', payload)
                          .then(response => {
                              dispatch({
                                  type: ADD_TO_CART_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const UpdateCart = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_TO_CART
        });
        return ApiClient().put('/cart', payload)
                          .then(response => {
                              dispatch({
                                  type: ADD_TO_CART_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const deleteCart = (id: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: DELETE_CART
        });
        return ApiClient({headers: {cartId: id}}).delete('/cart')
                                                 .then(response => {
                                                     dispatch({
                                                         type: DELETE_CART_SUCCESS,
                                                         result: response.data
                                                     })
                                                 })
                                                 .catch(error => {
                                                     throw(error);
                                                 });
    }
};




