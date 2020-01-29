import {
    GET_CATEGORIES_REQUEST,GET_CATEGORIES_FAIL,GET_CATEGORIES_SUCCESS,
    HANDLE
} from "./actionTypes";

let cols =  'id,name';
let url = `User/Position`;
export const getCategories = () => {
    return {
        types: [GET_CATEGORIES_REQUEST,GET_CATEGORIES_FAIL,GET_CATEGORIES_SUCCESS],
        promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
    }
}



export const handle = (name,parent) => {
    return {
        type: HANDLE,
        name,
        parent,
    }
}
