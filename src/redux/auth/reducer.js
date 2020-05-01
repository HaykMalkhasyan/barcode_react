import { saveSession,getSession,destroySession } from "../../utility/session";

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAIL,
    LOGOUT_REQUEST_SUCCESS
} from "./actionTypes";
import {DELETE_USER_SUCCESS} from "../users/actionTypes";
import SessionStorage from "../../services/SessionStorage";


const INIT_STATE = {
    user: getSession('user'),
    acces_token: getSession('access'),
    refresh_token: getSession('refresh'),
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
            let data = action.result
            saveSession('auth',data);
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                user: data.user,
                access_token: data.access,
                access_refresh_token: data.refresh,
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
                access_token: null,
                refresh_token: null
            };
        case DELETE_USER_SUCCESS:
            let getUser = SessionStorage.get('user');
            console.log(getUser);
            if (getUser.user_id === action.result.id && getUser.firstname === action.result.first_name && getUser.lastname === action.result.last_name) {
                console.log(getUser);
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
                    access_token: null,
                    refresh_token: null
                }
            } else {
                return true;
            }
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

