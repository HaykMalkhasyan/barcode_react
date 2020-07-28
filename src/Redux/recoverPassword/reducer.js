import {
    SEND_RESET_PASSWORD_MAIL_SUCCESS,
    SET_ERROR_DATA,
    SET_RECOVER_DATA,
    SET_USER_INFORMATION,
    SET_VALUES
} from "./ationTypes";

const initialState = {
    success: null,
    error: null,
    progressRecover: false,
    user_id: '',
    timestamp: '',
    signature: '',
    emailStatus: null,
    selected: null,
    emailRecover: '',
    failRecover: false,
    textRecover: null,
};

export default function resetPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFORMATION:
            return {
                ...state,
                signature: action.dataObject.signature,
                timestamp: action.dataObject.timestamp,
                user_id: action.dataObject.user_id,
            }
        case SET_ERROR_DATA:
            return {
                ...state, error: action.status, success: null
            }
        case SET_RECOVER_DATA:
            return {
                ...state,
                success: action.data,
                emailStatus: null,
                selected: null,
                emailRecover: '',
                failRecover: false,
                error: null,
            }
        case SET_VALUES:
            return {
                ...state, [action.name]: action.value
            }
        case SEND_RESET_PASSWORD_MAIL_SUCCESS:
            return {
                ...state, success: action.data
            }
        default: return {...state}
    }
}