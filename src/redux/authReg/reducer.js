import {SIGN_UP_ERROR, SIGN_UP_SUCCESS, START_PROGRESS} from "./actionTypes";

const initialState = {
    success: null,
    error: null,
    progress: false
};

export default function registrationReducer(state = initialState, action) {

    switch (action.type) {

        case START_PROGRESS:
            return {
                ...state, progress: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state, success: action.data, error: null, progress: false
            }
        case SIGN_UP_ERROR:
            return {
                ...state, error: action.errorData, success: null, progress: false
            }
        default: return {...state}
    }
}