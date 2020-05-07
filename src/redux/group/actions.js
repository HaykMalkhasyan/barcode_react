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
    SET_SUB_MODAL_NAME_VALUE, TOGGLE_SUB_MODAL, START_MOVING_GROUP, END_MOVING_GROUP, SET_SEARCH_VALUE, SHOW_ALTERNATIVE
} from "./actionTypes";
import main from "react-stepzilla/dist/main";


let cols = 'id,name';

export const groupActions = (type, data) => {
    switch (type) {
        case "get":
            return {
                types: [GET_GROUP_REQUEST, GET_GROUP_FAIL, GET_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.gett(`group/${data.id}`)
            }
        case "getAll":
            return {
                types: [GET_GROUPS_REQUEST, GET_GROUPS_FAIL, GET_GROUPS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`group/?page_size=10000`, {cols})
            }
        case "add":
            return {
                types: [ADD_GROUP_REQUEST, ADD_GROUP_FAIL, ADD_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`group/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_GROUP_REQUEST, EDIT_GROUP_FAIL, EDIT_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.putt(`group/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_GROUP_REQUEST, DELETE_GROUP_FAIL, DELETE_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`group/${data.id}`, {cols}),
                data
            }
        default:
            return;
    }
};

export const getSeletGroup = id => {

    return {
        types: [SELECT_GROUPS_REQUEST, SELECT_GROUPS_FAIL, SELECT_GROUPS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`group/${id}`)
    }
}

export const getSubGroup = id => {

    return {
        types: [GET_SUB_GROUPS_REQUEST, GET_SUB_GROUPS_FAIL, GET_SUB_GROUPS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`subgroup/?group_id=${id}&page_size=10000`)
    }
}

export const subGroupActions = (type, data) => {
    switch (type) {
        case "getAll":
            return {
                types: [GET_SUB_GROUPS_REQUEST, GET_SUB_GROUPS_FAIL, GET_SUB_GROUPS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`subgroup/?page_size=10000`)
            }
        case "get":
            return {
                types: [GET_SUB_GROUP_REQUEST, GET_SUB_GROUP_FAIL, GET_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.gett(`subgroup/${data}`)
            }
        case "add":
            return {
                types: [ADD_SUB_GROUP_REQUEST, ADD_SUB_GROUP_FAIL, ADD_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`subgroup/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_SUB_GROUP_REQUEST, EDIT_SUB_GROUP_FAIL, EDIT_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.putt(`subgroup/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_SUB_GROUP_REQUEST, DELETE_SUB_GROUP_FAIL, DELETE_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`subgroup/${data}`, {cols}),
                data
            }
        default:
            return;
    }
};


export const setModalValues = (key, value) => {
    return {
        type: SET_GROUP_MODAL,
        key,
        value,
    }
}

export const toggleModal = (modalType, id) => {
    let obj = (id) ? {"id": id} : {};
    return {
        type: TOGGLE_GROUP_MODAL,
        modalType,
        obj
    }
}
/*---------------------------------------------------------------------------*/
export const setActionToggleSubModal = (modalType, group_id = null, id = null) => {

    return (dispatch, getState) => {

        switch (modalType) {

            case 'add': {
                let subModal = getState().group.subModal;
                let subGroup = getState().group.subGroup;
                subModal[modalType] = !subModal[modalType];
                subGroup = {
                    name: '',
                    parent_id: id ? id : '',
                    group_id: {
                        id: group_id
                    }
                }
                dispatch(setToggleSubModalValue(subModal, subGroup))
                break;
            }
            case 'edit': {
                let subModal = getState().group.subModal;
                let subGroup = getState().group.subGroup;
                subModal[modalType] = !subModal[modalType];
                dispatch(setToggleSubModalValue(subModal, subGroup))
                break;
            }
            default: {
                dispatch(ToggleSubModal())
                break;
            }
        }

    }
}

export function ToggleSubModal() {


    return {
        type: TOGGLE_SUB_MODAL
    }
}

export function setToggleSubModalValue(subModal, subGroup = false) {

    return {
        type: SET_TOGGLE_SUB_MODAL_VALUE,
        subModal,
        subGroup
    }
}

export function setSubModalName(type, value) {

    return (dispatch, getState) => {
        let subGroup = getState().group.subGroup;
        subGroup[type] = value;
        subGroup.active = 0;
        dispatch(setSubModalNameValue(subGroup))
    }
}

export function setSubModalNameValue(subGroup) {

    return {
        type: SET_SUB_MODAL_NAME_VALUE,
        subGroup
    }
}

export function startMovingGroup(id) {

    return {
        type: START_MOVING_GROUP,
        id
    }
}

export function endeMovingGroup() {

    return {
        type: END_MOVING_GROUP
    }
}

export function editPosition(id) {

    return (dispatch, getState) => {
        let subGroup = getState().group.subGroup;
        subGroup.parent_id = id;
        dispatch(subGroupActions('edit', subGroup))
    }
}

export function searchGroups(name, value, mainId) {

    return (dispatch, getState) => {
        if (value.length > 0) {
            let group = getState().group;
            let search = getState().group[name];
            search = {
                id: mainId,
                value: value ? value : null
            }
            let subGroupsOrigin = group.subGroups
            let subGroups = group.subGroups
            let searchResult = [];

            if (searchResult.length > 0) {
                for (let item of subGroups) {
                    if (item.name === value) {
                        if (item.group_id && parseInt(item.group_id.id) === parseInt(mainId)) {
                            for (let searchItem of searchResult) {
                                if (parseInt(searchItem.id) !== parseInt(item.id)) {
                                    searchResult.push(item)
                                }
                            }
                            for (let i of subGroups) {
                                if (parseInt(item.parent_id) && (parseInt(i.id) === parseInt(item.parent_id))) {
                                    searchResult.push(i)
                                }
                                if (parseInt(i.parent_id) && (parseInt(item.id) === parseInt(i.parent_id))) {
                                    searchResult.push(i)
                                }
                            }
                        }
                    }

                }
            } else {
                for (let item of subGroups) {
                    if ((item.name === value)) {
                        if (item.group_id && parseInt(item.group_id.id) === parseInt(mainId)) {
                            searchResult.push(item)
                            for (let searchItem of searchResult) {
                                if (parseInt(searchItem.id) !== parseInt(item.id)) {
                                    searchResult.push(item)
                                }
                            }
                            // for (let i of subGroups) {
                            //     if (parseInt(item.parent_id) && (parseInt(i.id) === parseInt(item.parent_id))) {
                            // searchResult.push(i)
                            selectUp(searchResult, item, subGroups)
                            selectDown(searchResult, item, subGroups)
                            // }
                            // if (parseInt(i.parent_id) && (parseInt(item.id) === parseInt(i.parent_id))) {
                            //     searchResult.push(i)
                            // }
                            // }
                        }
                    }

                }
            }
            dispatch(setSearchValue(searchResult, search))
        } else {

            dispatch(setSearchValue([], null))
        }
    }
}

function selectUp(searchResult, item, subGroups) {
    for (let i of subGroups) {
        if (parseInt(item.parent_id) && (parseInt(i.id) === parseInt(item.parent_id))) {
            searchResult.push(i)
            selectUp(searchResult, i, subGroups)
        }
    }
}

function selectDown(searchResult, item, subGroups) {
    for (let i of subGroups) {
        if (parseInt(i.parent_id) && (parseInt(item.id) === parseInt(i.parent_id))) {
            searchResult.push(i)
            selectDown(searchResult, i, subGroups)
        }
    }
}

export function setSearchValue(searchResult, search) {

    return {
        type: SET_SEARCH_VALUE,
        searchResult,
        search
    }
}

export function alternativeShow() {

    return {
        type: SHOW_ALTERNATIVE
    }
}

/*---------------------------------------------------------------------------*/
export const toggleSubModal = (modalType, id, group_id) => {
    let obj = (modalType === "add") ? {parent_id: id} : {id}
    if (group_id) {
        obj = {
            ...obj,
            group_id
        };
    }
    return {
        type: TOGGLE_SUB_GROUP_MODAL,
        modalType,
        obj
    }
}

export const handleOpen = (id, group_id) => {
    return {
        type: OPEN_MENU,
        id,
        group_id,
    }
}

export const selectGroup = (group_id, value) => {
    return {
        type: SELECT_GROUP,
        group_id,
        value,
    }
}


