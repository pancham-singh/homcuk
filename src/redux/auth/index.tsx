import {
    ADDRESS,
    ADDRESS_SUCCESS,
    ADDRESS_UPDATE,
    ADDRESS_UPDATE_SUCCESS,
    AUTH_ERROR,
    GET_USER,
    GET_USER_ADDRESS,
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    SEND_OTP,
    SEND_OTP_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    user: null,
    loading: false,
    error: false,
    verifyOtp: false,
    getUser: false,
    login: false,
    address: false,
    userAddress: null,
    authError: null,
    sendingOtp: false
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
        case REGISTER_LOADING:
            return {...state, loading: true};
        case REGISTER_SUCCESS:
            return {...state, loading: false, user: action.result, error: false};
        case VERIFY_OTP:
            return {...state, verify: true};
        case VERIFY_OTP_SUCCESS:
            return {...state, verify: false};
        case GET_USER:
            return {...state, getUser: true};
        case GET_USER_SUCCESS:
            return {...state, getUser: false, user: action.result};
        case LOGIN:
            return {...state, login: false, user: action.result, error: false};
        case LOGIN_SUCCESS:
            return {...state, login: true, user: action.result, error: false};
        case UPDATE_USER:
            return {...state, loading: true};
        case UPDATE_USER_SUCCESS:
            return {...state, loading: false, user: action.result, error: false};
        case ADDRESS:
            return {...state, address: true};
        case ADDRESS_SUCCESS:
            return {...state, address: false, userAddress: action.result, error: false};
        case ADDRESS_UPDATE:
            return {...state, address: true};
        case ADDRESS_UPDATE_SUCCESS:
            return {...state, address: false, userAddress: action.result, error: false};
        case GET_USER_ADDRESS:
            return {...state, address: true};
        case GET_USER_ADDRESS_SUCCESS:
            return {...state, address: false, userAddress: action.result, error: false};
        case LOGOUT:
            return {...state, user: null, login: false};
        case AUTH_ERROR:
            return {...state, user: null, login: false, authError: action.result, error: true};
        case SEND_OTP:
            return {...state, sendingOtp: true};
        case SEND_OTP_SUCCESS:
            return {...state, sendingOtp: false};
    }
};
export default reducer;

export const registerUser = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: REGISTER_LOADING
        });

        ApiClient().post('user',payload)
            .then(response => {
                const localUser = {...payload, ...response.data};
                dispatch({
                    type: REGISTER_SUCCESS,
                    result: localUser
                });
                localStorage.setItem('hc-user', JSON.stringify(localUser))
            })
            .catch(error => {
                const {data: {error: authError}} = error.response;

                dispatch({
                    type: AUTH_ERROR,
                    result: authError
                });
                throw(error);
            });
    }
};

export const updateUser = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_USER
        });
        return ApiClient().put('user',payload)
            .then(response => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    result: response.data.user
                })
            })
            .catch(error => {
                dispatch({
                    type: AUTH_ERROR,
                    result: error
                });
                throw(error);
            });
    }
};

export const addAddress = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: ADDRESS
        });
        return ApiClient().post("/address",payload)
            .then(response => {
                dispatch({
                    type: ADDRESS_SUCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const updateAddress = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: ADDRESS_UPDATE
        });
        return ApiClient().put("/address",payload)
            .then(response => {
                dispatch({
                    type: ADDRESS_UPDATE_SUCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};
export const getAddress = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: GET_USER_ADDRESS
        });
        return ApiClient().get("/address")
            .then((response: any) => {
                localStorage.setItem('hc-user-address', JSON.stringify(response.data.adress));
                dispatch({
                    type: GET_USER_ADDRESS_SUCCESS,
                    result: response.data.address
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const verifyOtp = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: VERIFY_OTP
        });
        return ApiClient().post(`/otp-verify`, payload)
            .then(response => {
                dispatch({
                    type: VERIFY_OTP_SUCCESS,
                    result: response.data.user
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const resendOtp = (payload: any): any => {
    return (dispatch: any) => {
        dispatch({
            type: SEND_OTP
        });
        return ApiClient().get(`/otp?mobile=${payload.mobile}`)
            .then(response => {
                dispatch({type: SEND_OTP_SUCCESS});
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const login = (payload: any): any => {
    return (dispatch: any,getState: any) => {
        dispatch({
            type: GET_USER
        });
        return ApiClient().post('/auth',payload)
            .then(response => {
                const {data: {user, found, password}} = response;

                if(!!found && !user){
                    dispatch({
                        type: AUTH_ERROR,
                        result: 'User not Verified!'
                    });
                    dispatch({
                        type: GET_USER_SUCCESS,
                        result: {mobile: payload.username}
                    });
                    return
                }
                if (found && password) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        result: user
                    })
                } else {
                    dispatch({
                        type: AUTH_ERROR,
                        result: 'Invalid Username or Password!'
                    })
                }
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const getUser = (): any => {
    return (dispatch: any) => {
        dispatch({
            type: GET_USER
        });
        return ApiClient().get('/user').then(response => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    result: response.data.user
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};
export const setUser = (): any => {
    return (dispatch: any) => {
        const localUser =localStorage.getItem('hc-user');
        const user = JSON.parse(JSON.stringify(localUser));
        dispatch({
            type: GET_USER_SUCCESS,
            result: user
        })
    }
};

export const logout = (): any => {
    return (dispatch: any) => {
        localStorage.removeItem('hc-user');
        localStorage.removeItem('hc-authToken');
        dispatch({type: LOGOUT})
    }
};
