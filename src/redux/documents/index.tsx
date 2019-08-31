import {
    ADD_DOCUMENT,
    ADD_DOCUMENT_SUCCESS,
    DOCUMENTS_ERROR,
    GET_DOCUMENTS,
    GET_DOCUMENTS_SUCCESS,
    UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS
} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    loadingDocument: false,
    addDocument: false,
    documents: [],
    documentError: null,
    updateDocument:false
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default :
            return state;
        case GET_DOCUMENTS:
            return {...state, loadingDocument: true};
        case GET_DOCUMENTS_SUCCESS:
            return {...state, loadingDocument: false, documents: action.result, documentError: false};
        case ADD_DOCUMENT:
            return {...state, loadingDocument: true};
        case ADD_DOCUMENT_SUCCESS:
            return {...state, loadingDocument: false, documentError: false};
        case UPDATE_DOCUMENT:
            return {...state, updateDocument: true};
        case UPDATE_DOCUMENT_SUCCESS:
            return {...state, updateDocument: false, documentError: false};
        case DOCUMENTS_ERROR:
            return {...state, documentError: true}
    }
};

export default reducer;
export const getDocuments = () => {
    return (dispatch: any) => {
        dispatch({
            type: GET_DOCUMENTS
        });
       return ApiClient().get('document')
            .then(response => {
                dispatch({
                    type: GET_DOCUMENTS_SUCCESS,
                    result: response.data.document
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const updateDocument = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_DOCUMENT
        });
        return ApiClient().put('document',payload)
            .then(response => {
                console.log(response);
                dispatch({
                    type: UPDATE_DOCUMENT_SUCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const addDocument = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ADD_DOCUMENT
        });
        return ApiClient().post('/document',payload)
            .then(response => {
                console.log(response);
                dispatch({
                    type: ADD_DOCUMENT_SUCCESS,
                    result: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
};
