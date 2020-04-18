import {
    GET_SUPPLIERS_REQUEST, GET_SUPPLIERS_FAIL, GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIER_REQUEST, GET_SUPPLIER_FAIL, GET_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_REQUEST, ADD_SUPPLIER_FAIL, ADD_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_REQUEST, EDIT_SUPPLIER_FAIL, EDIT_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_FAIL, DELETE_SUPPLIER_SUCCESS,
    GET_BANKS_REQUEST,GET_BANKS_FAIL,GET_BANKS_SUCCESS,
    SET_SUPPLIER_MODAL, TOGGLE_SUPPLIER_MODAL
} from "./actionTypes";
import {IsRequiredField, IsRequiredFields} from "../../utility/utils";


const INIT_STATE = {
    suppliers: [],
    supplier: {},
    banks: [],
    modal: {},
    required: [
        "name",
    ],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SUPPLIERS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_SUPPLIERS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_SUPPLIERS_SUCCESS:
            console.log(JSON.parse(action.result.data))
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                suppliers: JSON.parse(action.result.data),
                modal: {},
                errors: {},
            };
        case GET_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                supplier: Object.values(JSON.parse(action.result.data))[0],
                errors: {},
            };
        case ADD_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.supplier,state.errors)
            }
        case ADD_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                suppliers: {
                    ...JSON.parse(action.result.data),
                    ...state.suppliers,
                }
            };
        case EDIT_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required,state.supplier,state.errors)
            }
        case EDIT_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_SUPPLIER_SUCCESS:
            for (let  [key,value] of Object.entries(JSON.parse(action.result.data))) {
                state.suppliers[key] = value;
            }
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                supplier: {},
                suppliers: {
                    ...state.suppliers,
                }
            };
        case DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_SUPPLIER_SUCCESS:
            delete state.suppliers[JSON.parse(action.result.data)]
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                supplier: {},
                suppliers: state.suppliers
            };
        case GET_BANKS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_BANKS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_BANKS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                banks: JSON.parse(action.result.data),
                modal: {},
                errors: {},
            };

        case SET_SUPPLIER_MODAL:
            if(typeof action.index !== 'undefined'){
                if(!state.supplier[action.key]){
                    state.supplier[action.key] = []
                }
                if(typeof action.add === 'undefined'){
                    state.supplier[action.key][action.index] = action.value;
                }else
                if(action.add){
                    state.supplier[action.key][action.index+1] = action.value;
                }else{
                    state.supplier[action.key].splice(action.index,1);
                }
            }else{
                state.supplier[action.key] = action.value;
            }
            return {
                ...state,
                errors: IsRequiredField(state.required,action,state.errors)
            };
        case TOGGLE_SUPPLIER_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if(action.obj){
                if(action.modalType==="edit"){
                    state.supplier[action.obj.key] = action.obj.value
                }else{
                    state.supplier= action.obj
                }
            }

            return {
                ...state,
                errors: {}
            }
        default:
            return {...state};
    }
};


