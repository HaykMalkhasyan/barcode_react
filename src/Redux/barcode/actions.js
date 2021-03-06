import {
    SET_AND_CLOSE,
    SET_BARCODE,
    SET_BARCODE_VALUE,
    SET_CLEAN_VALUE,
    SET_DELETE_BARCODE,
    SET_PAPER_SIZE,
    SET_PRODUCTS_BARCODE_VALUE
} from "./actionTypes";
import is from 'is_js';

export function setDataValues(name, value) {

    return (dispatch, getState) => {
        const code = {...getState().barcode.code};
        const errorFields = [...getState().barcode.errorFields];
        switch (name) {
            case 'barcode': {
                code[name] = value;
                code.barcode_type = "";
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

export function deleteBarcodeItem(index) {

    return (dispatch, getState) => {
        let barcode = [...getState().barcode.barcode];
        barcode.splice(index, 1);
        dispatch(setDeleteValues("barcode", barcode))
    }
}

export function changeElementSizes(name, value) {

    return (dispatch, getState) => {
        const content_data = {...getState().barcode.content_data};
        const content = getState().barcode.content;
        const initial_stg = {...content_data[content]};

        initial_stg[name] = value;
        content_data[content] = initial_stg;
        dispatch(setBarcodeValue('content_data', content_data));
    }
}

// ----------------------------------------------------------------

export function setPaperSize(width, height) {

    return {
        type: SET_PAPER_SIZE, width, height
    }
}

export function setDeleteValues(name, barcode) {

    return {
        type: SET_DELETE_BARCODE,
        name,
        barcode,
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