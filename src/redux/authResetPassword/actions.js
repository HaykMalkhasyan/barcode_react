import {
    CHANGE_PROGRESS_STATUS,
    SEND_RESET_PASSWORD_MAIL_ERROR,
    SEND_RESET_PASSWORD_MAIL_SUCCESS,
    SET_USER_INFORMATION
} from "./actionTypes";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function userInformation(dataObject) {

    return {
        type: SET_USER_INFORMATION,
        dataObject
    }
}

export function sendMail(data) {

    return async dispatch => {
        dispatch(progressAction(true))
        dispatch(sendMailError(false))

        try {
            const response = await Axios.post(`${API_URL}/accounts/send-reset-password-link/`, {login: data}, {
                "Content-Type": "application/json",
            })
            dispatch(sendMailSuccess(response.data))
            dispatch(progressAction(false))
        } catch (error) {
            dispatch(progressAction(false))
            dispatch(sendMailError(true))
        }
    }
}

export function progressAction(status) {

    return {
        type: CHANGE_PROGRESS_STATUS,
        status
    }
}

export function sendMailError(status) {

    return {
        type: SEND_RESET_PASSWORD_MAIL_ERROR,
        status
    }
}

export function sendMailSuccess(data) {

    return {
        type: SEND_RESET_PASSWORD_MAIL_SUCCESS,
        data
    }
}

export function createNewPass(data) {

    return async dispatch => {
        dispatch(progressAction(true))
        dispatch(sendMailError(null))
        try {
            const response = await Axios.post(`${API_URL}/accounts/reset-password/`, data)
            dispatch(progressAction(false))
            dispatch(sendMailSuccess(response.data))
        } catch (error) {
            dispatch(sendMailError(true))
            dispatch(progressAction(false))
        }
    }
}