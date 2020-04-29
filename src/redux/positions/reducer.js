import  {
    GET_POSITIONS_REQUEST, GET_POSITIONS_FAIL, GET_POSITIONS_SUCCESS,
    GET_POSITION_REQUEST, GET_POSITION_FAIL, GET_POSITION_SUCCESS,
    ADD_POSITION_REQUEST, ADD_POSITION_FAIL, ADD_POSITION_SUCCESS,
    EDIT_POSITION_REQUEST, EDIT_POSITION_FAIL, EDIT_POSITION_SUCCESS,
    DELETE_POSITION_REQUEST, DELETE_POSITION_FAIL, DELETE_POSITION_SUCCESS,
    SET_POSITION_MODAL,HANDLE,TOGGLE_POSITION_MODAL
} from "./actionTypes";
import {ChangePositionItem, IsRequiredField, IsRequiredFields, Push, Remove} from "../../utility/utils";

const INIT_STATE = {
    positions: [],
    position: {},
    required:["name"],
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
                positions: action.result.results,
                errors: {},
            };
        case GET_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_POSITION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                position: action.result,
                errors: {},
            };
        case ADD_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.position,state.errors)
            }
        case ADD_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_POSITION_SUCCESS:
            return {
                ...state,
                positions: Push(state.positions,action.result),
                modal: {},
                loading: false,
                success: true,
                fail: false
            };
        case EDIT_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.position,state.errors)
            }
        case EDIT_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_POSITION_SUCCESS:
            return {
                ...state,
                positions: ChangePositionItem(state.positions, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {},
                position: {}
            };
        case DELETE_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_POSITION_SUCCESS:
            return {
                ...state,
                modal: {},
                positions: Remove(state.positions, action.result,'id'),
                loading: false,
                success: true,
                fail: false,
                position: {}
            };
        case SET_POSITION_MODAL:
            state.position[action.key] = action.value
            return {
                ...state,
                errors: IsRequiredField(state.required,action,state.errors)
            };
        case TOGGLE_POSITION_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if(action.obj){
                if(action.modalType==="edit"){
                    state.position[action.obj.key] = action.obj.value
                }else{
                    state.position = action.obj
                }
            }
            return {
                ...state,
                errors:{}
            }
        case HANDLE:
            if (!state.position.perm) {
                state.position.perm = {}
            }
            let perm = state.position.perm;
            if (action.parentId) {
                if (perm[action.parentId]) {
                    let index = perm[action.parentId].indexOf(action.id);
                    if (index !== -1) {
                        perm[action.parentId].splice(index, 1);
                        if (perm[action.parentId].length === 0) {
                            delete perm[action.parentId];
                        }
                    } else {
                        perm[action.parentId].push(action.id)
                    }
                } else {
                    perm[action.parentId] = [action.id]
                }
            } else {
                if (perm[action.id]) {
                    delete perm[action.id];
                } else {
                    perm[action.id] = [];
                }

            }
            return {
                ...state,
                position: {
                    id: state.position.id,
                    name: state.position.name,
                    perm: perm
                }
            }

        default:
            return {...state};
    }
};


