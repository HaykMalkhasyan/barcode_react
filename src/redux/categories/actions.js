import {
    GET_CATEGORIES_REQUEST,GET_CATEGORIES_FAIL,GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_REQUEST,GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS,
    ADD_CATEGORY_REQUEST,ADD_CATEGORY_FAIL,ADD_CATEGORY_SUCCESS,
    EDIT_CATEGORY_REQUEST,EDIT_CATEGORY_FAIL,EDIT_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST,DELETE_CATEGORY_FAIL,DELETE_CATEGORY_SUCCESS,
    SET_CATEGORY_MODAL,TOGGLE_CATEGORY_MODAL
} from "./actionTypes";


let cols =  'id,name';
let url = `Items/Category`;

export const categoryActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_CATEGORY_REQUEST,GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id:data.id} }))
            }
        case "getAll":
            return {
                types: [GET_CATEGORIES_REQUEST,GET_CATEGORIES_FAIL,GET_CATEGORIES_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
            }
        case "add":
            return {
                types: [ADD_CATEGORY_REQUEST, ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS],
                promise: (apiClient) => apiClient.post(url, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_CATEGORY_REQUEST,EDIT_CATEGORY_FAIL,EDIT_CATEGORY_SUCCESS],
                promise: (apiClient) => apiClient.put(url,JSON.stringify({id:data.id,data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_CATEGORY_REQUEST,DELETE_CATEGORY_FAIL,DELETE_CATEGORY_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, JSON.stringify({id:data.id, data,cols }))
            }
        default:
            return ;
    }
};


export const setModalValues1 = (key,value) => {
    return {
        type: SET_CATEGORY_MODAL,
        key,
        value
    }
}

export const toggleModal = (modalType,id) => {
    let obj = (modalType==="add")?{"parent_id":id}:{"id":id};
    return {
        type: TOGGLE_CATEGORY_MODAL,
        modalType,
        obj
    }
}

