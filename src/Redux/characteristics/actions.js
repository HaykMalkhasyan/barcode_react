import Axios from "axios";
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
    SELECT_TREE_GROUP_ITEM,
    SELECT_TREE_ITEM, SET_BUFFER_COPY, SET_CUT_PASTE,
    SET_GROUP_VALUE, SET_MOVE_ACTION,
    SET_RENDERED_FILTER_TREE_VALUE,
    SET_RENDERED_TREE_VALUE,
    SET_WITHOUT_DELETED_GROUP, START_MOVE_ACTION
} from "./actionTypes";
import {checkItem, findItem, getHeaders, getToken, updateToken} from "../../services/services";
import cookie from "../../services/cookies";
import {importGroupInProduct} from "../products/actions";


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

// GET groups
export function getAllGroup() {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Group/Group"}));
                dispatch(setGroupValues('groups', Object.values(response.data.results)))
            } catch (error) {
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getAllGroup, dispatch);
            }
        }
    }
}

// GET groups or subgroups by Id
export function getActionById(requestType, memory, param, id = null) {

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

export function addGroup(data) {

    return async (dispatch, getState) => {
        if (cookie.get('access')) {
            const groups = [...getState().characteristics.groups];
            try {
                const response = await Axios.post(API_URL, {"path": "Group/Group", "param": {...data}}, getHeaders());
                dispatch(openModalContent(response.data.results))
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

export function deleteAction(request, id, catId = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                await Axios({
                    method: 'delete',
                    url: API_URL,
                    data: {path: request, param: catId === null ? {id: id} : {id: id, cat_id: catId}},
                    ...getHeaders({}, {})
                })
                if (catId !== null) {
                    dispatch(getSubgroupWithGroupId(catId))
                } else {
                    dispatch(deleteActionSet(id))
                }
                dispatch(deleteModalClose())
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export function deleteActionSet(id) {

    return (dispatch, getState) => {
        const groups = [...getState().characteristics.groups];
        for (let [key, value] of Object.entries(groups)) {
            if (value.id === id) {
                groups.splice(+key, 1);
            }
        }
        dispatch(setWithoutDeletedGroup(groups))
    }
}

export function setWithoutDeletedGroup(groups) {

    return {
        type: SET_WITHOUT_DELETED_GROUP, groups
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
            }
        }
    }
}

export function openModalContent(item, status = false) {

    return dispatch => {
        dispatch(setGroupValues("groupLoader", item.id))
        dispatch(getSubgroupWithGroupId(item.id));
        setTimeout(() => {
                dispatch(openAction({id: item.id, title_am: item.title_am, title_ru: item.title_ru, title_en: item.title_en}, item, status))
            },
            150
        )
    }
}

export function renderTree(data, place) {

    return dispatch => {
        if (place !== null) {
            dispatch(setGroupValues(place, []))
        }
        const own_subgroup = [];
        const sort_data = data.sort((a, b) => a.sort - b.sort)
        for (let item of sort_data) {
            if (parseInt(item.parent_id) === 0) {
                let new_data = {
                    id: item.id,
                    cat_id: item.cat_id,
                    parent_id: item.parent_id,
                    sort: item.sort,
                    name: item[`name_${cookie.get('language') || 'am'}`],
                    children: findItem(sort_data, item.id)
                }
                own_subgroup.push(new_data)
            }
        }

        if (place) {
            dispatch(setRenderedFilterTreeValue(own_subgroup))
        } else {
            dispatch(setRenderedOwnTreeValue(own_subgroup))
        }

    }
}

export function cutPaste(tree) {

    return async (dispatch, getState) => {
        const groupId = getState().characteristics.groupId;
        const subgroup = {...getState().characteristics.subgroup};
        const buffer = getState().characteristics.buffer;
        const movingNode = {...buffer};
        if (groupId === null) {
            const node = getState().characteristics.node;
            await dispatch(editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: node.id, name: subgroup[`name_${cookie.get("language") || "am"}`]}))
            tree.selectNode();
            tree.removeNode(buffer);
            movingNode.parent_id = parseInt(node.id)
            movingNode.sort = 0;
            tree.addChildNodes(movingNode, 0, node)
            tree.openNode(node)
        } else {
            await dispatch(editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: 0, name: subgroup[`name_${cookie.get("language") || "am"}`]}))
            tree.selectNode();
            tree.removeNode(buffer);
            movingNode.parent_id = 0;
            movingNode.sort = 0;
            tree.addChildNodes(movingNode, 0)
        }
        dispatch(setCutCopyPaste())
    }
}

export function copyPaste(tree) {

    return async (dispatch, getState) => {
        const groupId = getState().characteristics.groupId;
        const subgroup = {...getState().characteristics.subgroup};
        const buffer = getState().characteristics.buffer;
        if (groupId === null) {
            const node = getState().characteristics.node;
            dispatch(addSubgroup({cat_id: subgroup.cat_id, parent_id: node.id, name: subgroup[`name_${cookie.get("language") || "am"}`]}, "inside", tree, node, buffer))
        } else {
            dispatch(addSubgroup({cat_id: subgroup.cat_id, parent_id: 0, name: subgroup[`name_${cookie.get("language") || "am"}`]}, "inside", tree, null, buffer))
        }
        dispatch(setCutCopyPaste())
    }
}

export function setCutCopyPaste() {

    return {
        type: SET_CUT_PASTE
    }
}

export function setMovingStart() {

    return {
        type: MOVING_START
    }
}

export function subgroupCopy(node, act) {

    return {
        type: SET_BUFFER_COPY, node, act
    }
}

export function sortTree(data, ref, catId, node, level) {

    return (dispatch, getState) => {
        const own_subgroups = [...getState().characteristics.own_subgroups];
        const selected_node = getState().characteristics.node;
        const initial_sort_data = [];
        const sort = {};

        if (level) {
            const nodeIndex = parseInt(node.id) !== parseInt(selected_node.parent_id) ? data.indexOf(node) : -1;
            const initIndex = data.indexOf(selected_node);

            for (let [index, item] of Object.entries(data)) {
                sort[item.id] = +initIndex === +index ? nodeIndex + 1 : +index > nodeIndex && +index !== initIndex ? +index + 1 : +index;
                if (selected_node.getParent().id === null) {
                    initial_sort_data.push({
                        id: item.id,
                        cat_id: item.cat_id,
                        parent_id: item.parent_id,
                        sort: +initIndex === +index ? nodeIndex + 1 : +index > nodeIndex && +index !== initIndex ? +index + 1 : +index,
                        name: item.name,
                        children: [...item.children]
                    })
                }
            }
            if (selected_node.getParent().id === null) {
                dispatch(setRenderedOwnTreeValue(initial_sort_data.sort((a, b) => {
                    return a.sort - b.sort
                })))
            } else {
                dispatch(setRenderedOwnTreeValue(own_subgroups))
            }

            ref.removeNode(selected_node)
            if (parseInt(selected_node.parent_id) === parseInt(node.id)) {
                ref.insertNodeBefore(selected_node, node.getFirstChild())
            } else {
                ref.insertNodeAfter(selected_node, node)
            }
            ref.update()

        } else {
            const id = selected_node.id;

            for (let [index, item] of Object.entries(data)) {
                sort[item.id] = parseInt(item.id) === parseInt(id) ? 0 : +index + 1;
                initial_sort_data.push({
                    id: item.id,
                    cat_id: item.cat_id,
                    parent_id: item.parent_id,
                    sort: parseInt(item.id) === parseInt(id) ? 0 : +index + 1,
                    name: item.name,
                    children: [...item.children]
                })
            }
            dispatch(setRenderedOwnTreeValue(initial_sort_data.sort((a, b) => {
                return a.sort - b.sort
            })))
            let sNode = {...selected_node}
            ref.removeNode(selected_node)
            ref.insertNodeBefore(sNode, selected_node.getParent().getFirstChild())
            ref.update()
        }
        dispatch(subgroupsSort({param: {sort: {...sort}, cat_id: catId}, path: "Group/SubGroupSort"}));
    }
}

export function subgroupsSort(object) {

    return async () => {
        if (cookie.get('access')) {
            try {
                await Axios.post(API_URL, {...object}, getHeaders({}, {}));
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export function cancelEditing() {

    return {
        type: END_EDITING
    }
}

export function setRenderedOwnTreeValue(value) {

    return {
        type: SET_RENDERED_TREE_VALUE, value
    }
}

export function setRenderedFilterTreeValue(value) {

    return {
        type: SET_RENDERED_FILTER_TREE_VALUE, value
    }
}

export function startMoveAction() {

    return {
        type: START_MOVE_ACTION
    }
}

export function setMoveAction() {

    return {
        type: SET_MOVE_ACTION
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
                await updateToken(API_URL, error, "errors", error.message, 'allError', true, setGroupValues, getOnlySubgroupWithGroupId, dispatch, id, place);
            }
        }
    }
}

export function addSubgroup(data, node, ref, cNode = null, buffer = null) {

    return async dispatch => {
        if (cookie.get('access')) {
            try {
                delete data.parent;
                const response = await Axios.post(API_URL, {path: "Group/SubGroup", param: {...data}}, getHeaders());
                const new_data = Object.values(response.data.data)
                data.id = +response.data["last_inserted_id"]
                data.sort = 0;
                if (ref) {
                    if (node && node !== "inside") {
                        ref.removeNode(node)
                        ref.appendChildNode(data, node.getParent())
                        ref.openNode(node.getParent())
                    } else if (node === "inside") {
                        const movingNode = {...buffer};
                        if (cNode) {
                            ref.selectNode();
                            movingNode.parent_id = parseInt(cNode.id)
                            movingNode.sort = 0;
                            movingNode.id = +response.data["last_inserted_id"];
                            movingNode.children = [];
                            ref.addChildNodes(movingNode, 0, cNode)
                            ref.openNode(cNode)
                        } else {
                            ref.selectNode();
                            movingNode.parent_id = 0;
                            movingNode.sort = 0;
                            movingNode.children = [];
                            movingNode.id = +response.data["last_inserted_id"];
                            ref.addChildNodes(movingNode, 0)
                        }
                    } else {
                        data.children = []
                        ref.addChildNodes(data, 0)
                    }
                    ref.selectNode();
                }
                dispatch(renderTree(new_data));
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
                const response = await Axios.put(API_URL, {path: "Group/SubGroup", param: {...data}}, getHeaders());
                const new_data = Object.values(response.data.data)
                dispatch(renderTree(new_data));
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

export function searchHandler(name, value) {
    return dispatch => {
        dispatch(setGroupValues(name, value));
    }
}

export function deleteClassifiersAction(type, param, id = null) {

    return dispatch => {
        if (id === null) {
            dispatch(getActionById("GET", type, param))
        } else {
            dispatch(getActionById("GET", type, param, id))
        }
        dispatch(setGroupValues('delete', type))
    }
}

export function editGroupAction(value, newGroup) {

    return {
        type: EDIT_GROUP_ACTION, value, newGroup
    }
}

export function checkGroup(type, item, id, place, index) {

    return (dispatch, getState) => {
        if (type === "edit") {
            dispatch(getSubgroupWithGroupId(id, place))
            dispatch(checkGroupSet(id, index,))
        } else if (type === "select") {
            const classifiers = {...getState().products.classifiers};
            const classifiersArray = [...classifiers.classifiers];
            const initialOpen = getState().products.initialOpen;
            if (checkItem(classifiersArray, item)) {
                classifiersArray.push(item)
            }
            classifiers.classifiers = classifiersArray;
            dispatch(importGroupInProduct(initialOpen, "close"))
            dispatch(checkGroupSet(id, index))
        }
    }
}

export function checkGroupSet(id, index) {

    return {
        type: CHECK_GROUP_SET, id, index
    }
}

export function editSubgroupAction() {

    return (dispatch, getState) => {
        const subgroup = {...getState().characteristics.subgroup};
        const newSubgroup = {...getState().characteristics.newSubgroup};
        const subgroupName = subgroup[`name_${cookie.get('language') || "am"}`];
        newSubgroup.name = subgroup[`name_${cookie.get('language') || "am"}`];
        newSubgroup.image = subgroup.image;
        newSubgroup.id = subgroup.id;
        newSubgroup.sort = subgroup.sort;
        newSubgroup.parent_id = subgroup.parent_id;
        newSubgroup.cat_id = subgroup.cat_id;
        dispatch(editSubgroupActionSet(newSubgroup, subgroupName))
    }
}

export function editSubgroupActionSet(newSubgroup, subgroupName) {
    return {
        type: EDIT_SUBGROUP_ACTION, newSubgroup, subgroupName
    }
}

export function changeSubgroupName(name, value) {

    return {
        type: CHANGE_SUBGROUP_NAME, name, value
    }
}

export function addSubgroupAction(id) {

    return {
        type: ADD_SUBGROUP_ACTION, id
    }
}

export function addGroupAction(id) {
    return {
        type: ADD_GROUP_ACTION, id
    }
}

export function deleteModalClose() {

    return {
        type: DELETE_MODAL_CLOSE
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

export function closeAction() {

    return {
        type: CLOSE_HANDLER
    }
}

export function openAction(data, group, status) {

    return {
        type: OPEN_HANDLER, data, group, status
    }
}

export function selectTreeItem(node, id, path, catId) {

    return {
        type: SELECT_TREE_ITEM, node, id, path, catId
    }
}

export function selectTreeGroupItem(id) {

    return {
        type: SELECT_TREE_GROUP_ITEM, id
    }
}