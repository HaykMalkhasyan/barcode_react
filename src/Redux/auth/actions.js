import {SET_USER, SET_VALUES} from "./actionTypes";
import Axios from "axios";
import jwt_decode from 'jwt-decode'
import cookie from "../../services/cookies";

const API_URL = process.env.REACT_APP_API_URL;

export function login() {
    return (dispatch, getState) => {
        const emailStatus = getState().auth.emailStatus;
        const passwordStatus = getState().auth.passwordStatus;
        const user = {
            username: getState().auth.email,
            password: getState().auth.password
        };
        if (user.username.length === 0 || user.password.length < 0 || user.password.length > 32 || (!emailStatus && !passwordStatus)) {
            dispatch(setValues('fail', true))
        } else {
            dispatch(loginRequest(user));
            dispatch(setValues('fail', false))
        }
    }
}

export function loginRequest(user) {

    return async dispatch => {
        dispatch(setValues('progress', true));
        try {
            const response = await Axios.post(
                API_URL,
                JSON.stringify({param: user, path: "Token/Obtain"}),
                );
            const userData = jwt_decode(response.data.access).data;
            const createUser = {
                firstName: userData.firstname,
                lastName: userData.lastname,
                user_id: userData.user_id
            };
            const jwt = {
                access: response.data.access,
                refresh: response.data.refresh
            };
            cookie.set('access', jwt.access);
            cookie.set('refresh', jwt.refresh);
            cookie.set('user', JSON.stringify(createUser));
            dispatch(setUser());
            dispatch(setValues('progress', false))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                dispatch(setValues('text', 'incorrect_value'))
            } else {
                dispatch(setValues('text', 'query_failed'))
            }
            dispatch(setValues('progress', false))
        }
    }
}

export function logout() {

    return dispatch => {
        cookie.remove('user');
        cookie.remove('access');
        cookie.remove('refresh');
        dispatch(setValues('user', null));
    }
}

// -------------------------------------------------
export function setValues(name, value) {

    return {
        type: SET_VALUES,
        name,
        value
    }
}

export function setUser(user) {

    return {
        type: SET_USER
    }
}