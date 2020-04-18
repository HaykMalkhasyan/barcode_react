import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS
} from "./actionTypes";

export const login = (form, redirectPath) => {
    return {
        types: [LOGIN_REQUEST,LOGIN_REQUEST_FAIL,LOGIN_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.postt(`token/obtain/`, form /*{ param:{form:form} }*/)
    }
};

export const logout = () => {
    return {
        types: [LOGOUT_REQUEST,LOGOUT_REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS],
        // promise: (apiClient) => apiClient.delete(`Auth/Login`)
        promise: (apiClient) => apiClient.postt(`token/obtain/`)

    }
};
