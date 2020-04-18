import {
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAIL, UPLOAD_IMAGES_SUCCESS,
} from "./actionTypes";


const INIT_STATE = {
    images:[],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPLOAD_IMAGES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case UPLOAD_IMAGES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case UPLOAD_IMAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                images:JSON.parse(action.result.data).images,
            };
        default:
            return {...state};
    }
};


