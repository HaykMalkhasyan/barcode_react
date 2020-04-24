import {
    GET_USERS_REQUEST, GET_USERS_FAIL, GET_USERS_SUCCESS,
    GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS,
    ADD_USER_REQUEST, ADD_USER_FAIL, ADD_USER_SUCCESS,
    EDIT_USER_REQUEST, EDIT_USER_FAIL, EDIT_USER_SUCCESS,
    DELETE_USER_REQUEST, DELETE_USER_FAIL, DELETE_USER_SUCCESS,
    SET_USER_MODAL,TOGGLE_USER_MODAL
} from "./actionTypes";
import {IsRequiredField, IsRequiredFields, Put ,Push ,Remove} from "../../utility/utils";


const INIT_STATE = {
    users: [],
    user: {},
    modal: {},
    required: [
        "firstname",
        "lastname",
        "username",
        "password",
    ],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                users: action.result.results,
                modal: {},
                errors: {},
            };
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                user: JSON.parse(action.result.data)[0],
                errors: {},
            };
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.user,state.errors)
            }
        case ADD_USER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                users: Push(state.users,JSON.parse(action.result.data)[0])
            };
        case EDIT_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.user,state.errors)
            }
        case EDIT_USER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                user: {},
                users: Put(state.users,JSON.parse(action.result.data)[0],'id')
            };
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                user: {},
                users: Put(state.users,JSON.parse(action.result.data)[0],'id')
            };

        case SET_USER_MODAL:
            state.user.active = (state.user.active)?state.user.active:0;
            state.user[action.key] = action.value;
            return {
                ...state,
                errors: IsRequiredField(state.required,action,state.errors)
            };
        case TOGGLE_USER_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if(action.obj){
                if(action.modalType==="edit"){
                    state.user[action.obj.key] = action.obj.value
                }else{
                    state.user = action.obj
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


