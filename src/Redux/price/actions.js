import {
    SET_PRICE_TYPE,
    SET_PRICE_TYPE_ERROR,
    SET_PRICE_TYPE_WITH_VALUE,
    SET_PRICE_VALUE,
    START_REQUEST
} from "./actionTypes";
import cookie from "../../services/cookies";
import Axios from "axios";
import {getHeaders} from "../../services/services";

const API_URL = process.env.REACT_APP_API_URL;

export function getProductPricePrice(prices) {

    return dispatch => {
        const values = {};
        for (let price of prices) {
            values[price.sub_shop_id] = price.item_price.toString()
        }
        dispatch(setPriceValue("values", values))
    }
}

export function getPriceTypeRequest() {

    return async (dispatch, getState) => {
        dispatch(startRequest())
        if (cookie.get("access")) {
            try {
                const check_values = getState().price.values;
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Prices/Price", cols: "id, name"}));
                const data = response.data.results;
                const values = {};
                for (let item of data) {
                    values[item.id] = '';
                }
                if (check_values === null) {
                    dispatch(setPriceType(data, values))
                } else {
                    dispatch(setPriceType(data))
                }
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

export function setPriceType(data, values = null) {


    return values === null ?
        {
            type: SET_PRICE_TYPE, data
        }
        :
        {
            type: SET_PRICE_TYPE_WITH_VALUE, data, values
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