import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS
} from "./actionTypes";

let col = "login, password"

export const login = (form, redirectPath) => {
    return {
        types: [LOGIN_REQUEST,LOGIN_REQUEST_FAIL,LOGIN_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.postt(`token/obtain/`, form, {col})
    }
};

export const logout = () => {
    return {
        types: [LOGOUT_REQUEST,LOGOUT_REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.postt(`token/obtain/`)

    }
};
