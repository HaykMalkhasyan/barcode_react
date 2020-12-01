import {SET_ALL_SUPPLIERS, SET_PROGRESS, SET_SELECTED} from "./actionTypes";
import {ADD_NEW_PRODUCT, CLOSE_PRODUCT_MODAL, SET_PRODUCT_MODAL_VALUES} from "../products/actionTypes";

const initialState = {
    progress: false,
    suppliers: null,
    selected: [],
};

export default function suppliersReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCT_MODAL_VALUES:
            return {
                ...state, selected: action.selected
            }
        case ADD_NEW_PRODUCT:
            return {
                ...state, selected: [], suppliers: null
            }
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state, suppliers: null, selected: []
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