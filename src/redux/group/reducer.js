import {
    GET_GROUPS_REQUEST,GET_GROUPS_FAIL,GET_GROUPS_SUCCESS,
    GET_GROUP_REQUEST,GET_GROUP_FAIL,GET_GROUP_SUCCESS,
    ADD_GROUP_REQUEST,ADD_GROUP_FAIL,ADD_GROUP_SUCCESS,
    EDIT_GROUP_REQUEST,EDIT_GROUP_FAIL,EDIT_GROUP_SUCCESS,
    DELETE_GROUP_REQUEST,DELETE_GROUP_FAIL,DELETE_GROUP_SUCCESS,
    GET_SUB_GROUP_REQUEST,GET_SUB_GROUP_FAIL,GET_SUB_GROUP_SUCCESS,
    ADD_SUB_GROUP_REQUEST,ADD_SUB_GROUP_FAIL,ADD_SUB_GROUP_SUCCESS,
    EDIT_SUB_GROUP_REQUEST,EDIT_SUB_GROUP_FAIL,EDIT_SUB_GROUP_SUCCESS,
    DELETE_SUB_GROUP_REQUEST,DELETE_SUB_GROUP_FAIL,DELETE_SUB_GROUP_SUCCESS,
    SET_GROUP_MODAL,TOGGLE_GROUP_MODAL,TOGGLE_SUB_GROUP_MODAL,OPEN_MENU,
    SELECT_GROUP
} from "./actionTypes";
import {IsRequiredField,IsRequiredFields,PutObjectValues,RemoveObjectValues} from "../../utility/utils";
import {openMenu,addElement,editElement,deleteElement} from "./functions";

const INIT_STATE = {
    groups: [],
    group:{},
    modal: {},
    subModal: {},
    required: ["name"],
    selected:{},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROUPS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal:{},
                subModal: {},
                errors: {},
            };
        case GET_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal:{},
                subModal: {},
                fail: true,
            };
        case GET_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal:{},
                subModal: {},
                groups: JSON.parse(action.result.data),
                errors: {},
            };
        case GET_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                group: JSON.parse(action.result.data)[Object.keys(JSON.parse(action.result.data))[0]],
                errors: {},
            };
        case ADD_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.group,state.errors)
            }
        case ADD_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                groups: JSON.parse(action.result.data)
            };
        case EDIT_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required,state.group,state.errors)
            }
        case EDIT_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                group: {},
                groups: PutObjectValues(state.groups,JSON.parse(action.result.data))
            };
        case DELETE_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                group: {},
                groups: RemoveObjectValues(state.groups,JSON.parse(action.result.data)['id'])
            };
        case GET_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_SUB_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                group: JSON.parse(action.result.data),
                errors: {},
            };
        case ADD_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors:IsRequiredFields(state.required,state.group,state.errors)
            }
        case ADD_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_SUB_GROUP_SUCCESS:
            let addEl =  JSON.parse(action.result.data);
            console.log(addEl)
            state.groups[addEl.group_id].subGroup = addElement(state.groups[addEl.group_id].subGroup,addEl);
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subModal: {},
                groups: state.groups
            };
        case EDIT_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required,state.group,state.errors)
            }
        case EDIT_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_SUB_GROUP_SUCCESS:
            let EditEl =  JSON.parse(action.result.data);
            state.groups[EditEl.group_id].subGroup = editElement(state.groups[EditEl.group_id].subGroup,EditEl);
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subModal: {},
                group: {},
                groups: state.groups
            };
        case DELETE_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_SUB_GROUP_SUCCESS:
            let delEl =  JSON.parse(action.result.data);
            state.groups[delEl.group_id].subGroup = deleteElement(state.groups[delEl.group_id].subGroup,delEl.id);
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subModal: {},
                group: {},
                groups: state.groups
            };

        case SET_GROUP_MODAL:
            if(action.lang){
                if(!state.group[action.key]){
                    state.group[action.key] = {}
                }
                state.group[action.key][action.lang] = action.value;
            }else{
                state.group[action.key] = action.value;
            }
            return {
                ...state,
                errors:IsRequiredField(state.required,action,state.errors)
            };
        case TOGGLE_GROUP_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];
            if(action.obj){
                if(action.modalType==="edit"){
                    state.group[action.obj.key] = action.obj.value
                }else{
                    state.group = action.obj
                }
            }

            return {
                ...state,
                errors: {},
                subModal: {}
            }
        case TOGGLE_SUB_GROUP_MODAL:
            state.subModal[action.modalType] = !state.subModal[action.modalType];
            let obj = action.obj
            if(obj){
                if(action.modalType==="edit"){
                    state.group = {
                        ...state.group,
                        ...obj
                    }
                }else{
                    state.group = obj
                }
            }

            return {
                ...state,
                errors: {},
                modal: {}
            }
        case OPEN_MENU:
            state.groups[action.group_id].subGroup = openMenu(state.groups[action.group_id].subGroup,action.id,"open");
            return {
                ...state,
                groups: state.groups
            }
        case SELECT_GROUP:
            state.selected[action.group_id] = action.value
            return {
                ...state,
            }
        default:
            return {...state};
    }
};


