import {
    GET_USERS_REQUEST,GET_USERS_FAIL,GET_USERS_SUCCESS,
    GET_USER_REQUEST,GET_USER_FAIL,GET_USER_SUCCESS,
    ADD_USER_REQUEST,ADD_USER_FAIL,ADD_USER_SUCCESS,
    EDIT_USER_REQUEST,EDIT_USER_FAIL,EDIT_USER_SUCCESS,
    DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS,
    SET_MODAL_VALUES
} from "./actionTypes";

let cols =  'id,username,firstname,lastname';

export const getUsers = () => {
    return {
        types: [GET_USERS_REQUEST,GET_USERS_FAIL,GET_USERS_SUCCESS],
        promise: (apiClient) => apiClient.get(`User/Users`, JSON.stringify({ cols }))
    }
};

export const getUser = ( id ) => {
    return {
        types: [GET_USER_REQUEST,GET_USER_FAIL,GET_USER_SUCCESS],
        promise: (apiClient) => apiClient.get(`User/Users`, JSON.stringify({ param:{id} }))
    }
};

export const addUser = (data) => {
    let types = [ADD_USER_REQUEST,ADD_USER_FAIL,ADD_USER_SUCCESS];
    let promise = (apiClient) => apiClient.post(`User/Users`,JSON.stringify({data,cols}))
    if(data.id){
        types = [EDIT_USER_REQUEST,EDIT_USER_FAIL,EDIT_USER_SUCCESS];
        promise = (apiClient) => apiClient.put(`User/Users`,JSON.stringify({data,cols,id:data.id}));
    }
    return {
        types: types,
        promise: promise
    }
};

export const deleteUser = ( id ) => {
    return {
        types: [DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS],
        promise: (apiClient) => apiClient.delete(`User/Users`, JSON.stringify({ id,cols }))
    }
};


export const userModal = (type,modal) => {
    return {
        type: type.toUpperCase()+'_MODAL',
        modal
    }
}

export const setModalValues = (value) => {
    return {
        type: SET_MODAL_VALUES,
        value
    }
}