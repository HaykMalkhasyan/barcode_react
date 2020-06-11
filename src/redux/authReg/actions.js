import Axios from 'axios'
import {SIGN_UP_ERROR, SIGN_UP_SUCCESS, START_PROGRESS} from "./actionTypes";

export function fetchRegistration(data) {

    return async dispatch => {
        dispatch(startProgress())
        try {
            const response = await Axios.post('accounts/register/', data)
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