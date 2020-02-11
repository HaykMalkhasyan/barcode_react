import {
    GET_CATEGORIES_REQUEST,GET_CATEGORIES_FAIL,GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_REQUEST,GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS,
    ADD_CATEGORY_REQUEST,ADD_CATEGORY_FAIL,ADD_CATEGORY_SUCCESS,
    EDIT_CATEGORY_REQUEST,EDIT_CATEGORY_FAIL,EDIT_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST,DELETE_CATEGORY_FAIL,DELETE_CATEGORY_SUCCESS,
    SET_CATEGORY_MODAL,TOGGLE_CATEGORY_MODAL
} from "./actionTypes";
import {IsRequiredField,IsRequiredFields} from "../../utility/utils";

const INIT_STATE = {
    categories: [],
    category:{},
    modal: {},
    required: ["name"],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal:{},
                errors: {},
            };
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal:{},
                fail: true,
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal:{},
                categories: JSON.parse(action.result.data),
                errors: {},
            };
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                category: JSON.parse(action.result.data),
                errors: {},
            };
        case ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.category,state.errors)
            }
        case ADD_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                categories: JSON.parse(action.result.data)
            };
        case EDIT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required,state.category,state.errors)
            }
        case EDIT_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                category: {},
                categories: JSON.parse(action.result.data)
            };
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                category: {},
                categories: JSON.parse(action.result.data)
            };

        case SET_CATEGORY_MODAL:
            state.category[action.key] = action.value;
            return {
                ...state,
                errors:IsRequiredField(state.required,action,state.errors)
            };
        case TOGGLE_CATEGORY_MODAL:

            state.modal[action.modalType] = !state.modal[action.modalType];
            if(action.obj){
                if(action.modalType==="edit"){
                    state.category[action.obj.key] = action.obj.value
                }else{
                    state.category = action.obj
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


