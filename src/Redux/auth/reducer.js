import {SET_USER, SET_VALUES} from "./actionTypes";

const initialState = {
    progress: false,
    user: JSON.parse(localStorage.getItem('user')),
    access_token: localStorage.getItem('access'),
    refresh_token: localStorage.getItem('refresh'),
    fail: false,
    showPassword: false,
    text: null,
    emailStatus: null,
    passwordStatus: null,
    selected: null,
    email: '',
    password: '',
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
                access_token: action.jwt.access,
                refresh_token: action.jwt.refresh,
                fail: false,
                showPassword: false,
                text: null,
                emailStatus: null,
                passwordStatus: null,
                selected: null,
                email: '',
                password: '',
            }
        case SET_VALUES:
            return {
                ...state, [action.name]: action.value
            }
        default: return {...state}
    }
}