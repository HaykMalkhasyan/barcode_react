import {
    EDIT_CURRENCY, FETCH_CURRENCY_FAIL, FETCH_CURRENCY_REQUEST, FETCH_CURRENCY_SUCCESS,
    GET_ALL_CURRENCY_FAIL,
    GET_ALL_CURRENCY_REQUEST,
    GET_ALL_CURRENCY_SUCCESS,
    GET_ITEM_CURRENCY_FAIL,
    GET_ITEM_CURRENCY_REQUEST,
    GET_ITEM_CURRENCY_SUCCESS,
    SET_FORM_VALIDATE,
    SET_VALUES,
    TOGGLE_MODAL
} from "./actionTypes";
import {Put} from "../../utility/utils";

const initialState = {
    currency: null,
    loading: false,
    success: false,
    fail: false,
    isOpen: false,
    errors: {},
    formValidate: {
        name: false,
        short: false,
        value: false,
    },
    setCurrency: {
        id: '',
        name: '',
        short: '',
        value: '',
    }
}

export default function currencyReducer(state = initialState, action) {

    switch (action.type) {

        case GET_ALL_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_ALL_CURRENCY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_ALL_CURRENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                currency: action.result.results,
                errors: {},
            };
        case GET_ITEM_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_ITEM_CURRENCY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_ITEM_CURRENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                setCurrency: action.result,
                errors: {},
            };
        case FETCH_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case FETCH_CURRENCY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case FETCH_CURRENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                currency: Put(state.currency, action.result, 'id'),
                isOpen: false,
                errors: {},
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                setCurrency: action.cleanSetCurrency,
                formValidate: action.cleanFormValidate
            };
        case EDIT_CURRENCY:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case SET_VALUES:
            return {
                ...state,
                setCurrency: action.setCurrency,
                formValidate: action.formValidate
            };
        case SET_FORM_VALIDATE:
            return {
                ...state,
                formValidate: action.formValidate
            }
        default:
            return state;
    }
}