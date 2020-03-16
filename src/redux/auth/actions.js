import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS
} from "./actionTypes";

export const login = (form, redirectPath) => {
    console.log(form)
    return {
        types: [LOGIN_REQUEST,LOGIN_REQUEST_FAIL,LOGIN_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.get(`Auth/Login`, { param:{form:form} })
    }
};

export const logout = () => {
    return {
        types: [LOGOUT_REQUEST,LOGOUT_REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.delete(`Auth/Login`)

    }
};


