import {
    GET_PRODUCTS_REQUEST,GET_PRODUCTS_FAIL,GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_REQUEST,GET_PRODUCT_FAIL,GET_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_FAIL,EDIT_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS,
    SET_PRODUCT_MODAL,TOGGLE_PRODUCT_MODAL
} from "./actionTypes";

let cols =  'id,name,firstname,lastname';
let url = `products/products`;
export const productActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_PRODUCT_REQUEST,GET_PRODUCT_FAIL,GET_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id:data.id} }))
            }
        case "getAll":
            return {
                types: [GET_PRODUCTS_REQUEST,GET_PRODUCTS_FAIL,GET_PRODUCTS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
            }
        case "add":
            return {
                types: [ADD_PRODUCT_REQUEST,ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.post(url, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_FAIL,EDIT_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.put(url,JSON.stringify({id:data.id,data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, JSON.stringify({id:data.id, data,cols }))
            }
        default:
            return ;
    }
};


export const setModalValues = (key,value) => {
    return {
        type: SET_PRODUCT_MODAL,
        key,
        value
    }
}

export const toggleModal = (modalType,id) => {
    let obj = {"id":id};
    return {
        type: TOGGLE_PRODUCT_MODAL,
        modalType,
        obj
    }
}