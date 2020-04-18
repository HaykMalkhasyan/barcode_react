import {
    GET_USERS_REQUEST,GET_USERS_FAIL,GET_USERS_SUCCESS,
    GET_USER_REQUEST,GET_USER_FAIL,GET_USER_SUCCESS,
    ADD_USER_REQUEST,ADD_USER_FAIL,ADD_USER_SUCCESS,
    EDIT_USER_REQUEST,EDIT_USER_FAIL,EDIT_USER_SUCCESS,
    DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS,
    SET_USER_MODAL,TOGGLE_USER_MODAL
} from "./actionTypes";
let cols =  'id,username,firstname,lastname';
let url = `User/Users`;

export const userActions = (type,data) => {

    switch(type) {
        case "get":
            return {
                types: [GET_USER_REQUEST,GET_USER_FAIL,GET_USER_SUCCESS],
                promise: (apiClient) => apiClient.get(url,{ param:{id:data.id} })
            }
        case "getAll":
            return {
                types: [GET_USERS_REQUEST,GET_USERS_FAIL,GET_USERS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, { cols })
            }
        case "add":
            return {
                types: [ADD_USER_REQUEST,ADD_USER_FAIL,ADD_USER_SUCCESS],
                promise: (apiClient) => apiClient.post(url, data,{cols})
            }
        case "edit":
            return {
                types: [EDIT_USER_REQUEST,EDIT_USER_FAIL,EDIT_USER_SUCCESS],
                promise: (apiClient) => apiClient.put(url,data,{param:{id:data.id},cols})
            }
        case "delete":
            return {
                types: [DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, { param:{id:data.id} ,cols})
            }
        default:
            return ;
    }
};


export const setModalValues = (key,value) => {
    return {
        type: SET_USER_MODAL,
        key,
        value
    }
}

export const toggleModal = (modalType,id) => {
    let obj = {"id":id};
    return {
        type: TOGGLE_USER_MODAL,
        modalType,
        obj
    }
}