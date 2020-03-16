import {
    GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS,
    GET_POSITION_REQUEST,GET_POSITION_FAIL,GET_POSITION_SUCCESS,
    ADD_POSITION_REQUEST,ADD_POSITION_FAIL,ADD_POSITION_SUCCESS,
    EDIT_POSITION_REQUEST,EDIT_POSITION_FAIL,EDIT_POSITION_SUCCESS,
    DELETE_POSITION_REQUEST,DELETE_POSITION_FAIL,DELETE_POSITION_SUCCESS,
    SET_POSITION_MODAL,HANDLE,TOGGLE_POSITION_MODAL
} from "./actionTypes";
let cols =  'id,name';
let url = `User/Position`;


export const positionActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_POSITION_REQUEST,GET_POSITION_FAIL,GET_POSITION_SUCCESS],
                promise: (apiClient) => apiClient.get(url, { param:{id:data.id} })
            }
        case "getAll":
            return {
                types: [GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, { cols })
            }
        case "add":
            return {
                types: [ADD_POSITION_REQUEST,ADD_POSITION_FAIL,ADD_POSITION_SUCCESS],
                promise: (apiClient) => apiClient.post(url,data, { cols })
            }
        case "edit":
            return {
                types: [EDIT_POSITION_REQUEST,EDIT_POSITION_FAIL,EDIT_POSITION_SUCCESS],
                promise: (apiClient) => apiClient.put(url,data,{param:{id:data.id},cols})
            }
        case "delete":
            return {
                types: [DELETE_POSITION_REQUEST,DELETE_POSITION_FAIL,DELETE_POSITION_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, { param:{id:data.id},cols })
            }
        default:
            return ;
    }
};



export const handle = (id,parentId) => {
    return {
        type: HANDLE,
        id,
        parentId,
    }
}

export const toggleModal = (modalType,id) => {
    let obj = {"id":id};
    return {
        type: TOGGLE_POSITION_MODAL,
        modalType,
        obj
    }
}
export const setModalValues = (key,value) => {
    return {
        type: SET_POSITION_MODAL,
        key,
        value
    }
}