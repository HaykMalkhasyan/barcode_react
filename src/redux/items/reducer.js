import {
    GET_ITEMS_REQUEST, GET_ITEMS_FAIL, GET_ITEMS_SUCCESS,
    GET_ITEM_REQUEST, GET_ITEM_FAIL, GET_ITEM_SUCCESS,
    ADD_ITEM_REQUEST, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS,
    EDIT_ITEM_REQUEST,EDIT_ITEM_FAIL,EDIT_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL,DELETE_ITEM_SUCCESS,
    SET_MODAL_VALUES,TOGGLE_MODAL
} from "./actionTypes";


const INIT_STATE = {
    items: [],
    item: {},
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                items: JSON.parse(action.result.data),
                errors: {},
            };
        case GET_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                item: JSON.parse(action.result.data)[0],
                errors: {},
            };
        case ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case ADD_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                items: [
                    ...state.items,
                    JSON.parse(action.result.data)[0]

                ]
            };
        case EDIT_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case EDIT_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                item: {},
                items: JSON.parse(action.result.data)
            };
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                item: {},
                items: JSON.parse(action.result.data)
            };
        case SET_MODAL_VALUES:
            return {
                ...state,
                item: {
                    ...state.item,
                    ...action.value
                },
            }
        case TOGGLE_MODAL:
            let newModal = {};
            newModal[action.modalType] = !state.modal[action.modalType];
            let item = (action.modalType==="edit")?{
                ...state.item,
                ...action.obj
            }:{
                ...action.obj
            }
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...newModal
                },
                item
            }
        default:
            return {...state};
    }
};


