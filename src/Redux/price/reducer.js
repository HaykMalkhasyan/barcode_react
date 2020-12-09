import {
    SET_PRICE_TYPE,
    SET_PRICE_TYPE_ERROR,
    SET_PRICE_TYPE_WITH_VALUE,
    SET_PRICE_VALUE,
    START_REQUEST
} from "./actionTypes";
import {CLOSE_PRODUCT_MODAL} from "../products/actionTypes";

const initialState = {
    progress: false,
    error: false,
    // data
    data: null,
    // data values
    values: null,
};

export default function priceReducer(state = initialState, action) {

    switch (action.type) {
        case START_REQUEST:
            return {
                ...state, error: false, progress: true
            }
        case SET_PRICE_TYPE_ERROR:
            return {
                ...state, data: null, values: null, error: true, progress: false
            }
        case SET_PRICE_TYPE_WITH_VALUE:
            return {
                ...state, data: action.data, values: action.values, progress: false
            }
        case SET_PRICE_TYPE:
            return {
                ...state, data: action.data, progress: false
            }
        case SET_PRICE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,data: null, values: null, error: false, progress: false
            }
        default:
            return {...state}
    }
}