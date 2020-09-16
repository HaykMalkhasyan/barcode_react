import {SET_AND_CLOSE, SET_BARCODE, SET_BARCODE_VALUE, SET_CLEAN_VALUE, SET_DELETE_BARCODE} from "./actionTypes";
import {CLOSE_PRODUCT_MODAL} from "../products/actionTypes";

const initialState = {
    open: false,
    codeTypes: [
        {id: 1, name: 'EAN-13'},
        {id: 2, name: 'EAN-8'},
        {id: 3, name: 'UPC-A'},
        {id: 4, name: 'UPC-E'},
    ],
    code: {
        barcode: '',
        barcode_type: '',
        count: 1
    },
    code_item: null,
    barcode: [],
    notification: false,
    error: null,
    errorFields: []
};

export default function barcodeReducer(state = initialState, action) {

    switch (action.type) {
        case SET_DELETE_BARCODE:
            return {
                ...state, code_item: null, [action.name]: action.barcode
            };
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                notification: false,
                error: null,
                code: {
                    barcode: '',
                    barcode_type: '',
                    count: 1
                },
            };
        case SET_AND_CLOSE:
            return {
                ...state, code: action.code, open: false
            };
        case SET_CLEAN_VALUE:
            return {
                ...state, code: action.code, errorFields: action.errorFields
            };
        case SET_BARCODE_VALUE:
            return {
                ...state,
                [action.name]: action.value,
            };
        case SET_BARCODE:
            return {
                ...state,
                [action.name]: action.value,
                notification: false,
                error: null,
                code: {
                    barcode: '',
                    barcode_type: '',
                    count: 1
                },
            };
        default:
            return {
                ...state
            }
    }
}