import {
    ADD_MENU_REQUEST,
    ADD_MENU_FAIL,
    ADD_MENU_SUCCESS,
    EDIT_MENU_REQUEST,
    EDIT_MENU_FAIL,
    EDIT_MENU_SUCCESS,
    DELETE_MENU_REQUEST,
    DELETE_MENU_FAIL,
    DELETE_MENU_SUCCESS,
    TOGGLE_MENU_MODAL,
    SET_MENU_MODAL,
    GET_MENU_REQUEST,
    GET_MENU_FAIL,
    GET_MENU_SUCCESS,
    GET_MENU_ITEM_REQUEST,
    GET_MENU_ITEM_FAIL,
    GET_MENU_ITEM_SUCCESS
} from "./actionTypes";
let col = 'id, name';

export const getPages = () => {
    return {
        types: [GET_MENU_REQUEST,GET_MENU_FAIL,GET_MENU_SUCCESS],
        promise: (apiClient) => apiClient.gett(`pages/`,{ col })
    }
};

export const menuActions = (type, data) => {

    switch (type) {
        case 'get':
            return {
                types: [GET_MENU_ITEM_REQUEST, GET_MENU_ITEM_FAIL, GET_MENU_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.gett(`pages/${data.id}`,{ col })
            }
        case 'add':
            return {
                types: [ADD_MENU_REQUEST, ADD_MENU_FAIL, ADD_MENU_SUCCESS],
                promise: apiClient => apiClient.postt('pages/', data, {col})
            };
        case 'edit':
            return {
                types: [EDIT_MENU_REQUEST, EDIT_MENU_FAIL, EDIT_MENU_SUCCESS],
                promise: apiClient => apiClient.putt(`pages/${data.id}`, JSON.stringify(data), {col})
            }
        case 'delete':
            return {
                types: [DELETE_MENU_REQUEST, DELETE_MENU_FAIL, DELETE_MENU_SUCCESS],
                promise: apiClient => apiClient.deletee(`pages/${JSON.parse(data.id)}`, data, {col})
            }
        default:
            return;
    }
};

export const toggleModal = (modalType, id) => {
    let obj = {"id": id}
    return {
        type: TOGGLE_MENU_MODAL,
        modalType,
        obj
    }

};

export const setModalValue = (key, value) => {

    return {
        type: SET_MENU_MODAL,
        key,
        value
    }
};