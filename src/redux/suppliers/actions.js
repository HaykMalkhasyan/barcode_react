import {
    GET_SUPPLIERS_REQUEST,GET_SUPPLIERS_FAIL,GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIER_REQUEST,GET_SUPPLIER_FAIL,GET_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_REQUEST,ADD_SUPPLIER_FAIL,ADD_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_REQUEST,EDIT_SUPPLIER_FAIL,EDIT_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_REQUEST,DELETE_SUPPLIER_FAIL,DELETE_SUPPLIER_SUCCESS,
    GET_BANKS_REQUEST,GET_BANKS_FAIL,GET_BANKS_SUCCESS,
    SET_SUPPLIER_MODAL,TOGGLE_SUPPLIER_MODAL
} from "./actionTypes";
let cols =  'id,name,type,hh,address,phone';
let url = `Supplier/Suppliers`;

export const supplierActions = (type,data) => {
    switch(type) {
        case "get":
            return {
                types: [GET_SUPPLIER_REQUEST,GET_SUPPLIER_FAIL,GET_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ param:{id:data.id} }))
            }
        case "getAll":
            return {
                types: [GET_SUPPLIERS_REQUEST,GET_SUPPLIERS_FAIL,GET_SUPPLIERS_SUCCESS],
                promise: (apiClient) => apiClient.get(url, JSON.stringify({ cols }))
            }
        case "add":
            return {
                types: [ADD_SUPPLIER_REQUEST,ADD_SUPPLIER_FAIL,ADD_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.post(url, JSON.stringify({data, cols}))
            }
        case "edit":
            return {
                types: [EDIT_SUPPLIER_REQUEST,EDIT_SUPPLIER_FAIL,EDIT_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.put(url,JSON.stringify({ param:{id:data.id},data,cols}))
            }
        case "delete":
            return {
                types: [DELETE_SUPPLIER_REQUEST,DELETE_SUPPLIER_FAIL,DELETE_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.delete(url, JSON.stringify({ param:{id:data.id}, data,cols }))
            }
        default:
            return ;
    }
};

export const getBanks = () => {
    return {
        types: [GET_BANKS_REQUEST,GET_BANKS_FAIL,GET_BANKS_SUCCESS],
        promise: (apiClient) => apiClient.get('Supplier/Banks')
    }
}

export const setModalValues = (key,value,index,add) => {
    return {
        type: SET_SUPPLIER_MODAL,
        key,
        value,
        index,
        add
    }
}

export const toggleModal = (modalType,id) => {
    let obj = {"id":id};
    return {
        type: TOGGLE_SUPPLIER_MODAL,
        modalType,
        obj
    }
}