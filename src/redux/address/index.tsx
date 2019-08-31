import {
    ADD_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADDRESS_ERROR,
    DELETE_ADDRESS,
    DELETE_ADDRESS_SUCCCESS,
    LOADING_ADDRESS,
    LOADING_ADDRESS_SUCCESS,
    UPDATE_ADDRESS,
    UPDATE_ADDRESS_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingAddress: false,
    addingAddress: false,
    updatingAddress: false,
    list: [],
    address: {},
    error: null,
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case LOADING_ADDRESS:
            return {
                ...state,
                loadingAddress: true
            };
        case LOADING_ADDRESS_SUCCESS:
            return {
                ...state,
                loadingAddress: false,
                list: action.result
            };
        case ADD_ADDRESS:
            return {
                ...state,
                addingAddress: true
            };
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.result,
                addingAddress: false

            };

        case UPDATE_ADDRESS:
            return {
                ...state,
                updatingAddress: true
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.result,
                updatingAddress: false

            };

        case ADDRESS_ERROR:
            return {
                ...state,
                error: action.result,
                loadingAddress: false
            };

    }
};

export default reducer;


export const addAddress = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_ADDRESS
        });
        return ApiClient().post('/address', payload)
                          .then(response => {
                              dispatch({
                                  type: ADD_ADDRESS_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const fetchAddress = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_ADDRESS
        });
        return ApiClient().get('/address')
                          .then(response => {
                              dispatch({
                                  type: LOADING_ADDRESS_SUCCESS,
                                  result: response.data.address
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const UpdateAddress = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ADDRESS
        });
        return ApiClient().put('/address', payload)
                          .then(response => {
                              dispatch({
                                  type: UPDATE_ADDRESS_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const deleteAddress = (id: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: DELETE_ADDRESS
        });
        return ApiClient({headers: {cartId: id}}).delete('/address')
                                                 .then(response => {
                                                     dispatch({
                                                         type: DELETE_ADDRESS_SUCCCESS,
                                                         result: response.data
                                                     })
                                                 })
                                                 .catch(error => {
                                                     throw(error);
                                                 });
    }
};




