import {
    ADD_GROUP_ACTION,
    ADD_GROUP_SET,
    ADD_SUBGROUP_ACTION,
    CHANGE_SUBGROUP_NAME,
    CHECK_GROUP_SET,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    DELETE_MODAL_CLOSE,
    EDIT_GROUP_ACTION,
    EDIT_GROUP_SET,
    EDIT_SUBGROUP_ACTION,
    END_EDITING, MOVING_START,
    OPEN_CLASSIFIERS,
    OPEN_HANDLER,
    PROD_GROUP_SET,
    SELECT_TREE_GROUP_ITEM,
    SELECT_TREE_ITEM, SET_BUFFER_COPY, SET_CUT_PASTE,
    SET_GROUP_VALUE,
    SET_MOVE_ACTION,
    SET_RENDERED_FILTER_TREE_VALUE,
    SET_RENDERED_TREE_VALUE,
    SET_WITHOUT_DELETED_GROUP,
    START_MOVE_ACTION
} from "./actionTypes";
import {BACK_TO_PRODUCT, CLOSE_MODALS, CLOSE_PRODUCT_MODAL, SET_SUBGROUP} from "../products/actionTypes";
import cookie from "../../services/cookies";

const initialState = {
    groupLoader: null,
    activeAction: null,
    nodeStatus: true,
    node: null,
    groupsEditMode: false,
    own_subgroups: null,
    own_status: false,
    own_move: false,
    own_select: null,
    buffer: null,
    own_id: null,
    edit: null,
    add: null,
    catId: null,
    subgroupName: '',
    newSubgroup: {},
    filter_subgroups: [],
    path: "",
    progress: false,
    active: 0,
    open: false,
    advancedSearch: false,
    group: null,
    customGroup: null,
    groups: [],
    search: '',
    classifiersSearch: '',
    subgroup: null,
    customSubgroup: null,
    subgroups: [],
    errors: null,
    changeStatus: true,
    groupType: null,
    modalType: false,
    classifierName: '',
    groupName: '',
    newGroup: {},
    error: null,
    allError: null,
    modalGroup: null,
    initialModalGroup: null,
    initialStatus: null,
    groupActiveId: null,
    delete: false,
    collapsedModalStatus: [],

    groupId: null,
    moveElement: null,
    classifiersModal: false,
    classifierSubgroup: null,
};

export default function characteristicsReducer(state = initialState, action) {

    switch (action.type) {
        case MOVING_START:
            return {
                ...state,
                buffer: null,
                activeAction: null,
                own_select: null,
                node: null,
                subgroup: null

            }
        case SET_CUT_PASTE:
            return {
                ...state,
                buffer: null,
                activeAction: null,
                own_select: null,
                node: null,
                subgroup: null
            }
        case SET_BUFFER_COPY:
            return {
                ...state,
                buffer: action.node,
                node: null,
                activeAction: action.act,
                own_select: null
            }
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state, own_subgroups: null
            }
        case SET_SUBGROUP:
            return {
                ...state,
                own_status: false,
                own_subgroups: null,
                classifiersModal: false
            }
        case SET_MOVE_ACTION:
            return {
                ...state, moveElement: null, activeAction: null, node: null, own_select: null,
            }
        case START_MOVE_ACTION:
            return {
                ...state,
                own_move: !state.own_move,
                buffer: null,
                activeAction: null,
                own_select: null,
                node: null,
                subgroup: null
            }
        case SET_WITHOUT_DELETED_GROUP:
            return {
                ...state,
                classifiersModal: false,
                modalGroup: 'edit',
                delete: false,
                subgroup: null,
                own_select: null,
                groupId: null,
                group: null,
                active: 0,
                groups: action.groups,
            }
        case DELETE_MODAL_CLOSE:
            return {
                ...state, delete: false, subgroup: null, own_select: null, groupId: null
            }
        case EDIT_GROUP_SET:
            return {
                ...state,
                groups: action.groups,
                classifiersModal: false,
                own_subgroups: null,
                own_move: false,
                own_select: null,
                moveElement: null,
                group: null,
                customSubgroup: null,
                collapsed: [],
                movingStatus: false,
                subgroup: null,
                groupId: null,
                classifierName: "",
                newGroup: {},
                groupActiveId: action.id,
                modalGroup: 'edit',
            }
        case EDIT_GROUP_ACTION:
            return {
                ...state, classifierName: action.value, newGroup: action.newGroup
            }
        case CHANGE_SUBGROUP_NAME:
            return {
                ...state, [action.name]: action.value
            }
        case END_EDITING:
            return {
                ...state,
                edit: null,
                add: null,
                node: null,
                moveElement: null,
                nodeStatus: true,
                activeAction: null,
                own_select: null,
                subgroupName: '',
                newSubgroup: {},
            }
        case EDIT_SUBGROUP_ACTION:
            return {
                ...state,
                activeAction: "edit",
                edit: action.newSubgroup.id,
                add: null,
                moveElement: null,
                subgroupName: action.subgroupName,
                newSubgroup: action.newSubgroup,
            }
        case ADD_GROUP_ACTION:
            return {
                ...state,
                add: 0,
                catId: action.id
            }
        case ADD_GROUP_SET:
            return {
                ...state,
                groups: action.data,
                newGroup: {
                    title_am: '',
                    title_ru: '',
                    title_en: '',
                    required_group: false,
                    group_type: '1',
                },
                modalType: false,
                groupType: null,
                groupName: '',
                [state.initialModalGroup]: state.initialStatus,

            }
        case ADD_SUBGROUP_ACTION:
            return {
                ...state,
                activeAction: "add",
                nodeStatus: false,
                edit: null,
                moveElement: null,
                add: action.id,
                subgroupName: '',
                newSubgroup: {},
            }
        case SELECT_TREE_GROUP_ITEM:
            return {
                ...state, groupId: action.id === state.groupId ? null : action.id, own_select: null
            }
        case SELECT_TREE_ITEM:
            return {
                ...state,
                node: action.id === state.own_select && state.node && action.catId === state.own_cat_id ? null : action.node,
                catId: action.catId,
                path: action.path,
                own_select: action.id === state.own_select ? null : action.id,
                own_cat_id: action.catId === state.own_cat_id ? null : action.catId,
                groupId: null,
            }
        case SET_RENDERED_FILTER_TREE_VALUE:
            return {
                ...state,
                filter_subgroups: action.value,
                changeStatus: true,
                progress: false,

            }
        case SET_RENDERED_TREE_VALUE:
            return {
                ...state,
                own_subgroups: action.value,
                progress: false,
                newSubgroup: {},
                subgroupName: '',
                catId: null,
                edit: null,
                add: null,
                node: null,
                groupId: null,
                nodeStatus: true,
                activeAction: null,
                own_select: null,
                path: null,
                changeStatus: true,
            }
        case OPEN_HANDLER:
            return {
                ...state,
                own_status: action.status,
                groupLoader: null,
                group: action.group,
                classifierName: action.data[`title_${cookie.get('language') || "am"}`],
                newGroup: action.data,
                changeStatus: false,
                modalGroup: null,
                classifiersModal: true
            };
        case CLOSE_HANDLER:
            return {
                ...state,
                groupsEditMode: false,
                classifiersModal: false,
                own_subgroups: null,
                own_move: false,
                own_select: null,
                moveElement: null,
                group: null,
                customSubgroup: null,
                collapsed: [],
                movingStatus: false,
                subgroup: null,
                groupId: null,
                newGroup: {
                    name: '',
                    required_group: false,
                    group_type: '1'
                }
            };
        case OPEN_CLASSIFIERS:
            return {
                ...state,
                classifiersModal: false,
                own_subgroups: null,
                own_move: false,
                own_select: null,
                moveElement: null,
                newGroup: {},
                groupActiveId: action.id,
                modalGroup: 'edit',
                groupId: null,
            };
        case CHECK_GROUP_SET:
            return {
                ...state,
                modalGroup: null,
                groupActiveId: null,
                classifiersSearch: '',
                initialModalGroup: null,
                active: action.index,
                open: `collapse-${action.id}`
            }
        case PROD_GROUP_SET:
        case CLOSE_CLASSIFIERS:
            return {
                ...state,
                groupsEditMode: false,
                modalGroup: null,
                groupActiveId: null,
                classifiersSearch: '',
                initialModalGroup: null
            };
        case CLOSE_MODALS:
            return {
                ...state, group: null, customSubgroup: null, classifiersCollapsed: []
            };
        case BACK_TO_PRODUCT:
            return {
                ...state, group: null, customSubgroup: null, classifiersCollapsed: []
            };
        case SET_GROUP_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}