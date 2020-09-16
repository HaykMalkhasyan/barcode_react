import {SET_PRICE_VALUE} from "./actionTypes";

const initialState = {
    open: false,
    focus: null
};

export default function priceReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRICE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default:
            return {...state}
    }
}