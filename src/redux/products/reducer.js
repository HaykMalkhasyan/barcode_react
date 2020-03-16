import {
    GET_PRODUCTS_REQUEST, GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_REQUEST, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_REQUEST,EDIT_PRODUCT_FAIL,EDIT_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS,
    GET_BARCODE_TYPES_REQUEST,GET_BARCODE_TYPES_FAIL,GET_BARCODE_TYPES_SUCCESS,
    ADD_BARCODE,DELETE_BARCODE,
    SET_PRODUCT_MODAL,TOGGLE_PRODUCT_MODAL
} from "./actionTypes";
import {IsRequiredFields,Remove} from "../../utility/utils";


const INIT_STATE = {
    products: [],
    product: {},
    barcodeTypes: [],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
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
                PRODUCTs: JSON.parse(action.result.data),
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
                product: JSON.parse(action.result.data)[0],
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
                barcodeTypes: JSON.parse(action.result.data),
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
                product: [
                    ...state.product,
                    JSON.parse(action.result.data)[0]

                ]
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
                products: JSON.parse(action.result.data)
            };
        case SET_PRODUCT_MODAL:
            console.log("DFh")
            state.product[action.key] = action.value
            return {
                ...state,
            }
        case ADD_BARCODE:
            if(!state.product.barcode){
                state.product.barcode=[];
            }
            state.product.barcode.push({barcode:action.code})
            return {
                ...state,
            }
        case DELETE_BARCODE:
            state.product.barcode=Remove(state.product.barcode,{barcode:action.code},'barcode')
            return {
                ...state,
            }
        case TOGGLE_PRODUCT_MODAL:
            let newModal = {};
            newModal[action.modalType] = !state.modal[action.modalType];
            let product = (action.modalType==="edit")?{
                ...state.product,
                ...action.obj
            }:{
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


