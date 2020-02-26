import {
    GET_GROUPS_REQUEST,GET_GROUPS_FAIL,GET_GROUPS_SUCCESS,
    GET_GROUP_REQUEST,GET_GROUP_FAIL,GET_GROUP_SUCCESS,
    ADD_GROUP_REQUEST,ADD_GROUP_FAIL,ADD_GROUP_SUCCESS,
    EDIT_GROUP_REQUEST,EDIT_GROUP_FAIL,EDIT_GROUP_SUCCESS,
    DELETE_GROUP_REQUEST,DELETE_GROUP_FAIL,DELETE_GROUP_SUCCESS,
    GET_SUB_GROUP_REQUEST,GET_SUB_GROUP_FAIL,GET_SUB_GROUP_SUCCESS,
    ADD_SUB_GROUP_REQUEST,ADD_SUB_GROUP_FAIL,ADD_SUB_GROUP_SUCCESS,
    EDIT_SUB_GROUP_REQUEST,EDIT_SUB_GROUP_FAIL,EDIT_SUB_GROUP_SUCCESS,
    DELETE_SUB_GROUP_REQUEST,DELETE_SUB_GROUP_FAIL,DELETE_SUB_GROUP_SUCCESS,
    SET_GROUP_MODAL,TOGGLE_GROUP_MODAL,TOGGLE_SUB_GROUP_MODAL,OPEN_MENU
} from "./actionTypes";


let cols =  'id,name';
let url = `Group/Group`;
let url1 = `Group/SubGroup`

export const groupActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_GROUP_REQUEST,GET_GROUP_FAIL,GET_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id:data.id} }))
            }
        case "getAll":
            return {
                types: [GET_GROUPS_REQUEST,GET_GROUPS_FAIL,GET_GROUPS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
            }
        case "add":
            return {
                types: [ADD_GROUP_REQUEST, ADD_GROUP_FAIL, ADD_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.post(url, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_GROUP_REQUEST,EDIT_GROUP_FAIL,EDIT_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.put(url,JSON.stringify({id:data.id,data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_GROUP_REQUEST,DELETE_GROUP_FAIL,DELETE_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, JSON.stringify({id:data.id, data,cols }))
            }
        default:
            return ;
    }
};
export const subGroupActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_SUB_GROUP_REQUEST,GET_SUB_GROUP_FAIL,GET_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.get(url1, JSON.stringify({ param:{id:data.id} }))
            }
        case "add":
            return {
                types: [ADD_SUB_GROUP_REQUEST, ADD_SUB_GROUP_FAIL, ADD_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.post(url1, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_SUB_GROUP_REQUEST,EDIT_SUB_GROUP_FAIL,EDIT_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.put(url1,JSON.stringify({ param:{id:data.id,group_id: data.group_id},data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_SUB_GROUP_REQUEST,DELETE_SUB_GROUP_FAIL,DELETE_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.delete(url1, JSON.stringify({param:{id:data.id,group_id: data.group_id},cols }))
            }
        default:
            return ;
    }
};


export const setModalValues = (key,value,lang) => {
    return {
        type: SET_GROUP_MODAL,
        key,
        value,
        lang
    }
}

export const toggleModal = (modalType,id) => {
    let obj = (id)?{"id":id}:{};
    return {
        type: TOGGLE_GROUP_MODAL,
        modalType,
        obj
    }
}

export const toggleSubModal = (modalType,id,group_id) => {
    let obj = (modalType === "add")?{parent_id:id}:{id}
    if(group_id){
        obj = {
            ...obj,
            group_id
        };
    }
    return {
        type: TOGGLE_SUB_GROUP_MODAL,
        modalType,
        obj
    }
}

export const handleOpen = (id,group_id) => {
    return {
        type: OPEN_MENU,
        id,
        group_id,
    }
}


