import {
    REGISTRATION_REQUEST_ERROR,
    REGISTRATION_REQUEST_SUCCESS,
    SET_REGISTRATION_VALUES, VERIFY_ERROR,
    VERIFY_SUCCESS
} from "./actionTypes";

const initialState = {
    regSuccess: null,
    regError: null,
    regProgress: false,
    regVerifySuccess: null,
    regVerifyError: null,
    regText: null,
    regSelected: null,
    isEmpty: {},
    regName: '',
    regLastName: '',
    regEmail: '',
    RegEmailStatus: null,
    regPassword: '',
    regPassword_confirm: '',
    showRegPass: false,
    showRegConfPass: false,
    usagerules: false,
    wrongRegError: null,
};

export default function registrationReducer(state = initialState, action) {

    switch (action.type) {
        case VERIFY_SUCCESS:
            return {
                ...state, verifySuccess: action.data
            };
        case VERIFY_ERROR:
            return {
                ...state, verifyError: action.error
            };
        case REGISTRATION_REQUEST_SUCCESS:
            return {
                ...state, regSuccess: action.data, regError: null
            };
        case REGISTRATION_REQUEST_ERROR:
            return {
                ...state, regError: action.errorData, regSuccess: null
            };
        case SET_REGISTRATION_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}