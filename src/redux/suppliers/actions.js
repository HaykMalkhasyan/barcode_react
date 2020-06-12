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
    SET_SUPPLIERS_VALUE,
    FETCH_SUPPLIER_REQUEST,
    FETCH_SUPPLIER_FAIL,
    FETCH_SUPPLIER_SUCCESS, SUPPLIERS_OPEN_MODAL, SET_ERROR, EMPTY_VALUE, SUCCES_VALUE, TOGGLE_EDITABLE_SUPPLIERS,
} from "./actionTypes";
import axios from "axios";

let cols = 'id,name,type,hh,address,phone';
const API_URL = process.env.REACT_APP_API_URL;

export const supplierActions = (type, data) => {
    switch (type) {
        case "get":
            return {
                types: [GET_SUPPLIER_REQUEST, GET_SUPPLIER_FAIL, GET_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/suppliers/${data.id}`, {cols})
            }
        case "getAll":
            return {
                types: [GET_SUPPLIERS_REQUEST, GET_SUPPLIERS_FAIL, GET_SUPPLIERS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/suppliers/`, {cols})
            }
        case "add":
            data.type = 0;
            return {
                types: [ADD_SUPPLIER_REQUEST, ADD_SUPPLIER_FAIL, ADD_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`${API_URL}/suppliers/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_SUPPLIER_REQUEST, EDIT_SUPPLIER_FAIL, EDIT_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.putt(`${API_URL}/suppliers/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_FAIL, DELETE_SUPPLIER_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`${API_URL}/suppliers/${data.id}`, {cols}),
                data
            }
        default:
            return;
    }
};

export const getBanks = () => {
    return {
        types: [GET_BANKS_REQUEST, GET_BANKS_FAIL, GET_BANKS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/bank/`)
    }
}

export const getCurrency = () => {
    return {
        types: [GET_Currency_REQUEST, GET_Currency_FAIL, GET_Currency_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/currency/`)
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
        tin: [],
        director: '',
        phone: [],
        active: 0,
        type: 0
    }
    let cleanValueStatus = {
        name: false,
        hh: false,
        hvhh: false,
        address: false,
        director: false,
        bank_id: false,
        currency_id: false,
        tin_value: false,
        phone: false
    }
    return {
        type: SUPPLIERS_OPEN_MODAL,
        text,
        cleanSuppliers,
        cleanValueStatus
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

export function addTin(value, index) {
    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        let tin = setSupplier.tin;
        // if (tin.length === 0) {
        //     tin[index+1] = value;
        // }
        tin[index + 1] = value;
        setSupplier.tin = tin;
        dispatch(setValues(setSupplier))
    }
}

export function reduceTin(index) {

    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        let tin = setSupplier.tin
        tin.splice(index, 1);
        setSupplier.tin = tin;
        dispatch(setValues(setSupplier))
    }
}

export function setSuppliersAddModalValue(name, value, index) {

    return (dispatch, getState) => {
        let setSupplier = getState().suppliers.setSupplier;
        switch (name) {
            case `bank_id-${index}`: {
                name = 'bank_id';
                let banks = getState().suppliers.banks;
                if (setSupplier.tin.length === 0) {
                    for (let bank of banks) {
                        if (bank.id === +value) {
                            let obj = {
                                [name]: bank,
                            }
                            setSupplier.tin[index] = obj;
                        }
                    }
                } else {
                    for (let bank of banks) {
                        if (bank.id === +value) {
                            if (setSupplier.tin[index]) {
                                setSupplier.tin[index][name] = bank;
                            } else {
                                setSupplier.tin[index] = {[name]: bank}
                            }
                        }
                    }
                }
                dispatch(setValues(setSupplier))
                break;
            }
            case `currency_id-${index}`: {
                name = 'currency_id';
                let currency = getState().suppliers.currency;
                if (setSupplier.tin.length === 0) {
                    for (let item of currency) {
                        if (item.id === +value) {
                            let obj = {
                                [name]: item
                            }
                            setSupplier.tin[index] = obj
                        }
                    }
                } else {
                    for (let item of currency) {
                        if (item.id === +value) {
                            if (setSupplier.tin[index]) {
                                setSupplier.tin[index][name] = item;
                            } else {
                                setSupplier.tin[index] = {[name]: item}
                            }
                        }
                    }
                }
                dispatch(setValues(setSupplier))
                break;
            }
            case `tin_value-${index}`: {
                name = 'tin_value';
                if (setSupplier.tin.length === 0) {
                    setSupplier.tin[index] = {tin_value: value}
                } else {
                    if (setSupplier.tin[index]) {
                        setSupplier.tin[index][name] = value;
                    } else {
                        setSupplier.tin[index] = {[name]: value}
                    }
                }
                dispatch(setValues(setSupplier))
                break;
            }
            case `phone-${index}`: {

                let phone = setSupplier.phone;
                phone[index] = {phone: value}
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
    let index = true;
    for (let key in data) {
        if (data[key].length === 0) {
            index = false
        }
    }

    if (index === true) {
        return {
            types: [FETCH_SUPPLIER_REQUEST, FETCH_SUPPLIER_FAIL, FETCH_SUPPLIER_SUCCESS],
            promise: (apiClient) => apiClient.posttAdd(`suppliers/`, data, {cols}),
            cleanSuppliers
        }
    }
    return {
        type: SET_ERROR
    }

}

export function searchRequisite(requisite) {
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
            setSupplier.name = response.data[2];
            setSupplier.address = response.data[3]
            dispatch(setValues(setSupplier))

        } catch (error) {
            console.log(error.message)
        }
    }
}

// export function checkValue(name, value) {
//
//     if (value.length === 0) {
//         let text = 'the field must not be empty';
//         return {
//             type: EMPTY_VALUE,
//             name,
//             text
//         }
//     }
//     return {
//         type: SUCCES_VALUE,
//         name
//     };
// }

export function checkValue(name, value, index = false) {
    let text;
    switch (name) {

        case `bank_id-${index}`:
            name = 'bank_id';
            if (+value === 0) {
                text = 'You have not chosen a bank';
                return {
                    type: EMPTY_VALUE,
                    name,
                    text,
                    index
                }
            }
            return {
                type: SUCCES_VALUE,
                name,
                index
            }
        case `currency_id-${index}`:
            name = 'currency_id';
            if (+value === 0) {
                text = 'You have not chosen a currency type';
                return {
                    type: EMPTY_VALUE,
                    name,
                    text,
                    index
                }
            }
            return {
                type: SUCCES_VALUE,
                name,
                index
            }
        case `tin_value-${index}`:
            name = 'tin_value';
            if (value.length === 0) {
                text = 'the field must not be empty';
                return {
                    type: EMPTY_VALUE,
                    name,
                    text,
                    index
                }
            }
            if (value.length > 0) {
                for (let item of value) {
                    if (+item !== 0 && !(item / 2)) {
                        text = 'The field must not have letters or characters';
                        return {
                            type: EMPTY_VALUE,
                            name,
                            text,
                            index
                        }
                    }
                }
            }
            return {
                type: SUCCES_VALUE,
                name,
                index
            }
        case `phone-${index}`:
            name = 'phone';
            if (value.length === 0) {
                text = 'the field must not be empty';
                return {
                    type: EMPTY_VALUE,
                    name,
                    text,
                    index
                }
            }
            if (value.length > 0) {
                for (let item of value) {
                    if (+item !== 0 && !(item / 2)) {
                        text = 'The field must not have letters or characters';
                        return {
                            type: EMPTY_VALUE,
                            name,
                            text,
                            index
                        }
                    }
                }
            }
            return {
                type: SUCCES_VALUE,
                name,
                index
            }
        default:
            if (value.length === 0) {
                let text = 'the field must not be empty';
                return {
                    type: EMPTY_VALUE,
                    name,
                    text
                }
            }
            return {
                type: SUCCES_VALUE,
                name
            };
    }
}

export function suppliersEditableToggle() {

    return {
        type: TOGGLE_EDITABLE_SUPPLIERS
    }
}