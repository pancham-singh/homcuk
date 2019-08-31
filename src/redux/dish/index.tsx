import {
    ADD_DISH,
    ADD_DISH_SUCCESS,
    LOADING_CUISINES,
    LOADING_CUISINES_SUCCESS,
    LOADING_DISH,
    LOADING_DISH_SUCCESS,
    LOADING_DISHES,
    LOADING_DISHES_SUCCESS,
    LOADING_TIME_SLOTS,
    LOADING_TIME_SLOTS_SUCCESS,
    LOADING_TYPE,
    LOADING_TYPES_SUCCESS,
    UPDATE_DISH,
    UPDATE_DISH_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingDish: false,
    loadingCuisines: false,
    loadingTypes: false,
    addingDish: false,
    updatingDish: false,
    cuisines: [],
    types: [],
    dish: null,
    dishes: [],
    error: null,
    loadingTimeSlots: false,
    loadingDishes: false,
    timeSlots: []
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case LOADING_DISH:
            return {
                ...state,
                loadingDish: true
            };
        case LOADING_DISH_SUCCESS:
            return {
                ...state,
                loadingDish: false,
                dish: action.result
            };
        case ADD_DISH:
            return {
                ...state,
                addingDish: true
            };
        case ADD_DISH_SUCCESS:
            return {
                ...state,
                addingDish: false
            };
        case UPDATE_DISH:
            return {
                ...state,
                updatingDish: true
            };
        case UPDATE_DISH_SUCCESS:
            return {
                ...state,
                updatingDish: false
            };
        case LOADING_CUISINES:
            return {
                ...state,
                loadingCuisines: true
            };
        case LOADING_CUISINES_SUCCESS:
            return {
                ...state,
                loadingCuisines: false,
                cuisines: action.result
            };
        case LOADING_TYPE:
            return {
                ...state,
                loadingTypes: true
            };
        case LOADING_TYPES_SUCCESS:
            return {
                ...state,
                loadingTypes: false,
                types: action.result
            };
        case LOADING_TIME_SLOTS:
            return {
                ...state,
                loadingTimeSlots: true
            };
        case LOADING_TIME_SLOTS_SUCCESS:
            return {
                ...state,
                loadingTimeSlots: false,
                timeSlots: action.result
            };

        case LOADING_DISHES:
            return {
                ...state,
                loadingDishes: true
            };
        case LOADING_DISHES_SUCCESS:
            return {
                ...state,
                loadingDishes: false,
                dishes: action.result
            };
    }
};

export default reducer;

export const addDish = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_DISH
        });
        return ApiClient().post('/dish', payload)
                          .then(response => {
                              dispatch({
                                  type: ADD_DISH_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const updateDish = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_DISH
        });
        return ApiClient().put('/dish', payload)
                          .then(response => {
                              dispatch({
                                  type: UPDATE_DISH_SUCCESS,
                                  result: response.data
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const getTypes = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_TYPE
        });
        return ApiClient().get('/dish/dish-types')
                          .then(response => {
                              dispatch({
                                  type: LOADING_TYPES_SUCCESS,
                                  result: response.data.dishTypes
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const getCuisines = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_CUISINES
        });
        return ApiClient().get('/dish/cuisines')
                          .then(response => {
                              dispatch({
                                  type: LOADING_CUISINES_SUCCESS,
                                  result: response.data.cuisines
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const getTimeSlots = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_TIME_SLOTS
        });
        return ApiClient().get('/time-slot')
                          .then(response => {
                              dispatch({
                                  type: LOADING_TIME_SLOTS_SUCCESS,
                                  result: response.data.timeSlot
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};

export const getDishes = (filters: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: LOADING_DISHES
        });
        return ApiClient().post('/dish-filters',filters)
                          .then(response => {
                              console.log(response.data);
                              dispatch({
                                  type: LOADING_DISHES_SUCCESS,
                                  result: response.data.dishes.results
                              })
                          })
                          .catch(error => {
                              throw(error);
                          });
    }
};


