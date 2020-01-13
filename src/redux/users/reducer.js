import {
    GET_USERS_REQUEST, GET_USERS_FAIL, GET_USERS_SUCCESS,
    GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS,
    ADD_USER_REQUEST, ADD_USER_FAIL, ADD_USER_SUCCESS,
    EDIT_USER_REQUEST,EDIT_USER_FAIL,EDIT_USER_SUCCESS,
    DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS,
    ADD_MODAL,EDIT_MODAL,DELETE_MODAL,SET_MODAL_VALUES
} from "./actionTypes";


const INIT_STATE = {
    users: [],
    user: {},
    modal: {},
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
                fail: false,
                errors: {},
            };
        case GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                users: JSON.parse(action.result.data),
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
                modal: false,
                users: [
                    ...state.users,
                    JSON.parse(action.result.data)[0]

                ]
            };
        case EDIT_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
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
                modal: false,
                user: {},
                users: JSON.parse(action.result.data)
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
                modal: false,
                user: {},
                users: JSON.parse(action.result.data)
            };
        case ADD_MODAL:
            return {
                ...state,
                modal:{
                    add: action.modal,
                    edit: false,
                    delete: false
                },
                user: {}
            };
        case EDIT_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: action.modal,
                    delete: false
                },
            };
        case DELETE_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: false,
                    delete: action.modal
                },
                user: {}
            };
        case SET_MODAL_VALUES:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.value
                },

            }
        default:
            return {...state};
    }
};


