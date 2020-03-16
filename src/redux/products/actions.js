import {
    GET_PRODUCTS_REQUEST,GET_PRODUCTS_FAIL,GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_REQUEST,GET_PRODUCT_FAIL,GET_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_FAIL,EDIT_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS,
    GET_BARCODE_TYPES_REQUEST,GET_BARCODE_TYPES_FAIL,GET_BARCODE_TYPES_SUCCESS,
    ADD_BARCODE,DELETE_BARCODE,
    SET_PRODUCT_MODAL,TOGGLE_PRODUCT_MODAL
} from "./actionTypes";

let url = `Products/Product`;
export const productActions = (type,data) => {
    console.log(type,data)
    switch(type) {
        case "get":
            return {
                types: [GET_PRODUCT_REQUEST,GET_PRODUCT_FAIL,GET_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.get(url, { param:{id:data.id} })
            }
        case "getAll":
            return {
                types: [GET_PRODUCTS_REQUEST,GET_PRODUCTS_FAIL,GET_PRODUCTS_SUCCESS],
                promise: (apiClient) => apiClient.get(url)
            }
        case "add":
            return {
                types: [ADD_PRODUCT_REQUEST,ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.post(url,data)
            }
        case "edit":
            return {
                types: [EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_FAIL,EDIT_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.put(url,data,{param:{id:data.id}})
            }
        case "delete":
            return {
                types: [DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, { param:{id:data.id} })
            }
        default:
            return ;
    }
};
export const barcodeActions = (type,code ) => {
    switch(type) {
        case "getTypes":
            return {
                types: [GET_BARCODE_TYPES_REQUEST,GET_BARCODE_TYPES_FAIL,GET_BARCODE_TYPES_SUCCESS],
                promise: (apiClient) => apiClient.get(`Products/BarcodeType`)
            }
        case "add":
            return {
                type: ADD_BARCODE,
                code
            }
        case "delete":
            return {
                type: DELETE_BARCODE,
                code
            }
        default:
            return ;
    }
}


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