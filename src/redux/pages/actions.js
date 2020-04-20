import {
    GET_PAGES_REQUEST,
    GET_PAGES_FAIL,
    GET_PAGES_SUCCESS,
} from "./actionTypes";
let cols =  'id,name,icon';

export const getPages = () => {
    return {
        types: [GET_PAGES_REQUEST,GET_PAGES_FAIL,GET_PAGES_SUCCESS],
        promise: (apiClient) => apiClient.gett(`pages/`,{ cols })
    }
}