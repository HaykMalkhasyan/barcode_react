import Axios from "axios";
import {SET_GROUP_VALUE} from "./actionTypes";
import {getToken, searchUp} from "../../services/services";

const API_URL = process.env.REACT_APP_API_URL;

export function uploadImage(type, file, data, modalType) {

    return async dispatch => {
        let image_name = data.image;
        let image = file;
        let form_data = new FormData();

        form_data.append('file', image);
        form_data.append('filename', image_name);

        try {
            switch (type) {
                case 'group': {
                    const response = await Axios.post(`${API_URL}/subgroup/upload/`, form_data, {
                        headers: {
                            "Authorization": `JWT ${localStorage.getItem('access')}`
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
                            default: break;
                        }
                    }
                    break;
                }
                case 'inGroup':
                case 'subgroup': {
                    const response = await Axios.post(`${API_URL}/subgroup/upload/`, form_data, {
                        headers: {
                            "Authorization": `JWT ${localStorage.getItem('access')}`
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
                            default: break;
                        }
                    }
                    break;
                }
                default: break;
            }

        } catch(error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = localStorage.getItem('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setGroupValues('errors', error.message))
                } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/group/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setGroupValues('group', response.data))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/group/?page_size=10000`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setGroupValues('groups', response.data.results))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(getAllGroup())
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function addGroup(data) {

    return async (dispatch, getState) => {
        if (localStorage.getItem('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.post(`${API_URL}/group/`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                groups.push(response.data);
                dispatch(setGroupValues('groups', groups))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(addGroup(data))
                    }
                } else if (error.response.status === 400) {
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
        if (localStorage.getItem('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.put(`${API_URL}/group/${data.id}`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                for (let [key, value] of Object.keys(groups)) {
                    if (value.id === response.data.id) {
                        groups[key] = response.data
                    }
                }
                dispatch(setGroupValues('groups', groups))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(editGroup(data))
                    }
                } else if (error.response.status === 400) {
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
        if (localStorage.getItem('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.delete(`${API_URL}/group/${data.id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                if (groups.length > 0) {
                    for (let [key, value] of Object.keys(groups)) {
                        if (value.id === response.data.id) {
                            groups.splice(key, 1);
                        }
                    }
                }
                dispatch(setGroupValues('groups', groups))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(deleteGroup(data))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

// Sub groups actions

export function getSubgroup(id) {

    return async dispatch => {
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setGroupValues('subgroup', response.data))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(getSubgroup(id))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function getSubgroupWithGroupId(id) {

    return async dispatch => {
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?group_id=${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setGroupValues('customSubgroup', response.data.results));
                dispatch(setGroupValues('changeStatus', true))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(getSubgroupWithGroupId(id))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function getAllSubgroup() {

    return async dispatch => {
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?page_size=10000`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setGroupValues('subgroups', response.data.results))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(getAllSubgroup())
                    }
                }
            }
        }
    }
}

export function addSubgroup(data) {

    return async (dispatch, getState) => {
        if (localStorage.getItem('access')) {
            const subgroups = [...getState().characteristics.subgroups];
            try {
                const response = await Axios.post(`${API_URL}/subgroup/`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                subgroups.push(response.data);
                dispatch(setGroupValues('subgroups', subgroups))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(addSubgroup(data))
                    }
                } else if (error.response.status === 400) {
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
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.put(`${API_URL}/subgroup/${data.id}`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(addEditedData(response.data))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(editSubgroup(data))
                    }
                } else if (error.response.status === 400) {
                    dispatch(setGroupValues('error', true))
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function deleteSubgroup(data) {

    return async (dispatch, getState) => {
        if (localStorage.getItem('access')) {
            const subgroups = [...getState().characteristics.subgroups];
            try {
                const response = await Axios.delete(`${API_URL}/subgroup/${data.id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                if (subgroups.length > 0) {
                    for (let [key, value] of Object.keys(subgroups)) {
                        if (value.id === response.data.id) {
                            subgroups.splice(key, 1);
                        }
                    }
                }
                dispatch(setGroupValues('subgroups', subgroups))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(deleteSubgroup(data))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
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

export function addEditedData(data) {

    return (dispatch, getState) => {
        const customSubgroup = [...getState().characteristics.customSubgroup];
        for (let [key, value] of Object.entries(customSubgroup)) {
            if (value.id === data.id) {
                customSubgroup[key] = data;
                break
            }
        }
        dispatch(setGroupValues('customSubgroup', customSubgroup));
        dispatch(getAllSubgroup())
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
        const customSubgroup = [...getState().characteristics.customSubgroup];
        const search = getState().characteristics.search;
        let searchResult = [];

        if (search.length > 0) {
            for (let item of customSubgroup) {
                if (item.name.toLowerCase().search(search.toLowerCase()) !== -1) {
                    searchResult.push(item.id);
                    searchResult = searchUp(item, customSubgroup, searchResult)
                }
            }
            dispatch(setGroupValues('searchResult', searchResult))
        } else {
            dispatch(setGroupValues('searchResult', []))
        }

    }
}


// ----------------------------------------------------------------------------------------

export function setGroupValues(name, value) {

    return {
        type: SET_GROUP_VALUE,
        name, value
    }
}