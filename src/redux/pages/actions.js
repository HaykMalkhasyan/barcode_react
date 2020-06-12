import {
    GET_PAGES_REQUEST,
    GET_PAGES_FAIL,
    GET_PAGES_SUCCESS,
    ADD_MENU_FAIL,
    ADD_MENU_REQUEST,
    ADD_MENU_SUCCESS,
    DELETE_MENU_FAIL,
    DELETE_MENU_REQUEST,
    DELETE_MENU_SUCCESS,
    EDIT_MENU_FAIL,
    EDIT_MENU_REQUEST,
    EDIT_MENU_SUCCESS,
    GET_MENU_ITEM_FAIL,
    GET_MENU_ITEM_REQUEST,
    GET_MENU_ITEM_SUCCESS,
    SET_MENU_MODAL,
    TOGGLE_MENU_MODAL
} from "./actionTypes";
let cols =  'id,name,icon';
const API_URL = process.env.REACT_APP_API_URL;

export const getPages = () => {
    return {
        types: [GET_PAGES_REQUEST,GET_PAGES_FAIL,GET_PAGES_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/pages/`,{ cols })
    }
}
let col = 'id, name';

export const menuActions = (type, data) => {

    switch (type) {
        case 'get':
            return {
                types: [GET_MENU_ITEM_REQUEST, GET_MENU_ITEM_FAIL, GET_MENU_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/pages/${data.id}`, {col})
            }
        case 'add':
            let menuItem = {};
            menuItem.name = data.name;
            menuItem.icon = data.icon;
            return {
                types: [ADD_MENU_REQUEST, ADD_MENU_FAIL, ADD_MENU_SUCCESS],
                promise: apiClient => apiClient.posttAdd(`${API_URL}/pages/`, menuItem, {col})
            };
        case 'edit':
            return {
                types: [EDIT_MENU_REQUEST, EDIT_MENU_FAIL, EDIT_MENU_SUCCESS],
                promise: apiClient => apiClient.putt(`${API_URL}/pages/${data.id}`, JSON.stringify(data), {col})
            }
        case 'delete':
            return {
                types: [DELETE_MENU_REQUEST, DELETE_MENU_FAIL, DELETE_MENU_SUCCESS],
                promise: apiClient => apiClient.deletee(`${API_URL}/pages/${JSON.parse(data.id)}`, data, {col})
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