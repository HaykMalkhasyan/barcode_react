import {
    GET_ITEMS_REQUEST,GET_ITEMS_FAIL,GET_ITEMS_SUCCESS,
    GET_ITEM_REQUEST,GET_ITEM_FAIL,GET_ITEM_SUCCESS,
    ADD_ITEM_REQUEST,ADD_ITEM_FAIL,ADD_ITEM_SUCCESS,
    EDIT_ITEM_REQUEST,EDIT_ITEM_FAIL,EDIT_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL,DELETE_ITEM_SUCCESS,
    SET_MODAL_VALUES,TOGGLE_MODAL
} from "./actionTypes";

let cols =  'id,ITEMname,firstname,lastname';
let url = `Items/Items`;
export const itemActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_ITEM_REQUEST,GET_ITEM_FAIL,GET_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id:data.id} }))
            }
        case "getAll":
            return {
                types: [GET_ITEMS_REQUEST,GET_ITEMS_FAIL,GET_ITEMS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
            }
        case "add":
            return {
                types: [ADD_ITEM_REQUEST,ADD_ITEM_FAIL,ADD_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.post(url, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_ITEM_REQUEST,EDIT_ITEM_FAIL,EDIT_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.put(url,JSON.stringify({id:data.id,data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL,DELETE_ITEM_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, JSON.stringify({id:data.id, data,cols }))
            }
        default:
            return ;
    }
};


export const setModalValues = (key,value) => {
    return {
        type: SET_MODAL_VALUES,
        key,
        value
    }
}

export const toggleModal = (modalType,id) => {
    let obj = {"id":id};
    return {
        type: TOGGLE_MODAL,
        modalType,
        obj
    }
}