import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_FAIL,
    EDIT_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_BARCODE_TYPES_REQUEST,
    GET_BARCODE_TYPES_FAIL,
    GET_BARCODE_TYPES_SUCCESS,
    ADD_BARCODE,
    DELETE_BARCODE,
    SET_PRODUCT_MODAL,
    TOGGLE_PRODUCT_MODAL,
    SET_BARCODE,
    ADD_MEASUREMENT_VALUE,
    ADD_POINTS_VALUE,
    ADD_UPLOAD_IMAGES,
    ADD_VALUE,
    ADD_RESULT,
    SEARCH_ERROR,
    SELECT_GROUP,
    SELECT_ID_IN_ARRAY,
    CLASSIFIERS_TOGGLE_MODAL,
    CREATE_CLASSIFIERS_ERROR, CREATE_CLASSIFIERS_SUCCESS, ADD_SEARCH_TEXT
} from "./actionTypes";
import {Pushend,/*IsRequiredFields,*/Remove} from "../../utility/utils";


const INIT_STATE = {
    products: [],
    product: {},
    barcodeTypes: [],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {},
    types: [
        {id: 0, name: 'EAN-13'},
        {id: 1, name: 'EAN-8'},
        {id: 2, name: "EAN-5"},
        {id: 3, name: "CODE128"},
    ],
    measurementData: [
        {id: 1, name: 'kilograms'},
        {id: 2, name: 'kilometers'},
        {id: 3, name: 'cubic meter'},
        {id: 4, name: 'square meter'},
        {id: 5, name: 'grams'},
        {id: 6, name: 'milligrams'},
        {id: 7, name: 'liters'},
    ],
    searchProduct: {
        sku: '',
        name: '',
        suppliers: '',
        barcode: '',
        description: '',
        active: ''
    },
    searchProductResult: [],
    searchErrorName: null,
    group: null,
    elemsIdInArray: null,
    classifiersModal: false,
    advancedSearchConfig: sessionStorage.getItem('advancedSearchConfig') ?
        JSON.parse(sessionStorage.getItem('advancedSearchConfig'))
        :
        {
            image: false,
            hasActive: false,
            hasSuppliers: false,
            pageSize: 'all'
        },
    advancedSearchText: '',
    createError: false,
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case ADD_SEARCH_TEXT:
            return {
                ...state,
                advancedSearchText: action.advancedSearchText
            }
        case CREATE_CLASSIFIERS_ERROR:
            return {
                ...state,
                createError: true
            }
        case CREATE_CLASSIFIERS_SUCCESS:
            return {
                ...state,
                advancedSearchConfig: action.data,
                createError: false,
                classifiersModal: false,
                group: null,
                elemsIdInArray: null
            }
        case CLASSIFIERS_TOGGLE_MODAL:
            delete state.advancedSearchConfig.classifiers;
            return {
                ...state,
                classifiersModal: !state.classifiersModal,
                createError: false,
                group: null,
                elemsIdInArray: null,
            }
        case SELECT_ID_IN_ARRAY:
            return {
                ...state,
                elemsIdInArray: action.elemsIdInArray
            }
        case SELECT_GROUP:
            return {
                ...state,
                group: action.group,
            }
        case SEARCH_ERROR:
            return {
                ...state,
                searchErrorName: action.name
            }
        case ADD_RESULT:
            return {
                ...state,
                searchProductResult: action.result,
                searchErrorName: action.result.length > 0 ? null : state.searchErrorName
            }
        case ADD_VALUE:
            return {
                ...state,
                searchProduct: action.data,
            }
        case ADD_UPLOAD_IMAGES:
            return {
                ...state,
                product: action.product
            }
        case ADD_POINTS_VALUE:
            return {
                ...state,
                product: action.data
            }
        case ADD_MEASUREMENT_VALUE:
            return {
                ...state,
                product: action.product
            }
        case SET_BARCODE:
            return {
                ...state,
                product: action.product
            }
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                products: action.result.results,
                errors: {},
            };
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                product: action.result,
                errors: {},
            };
        case GET_BARCODE_TYPES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_BARCODE_TYPES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_BARCODE_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                barcodeTypes: action.result.results,
                errors: {},
            };
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                products: Pushend(state.products, action.result),
                product: {}
            };
        case EDIT_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case EDIT_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                product: {},
                products: JSON.parse(action.result.data)
            };
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                product: {},
                products: Remove(state.products, action.data, 'id')
            };
        case SET_PRODUCT_MODAL:
            state.product[action.key] = action.value
            return {
                ...state,
            }
        case ADD_BARCODE:
            if (!state.product.barcode) {
                state.product.barcode = [];
            }
            state.product.barcode.push({...action.code})
            return {
                ...state,
            }
        case DELETE_BARCODE:
            state.product.barcode = Remove(state.product.barcode, {barcode: action.code}, 'barcode')
            return {
                ...state,
            }
        case TOGGLE_PRODUCT_MODAL:
            let newModal = {};
            newModal[action.modalType] = !state.modal[action.modalType];
            let product = (action.modalType === "edit") ? {
                ...state.product,
                ...action.obj
            } : {
                ...action.obj
            }
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...newModal
                },
                product
            }
        default:
            return {...state};
    }
};


