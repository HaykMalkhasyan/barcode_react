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
        promise: (apiClient) => apiClient.get(`Auth/Login`, JSON.stringify(form))
    }
};

export const logout = () => {
    // console.log("SDgsdg")
    return {
        types: [LOGOUT_REQUEST,LOGOUT_REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS],
        promise: (apiClient) => apiClient.delete(`Auth/Login`)

    }
};


