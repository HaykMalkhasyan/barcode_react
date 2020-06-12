import {SIGN_UP_ERROR, SIGN_UP_SUCCESS, START_PROGRESS, VERIFY_ERROR, VERIFY_SUCCESS} from "./actionTypes";

const initialState = {
    success: null,
    error: null,
    progress: false,
    verifySuccess: null,
    verifyError: null
};

export default function registrationReducer(state = initialState, action) {

    switch (action.type) {

        case START_PROGRESS:
            return {
                ...state, progress: true, error: null
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state, success: action.data, error: null, progress: false
            }
        case SIGN_UP_ERROR:
            return {
                ...state, error: action.errorData, success: null, progress: false
            }
        case VERIFY_SUCCESS:
            return {
                ...state, verifySuccess: action.data
            }
        case VERIFY_ERROR:
            return {
                ...state, verifyError: action.error
            }
        default: return {...state}
    }
}