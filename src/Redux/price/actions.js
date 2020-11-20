import {SET_PRICE_TYPE, SET_PRICE_TYPE_ERROR, SET_PRICE_VALUE, START_REQUEST} from "./actionTypes";
import cookie from "../../services/cookies";
import Axios from "axios";
import {getHeaders} from "../../services/services";

const API_URL = process.env.REACT_APP_API_URL;

export function getPriceTypeRequest() {

    return async dispatch => {
        dispatch(startRequest())
        if (cookie.get("access")) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Prices/Price", cols: "id, name"}));
                const data = response.data.results;
                const values = {};
                for (let item of data) {
                    values[item.id] = '';
                }
                dispatch(setPriceType(data, values))
            } catch (error) {
                dispatch(setPriceTypeRequestError())
                console.log("Price error")
            }
        }
    }
}

export function startRequest() {

    return {
        type: START_REQUEST
    }
}

export function setPriceType(data, values) {

    return {
        type: SET_PRICE_TYPE, data, values
    }
}

export function setPriceTypeRequestError() {

    return {
        type: SET_PRICE_TYPE_ERROR
    }
}

export function setPriceValue(name, value) {

    return {
        type: SET_PRICE_VALUE, name, value
    }
}