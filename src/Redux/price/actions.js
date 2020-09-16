import {SET_PRICE_VALUE} from "./actionTypes";

export function setPriceValue(name, value) {

    return {
        type: SET_PRICE_VALUE, name, value
    }
}