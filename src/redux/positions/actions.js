import {
    GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS,
    SET_MODAL_VALUES,
    HANDLE
} from "./actionTypes";

let cols =  'id,name';

export const getPositions = () => {
    return {
        types: [GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS],
        promise: (apiClient) => apiClient.get(`User/Position`, JSON.stringify({ cols }))
    }
}



export const handle = (key,parent_id,id) => {
    return {
        type: HANDLE,
        key,
        parent_id,
        id
    }
}

export const positionModal = (type,modal) => {
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