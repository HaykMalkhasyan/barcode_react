import {
    GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS,
    GET_POSITION_REQUEST,GET_POSITION_FAIL,GET_POSITION_SUCCESS,
    ADD_POSITION_REQUEST,ADD_POSITION_FAIL,ADD_POSITION_SUCCESS,
    EDIT_POSITION_REQUEST,EDIT_POSITION_FAIL,EDIT_POSITION_SUCCESS,
    DELETE_POSITION_REQUEST,DELETE_POSITION_FAIL,DELETE_POSITION_SUCCESS,
    SET_MODAL_VALUES,
    HANDLE
} from "./actionTypes";

let cols =  'id,name';
let url = `User/Position`;
export const getPositions = () => {
    return {
        types: [GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS],
        promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
    }
}


export const getPosition = ( id ) => {
    return {
        types: [GET_POSITION_REQUEST,GET_POSITION_FAIL,GET_POSITION_SUCCESS],
        promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id} }))
    }
};

export const addPosition = (data) => {
    console.log(data)
    let types = [ADD_POSITION_REQUEST,ADD_POSITION_FAIL,ADD_POSITION_SUCCESS];
    let promise = (apiClient) => apiClient.post(url,JSON.stringify({data,cols}))
    if(data.id){
        types = [EDIT_POSITION_REQUEST,EDIT_POSITION_FAIL,EDIT_POSITION_SUCCESS];
        promise = (apiClient) => apiClient.put(url,JSON.stringify({data,cols,id:data.id}));
    }
    return {
        types: types,
        promise: promise
    }
};

export const deletePosition = ( id ) => {
    return {
        types: [DELETE_POSITION_REQUEST,DELETE_POSITION_FAIL,DELETE_POSITION_SUCCESS],
        promise: (apiClient) => apiClient.delete(url, JSON.stringify({ id,cols }))
    }
};

export const handle = (name,parent) => {
    return {
        type: HANDLE,
        name,
        parent,
    }
}

export const positionModal = (type,modal) => {
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