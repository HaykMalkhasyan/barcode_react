import { saveSession,getSession,destroySession } from "../../utility/session";

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS
} from "./actionTypes";


const INIT_STATE = {
    user: getSession('user'),
    token: getSession('token'),
    loading: false,
    success: false,
    fail: false,
    errors: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case LOGIN_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case LOGIN_REQUEST_SUCCESS:
            let data = action.result.data
            saveSession('auth',data);
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                user: data.user,
                token: data.token,
                errors: {},
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    loading: true,
                    success: false,
                    fail: false,
                }
            };
        case LOGOUT_REQUEST_SUCCESS:
            destroySession();
            return {
                ...state,
                logout: {
                    ...state.logout,
                    loading: false,
                    success: true,
                    fail: false,
                },
                user: null,
                token:null
            };
        case LOGOUT_REQUEST_FAIL:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    loading: false,
                    success: false,
                    fail: true,
                },
            };

        default:
            return {...state};
    }
};

