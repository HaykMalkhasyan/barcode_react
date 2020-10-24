import Axios from "axios";
import {
    CLOSE_AND_BACK,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    ONLY_CLOSE,
    OPEN_CLASSIFIERS, OPEN_HANDLER,
    SET_GROUP_VALUE, SET_RENDERED_TREE_VALUE
} from "./actionTypes";
import {findItem, getHeaders, getToken, searchUp, updateToken} from "../../services/services";
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

export function getGroup(id, place = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/Group", id: id}));
                if (place && place === 'customGroup') {
                    dispatch(setGroupValues('customGroup', response.data.results))
                } else {
                    dispatch(setGroupValues('group', response.data.results))
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getGroup(id))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function getAllGroup() {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/Group"}));
                console.log("show error", response)
                dispatch(setGroupValues('groups', Object.values(response.data.results)))
            } catch (error) {
                console.log(error)
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
                const response = await Axios.post(`${API_URL}/group/`, data, getHeaders());
                groups.push(response.data);
                dispatch(setGroupValues('groups', groups))
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

export function editGroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.put(`${API_URL}/group/${data.id}`, data, getHeaders());
                for (let [key, value] of Object.entries(groups)) {
                    if (value.id === response.data.id) {
                        groups[key] = response.data;
                    }
                }
                dispatch(setGroupValues('groups', groups))
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

export function getSubgroup(id) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/${id}`, getHeaders());
                dispatch(setGroupValues('subgroup', response.data))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getSubgroup, dispatch, id);
                // if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                //     const refresh_token = cookie.get('refresh');
                //     const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
                //     if ((await new_token_data) === null) {
                //         dispatch(setGroupValues('errors', error.message))
                //     } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                //         dispatch(getSubgroup(id))
                //     }
                // } else {
                //     dispatch(setGroupValues('allError', true))
                // }
            }
        }
    }
}

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
                    ...item,
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
            const subgroups = [...getState().characteristics.subgroups];
            const customSubgroup = getState().characteristics.customSubgroup ? [...getState().characteristics.customSubgroup] : [];
            try {
                const response = await Axios.post(`${API_URL}/subgroup/`, data, getHeaders());
                subgroups.push(response.data);
                customSubgroup.push(response.data);
                dispatch(setGroupValues('customSubgroup', customSubgroup));
                dispatch(setGroupValues('classifierSubgroup', customSubgroup));
                dispatch(setGroupValues('subgroups', subgroups))
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

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.put(`${API_URL}/subgroup/${data.id}`, data, getHeaders());
                dispatch(addEditedData(response.data))
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

export function subGroupCollapses(id) {

    return (dispatch, getState) => {
        const collapsed = [...getState().characteristics.collapsed];
        let index = collapsed.indexOf(id);
        if (index === -1) {
            collapsed.push(id);
        } else {
            collapsed.splice(index, 1)
        }
        dispatch(setGroupValues('collapsed', collapsed))
    }
}


export function subGroupModalCollapses(id) {

    return (dispatch, getState) => {
        const collapsedModalStatus = [...getState().characteristics.collapsedModalStatus];
        let index = collapsedModalStatus.indexOf(id);
        if (index === -1) {
            collapsedModalStatus.push(id);
        } else {
            collapsedModalStatus.splice(index, 1)
        }
        dispatch(setGroupValues('collapsedModalStatus', collapsedModalStatus))
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
        dispatch(searchSubgroup())
    }
}

export function searchSubgroup() {

    return (dispatch, getState) => {
        const customSubgroup = getState().characteristics.customSubgroup ? [...getState().characteristics.customSubgroup] : [];
        const search = getState().characteristics.search;
        let searchResult = [];
        if (search.length > 0) {
            for (let item of customSubgroup) {
                if (item.name.toLowerCase().search(search.toLowerCase()) !== -1) {
                    searchResult.push(item.id);
                    searchResult = searchUp(item, customSubgroup, searchResult);
                }
            }
            dispatch(setGroupValues('searchResult', searchResult))
        } else {
            dispatch(setGroupValues('searchResult', []))
        }

    }
}

export function subCollapsed(id, place = null) {

    return (dispatch, getState) => {
        let collapsed = place !== null ? [...getState().characteristics[place]] : [...getState().characteristics.collapsed];
        let index = collapsed.indexOf(id);
        if (index === -1) {
            collapsed.push(id);
        } else {
            collapsed.splice(index, 1)
        }
        place !== null ?
            dispatch(setGroupValues([place], collapsed))
            :
            dispatch(setGroupValues('collapsed', collapsed))
    }
}

export function subCollapsedGroup(id, place = null) {

    return (dispatch, getState) => {
        let collapsedGroup;
        if (place !== null) {
            collapsedGroup = [...getState().characteristics[place]];
        } else {
            collapsedGroup = [...getState().characteristics.collapsedGroup];
        }
        let index = collapsedGroup.indexOf(id);
        if (index === -1) {
            collapsedGroup.push(id);
        } else {
            collapsedGroup.splice(index, 1)
        }
        if (place !== null) {
            dispatch(setGroupValues([place], collapsedGroup))
        } else {
            dispatch(setGroupValues('collapsedGroup', collapsedGroup))
        }
    }
}

export function openModalContent(item) {

    return (dispatch) => {
        dispatch(getSubgroupWithGroupId(item.id));
        dispatch(openAction({id: item.id, title_am: item.title_am, title_ru: item.title_ru, title_en: item.title_en, required_group: item.required_group}, item))
    }
}

export function toggleTreeItem(id, colName) {

    return (dispatch, getState) => {
        const data = [...getState().characteristics[colName]];
        const index = data.indexOf(id);
        if (index === -1) {
            data.push(id)
        } else {
            data.splice(index, 1)
        }
        dispatch(setGroupValues(colName, data))
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