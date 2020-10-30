import Axios from "axios";
import {
    ACTIONS_TO_GROUPS,
    ADD_CLASSIFIER_ACTION,
    ADD_GROUP_ACTION,
    ADD_GROUP_SET,
    ADD_SUBGROUP_ACTION,
    CLOSE_AND_BACK,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    EDIT_GROUP_ACTION,
    EDIT_GROUP_SET,
    EDIT_SUBGROUP_ACTION,
    ONLY_CLOSE,
    OPEN_CLASSIFIERS,
    OPEN_HANDLER,
    SELECT_TREE_GROUP_ITEM,
    SELECT_TREE_ITEM,
    SET_GROUP_VALUE,
    SET_RENDERED_TREE_VALUE
} from "./actionTypes";
import {findItem, getHeaders, getToken, updateToken} from "../../services/services";
import cookie from "../../services/cookies";


const API_URL = process.env.REACT_APP_API_URL;

export function uploadImage(type, file, data, modalType) {

    return async dispatch => {
        let image_name = data.image[0].name;
        let image = file;
        let form_data = new FormData();

        form_data.append('file', image);
        form_data.append('filename', image_name);

        try {
            switch (type) {
                case 'group': {
                    const response = await Axios.post(`${API_URL}/subgroup/upload/`, form_data, {
                        headers: {
                            "Authorization": `JWT ${cookie.get('access')}`
                        }
                    });
                    if (response.status === 201) {
                        switch (modalType) {
                            case 'add': {
                                dispatch(addGroup(data));
                                break;
                            }
                            case 'edit': {
                                dispatch(editGroup(data));
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    break;
                }
                case 'inGroup':
                case 'subgroup': {
                    const response = await Axios.post(`${API_URL}/subgroup/upload/`, form_data, {
                        headers: {
                            "Authorization": `JWT ${cookie.get('access')}`
                        }
                    });
                    if (response.status === 201) {
                        switch (modalType) {
                            case 'add': {
                                dispatch(addSubgroup(data));
                                break;
                            }
                            case 'edit': {
                                dispatch(editSubgroup(data));
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    break;
                }
                default:
                    break;
            }

        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setGroupValues('errors', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(uploadImage(type, file, data))
                }
            } else {
                dispatch(setGroupValues('allError', true))
            }
        }
    }
}

// Groups actions

export function getGroup(id) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/Group", id: id}));
                dispatch(setGroupValues('group', response.data.results))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getGroup, dispatch, id);
            }
        }
    }
}

export function getSubgroup(id, catId) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/SubGroup", id: catId, param: {id: id}}));
                dispatch(setGroupValues('subgroup', response.data.data[id]))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getSubgroup, dispatch, id, catId);
            }
        }
    }
}

/*
*   NEW ACTION , this function must changed addGroup and subGroup together
*
* */
export function getActionById( requestType, memory, param, id = null) {
console.log(param)
    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios({
                    method: requestType,
                    url: API_URL,
                    ...getHeaders({}, {...param})
                })
                if (id === null) {
                    dispatch(setGroupValues('group', response.data.results))
                } else {
                    dispatch(setGroupValues('subgroup', response.data.data[id]))
                }
            } catch (error) {
                console.log("error: ", error);
            }
        }
    }
}

export function getAllGroup() {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/Group"}));
                dispatch(setGroupValues('groups', Object.values(response.data.results)))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getAllGroup, dispatch);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(getAllGroup())
                //     }
                // } else {
                //     dispatch(setGroupValues('allError', true))
                // }
            }
        }
    }
}

export function addGroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.post(API_URL, {"path": "Group/Group", "param": {...data}}, getHeaders());
                groups.push(response.data.results);
                dispatch(addGroupSet(groups))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(addGroup(data))
                    }
                } else if (error.response && error.response.status === 400) {
                    dispatch(setGroupValues('error', true))
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function addGroupSet(data) {

    return {
        type: ADD_GROUP_SET, data
    }
}

export function editGroup(data, id) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.put(API_URL, {path: "Group/Group", param: {...data}}, getHeaders());
                const results = response.data.results;
                for (let [key, value] of Object.entries(groups)) {
                    if (value.id === results.id) {
                        groups[key] = results;
                    }
                }
                dispatch(setEditedGroup(groups, id))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(editGroup(data))
                    }
                } else if (error.response && error.response.status === 400) {
                    dispatch(setGroupValues('error', true))
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function setEditedGroup(groups, id) {

    return {
        type: EDIT_GROUP_SET, groups, id
    }
}

export function deleteGroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.delete(`${API_URL}/group/${data.id}`, getHeaders());
                if (groups.length > 0) {
                    for (let [key, value] of Object.keys(groups)) {
                        if (value.id === response.data.id) {
                            groups.splice(key, 1);
                        }
                    }
                }
                dispatch(setGroupValues('groups', groups))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, deleteGroup, dispatch, data);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(deleteGroup(data))
                //     }
                // } else {
                //     dispatch(setGroupValues('allError', true))
                // }
            }
        }
    }
}

// Sub groups actions



export function getSubgroupWithGroupId(id, place = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/SubGroup", id: id}));
                dispatch(renderTree(Object.values(response.data.data), place))
                // dispatch(setGroupValues('customSubgroup', Object.values(response.data.data)));
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getSubgroupWithGroupId, dispatch, id);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(getSubgroupWithGroupId(id))
                //     }
                // } else {
                //     dispatch(setGroupValues('allError', true))
                // }
            }
        }
    }
}

export function renderTree(data, place) {

    return dispatch => {

        const own_subgroup = [];
        for (let item of data) {
            if (parseInt(item.parent_id) === 0) {
                let new_data = {
                    id: item.id,
                    cat_id: item.cat_id,
                    name: item[`name_${cookie.get('language') || 'am'}`],
                    state: {
                        droppable: false,
                        filtered: true
                    },
                    children: findItem(data, item.id)
                }
                own_subgroup.push(new_data)
            }
        }
        let place_d = place ? place : 'own_subgroups';
        let value_d = own_subgroup.length ? own_subgroup : null;
        dispatch(setRenderedTreeValue(place_d, value_d))
    }
}

export function getOnlySubgroupWithGroupId(id, place = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/SubGroup", id: id}));
                if (place !== null) {
                    dispatch(setGroupValues([place], Object.values(response.data.data)));
                    dispatch(setGroupValues("progress", false));
                } else {
                    dispatch(setGroupValues('customSubgroup', Object.values(response.data.data)));
                }
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getSubgroupWithGroupId, dispatch, id, place);
            }
        }
    }
}

export function getAllSubgroup() {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?page_size=10000`, getHeaders());
                dispatch(setGroupValues('subgroups', response.data.results))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getAllSubgroup, dispatch);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(getAllSubgroup())
                //     }
                // }
            }
        }
    }
}

export function addSubgroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            try {
                const initialModalGroup = getState().characteristics.initialModalGroup;
                const initialStatus = getState().characteristics.initialStatus;
                const response = await Axios.post(API_URL, {path: "Group/SubGroup", param: {...data}}, getHeaders());
                const new_data = Object.values(response.data.data)
                dispatch(renderTree(new_data));
                dispatch(actionToGroups(initialModalGroup, initialStatus))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(addSubgroup(data))
                    }
                } else if (error.response && error.response.status === 400) {
                    dispatch(setGroupValues('error', true))
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function editSubgroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            try {
                const initialModalGroup = getState().characteristics.initialModalGroup;
                const initialStatus = getState().characteristics.initialStatus;
                const response = await Axios.put(API_URL, {path: "Group/SubGroup", param: {...data}}, getHeaders());
                const new_data = Object.values(response.data.data)
                dispatch(renderTree(new_data));
                dispatch(actionToGroups(initialModalGroup, initialStatus))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(editSubgroup(data))
                    }
                } else if (error.response && error.response.status === 400) {
                    dispatch(setGroupValues('error', true))
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function editGroupSubGroup(data) {

    return async dispatch => {
        if (cookie.get('access')) {
            let subs = data.map(
                item => {
                    return Axios.put(`${API_URL}/subgroup/${item.id}`, item, getHeaders());
                }
            );

            Promise.all(subs).then(
                value => {
                    value.forEach(
                        item => dispatch(addEditedData(item.data))
                    )
                }
            ).catch(
                async error => {
                    if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                        const refresh_token = cookie.get('refresh');
                        const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                        if ((await new_token_data) === null) {
                            dispatch(setGroupValues('errors', error.message))
                        } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                            dispatch(editSubgroup(data))
                        }
                    } else if (error.response && error.response.status === 400) {
                        dispatch(setGroupValues('error', true))
                    } else {
                        dispatch(setGroupValues('allError', true))
                    }
                }
            )
        }
    }
}

export function deleteSubgroup(id) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const subgroups = [...getState().characteristics.subgroups];
            const customSubgroup = getState().characteristics.customSubgroup ? [...getState().characteristics.customSubgroup] : [];
            try {
                await Axios.delete(`${API_URL}/subgroup/${id}`, getHeaders());
                if (subgroups.length > 0) {
                    for (let [key, value] of Object.entries(subgroups)) {
                        if (value.id === id) {
                            console.log(key, value);
                            subgroups.splice(key, 1);
                        }
                    }
                    for (let [key, value] of Object.entries(customSubgroup)) {
                        if (value.id === id) {
                            customSubgroup.splice(+key, 1);
                        }
                    }
                }
                dispatch(setGroupValues('subgroups', subgroups));
                dispatch(setGroupValues('customSubgroup', customSubgroup))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, deleteSubgroup, dispatch, id);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(deleteSubgroup(id))
                //     }
                // } else {
                //     dispatch(setGroupValues('allError', true))
                // }
            }
        }
    }
}

export function addEditedData(data) {

    return (dispatch, getState) => {
        let customSubgroup = getState().characteristics.customSubgroup ? [...getState().characteristics.customSubgroup] : [];
        for (let [key, value] of Object.entries(customSubgroup)) {
            if (value.id === data.id) {
                customSubgroup[key] = data;
                break
            }
        }
        customSubgroup = customSubgroup.sort(
            (a, b) => {
                return parseInt(a.sort) - parseInt(b.sort);
            }
        );
        dispatch(setGroupValues('customSubgroup', customSubgroup));
        dispatch(setGroupValues('classifierSubgroup', customSubgroup));
    }
}

export function searchHandler(name, value) {
    return dispatch => {
        dispatch(setGroupValues(name, value));
    }
}

export function openModalContent(item) {

    return (dispatch, getState) => {
        dispatch(getSubgroupWithGroupId(item.id));
        dispatch(openAction({id: item.id, title_am: item.title_am, title_ru: item.title_ru, title_en: item.title_en, required_group: item.required_group}, item))
    }
}

export function deleteClassifiersAction(type, param, id = null) {

    return dispatch => {
        if (id === null) {
            dispatch(getActionById("get", type, param))
        } else {
            dispatch(getActionById("get", type, param, id))
        }
        dispatch(setGroupValues('delete', true))
    }
}

export function editGroupAction(value, newGroup) {

    return {
        type: EDIT_GROUP_ACTION, value, newGroup
    }
}

export function editSubgroupAction() {

    return (dispatch, getState) => {
        const subgroup = {...getState().characteristics.subgroup};
        const newSubgroup = {...getState().characteristics.newSubgroup};
        const groupName = subgroup[`name_${cookie.get('language') || "am"}`];
        newSubgroup[`name_${cookie.get('language') || "am"}`] = subgroup[`name_${cookie.get('language') || "am"}`];
        newSubgroup.image = subgroup.image;
        newSubgroup.id = subgroup.id;
        newSubgroup.parent_id = subgroup.parent_id;
        newSubgroup.cat_id = subgroup.cat_id;
        dispatch(editSubgroupActionSet(newSubgroup, groupName))
    }
}

export function editSubgroupActionSet(newSubgroup, groupName) {

    return{
        type: EDIT_SUBGROUP_ACTION, newSubgroup, groupName
    }
}

export function addSubgroupAction(id) {

    return {
        type: ADD_SUBGROUP_ACTION, id
    }
}

export function addGroupAction() {

    return {
        type: ADD_GROUP_ACTION
    }
}

export function onClassifierAction(status) {

    return {
        type: ADD_CLASSIFIER_ACTION, status
    }
}

export function actionToGroups(modalType, status) {

    return {
        type: ACTIONS_TO_GROUPS, modalType, status
    }
}

// ----------------------------------------------------------------------------------------

export function setRenderedTreeValue(place, value) {

    return {
        type: SET_RENDERED_TREE_VALUE, place, value
    }
}

export function setGroupValues(name, value) {
    return {
        type: SET_GROUP_VALUE,
        name, value
    }
}

export function closeClassifiers() {

    return {
        type: CLOSE_CLASSIFIERS
    }
}

export function openClassifiers(id) {

    return {
        type: OPEN_CLASSIFIERS, id
    }
}

export function onlyCloseHandler() {

    return {
        type: ONLY_CLOSE
    }
}

export function closeAndBack() {

    return {
        type: CLOSE_AND_BACK
    }
}

export function closeAction() {

    return {
        type: CLOSE_HANDLER
    }
}

export function openAction(data, group) {

    return {
        type: OPEN_HANDLER, data, group
    }
}

export function selectTreeItem(id, path, catId) {

    return {
        type: SELECT_TREE_ITEM, id, path, catId
    }
}

export function selectTreeGroupItem(id) {

    return {
        type: SELECT_TREE_GROUP_ITEM, id
    }
}