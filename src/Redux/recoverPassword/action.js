import {
    CHANGE_PROGRESS_STATUS, SEND_RESET_PASSWORD_MAIL_ERROR,
    SEND_RESET_PASSWORD_MAIL_SUCCESS,
    SET_ERROR_DATA,
    SET_RECOVER_DATA,
    SET_USER_INFORMATION,
    SET_VALUES
} from "./ationTypes";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function recover() {

    return (dispatch, getState) => {
        const emailStatus = getState().resetPassword.emailStatus;
        const emailRecover = getState().resetPassword.emailRecover;

        if (emailRecover.length === 0 || !emailStatus) {
            dispatch(setRecoverValues('failRecover', true))
        } else {
            dispatch(setRecoverValues('failRecover', false))
            dispatch(recoverRequest(emailRecover))
        }
    }
}

export function recoverRequest(emailRecover) {

    return async dispatch => {
        dispatch(setRecoverValues('progressRecover', true));
        try {
            const response = await Axios.post(`${API_URL}/accounts/send-reset-password-link/`,{login: emailRecover});
            dispatch(setRecoverData(response.data));
            dispatch(setRecoverValues('progressRecover', false));
        } catch (error) {
            dispatch(setErrorData(true));
            dispatch(setRecoverValues('progressRecover', false));
        }
    }
}

export function createNewPass(data) {

    return async dispatch => {
        dispatch(progressAction(true));
        dispatch(sendMailError(null));
        try {
            const response = await Axios.post(`${API_URL}/accounts/reset-password/`, data);
            dispatch(progressAction(false));
            dispatch(sendMailSuccess(response.data))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                dispatch(setRecoverValues('textRecover', 'incorrect_value'))
            } else {
                dispatch(setRecoverValues('textRecover', 'query_failed'))
            }
            dispatch(sendMailError(true));
            dispatch(progressAction(false))
        }
    }
}

//------------------------------
export function setRecoverValues(name, value) {

    return {
        type: SET_VALUES,
        name,
        value
    }
}

export function setRecoverData(data) {

    return {
        type: SET_RECOVER_DATA,
        data
    }
}

export function setErrorData(status) {

    return {
        type: SET_ERROR_DATA,
        status
    }
}

export function userInformation(dataObject) {

    return {
        type: SET_USER_INFORMATION,
        dataObject
    }
}

export function progressAction(status) {

    return {
        type: CHANGE_PROGRESS_STATUS,
        status
    }
}

export function sendMailSuccess(data) {

    return {
        type: SEND_RESET_PASSWORD_MAIL_SUCCESS,
        data
    }
}

export function sendMailError(status) {

    return {
        type: SEND_RESET_PASSWORD_MAIL_ERROR,
        status
    }
}