import {
    SET_AND_CLOSE,
    SET_BARCODE,
    SET_BARCODE_VALUE,
    SET_CLEAN_VALUE,
    SET_DELETE_BARCODE,
    SET_PAPER_SIZE
} from "./actionTypes";
import {ADD_NEW_PRODUCT, CLOSE_PRODUCT_MODAL} from "../products/actionTypes";

const initialState = {
    open: false,
    codeTypes: [
        {id: 1, name: 'EAN-13'},
        {id: 2, name: 'EAN-8'},
        // {id: 3, name: 'UPC-A'},
        // {id: 4, name: 'UPC-E'},
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
    errorFields: [],
    print_tool: false,
    font_data: [
        {id: 1, value: 'DejaVu Sans', name: 'DejaVu Sans'},
        {id: 2, value: 'cursive', name: 'cursive'},
        {id: 3, value: 'Monospace', name: 'Monospace'},
        {id: 4, value: 'sans-serif', name: 'sans-serif'},
        {id: 5, value: 'serif', name: 'serif'},
        {id: 6, value: 'fantasy', name: 'fantasy'},
    ],
    papers: [
        {id: 1, height: 20, width: 30, name: '30x20 (1.18x0.79in)'},
        {id: 2, height: 25, width: 44, name: '44x25 (1.73x0.89in)'},
        {id: 3, height: 25, width: 40, name: '40x25 (1.57x0.89in)'},
        {id: 4, height: 30, width: 58, name: '58x30 (2.28x1.18in)'},
        {id: 5, height: 40, width: 58, name: '58x40 (2.28x1.57in)'},
    ],
    elem_data: [
        {id: 1, value: 'name', name: 'Անուն'},
        {id: 2, value: 'count', name: 'Քանակ'},
        {id: 3, value: 'price', name: 'Գին'},
    ],
    content_data: {
        name: {
            fontWeight: 600,
            fontSize: '12px',
        },
        count: {
            fontWeight: 400,
            fontSize: '8px'
        },
        price: {
            fontWeight: 400,
            fontSize: '8px',
        }
    },
    width: 1,
    height: 10,
    paper_width: 58,
    paper_height: 40,
    font: "DejaVu Sans",
    content: '',
};

export default function barcodeReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                barcode: []
            }
        case SET_PAPER_SIZE:
            return {
                ...state, paper_width: action.width, paper_height: action.height
            };
        case SET_DELETE_BARCODE:
            return {
                ...state, code_item: null, [action.name]: action.barcode
            };
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                notification: false,
                error: null,
                barcode: [],
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