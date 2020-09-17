import Axios from "axios";
import {
    CLOSE_AND_BACK,
    CLOSE_CLASSIFIERS,
    CLOSE_HANDLER,
    ONLY_CLOSE,
    OPEN_CLASSIFIERS, OPEN_HANDLER,
    SET_GROUP_VALUE
} from "./actionTypes";
import {getToken, searchUp} from "../../services/services";
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
                const response = await Axios.get(`${API_URL}/group/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                if (place && place === 'customGroup') {
                    dispatch(setGroupValues('customGroup', response.data))
                } else {
                    dispatch(setGroupValues('group', response.data))
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
            const groups = [];
            groups.push({id: 0, name: 'Հիմնական դասակարգիչ', group_type: '1', required_group: true});
            try {
                const response = await Axios.get(`${API_URL}/group/?page_size=10000`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                groups.push(...response.data.results);
                dispatch(setGroupValues('groups', groups))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
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
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.post(`${API_URL}/group/`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
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
                const response = await Axios.put(`${API_URL}/group/${data.id}`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
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
                const response = await Axios.delete(`${API_URL}/group/${data.id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
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
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
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
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                dispatch(setGroupValues('subgroup', response.data))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
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
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?group_id=${id}&page_size=100`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                dispatch(setGroupValues('customSubgroup', response.data.results));
                dispatch(setGroupValues('changeStatus', true))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getSubgroupWithGroupId(id))
                    }
                } else {
                    dispatch(setGroupValues('allError', true))
                }
            }
        }
    }
}

export function getOnlySubgroupWithGroupId(id, place = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?group_id=${id}&page_size=100`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                if (place !== null) {
                    dispatch(setGroupValues([place], response.data.results));
                } else {
                    dispatch(setGroupValues('customSubgroup', response.data.results));
                }
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getOnlySubgroupWithGroupId(id, place))
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
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/subgroup/?page_size=10000`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                dispatch(setGroupValues('subgroups', response.data.results))
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getAllSubgroup())
                    }
                }
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
                const response = await Axios.post(`${API_URL}/subgroup/`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
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
                const response = await Axios.put(`${API_URL}/subgroup/${data.id}`, data, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
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
                    return Axios.put(`${API_URL}/subgroup/${item.id}`, item, {
                        headers: {
                            "lang": "am",
                            "Content-Type": "application/json",
                            "Authorization": `JWT ${cookie.get('access')}`
                        }
                    });
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
                await Axios.delete(`${API_URL}/subgroup/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
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
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setGroupValues('errors', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(deleteSubgroup(id))
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
        let collapsed;
        if (place !== null) {
            collapsed = [...getState().characteristics[place]];
        } else {
            collapsed = [...getState().characteristics.collapsed];
        }

        let index = collapsed.indexOf(id);
        if (index === -1) {
            collapsed.push(id);
        } else {
            collapsed.splice(index, 1)
        }
        if (place !== null) {
            dispatch(setGroupValues([place], collapsed))
        } else {
            dispatch(setGroupValues('collapsed', collapsed))
        }
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

// ----------------------------------------------------------------------------------------

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

export function openAction(data) {

    return {
        type: OPEN_HANDLER, data
    }
}