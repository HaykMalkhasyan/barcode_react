import axios from 'axios'
import {
    EDIT_CURRENCY,
    GET_ALL_CURRENCY_FAIL,
    GET_ALL_CURRENCY_REQUEST,
    GET_ALL_CURRENCY_SUCCESS, SET_FORM_VALIDATE, SET_VALUES,
    TOGGLE_MODAL
} from "./actionTypes";

export const getAllCurrency = () => {

    return {
        types: [GET_ALL_CURRENCY_REQUEST, GET_ALL_CURRENCY_FAIL, GET_ALL_CURRENCY_SUCCESS],
        promise: (apiClient) => apiClient.gett('currency/')
    }
}

export const toggleModal = () => {
    let cleanSetCurrency = {
        name: '',
        short: '',
        value: '',
    }

    let cleanFormValidate = {
        name: false,
        nameTouched: false,
        short: false,
        ShortTouched: false,
        value: false,
        ValueTouched: false,
    }

    return {
        type: TOGGLE_MODAL,
        cleanSetCurrency,
        cleanFormValidate
    }
}

export const editCurrency = (/*need changed*/) => {

    return {
        type: EDIT_CURRENCY
    }
}

export const setCurrencyValue = (name, value) => {

    return (dispatch, getState) => {
        const setCurrency = getState().currency.setCurrency;
        const formValidate = getState().currency.formValidate;
        formValidate[`${name}Touched`] = true;
        setCurrency[name] = value;
        dispatch(setValue(setCurrency, formValidate))
    }
}

export const setValue = (setCurrency, formValidate) => {

    return {
        type: SET_VALUES,
        setCurrency,
        formValidate
    }
}

export const checkCurrencyValue = (name, value) => {

    return (dispatch, getState) => {
        const formValidate = getState().currency.formValidate;
        if (value.length === 0) {
            formValidate[name] = `The '${name}' field must not be empty`;
            dispatch(setFormValidate(formValidate))
        }
        if (value.length > 0) {
            formValidate[name] = false;
            dispatch(setFormValidate(formValidate));
        }
        if (name !== 'value') {
            for (let item of value) {
                if (item/2) {
                    formValidate[name] = `'${name}' field must not be digits`;
                    dispatch(setFormValidate(formValidate))
                }
            }
        }
    }
}

export const setFormValidate = formValidate => {

    return {
        type: SET_FORM_VALIDATE,
        formValidate
    }
}

export const fetchCurrency = () => {
    return dispatch => {
        console.log('SENDEND')
    }
}