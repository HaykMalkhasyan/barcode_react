import {
    ACTIONS_TO_GROUPS,
    ADD_CLASSIFIER_ACTION,
    ADD_GROUP_ACTION,
    ADD_GROUP_SET,
    ADD_SUBGROUP_ACTION, CHANGE_SUBGROUP_NAME,
    CLOSE_AND_BACK,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    DELETE_MODAL_CLOSE,
    EDIT_GROUP_ACTION,
    EDIT_GROUP_SET,
    EDIT_SUBGROUP_ACTION,
    ONLY_CLOSE,
    OPEN_CLASSIFIERS,
    OPEN_HANDLER,
    SELECT_TREE_GROUP_ITEM,
    SELECT_TREE_ITEM,
    SET_GROUP_VALUE, SET_RENDERED_FILTER_TREE_VALUE,
    SET_RENDERED_TREE_VALUE, SET_WITHOUT_DELETED_GROUP
} from "./actionTypes";
import {BACK_TO_PRODUCT, CLOSE_MODALS, SET_SELECT_SUBS} from "../products/actionTypes";
import cookie from "../../services/cookies";

const initialState = {
    own_subgroups: [],
    own_move: null,
    own_select: null,
    own_id: null,
    edit: null,
    catId: null,
    subgroupName: '',
    newSubgroup: {},
    filter_subgroups: [],
    path: "",
    progress: false,
    active: 0,
    open: false,
    changePositionStatus: false,
    advancedSearch: false,
    group: null,
    customGroup: null,
    groups: [],
    search: '',
    classifiersSearch: '',
    touched: false,
    subgroup: null,
    customSubgroup: null,
    subgroups: [],
    errors: null,
    changeStatus: true,
    groupType: null,
    modalType: false,
    classifierName: '',
    groupName: '',
    newGroup: {
        title_am: '',
        title_ru: '',
        title_en: '',
        required_group: false,
        group_type: '1'
    },
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
                own_subgroups: [],
                own_move: null,
                own_select: null,
                moveElement: null,
                group: null,
                customSubgroup: null,
                collapsed: [],
                movingStatus: false,
                subgroup: null,
                groupId: null,
                changePositionStatus: false,
                classifierName: "",
                newGroup: {},
                controllerId: null,
                groupActiveId: action.id,
                modalGroup: 'edit',
            }
        case EDIT_GROUP_ACTION:
            return {
                ...state, classifierName: action.value, newGroup: action.newGroup
            }
        case ACTIONS_TO_GROUPS:
            return {
                ...state,
                [action.modalType]: action.status,
                modalType: false,
                groupType: null,
                newGroup: {},
                newSubgroup: {
                    name: '',
                    image: []
                },
                groupName: '',
                own_select: null,
                catId: null,
                groupId: null,
                subgroup: null,
            }
        case CHANGE_SUBGROUP_NAME:
            return {
                ...state, [action.name]: action.value
            }
        case EDIT_SUBGROUP_ACTION:
            return {
                ...state,
                edit: action.newSubgroup.id,
                subgroupName: action.subgroupName,
                newSubgroup: action.newSubgroup,
                // groupName: action.groupName,
                // modalType: 'edit',
                // groupType: 'subgroup',
                // classifiersModal: false,
                // initialModalGroup: 'classifiersModal',
                // initialStatus: state.classifiersModal,
            }
        case ADD_CLASSIFIER_ACTION:
            return {
                ...state,
                modalType: 'add',
                groupType: 'group',
                initialModalGroup: 'modalGroup',
                initialStatus: action.status,
                modalGroup: null
            }
        case ADD_GROUP_ACTION:
            return {
                ...state,
                modalType: 'add',
                groupType: 'inGroup',
                initialModalGroup: 'classifiersModal',
                initialStatus: state.classifiersModal,
                classifiersModal: false
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
                modalType: 'add',
                groupType: 'subgroup',
                own_id: action.id,
                initialModalGroup: 'classifiersModal',
                initialStatus: state.classifiersModal,
                // classifiersModal: false
            }
        case SELECT_TREE_GROUP_ITEM:
            return {
                ...state, groupId: action.id === state.groupId ? null : action.id, own_select: null
            }
        case SELECT_TREE_ITEM:
            return {
                ...state,
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
                changeStatus: true,
                progress: false,
                newSubgroup: {},
                subgroupName: '',
                catId: null,
                edit: null,
                own_select: null,
                path: null,
                own_subgroups: action.value,
            }
        case OPEN_HANDLER:
            return {
                ...state,
                classifiersModal: true,
                group: action.group,
                classifierName: action.data[`title_${cookie.get('language') || "am"}`],
                newGroup: action.data,
                changeStatus: false,
                modalGroup: null
            };
        case CLOSE_HANDLER:
            return {
                ...state,
                classifiersModal: false,
                own_subgroups: [],
                own_move: null,
                own_select: null,
                moveElement: null,
                group: null,
                customSubgroup: null,
                collapsed: [],
                movingStatus: false,
                subgroup: null,
                groupId: null,
                changePositionStatus: false,
                newGroup: {
                    name: '',
                    required_group: false,
                    group_type: '1'
                }
            };
        case CLOSE_AND_BACK:
            return {
                ...state,
                modalType: false,
                groupType: null,
                newSubgroup: {name: '', image: null},
                error: null
            };
        case ONLY_CLOSE:
            return {
                ...state,
                newGroup: {name: '', required_group: false, group_type: '1'},
                subgroup: null,
                group: null,
                customSubgroup: null,
                collapsedModalStatus: [],
                initialModalGroup: null,
                initialOpen: null
            };
        case OPEN_CLASSIFIERS:
            return {
                ...state,
                classifiersModal: false,
                own_subgroups: [],
                own_move: null,
                own_select: null,
                moveElement: null,
                controllerId: null,
                newGroup: {},
                groupActiveId: action.id,
                modalGroup: 'edit',
                groupId: null,
                changePositionStatus: false,
            };
        case CLOSE_CLASSIFIERS:
            return {
                ...state,
                modalGroup: null,
                groupActiveId: null,
                classifiersSearch: '',
                touched: false,
                initialModalGroup: null
            };
        case SET_SELECT_SUBS:
            return {
                ...state, classifiersCollapsed: []
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