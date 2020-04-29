import {
    GET_SUPPLIERS_REQUEST,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIER_REQUEST,
    GET_SUPPLIER_FAIL,
    GET_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_FAIL,
    ADD_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_FAIL,
    EDIT_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_SUCCESS,
    GET_BANKS_REQUEST,
    GET_BANKS_FAIL,
    GET_BANKS_SUCCESS,
    SET_SUPPLIER_MODAL,
    TOGGLE_SUPPLIER_MODAL,
    GET_Currency_REQUEST,
    GET_Currency_FAIL,
    GET_Currency_SUCCESS,
    SUPPLIERS_ADD_MODAL,
    SET_SUPPLIERS_VALUE,
    FETCH_SUPPLIER_REQUEST,
    FETCH_SUPPLIER_FAIL,
    FETCH_SUPPLIER_SUCCESS, SUPPLIERS_OPEN_MODAL,
} from "./actionTypes";
import axios from "axios";

let cols = 'id,name,type,hh,address,phone';

export const supplierActions = (type, data) => {
    switch (type) {
        case "get":
            return {
                types: [GET_SUPPLIER_REQUEST, GET_SUPPLIER_FAIL, GET_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.gett(`suppliers/${data.id}`, {cols})
            }
        case "getAll":
            return {
                types: [GET_SUPPLIERS_REQUEST, GET_SUPPLIERS_FAIL, GET_SUPPLIERS_SUCCESS],
                promise: (apiClient) => apiClient.gett('suppliers/', {cols})
            }
        case "add":
            data.type = 0;
            return {
                types: [ADD_SUPPLIER_REQUEST, ADD_SUPPLIER_FAIL, ADD_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`suppliers/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_SUPPLIER_REQUEST, EDIT_SUPPLIER_FAIL, EDIT_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.putt(`suppliers/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_FAIL, DELETE_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.delete(`suppliers/${data.id}`, {cols})
            }
        default:
            return;
    }
};

export const getBanks = () => {
    return {
        types: [GET_BANKS_REQUEST, GET_BANKS_FAIL, GET_BANKS_SUCCESS],
        promise: (apiClient) => apiClient.gett('bank/')
    }
}

export const getCurrency = () => {
    return {
        types: [GET_Currency_REQUEST, GET_Currency_FAIL, GET_Currency_SUCCESS],
        promise: (apiClient) => apiClient.gett('currency/')
    }
}

export const setModalValues = (key, value, index, add) => {
    return {
        type: SET_SUPPLIER_MODAL,
        key,
        value,
        index,
        add
    }
}

export const toggleModal = (modalType, id) => {
    let obj = {"id": id};
    return {
        type: TOGGLE_SUPPLIER_MODAL,
        modalType,
        obj
    }
}


export function openSuppliersAddModal(text) {
    let cleanSuppliers = {
        name: '',
        hh: '',
        hvhh: '',
        address: '',
        tin: {
            tin_value: '',
            bank_id: null,
            currency_id: null
        },
        director: '',
        phone: [],
        active: 0,
        type: 0
    }
    if (text === 'add') {
        return {
            type: SUPPLIERS_ADD_MODAL,
            text,
            cleanSuppliers
        }
    }
    return {
        type: SUPPLIERS_OPEN_MODAL,
        text
    }
}

export function reducePhone(index) {

    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        let phone = setSupplier.phone
        phone.splice(index, 1);
        setSupplier.phone = phone;
        dispatch(setValues(setSupplier))
    }
}

export function addPhone(value, index) {

    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        let phone = setSupplier.phone
        phone[index + 1] = value;
        setSupplier.phone = phone;
        dispatch(setValues(setSupplier))
    }
}

export function setSuppliersAddModalValue(name, value, index) {

    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        switch (name) {
            case 'bank_id': {

                let banks = getState().suppliers.banks;
                for (let bank of banks) {
                    if (bank.id === +value) {

                        setSupplier.tin[name] = bank;
                        setSupplier.tin[name].active = +setSupplier.tin[name].active;
                    }
                }
                dispatch(setValues(setSupplier))
                break;
            }
            case 'currency_id': {

                let currency = getState().suppliers.currency;
                for (let item of currency) {
                    if (item.id === +value) {
                        setSupplier.tin[name] = item
                    }
                }
                dispatch(setValues(setSupplier))
                break;
            }
            case 'tin_value': {

                setSupplier.tin[name] = value
                dispatch(setValues(setSupplier))
                break;
            }
            case 'phone': {

                let phone = setSupplier.phone;
                phone[index] = value
                setSupplier.phone = (phone);
                dispatch(setValues(setSupplier));
                break;
            }
            default: {

                setSupplier[name] = value;
                dispatch(setValues(setSupplier))
                break;
            }
        }
    }
}

export function setValues(setSupplier) {

    return {
        type: SET_SUPPLIERS_VALUE,
        setSupplier
    }
}

export function fetchSuppliers(data) {
    console.log(typeof data.type)
    let cleanSuppliers = {
        name: '',
        hh: '',
        hvhh: '',
        address: '',
        tin: {
            tin_value: '',
            bank_id: null,
            currency_id: null
        },
        director: '',
        phone: [],
        active: 0,
        type: 0
    }

    return {
        types: [FETCH_SUPPLIER_REQUEST, FETCH_SUPPLIER_FAIL, FETCH_SUPPLIER_SUCCESS],
        promise: (apiClient) => apiClient.posttAdd(`suppliers/`, data, {cols}),
        cleanSuppliers
    }
}

export function searchRequisite(requisite) {
    console.log(requisite);
    const axiosInstance = axios.create({
        baseURL: 'http://new.haysell.com',
        timeout: 5000,
        headers: {
            "Accept": "*/*",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,hy;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });
    return async (dispatch, getState) => {
        let tin = `tin=${requisite}`;
        let setSupplier = getState().suppliers.setSupplier;
        try {
            const response = await axiosInstance.post('/tools/get_tin.php', tin);
            console.log(response.data);
            setSupplier.name = response.data[2];
            setSupplier.address = response.data[3]
            dispatch(setValues(setSupplier))

        } catch (error) {
            console.log(error.message)
        }
    }
}