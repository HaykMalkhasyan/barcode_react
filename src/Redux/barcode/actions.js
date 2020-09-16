import cookie from "../../services/cookies";
import Axios from "axios";
import {deleteInArray, getToken} from "../../services/services";
import {
    SET_AND_CLOSE,
    SET_BARCODE,
    SET_BARCODE_VALUE,
    SET_CLEAN_VALUE, SET_DELETE_BARCODE,
    SET_PRODUCTS_BARCODE_VALUE
} from "./actionTypes";
import is from 'is_js';

const API_URL = process.env.REACT_APP_API_URL;

export function getBarcode() {
    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/barcode/`, {
                    headers: {
                        "lang": cookie.get('language') || "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                dispatch(setBarcodeValue('barcode', response.data.results))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setBarcodeValue('error', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getBarcode())
                    }
                } else {
                    dispatch(setBarcodeValue('error', error.message))
                }
            }
        }
    }
}

export function setDataValues(name, value) {

    return (dispatch, getState) => {
        const code = {...getState().barcode.code};
        const errorFields = [...getState().barcode.errorFields];
        switch (name) {
            case 'barcode': {
                code[name] = value;
                if (is.alphaNumeric(value)) {
                    if (errorFields.indexOf(name) !== -1) {
                        errorFields.splice(errorFields.indexOf(name), 1);
                    }
                } else {
                    if (errorFields.indexOf(name) === -1) {
                        errorFields.push(name);
                    }
                }
                dispatch(setBarcodeCleanValue(code, errorFields));
                break;
            }
            case 'count': {
                code[name] = value;
                if (is.number(+value) && +value >= 0) {
                    if (errorFields.indexOf(name) !== -1) {
                        errorFields.splice(errorFields.indexOf(name), 1);
                    }
                } else {
                    if (errorFields.indexOf(name) === -1) {
                        errorFields.push(name);
                    }
                }
                dispatch(setBarcodeCleanValue(code, errorFields));
                break;
            }
            case 'add': {
                if (errorFields.indexOf('count') === -1) {
                    let startValue = +code.count;
                    startValue += value;
                    code.count = startValue;
                    dispatch(setBarcodeValue('code', code));
                }
                break;
            }
            case 'subtract': {
                if (errorFields.indexOf('count') === -1) {
                    let startValue = +code.count;
                    startValue -= value;
                    code.count = startValue;
                    if (code.count > 0) {
                        dispatch(setBarcodeValue('code', code));
                    }
                }
                break;
            }
            case 'barcode_type': {
                code[name] = value.id;
                dispatch(setAndCloseDrop(code));
                break;
            }
            default: {
                break;
            }
        }
    }
}

export function addBarcode() {

    return async (dispatch, getState) => {
        const code = {...getState().barcode.code};
        const barcode = [...getState().barcode.barcode];
        const product_barcode = [...getState().products.barcode];
        let index = true;
        for (let item of barcode) {
            if (item.barcode === code.barcode) {
                index = false
            }
        }
        if (index) {
            try {
                const response = await Axios.post(`${API_URL}/barcode/`, code, {
                    headers: {
                        "lang": cookie.get('language') || "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                barcode.push(response.data);
                product_barcode.push(response.data);
                dispatch(setBarcode('barcode', barcode));
                dispatch(setProductsBarcodeValue('barcode', product_barcode))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setBarcodeValue('error', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(addBarcode())
                    }
                } else {
                    dispatch(setBarcodeValue('error', error.message))
                }
            }
        } else {
            dispatch(setBarcodeValue('notification', true))
        }
    }
}

export function getBarcodeItem(id) {

    return async dispatch => {
        try {
            const response = await Axios.get(`${API_URL}/barcode/${id}`, {
                headers: {
                    "lang": cookie.get('language') || "am",
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${cookie.get('access')}`
                }
            });
            dispatch(setBarcodeValue('code_item', response.data))
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setBarcodeValue('error', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(getBarcodeItem(id))
                }
            } else {
                dispatch(setBarcodeValue('error', error.message))
            }
        }
    }
}

export function deleteBarcodeItem(id) {

    return async (dispatch, getState) => {
        let barcode = [...getState().barcode.barcode];
        let products_barcode = [...getState().products.barcode];

        try {
            await Axios.delete(`${API_URL}/barcode/${id}`, {
                headers: {
                    "lang": cookie.get('language') || "am",
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${cookie.get('access')}`
                }
            });
            barcode = deleteInArray.deleteObject(barcode, id);
            products_barcode = deleteInArray.deleteObject(products_barcode, id);
            dispatch(setDeleteValues('barcode', barcode, products_barcode));
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setBarcodeValue('error', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(deleteBarcodeItem(id))
                }
            } else {
                dispatch(setBarcodeValue('error', error.message))
            }
        }
    }
}

// ----------------------------------------------------------------

export function setDeleteValues(name, barcode, products_barcode) {

    return {
        type: SET_DELETE_BARCODE,
        name,
        barcode,
        products_barcode
    }
}

export function setAndCloseDrop(code) {

    return {
        type: SET_AND_CLOSE, code
    }
}

export function setBarcodeCleanValue(code, errorFields) {

    return {
        type: SET_CLEAN_VALUE, code, errorFields
    }
}

export function setBarcodeValue(name, value) {

    return {
        type: SET_BARCODE_VALUE, name, value
    }
}


export function setBarcode(name, value) {

    return {
        type: SET_BARCODE, name, value
    }
}

export function setProductsBarcodeValue(name, value) {

    return {
        type: SET_PRODUCTS_BARCODE_VALUE, name, value
    }
}