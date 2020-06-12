import {
    GET_PERMISSIONS_REQUEST,
    GET_PERMISSIONS_FAIL,
    GET_PERMISSIONS_SUCCESS,
    GET_TOOLS_REQUEST,
    GET_TOOLS_FAIL,
    GET_TOOLS_SUCCESS
} from "./actionTypes";
let cols =  'id,name';
const API_URL = process.env.REACT_APP_API_URL;

export const getPermissions = () => {

    return {
        types: [GET_PERMISSIONS_REQUEST,GET_PERMISSIONS_FAIL,GET_PERMISSIONS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/permissions/`, { cols })
    }
}

export const getTools = () => {

    return {
        types: [GET_TOOLS_REQUEST, GET_TOOLS_FAIL, GET_TOOLS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/tools/`, { cols })
    }
}