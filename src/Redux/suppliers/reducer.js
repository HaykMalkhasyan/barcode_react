import {SET_ALL_SUPPLIERS, SET_PROGRESS, SET_SELECTED} from "./actionTypes";
import {CLOSE_PRODUCT_MODAL} from "../products/actionTypes";

const initialState = {
    progress: false,
    suppliers: null,
    selected: [],
};

export default function suppliersReducer(state = initialState, action) {

    switch (action.type) {
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state, suppliers: null, selected: null
            }
        case SET_SELECTED:
            return {
                ...state, selected: action.data
            }
        case SET_ALL_SUPPLIERS:
            return {
                ...state, suppliers: action.data, progress: false
            }
        case SET_PROGRESS:
            return {
                ...state, progress: action.bool_status
            }
        default:
            return {
                ...state
            }
    }
}