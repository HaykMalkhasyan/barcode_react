import {
    GET_GROUPS_REQUEST,
    GET_GROUPS_FAIL,
    GET_GROUPS_SUCCESS,
    GET_GROUP_REQUEST,
    GET_GROUP_FAIL,
    GET_GROUP_SUCCESS,
    ADD_GROUP_REQUEST,
    ADD_GROUP_FAIL,
    ADD_GROUP_SUCCESS,
    EDIT_GROUP_REQUEST,
    EDIT_GROUP_FAIL,
    EDIT_GROUP_SUCCESS,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_FAIL,
    DELETE_GROUP_SUCCESS,
    GET_SUB_GROUP_REQUEST,
    GET_SUB_GROUP_FAIL,
    GET_SUB_GROUP_SUCCESS,
    ADD_SUB_GROUP_REQUEST,
    ADD_SUB_GROUP_FAIL,
    ADD_SUB_GROUP_SUCCESS,
    EDIT_SUB_GROUP_REQUEST,
    EDIT_SUB_GROUP_FAIL,
    EDIT_SUB_GROUP_SUCCESS,
    DELETE_SUB_GROUP_REQUEST,
    DELETE_SUB_GROUP_FAIL,
    DELETE_SUB_GROUP_SUCCESS,
    SET_GROUP_MODAL,
    TOGGLE_GROUP_MODAL,
    TOGGLE_SUB_GROUP_MODAL,
    OPEN_MENU,
    SELECT_GROUP,
    GET_SUB_GROUPS_REQUEST,
    GET_SUB_GROUPS_FAIL,
    GET_SUB_GROUPS_SUCCESS,
    SELECT_GROUPS_REQUEST,
    SELECT_GROUPS_FAIL,
    SELECT_GROUPS_SUCCESS,
    SET_TOGGLE_SUB_MODAL_VALUE,
    SET_SUB_MODAL_NAME_VALUE,
    TOGGLE_SUB_MODAL,
    START_MOVING_GROUP,
    END_MOVING_GROUP,
    SET_SEARCH_VALUE,
    SHOW_ALTERNATIVE,
    SET_PRODUCT_GROUPS, SET_ALT_SEARCH_VALUE, ADD_EXPENDED, TOGGLE_EDITEBLED, SET_COLLAPSED
} from "./actionTypes";
import {IsRequiredField, Put, IsRequiredFields, Pushend, changeElement, RemoveItem} from "../../utility/utils";
import {openMenu} from "./functions";

const INIT_STATE = {
    groups: [],
    group: {},
    subGroups: [],
    subGroup: {},
    modal: {},
    subModal: {},
    required: ["name"],
    selected: {},
    loading: false,
    success: false,
    fail: false,
    errors: {},
    movingGroupStatus: false,
    movingstatus: false,
    search: null,
    alternative: true,
    searchAltResult: [],
    searchResItem: null,
    searchResult: [],
    productGroups: [],
    expanded: null,
    editabled: false,
    collapsedStatus: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_COLLAPSED:
            return {
                ...state,
                collapsedStatus: action.collapsedStatus
            }
        case TOGGLE_EDITEBLED:
            return {
                ...state,
                editabled: !state.editabled
            }
        case ADD_EXPENDED:
            return {
                ...state,
                expanded: action.nodeId
            }
        case SET_ALT_SEARCH_VALUE:
            return {
                ...state,
                searchAltResult: action.searchAltResult
            }
        case SET_PRODUCT_GROUPS:
            return {
                ...state,
                productGroups: action.productGroups,
                selected: action.selected
            }
        case SHOW_ALTERNATIVE:
            return {
                ...state,
                alternative: !state.alternative
            }
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchResult: action.searchResult,
                search: action.search,
                expanded: action.expanded,
                searchResItem: action.searchResItem
            }
        case END_MOVING_GROUP:
            return {
                ...state,
                movingGroupStatus: false
            }
        case START_MOVING_GROUP:
            return {
                ...state,
                movingGroupStatus: action.id
            }
        case TOGGLE_SUB_MODAL:
            return {
                ...state,
                subModal: {}
            }
        case SET_TOGGLE_SUB_MODAL_VALUE:
            return action.subGroup ?
                {
                    ...state,
                    subModal: action.subModal,
                    subGroup: action.subGroup
                }
                :
                {
                    ...state,
                    subModal: action.subModal,
                }
        case SET_SUB_MODAL_NAME_VALUE:
            return {
                ...state,
                subGroup: action.subGroup
            }
        case SELECT_GROUPS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
                subModal: {},
                errors: {},
            };
        case SELECT_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                subModal: {},
                fail: true,
            };
        case SELECT_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                subModal: {},
                group: action.result,
                expanded: [`${action.id}`],
                search: null,
                searchResult: [],
                errors: {},
            };
        case GET_GROUPS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
                subModal: {},
                errors: {},
            };
        case GET_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                subModal: {},
                fail: true,
            };
        case GET_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                subModal: {},
                groups: action.result.results,
                group: action.result.results[0],
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
                group: action.result,
                errors: {},
            };
        case ADD_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.group, state.errors)
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
                groups: Pushend(state.groups, action.result)
            };
        case EDIT_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.group, state.errors)
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
                groups: changeElement(state.groups, action.result),
                modal: {},
                loading: false,
                success: true,
                fail: false,
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
                groups: RemoveItem(state.groups, action.data),
                modal: {},
                loading: false,
                success: true,
                fail: false,
                group: {}
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
                subGroup: action.result,
                errors: {},
            };
        case GET_SUB_GROUPS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_SUB_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_SUB_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subGroups: action.result.results,
                errors: {},
            };
        case ADD_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.group, state.errors)
            }
        case ADD_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_SUB_GROUP_SUCCESS:
            return {
                ...state,
                subGroups: Pushend(state.subGroups, action.result),
                subModal: {},
                loading: false,
                success: true,
                fail: false
            };
        case EDIT_SUB_GROUP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.group, state.errors)
            }
        case EDIT_SUB_GROUP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_SUB_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subModal: {},
                movingGroupStatus: false,
                subGroups: Put(state.subGroups, action.result, 'id'),
                searchResult: state.searchResult.length > 0 ? Put(state.searchResult, action.result, 'id') : [],
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
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                subGroups: RemoveItem(state.subGroups, {id: action.data}),
                searchResult: state.searchResult.length > 0 ? RemoveItem(action.data, {id: action.data}) : [],
            };

        case SET_GROUP_MODAL:
            state.group[action.key] = action.value;
            return {
                ...state,
                errors: IsRequiredField(state.required, action, state.errors)
            };
        case TOGGLE_GROUP_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];
            if (action.obj) {
                if (action.modalType === "edit") {
                    state.group[action.obj.key] = action.obj.value
                } else {
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
            if (obj) {
                if (action.modalType === "edit") {
                    state.subGroup = {
                        ...state.subGroup,
                        ...obj
                    }
                } else {
                    state.subGroup = obj
                }
            }

            return {
                ...state,
                errors: {},
                modal: {}
            }
        case OPEN_MENU:
            state.groups[action.group_id].subGroup = openMenu(state.groups[action.group_id].subGroup, action.id, "open");
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


