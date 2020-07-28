import {SET_USER, SET_VALUES} from "./actionTypes";
import Axios from "axios";
import jwt_decode from 'jwt-decode'

const API_URL = process.env.REACT_APP_API_URL;

export function login() {

    return (dispatch, getState) => {
        const emailStatus = getState().auth.emailStatus;
        const passwordStatus = getState().auth.passwordStatus;
        const user = {
            username: getState().auth.email,
            password: getState().auth.password
        }
        if (user.username.length === 0 || user.password.length < 6 || user.password.length > 32 || (!emailStatus && !passwordStatus)) {
            dispatch(setValues('fail', true))
        } else {
            dispatch(loginRequest(user))
            dispatch(setValues('fail', false))
        }
    }
}

export function loginRequest(user) {

    return async dispatch => {
        dispatch(setValues('progress', true))
        try {
            const response = await Axios.post(`${API_URL}/token/obtain/`, user);
            const userData = jwt_decode(response.data.access)
            const createUser = {
                firstName: userData.firstname,
                lastName: userData.lastname,
                user_id: userData.user_id
            }
            const jwt = {
                access: response.data.access,
                refresh: response.data.refresh
            }
            localStorage.setItem('access', jwt.access)
            localStorage.setItem('refresh', jwt.refresh)
            localStorage.setItem('user', JSON.stringify(createUser))
            dispatch(setUser(jwt, createUser))
            dispatch(setValues('progress', false))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                dispatch(setValues('text', 'Մուտքագրված տվյալները սխալ են'))
            } else {
                dispatch(setValues('text', 'Հարցումը չհաջողվեց'))
            }
            dispatch(setValues('progress', false))
        }
    }
}

export function logout() {

    return dispatch => {
        localStorage.removeItem('user')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        dispatch(setValues('user', null))
        dispatch(setValues('access_token', null))
        dispatch(setValues('refresh_token', null))
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

export function setUser(jwt, user) {

    return {
        type: SET_USER,
        jwt,
        user
    }
}