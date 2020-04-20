import {
    ADD_MENU_REQUEST,
    ADD_MENU_FAIL,
    ADD_MENU_SUCCESS,
    EDIT_MENU_REQUEST,
    EDIT_MENU_FAIL,
    EDIT_MENU_SUCCESS,
    DELETE_MENU_REQUEST,
    DELETE_MENU_FAIL,
    DELETE_MENU_SUCCESS,
    TOGGLE_MENU_MODAL,
    GET_MENU_REQUEST,
    GET_MENU_FAIL,
    GET_MENU_SUCCESS,
    SET_MENU_MODAL,
    GET_MENU_ITEM_REQUEST,
    GET_MENU_ITEM_FAIL, GET_MENU_ITEM_SUCCESS,
} from "./actionTypes";
import {
    IsRequiredField,
    IsRequiredFields,
    Push,
    RemoveItem,
    ChangeItem
} from "../../utility/utils";


const INIT_STATE = {
    data: [],
    datas: {},
    loading: false,
    required:["name"],
    success: false,
    modal: {},
    fail: false,
    errors: {},
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
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
        case GET_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_MENU_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                data: action.result.results,
                errors: {},
            };
        case ADD_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.datas,state.errors)
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
                loading: false,
                success: true,
                fail: false,
                modal: {},
                data: Push(state.data,JSON.parse(action.result.data))
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


