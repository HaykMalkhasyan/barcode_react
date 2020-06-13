import {
    ADD_EXPENDED,
    ADD_GROUP_FAIL,
    ADD_GROUP_REQUEST,
    ADD_GROUP_SUCCESS,
    ADD_SUB_GROUP_FAIL,
    ADD_SUB_GROUP_REQUEST,
    ADD_SUB_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_SUB_GROUP_FAIL,
    DELETE_SUB_GROUP_REQUEST,
    DELETE_SUB_GROUP_SUCCESS,
    EDIT_GROUP_FAIL,
    EDIT_GROUP_REQUEST,
    EDIT_GROUP_SUCCESS,
    EDIT_SUB_GROUP_FAIL,
    EDIT_SUB_GROUP_REQUEST,
    EDIT_SUB_GROUP_SUCCESS,
    END_MOVING_GROUP,
    GET_GROUP_FAIL,
    GET_GROUP_REQUEST,
    GET_GROUP_SUCCESS,
    GET_GROUPS_FAIL,
    GET_GROUPS_REQUEST,
    GET_GROUPS_SUCCESS,
    GET_SUB_GROUP_FAIL,
    GET_SUB_GROUP_REQUEST,
    GET_SUB_GROUP_SUCCESS,
    GET_SUB_GROUPS_FAIL,
    GET_SUB_GROUPS_REQUEST,
    GET_SUB_GROUPS_SUCCESS,
    OPEN_MENU,
    SELECT_GROUP,
    SELECT_GROUPS_FAIL,
    SELECT_GROUPS_REQUEST,
    SELECT_GROUPS_SUCCESS,
    SET_ALT_SEARCH_VALUE, SET_COLLAPSED,
    SET_GROUP_MODAL,
    SET_PRODUCT_GROUPS,
    SET_SEARCH_VALUE,
    SET_SUB_MODAL_NAME_VALUE,
    SET_TOGGLE_SUB_MODAL_VALUE,
    SHOW_ALTERNATIVE,
    START_MOVING_GROUP, TOGGLE_EDITEBLED,
    TOGGLE_GROUP_MODAL,
    TOGGLE_SUB_GROUP_MODAL,
    TOGGLE_SUB_MODAL
} from "./actionTypes";


let cols = 'id,name';
const API_URL = process.env.REACT_APP_API_URL;

export const groupActions = (type, data) => {
    switch (type) {
        case "get":
            return {
                types: [GET_GROUP_REQUEST, GET_GROUP_FAIL, GET_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/group/${data.id}`)
            }
        case "getAll":
            return {
                types: [GET_GROUPS_REQUEST, GET_GROUPS_FAIL, GET_GROUPS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/group/?page_size=10000`, {cols})
            }
        case "add":
            return {
                types: [ADD_GROUP_REQUEST, ADD_GROUP_FAIL, ADD_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`${API_URL}/group/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_GROUP_REQUEST, EDIT_GROUP_FAIL, EDIT_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.putt(`${API_URL}/group/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_GROUP_REQUEST, DELETE_GROUP_FAIL, DELETE_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`${API_URL}/group/${data.id}`, {cols}),
                data
            }
        default:
            return;
    }
};

export const getSeletGroup = id => {

    return {
        types: [SELECT_GROUPS_REQUEST, SELECT_GROUPS_FAIL, SELECT_GROUPS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/group/${id}`),
        id
    }
}

export const getSubGroup = id => {

    return {
        types: [GET_SUB_GROUPS_REQUEST, GET_SUB_GROUPS_FAIL, GET_SUB_GROUPS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/subgroup/?group_id=${id}&page_size=10000`)
    }
}

export const subGroupActions = (type, data) => {
    switch (type) {
        case "getAll":
            return {
                types: [GET_SUB_GROUPS_REQUEST, GET_SUB_GROUPS_FAIL, GET_SUB_GROUPS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/subgroup/?page_size=10000`)
            }
        case "get":
            return {
                types: [GET_SUB_GROUP_REQUEST, GET_SUB_GROUP_FAIL, GET_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/subgroup/${data}`)
            }
        case "add":
            return {
                types: [ADD_SUB_GROUP_REQUEST, ADD_SUB_GROUP_FAIL, ADD_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`${API_URL}/subgroup/`, data, {cols})
            }
        case "edit":
            return {
                types: [EDIT_SUB_GROUP_REQUEST, EDIT_SUB_GROUP_FAIL, EDIT_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.putt(`${API_URL}/subgroup/${data.id}`, data, {cols})
            }
        case "delete":
            return {
                types: [DELETE_SUB_GROUP_REQUEST, DELETE_SUB_GROUP_FAIL, DELETE_SUB_GROUP_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`${API_URL}/subgroup/${data}`, {cols}),
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

// SEARCH GROUP
export function searchGroups(name, value, mainId) {
    return (dispatch, getState) => {
        let altViewerArray = [];
        let expanded = [];
        if (value.length > 0) {
            expanded.push(`${mainId}`)
            let group = {...getState().group};
            let searchV = {...getState().group[name]};
            searchV = {
                id: mainId,
                value: value ? value : null
            }
            let subGroups = group.subGroups
            let searchResult = [];
            let searchResItem = [];

            if (searchResult.length > 0) {
                for (let item of subGroups) {
                    if (item.name.toLowerCase().search(value.toLowerCase()) !== -1) {
                        altViewerArray.push(item)
                        searchResItem.push(item.id)
                        if (item.group_id && parseInt(item.group_id.id) === parseInt(mainId)) {
                            let indexId = false;
                            for (let searchItem of searchResult) {
                                if (parseInt(searchItem.id) === parseInt(item.id)) {
                                    indexId = true
                                }
                            }
                            if (!indexId) {
                                searchResult.push(item)
                            }
                            if (item.parent_id.length > 0) {
                                selectUp(searchResult, item, subGroups, expanded, mainId)
                            }
                            selectDown(searchResult, item, subGroups, mainId)
                        }
                    }
                }
            } else {
                for (let item of subGroups) {
                    if (item.name.toLowerCase().search(value.toLowerCase()) !== -1) {
                        altViewerArray.push(item);
                        searchResItem.push(item.id)
                        if (item.group_id && parseInt(item.group_id.id) === parseInt(mainId)) {
                            let indexResId = false;
                            for (let searchItem of searchResult) {
                                if (parseInt(searchItem.id) === parseInt(item.id)) {
                                    indexResId = true
                                }
                            }
                            if (!indexResId) {
                                searchResult.push(item);
                            }
                            let indexId = false;
                            for (let searchItem of searchResult) {
                                if (parseInt(searchItem.id) === parseInt(item.id)) {
                                    indexId = true
                                }
                            }
                            if (!indexId) {
                                searchResult.push(item);
                            }
                            if (item.parent_id.length > 0) {
                                selectUp(searchResult, item, subGroups, expanded, mainId)
                            }
                            selectDown(searchResult, item, subGroups, mainId)
                        }
                    }
                }
            }
            dispatch(setAltSearchValue(altViewerArray))
            dispatch(setSearchValue(searchResult, searchV, expanded, searchResItem))
        } else {
            dispatch(setSearchValue([], null, []))
            dispatch(setAltSearchValue([]))
        }
    }
}

export function clearExpanded() {

    return dispatch => {
        dispatch(setSearchValue([], null, []))
        dispatch(setAltSearchValue([]))
    }
}

function selectUp(searchResult, item, subGroups, expanded, mainId) {

    let newSearchResult = searchResult;
    for (let i of subGroups) {
        if (i.group_id && mainId === i.group_id.id) {
            if (parseInt(item.parent_id) && (parseInt(i.id) === parseInt(item.parent_id)) && (parseInt(i.id !== parseInt(i.parent_id)))) {
                let indexId = false;
                for (let searchItem of newSearchResult) {
                    if (parseInt(searchItem.id) === parseInt(i.id)) {
                        indexId = true
                    }
                }
                if (!indexId) {
                    if (expanded === null) {
                        expanded = [`${item.parent_id}`]
                    } else {
                        expanded.unshift(`${item.parent_id}`)
                    }
                    newSearchResult.push(i)
                }
                selectUp(newSearchResult, i, subGroups, expanded, mainId)
            }
        }
    }
}

function selectDown(searchResult, item, subGroups, mainId) {

    let newSearchResult = searchResult;
    for (let i of subGroups) {
        if (i.group_id && mainId === i.group_id.id) {
            if (parseInt(i.parent_id) && (parseInt(item.id) === parseInt(i.parent_id)) && (parseInt(i.id !== parseInt(i.parent_id)))) {
                let indexId = false;
                for (let searchItem of newSearchResult) {
                    if (parseInt(searchItem.id) === parseInt(i.id)) {
                        indexId = true
                    }
                }
                if (!indexId) {
                    newSearchResult.push(i)
                }
                selectDown(newSearchResult, i, subGroups, mainId)
            }
        }
    }
}

export function setSearchValue(searchResult, search, expanded, searchResItem) {

    return {
        type: SET_SEARCH_VALUE,
        searchResult,
        search,
        expanded,
        searchResItem
    }
}

export function setAltSearchValue(searchAltResult) {

    return {
        type: SET_ALT_SEARCH_VALUE,
        searchAltResult
    }
}

export function alternativeShow() {

    return {
        type: SHOW_ALTERNATIVE
    }
}

export function toggleEditebled() {

    return {
        type: TOGGLE_EDITEBLED
    }
}

export function subGroupsCollapseStatus(id) {

    return (dispatch, getState) => {
        let index = false
        let collapsedStatus = {...getState().group.collapsedStatus}
        if (Object.keys(collapsedStatus).length > 0) {
            for (let item in collapsedStatus) {
                if (parseInt(collapsedStatus[item]) === id) {
                    index = collapsedStatus[item]
                }
            }
            if (index === false) {
                collapsedStatus[id] = id
            } else {
                delete collapsedStatus[index]
            }
        } else {
            collapsedStatus[id] = id
        }
        dispatch(setSubGroupsCollapseStatus(collapsedStatus))
    }
}

export function setSubGroupsCollapseStatus(collapsedStatus) {

    return {
        type: SET_COLLAPSED,
        collapsedStatus
    }
}

/*------------------------ For products ------------------------*/

export function getSubGroups(data) {

    return (dispatch, getState) => {
        let subGroups = [...getState().group.subGroups];
        let selected = {...getState().group.selected};
        let productGroups = [];
        for (let subGroup of subGroups) {
            if (subGroup.group_id && (subGroup.group_id.id === data.id)) {
                productGroups.push(subGroup)
            }
        }
        // selected = {};
        dispatch(setProductGroups(productGroups, selected))
    }
}

export function setProductGroups(productGroups, selected) {

    return {
        type: SET_PRODUCT_GROUPS,
        productGroups,
        selected
    }
}

export function seteExpanded(nodeId) {

    return {
        type: ADD_EXPENDED,
        nodeId
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