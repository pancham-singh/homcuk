import {
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    LOADING_ORDERS,
    LOADING_ORDERS_SUCCESS,
    ORDER_ERROR,
    PLACE_ORDER,
    PLACE_ORDER_SUCCESS,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingOrders: false,
    placeOrder: false,
    updatingOrder: false,
    orders: [],
    order: {},
    error: null,
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case LOADING_ORDERS:
            return {
                ...state,
                loadingOrders: true
            };
        case LOADING_ORDERS_SUCCESS:
            return {
                ...state,
                loadingCart: false,
                loadingOrders: false,
                orders: action.result
            };
        case PLACE_ORDER:
            return {
                ...state,
                placeOrder: true
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                order: action.result,
                addingToCart: false

            };

        case UPDATE_ORDER:
            return {
                ...state,
                updatingOrder: true
            };
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                order: action.result,
                updatingOrder: false

            };

        case ORDER_ERROR:
            return {
                ...state,
                error: action.result,
                loadingOrders: false
            };

    }
};

export default reducer;


export const placeOrder = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: PLACE_ORDER
        });
        return ApiClient().post('/orders', payload)
                          .then(response => {
                              dispatch({
                                  type: PLACE_ORDER_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};
export const fetchOrders = (id: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_ORDERS
        });
        return ApiClient({headers: {id}}).get('/orders')
                                         .then(response => {
                                             dispatch({
                                                 type: LOADING_ORDERS_SUCCESS,
                                                 result: response.data
                                             })
                                         })
                                         .catch(error => {
                                             throw(error);
                                         });
    }
};
export const fetchOrdersFilters = (filters: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_ORDERS
        });
        return ApiClient().post('/orders/filter', filters)
                          .then(response => {
                              dispatch({
                                  type: LOADING_ORDERS_SUCCESS,
                                  result: response.data.chefs.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const updateOrder = (payload: any, id: string): any => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ORDER
        });
        return ApiClient({headers: {id}}).put('/orders', payload)
                                         .then(response => {
                                             dispatch({
                                                 type: UPDATE_ORDER_SUCCESS,
                                                 result: response.data
                                             })
                                         })
                                         .catch(error => {
                                             throw(error);
                                         });
    }
};

export const DeleteOrder = (id: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: DELETE_ORDER
        });
        return ApiClient({headers: {cartId: id}}).delete('/orders')
                                                 .then(response => {
                                                     dispatch({
                                                         type: DELETE_ORDER_SUCCESS,
                                                         result: response.data
                                                     })
                                                 })
                                                 .catch(error => {
                                                     throw(error);
                                                 });
    }
};




