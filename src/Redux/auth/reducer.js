import {SET_USER, SET_VALUES} from "./actionTypes";
import cookie from "../../services/cookies";

const initialState = {
    progress: false,
    user: cookie.get('user'),
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
                fail: false,
                showPassword: false,
                text: null,
                emailStatus: null,
                passwordStatus: null,
                selected: null,
                email: '',
                password: '',
            };
        case SET_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}