import {
    GET_ITEMS_REQUEST,GET_ITEMS_FAIL,GET_ITEMS_SUCCESS,
    GET_ITEM_REQUEST,GET_ITEM_FAIL,GET_ITEM_SUCCESS,
    ADD_ITEM_REQUEST,ADD_ITEM_FAIL,ADD_ITEM_SUCCESS,
    EDIT_ITEM_REQUEST,EDIT_ITEM_FAIL,EDIT_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL,DELETE_ITEM_SUCCESS,
    SET_MODAL_VALUES
} from "./actionTypes";

let cols =  'id,ITEMname,firstname,lastname';
let url = `Items/Items`;

export const getItems = () => {
    return {
        types: [GET_ITEMS_REQUEST,GET_ITEMS_FAIL,GET_ITEMS_SUCCESS],
        promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
    }
};

export const getItem = ( id ) => {
    return {
        types: [GET_ITEM_REQUEST,GET_ITEM_FAIL,GET_ITEM_SUCCESS],
        promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id} }))
    }
};

export const addItem = (data) => {
    let types = [ADD_ITEM_REQUEST,ADD_ITEM_FAIL,ADD_ITEM_SUCCESS];
    let promise = (apiClient) => apiClient.post(url,JSON.stringify({data,cols}))
    if(data.id){
        types = [EDIT_ITEM_REQUEST,EDIT_ITEM_FAIL,EDIT_ITEM_SUCCESS];
        promise = (apiClient) => apiClient.put(url,JSON.stringify({data,cols,id:data.id}));
    }
    return {
        types: types,
        promise: promise
    }
};

export const deleteItem = ( id ) => {
    return {
        types: [DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL,DELETE_ITEM_SUCCESS],
        promise: (apiClient) => apiClient.delete(url, JSON.stringify({ id,cols }))
    }
};


export const itemModal = (type,modal) => {
    return {
        type: type.toUpperCase()+'_MODAL',
        modal
    }
}

export const setModalValues = (key,value) => {
    return {
        type: SET_MODAL_VALUES,
        key,
        value
    }
}