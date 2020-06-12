import {
    CLOSE_NOTIFICATION,
    LOGIN_EMPTY,
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS, PASSWORD_EMPTY, RESET_PAGE
} from "./actionTypes";

let col = "login, password"
const API_URL = process.env.REACT_APP_API_URL;
export const login = (form, redirectPath) => {
    return {
        types: [LOGIN_REQUEST,LOGIN_REQUEST_FAIL,LOGIN_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.postt(`${API_URL}/token/obtain/`, form, {col})
    }
};

export const logout = () => {
    return {
        types: [LOGOUT_REQUEST,LOGOUT_REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.postt(`${API_URL}/token/obtain/`)

    }
};

export const loginIsEmpty = status => {

    return {
        type: LOGIN_EMPTY,
        status
    }
}

export const passwordIsEmpty = status => {

    return {
        type: PASSWORD_EMPTY,
        status
    }
}

export function closeNotification() {

    return {
        type: CLOSE_NOTIFICATION
    }
}

export function resetPage() {

    return {
        type: RESET_PAGE
    }
}
