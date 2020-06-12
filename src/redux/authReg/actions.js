import Axios from 'axios'
import {SIGN_UP_ERROR, SIGN_UP_SUCCESS, START_PROGRESS, VERIFY_ERROR, VERIFY_SUCCESS} from "./actionTypes";

const API_URL = process.env.REACT_APP_API_URL;

export function fetchRegistration(data) {

    return async dispatch => {
        dispatch(startProgress())
        try {
            const response = await Axios.post(`${API_URL}/accounts/register/`, data)
            dispatch(fetchRegistrationSuccess(response.data))
        } catch (error) {
            dispatch(fetchRegistrationError(error.response.data))
        }
    }
}

export function startProgress() {

    return {
        type: START_PROGRESS
    }
}

export function fetchRegistrationSuccess(data) {

    return {
        type: SIGN_UP_SUCCESS,
        data
    }
}

export function fetchRegistrationError(errorData) {

    return {
        type: SIGN_UP_ERROR,
        errorData
    }
}

export function fetchVerifyUser(data) {

    return async dispatch => {

        try {
            const response = await Axios.post(`${API_URL}/accounts/verify-registration/`,data);
            dispatch(fetchVerifyUserSuccess(response.data.detail))
        } catch (error) {
            dispatch(fetchVerifyUserError(error))
        }
    }
}

export function fetchVerifyUserSuccess(data) {

    return {
        type: VERIFY_SUCCESS,
        data
    }
}

export function fetchVerifyUserError(error) {

    return {
        type: VERIFY_ERROR,
        error
    }
}