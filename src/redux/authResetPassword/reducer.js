import {
    CHANGE_PROGRESS_STATUS,
    SEND_RESET_PASSWORD_MAIL_ERROR,
    SEND_RESET_PASSWORD_MAIL_SUCCESS,
    SET_USER_INFORMATION
} from "./actionTypes";

const initialState = {
    success: null,
    error: null,
    progress: false,
    user_id: '',
    timestamp: '',
    signature: ''
}

export default function resetPasswordReducer(state = initialState, action) {

    switch (action.type) {

        case SET_USER_INFORMATION:
            return {
                ...state,
                signature: action.dataObject.signature,
                timestamp: action.dataObject.timestamp,
                user_id: action.dataObject.user_id,
            }
        case CHANGE_PROGRESS_STATUS:
            return {
                ...state,
                progress: action.status
            }
        case SEND_RESET_PASSWORD_MAIL_ERROR:
            return {
                ...state, error: action.status, success: null
            }
        case SEND_RESET_PASSWORD_MAIL_SUCCESS:
            return {
                ...state, success: action.data
            }
        default: return state;
    }
}