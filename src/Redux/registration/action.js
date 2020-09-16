import {
    REGISTRATION_REQUEST_ERROR,
    REGISTRATION_REQUEST_SUCCESS,
    SET_REGISTRATION_VALUES, VERIFY_ERROR,
    VERIFY_SUCCESS
} from "./actionTypes";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function registrationHandler() {

    return (dispatch, getState) => {
        dispatch(setRegValues('regProgress', true));
        dispatch(setRegValues('regText', null));

        const usagerules = getState().registration.usagerules;
        const regEmailStatus = getState().registration.RegEmailStatus;
        const registrationData = {
            first_name: getState().registration.regName,
            last_name: getState().registration.regLastName,
            email: getState().registration.regEmail,
            password: getState().registration.regPassword,
            password_confirm: getState().registration.regPassword_confirm,
        };
        const isEmpty = {};

        for (let item in registrationData) {

            switch (item) {
                case 'first_name': {
                    if (registrationData[item].length === 0) {
                        isEmpty['regName'] = true
                    }
                    break;
                }
                case 'last_name': {
                    if (registrationData[item].length === 0) {
                        isEmpty['regLastName'] = true
                    }
                    break;
                }
                case 'email': {
                    if (!regEmailStatus || registrationData[item].length === 0) {
                        isEmpty['regEmail'] = true
                    }
                    break;
                }
                case 'password': {
                    if (registrationData[item].length < 6 || registrationData[item].length > 32) {
                        isEmpty['regPassword'] = true
                    }
                    break;
                }
                case 'password_confirm': {
                    if (registrationData[item].length < 6 || registrationData[item].length > 32) {
                        isEmpty['regPassword_confirm'] = true
                    }
                    break;
                }
                default: break;
            }
        }
        if (registrationData.password !== registrationData.password_confirm) {
            isEmpty['regPassword'] = true;
            isEmpty['regPassword_confirm'] = true;
        }
        if (usagerules === false) {
            isEmpty['usagerules'] = true
        }
        if (Object.keys(isEmpty).length === 0) {
            registrationData['username'] = registrationData.email;
            dispatch(registrationRequest(registrationData))
        } else {
            dispatch(setRegValues('isEmpty', isEmpty));
            dispatch(setRegValues('regText', 'incorrect_or_missing_value'));
            dispatch(setRegValues('regProgress', false))
        }
    }
}

export function registrationRequest(data) {

    return async dispatch => {
        try {
            const response = await Axios.post(`${API_URL}/accounts/register/`, data);
            dispatch(registrationRequestSuccess(response.data));
            dispatch(setRegValues('regProgress', false))
        } catch (error) {
            dispatch(registrationRequestError(error.response.data));
            dispatch(setRegValues('regProgress', false))
        }
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

// -----------------------------------------------------

export function setRegValues(name, value) {

    return {
        type: SET_REGISTRATION_VALUES,
        name,
        value
    }
}

export function registrationRequestError(errorData) {

    return {
        type: REGISTRATION_REQUEST_ERROR,
        errorData
    }
}

export function registrationRequestSuccess(data) {

    return {
        type: REGISTRATION_REQUEST_SUCCESS,
        data
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