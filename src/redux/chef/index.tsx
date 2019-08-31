import {
    LOADING_CHEF,
    LOADING_CHEFS, LOADING_CHEFS_SUCCESS, LOADING_CHEF_SUCCESS

} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingChef: false,
    loadingChefs: false,
    loadingChefDishes: false,
    addingToCart: false,
    updatingCart: false,
    chefs: [],
    dishes: [],
    chef: null,
    cart: [],
    error: null,
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case LOADING_CHEFS:
            return {
                ...state,
                loadingChefs: true
            };
        case LOADING_CHEFS_SUCCESS:
            return {
                ...state,
                loadingChefs: false,
                chefs: action.result
            };
        case LOADING_CHEF:
            return {
                ...state,
                loadingChef: true
            };
        case LOADING_CHEF_SUCCESS:
            return {
                ...state,
                chef: action.result,
                loadingChef: false

            };

    }
};

export default reducer;



export const getChefs = (filters: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CHEFS
        });
        return ApiClient().post('/chefs',filters)
                          .then(response => {
                              dispatch({
                                  type: LOADING_CHEFS_SUCCESS,
                                  result: response.data.chefs.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};
export const getChefsFilter = (filters: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CHEFS
        });
        return ApiClient().post('/chefs/filter',filters)
                          .then(response => {
                              dispatch({
                                  type: LOADING_CHEFS_SUCCESS,
                                  result: response.data.chefs.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const getRendomChefs = (filters: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CHEFS
        });
        return ApiClient().post('/chefs/filter',filters)
                          .then(response => {
                              dispatch({
                                  type: LOADING_CHEFS_SUCCESS,
                                  result: response.data.chefs.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};
export const getChef = (id: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CHEF
        });
        return ApiClient({headers:{'id':id}}).get('/chefs')
                          .then(response => {
                              dispatch({
                                  type: LOADING_CHEF_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};




