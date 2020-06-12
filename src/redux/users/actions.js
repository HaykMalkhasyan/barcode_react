import {
    GET_USERS_REQUEST, GET_USERS_FAIL, GET_USERS_SUCCESS,
    GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS,
    ADD_USER_REQUEST, ADD_USER_FAIL, ADD_USER_SUCCESS,
    EDIT_USER_REQUEST, EDIT_USER_FAIL, EDIT_USER_SUCCESS,
    DELETE_USER_REQUEST, DELETE_USER_FAIL, DELETE_USER_SUCCESS,
    SET_USER_MODAL, TOGGLE_USER_MODAL, TOGGLE_EDITABLE_USER
} from "./actionTypes";

let cols = 'id, username, firstname, lastname, email, is_active, deleted ';
const API_URL = process.env.REACT_APP_API_URL;

export const userActions = (type, data) => {

    switch (type) {
        case "get":
            return {
                types: [GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/user/${data.id}`, {cols})
            }
        case "getAll":
            return {
                types: [GET_USERS_REQUEST, GET_USERS_FAIL, GET_USERS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/user/`, {cols})
            }
        case "add":
            data.deleted = 0;
            return {
                types: [ADD_USER_REQUEST, ADD_USER_FAIL, ADD_USER_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`${API_URL}/user/create/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_USER_REQUEST, EDIT_USER_FAIL, EDIT_USER_SUCCESS],
                promise: (apiClient) => apiClient.putt(`${API_URL}/user/${data.id}`, data, {cols})
            }
        case "delete":
            data.deleted = 1;
            return {
                types: [DELETE_USER_REQUEST, DELETE_USER_FAIL, DELETE_USER_SUCCESS],
                promise: (apiClient) => apiClient.putt(`${API_URL}/user/${data.id}`, data, {cols})
            }
        default:
            return;
    }
};


export const setModalValues = (key, value) => {
    return {
        type: SET_USER_MODAL,
        key,
        value
    }
}

export const toggleModal = (modalType, id) => {
    let obj = {"id": id};
    return {
        type: TOGGLE_USER_MODAL,
        modalType,
        obj
    }
}

export function userEditableToggle() {

    return {
        type: TOGGLE_EDITABLE_USER
    }
}