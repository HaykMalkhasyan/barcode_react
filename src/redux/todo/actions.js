import {
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAIL, UPLOAD_IMAGES_SUCCESS,
} from "./actionTypes";

export const uploadImages = (page,event) => {

    return {
        types: [UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAIL, UPLOAD_IMAGES_SUCCESS],
        promise: (apiClient) => apiClient.upload("Todo/Upload",event.target,{param:{page}})
    }

};