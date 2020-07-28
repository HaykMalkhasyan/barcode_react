import {SET_PRODUCT_VALUES} from "./actionTypes";

const initialState = {
    advancedSearchConfig: {},
    collapsedStatus: [],
    open: false,
    scroll: 'paper',
    classifiersModal: false,
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCT_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}