import {SET_PRICE_TYPE, SET_PRICE_TYPE_ERROR, SET_PRICE_VALUE, START_REQUEST} from "./actionTypes";

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
        case SET_PRICE_TYPE:
            return {
                ...state, data: action.data, values: action.values, progress: false
            }
        case SET_PRICE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default:
            return {...state}
    }
}