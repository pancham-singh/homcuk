import {UPLOAD_PROGRESS, UPLOADS, UPLOADS_ERROR, UPLOADS_SUCCESS} from "../stateConstants";
import ApiClient from "../../Utill/ApiClient";

const initialState = {
    uploading: false,
    response: null,
    error: null,
    uploadProgress: 0
};

const reducer = (state = initialState, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
        case UPLOADS:
            return {...state, uploading: true, error: false};
        case UPLOADS_SUCCESS:
            return {...state, uploading: false, response: action.result};
        case UPLOADS_ERROR:
            return {...state, uploading: false, error: action.result};
        case UPLOAD_PROGRESS:
            return {...state, uploadProgress: action.result}
    }
};
export default reducer;
export const uploadFile = (files: any) => {
    return ((dispatch: any) => {
        dispatch({type: UPLOADS});
        const formData = new FormData();
        formData.append("files", files[0]);

        let config = {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: ((progressEvent: any) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                dispatch({type: UPLOAD_PROGRESS, result: percentCompleted});
            })
        };
        return ApiClient(config).post('/file-upload', formData).then(response => {
            const upload = response.data.uploads[0];
            dispatch({type: UPLOADS_SUCCESS, result: upload});
        }).catch(error => {
            dispatch({type: UPLOADS_ERROR, result: error});
        })
    })
};
