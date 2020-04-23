import {
    GET_PAGES_REQUEST,
    GET_PAGES_FAIL,
    GET_PAGES_SUCCESS,
    ADD_MENU_FAIL,
    ADD_MENU_REQUEST,
    ADD_MENU_SUCCESS,
    DELETE_MENU_FAIL,
    DELETE_MENU_REQUEST,
    DELETE_MENU_SUCCESS,
    EDIT_MENU_FAIL,
    EDIT_MENU_REQUEST,
    EDIT_MENU_SUCCESS,
    GET_MENU_ITEM_FAIL,
    GET_MENU_ITEM_REQUEST,
    GET_MENU_ITEM_SUCCESS,
    SET_MENU_MODAL,
    TOGGLE_MENU_MODAL
} from "./actionTypes";
import {ChangeItem, IsRequiredField, IsRequiredFields, Push, RemoveItem} from "../../utility/utils";


const INIT_STATE = {
    data: [],
    datas: {},
    required:["name"],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PAGES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PAGES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_PAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                data: action.result.results,
                errors: {},
            };
            /*--------------------------------------------*/
        case GET_MENU_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            }
        case GET_MENU_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            }
        case GET_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                datas: action.result,
                errors: {},
            }
        case ADD_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.datas,state.errors),
                modal: {}
            };
        case ADD_MENU_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_MENU_SUCCESS:
            return {
                ...state,
                data: Push(state.data, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {}
            };
        case EDIT_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
                errors:IsRequiredFields(state.required,state.datas,state.errors)
            };
        case EDIT_MENU_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_MENU_SUCCESS:
            return {
                ...state,
                data: ChangeItem(state.data, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {},
                datas: {}
            };
        case DELETE_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
            };
        case DELETE_MENU_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_MENU_SUCCESS:
            return {
                ...state,
                data: RemoveItem(state.data, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {},
                datas: {}
            };
        case TOGGLE_MENU_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if (action.obj) {
                if (action.modalType === "edit") {
                    state.datas[action.obj.key] = action.obj.value
                } else {
                    state.datas = action.obj
                }
            }
            return {
                ...state, errors: {}
            };
        case SET_MENU_MODAL:
            state.datas[action.key] = action.value;
            return {
                ...state,
                errors: IsRequiredField(state.required,action,state.errors)
            }
        default:
            return {...state};
    }
};


