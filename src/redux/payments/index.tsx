import {
    ADD_BANK_DETAILS,
    ADD_BANK_DETAILS_SUCCCESS,
    ADD_DOCUMENT_SUCCESS,
    BANK_DETAILS_ERROR,
    GET_BANK_DETAILS,
    GET_BANK_DETAILS_SUCCESS,
    UPDATE_BANK_DETAILS,
    UPDATE_BANK_DETAILS_SUCCESS,
    UPDATE_DOCUMENT_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingBankDetails: false,
    addBankDetails: false,
    bankDetails: [],
    bankDetailsError: null,
    updateBankDetails: false
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default :
            return state;
        case GET_BANK_DETAILS:
            return {...state, loadingBankDetails: true};
        case GET_BANK_DETAILS_SUCCESS:
            return {...state, loadingBankDetails: false, bankDetails: action.result, bankDetailsError: false};
        case ADD_BANK_DETAILS:
            return {...state, loadingBankDetails: true};
        case ADD_DOCUMENT_SUCCESS:
            return {...state, loadingBankDetails: false, bankDetailsError: false};
        case UPDATE_BANK_DETAILS:
            return {...state, updateBankDetails: true};
        case UPDATE_DOCUMENT_SUCCESS:
            return {...state, updateBankDetails: false, bankDetailsError: false};
        case BANK_DETAILS_ERROR:
            return {...state, bankDetailsError: true}
    }
};

export default reducer;
export const getBankDetails = () => {
    return (dispatch: any) => {
        dispatch({
            type: GET_BANK_DETAILS
        });
        return ApiClient().get(`/bank-account`)
            .then(response => {
                dispatch({
                    type: GET_BANK_DETAILS_SUCCESS,
                    result: response.data.bankAccounts
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const updateBankDetails = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_BANK_DETAILS
        });
        return ApiClient().put(`/bank-account`, payload)
            .then(response => {
                console.log(response);
                dispatch({
                    type: UPDATE_BANK_DETAILS_SUCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const addBankDetails = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_BANK_DETAILS
        });
        return ApiClient().post(`/bank-account`, payload)
            .then(response => {
                console.log(response);
                dispatch({
                    type: ADD_BANK_DETAILS_SUCCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};
