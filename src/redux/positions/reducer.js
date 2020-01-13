import {
    GET_POSITIONS_REQUEST, GET_POSITIONS_FAIL, GET_POSITIONS_SUCCESS,
    HANDLE
} from "./actionTypes";
import {ADD_MODAL, DELETE_MODAL, EDIT_MODAL, SET_MODAL_VALUES} from "../positions/actionTypes";


const INIT_STATE = {
    positions: [],
    pages:[],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_POSITIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_POSITIONS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_POSITIONS_SUCCESS:
            
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                positions: JSON.parse(action.result.data),
                errors: {},
            };

        case ADD_MODAL:
            return {
                ...state,
                modal:{
                    add: action.modal,
                    edit: false,
                    delete: false
                },
                // user: {}
            };
        case EDIT_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: action.modal,
                    delete: false
                },
            };
        case DELETE_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: false,
                    delete: action.modal
                },
                // user: {}
            };
        case SET_MODAL_VALUES:
            return {
                ...state,
                // user: {
                //     ...state.user,
                //     ...action.value
                // },

            };
        case HANDLE:
            let page = state.pages[action.parent_id];

            if(action.id){
                let tool = page.tools[action.id];
                if(tool[action.key] === undefined){
                    tool[action.key] = true;
                }
                tool[action.key] = !tool[action.key];

            }else{
                page[action.key] = !page[action.key];
            }

            return {
                ...state,
                pages:state.pages
            }
        default:
            return {...state};
    }
};


