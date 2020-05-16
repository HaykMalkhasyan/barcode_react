import {ADD_FILE, CHECK_FILE, SET_FORM_DATA_VALUE} from "./actionTypes";

const initialState = {
    exel: false,
    file: null,
    errorType: null,
    error: false,
    uploadText: '',
    formData: {
        departOne : [
            {id: 1, name: 'sku', touched: false, valid: false, error: false},
            {id: 2, name: 'name', touched: false, valid: false, error: false},
            {id: 3, name: 'points', touched: false, valid: false, error: false},
            {id: 4, name: 'measurement'}
        ],
        departTwo : [
            {id: 5, name: 'classifiers', touched: false, valid: false, error: false},
            {id: 6, name: 'suppliers', touched: false, valid: false, error: false},
            {id: 7, name: 'barcode', touched: false, valid: false, error: false},
            {id: 8, name: 'description', touched: false, valid: false, error: false},
        ],
    },
    formDataValue: {
        sku: '',
        name: '',
        points: '',
        measurement: '',
        classifiers: '',
        suppliers: '',
        barcode: '',
        description: '',
    }
};

export default function importReducer(state = initialState, action) {

    switch (action.type) {

        case CHECK_FILE:
            return {
                ...state,
                error: action.data
            }
        case SET_FORM_DATA_VALUE:
            return {
                ...state,
                formDataValue: action.formDataValue,
                formData: action.formData
            }
        case ADD_FILE:
            return {
                ...state,
                [action.name]: action.value
            }
        default: return state;
    }
}