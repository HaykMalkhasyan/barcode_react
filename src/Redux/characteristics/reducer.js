import {
    CLOSE_AND_BACK,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    ONLY_CLOSE,
    OPEN_CLASSIFIERS, OPEN_HANDLER,
    SET_GROUP_VALUE
} from "./actionTypes";
import {BACK_TO_PRODUCT, CLOSE_MODALS, SET_SELECT_SUBS} from "../products/actionTypes";

const initialState = {
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
    searchResult: [],
    subgroup: null,
    customSubgroup: null,
    subgroups: [],
    errors: null,
    changeStatus: true,
    groupType: null,
    modalType: false,
    newGroup: {
        title_am: '',
        title_ru: '',
        title_en: '',
        required_group: false,
        group_type: '1'
    },
    newSubgroup: {
        name: '',
        image: []
    },
    error: null,
    allError: null,
    modalGroup: null,
    initialModalGroup: null,
    groupActiveId: null,
    delete: false,
    collapsedModalStatus: [],
    collapsed: [],

    groupId: null,
    controllerId: null,
    moveElement: null,
    collapsedGroup: [],

    classifierSubgroup: null,
    classifiersCollapsed: [],
    classifiersCollapsedGroup: [],
};

export default function characteristicsReducer(state = initialState, action) {

    switch (action.type) {
        case OPEN_HANDLER:
            return {
                ...state,
                newGroup: action.data,
                changeStatus: false,
                modalGroup: null
            };
        case CLOSE_HANDLER:
            return {
                ...state,
                moveElement: null,
                controllerId: null,
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
                moveElement: null,
                controllerId: null,
                newGroup: {
                    name: '',
                    required_group: false,
                    group_type: '1'
                },
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