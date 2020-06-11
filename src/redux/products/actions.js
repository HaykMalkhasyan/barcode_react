import {
    ADD_BARCODE,
    ADD_MEASUREMENT_VALUE,
    ADD_POINTS_VALUE,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST, ADD_PRODUCT_STATUS,
    ADD_PRODUCT_SUCCESS,
    ADD_RESULT,
    ADD_SEARCH_TEXT,
    ADD_UPLOAD_IMAGES,
    ADD_VALUE,
    CLASSIFIERS_TOGGLE_MODAL,
    CREATE_CLASSIFIERS_ERROR,
    CREATE_CLASSIFIERS_SUCCESS,
    DELETE_BARCODE,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS, EDITABLED_PRODUCT,
    GET_BARCODE_TYPES_FAIL,
    GET_BARCODE_TYPES_REQUEST,
    GET_BARCODE_TYPES_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    SEARCH_ERROR,
    SELECT_GROUP,
    SELECT_ID_IN_ARRAY, SET_ADDED_PRODUCT,
    SET_BARCODE, SET_DELETED_IMAGES, SET_IMAGES_DATA, SET_PRODUCT_COLLAPSED,
    SET_PRODUCT_MODAL, TOGGLE_CLASSIFIERS_STATE,
    TOGGLE_PRODUCT_MODAL
} from "./actionTypes";
import axios from 'axios'
import SessionStorage from "../../services/SessionStorage";
import {getSession, saveSession} from "../../utility/session";
import jwt_decode from "jwt-decode";

export const productActions = (type, data) => {
    switch (type) {
        case "get":
            return {
                types: [GET_PRODUCT_REQUEST, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.gett(`product/${data.id}`)
            }
        case "getAll":
            return {
                types: [GET_PRODUCTS_REQUEST, GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS],
                promise: (apiClient) => apiClient.gett(`product/?page_size=10000`)
            }
        case "add":
            return {
                types: [ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.posttAdd(`product/`, data)
            }
        case "edit":
            return {
                types: [EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.putt(`product/${data.id}`, data)
            }
        case "delete":
            return {
                types: [DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS],
                promise: (apiClient) => apiClient.deletee(`product/${data.id}`),
                data
            }
        default:
            return;
    }
};
export const barcodeActions = (type, code) => {
    switch (type) {
        case "getTypes":
            return {
                types: [GET_BARCODE_TYPES_REQUEST, GET_BARCODE_TYPES_FAIL, GET_BARCODE_TYPES_SUCCESS],
                promise: (apiClient) => apiClient.gett(`barcode`)
            }
        case "add":
            return {
                type: ADD_BARCODE,
                code
            }
        case "delete":
            return {
                type: DELETE_BARCODE,
                code
            }
        default:
            return;
    }
}


export const setModalValues = (key, value) => {

    return {
        type: SET_PRODUCT_MODAL,
        key,
        value
    }
}

/*----------------------------------*/

export function removeBarcode(data, index) {

    return (dispatch, getState) => {
        let product = {...getState().products.product};
        product.barcode.splice(index, 1);
        dispatch(setBarcode(product))
    }
}

export function setBarcode(product) {

    return {
        type: SET_BARCODE,
        product
    }
}

export function setMeasurementValue(name, data) {

    return (dispatch, getState) => {
        let product = {...getState().products.product}
        product[name] = data.id;
        dispatch(addMeasurementValue(product))
    }
}

export function addMeasurementValue(product) {

    return {
        type: ADD_MEASUREMENT_VALUE,
        product
    }
}

export function setPointsValue(name, value) {

    return (dispatch, getState) => {
        let product = {...getState().products.product}
        product[name] = value;
        dispatch(addPointValue(product))
    }
}

export function addPointValue(data) {

    return {
        type: ADD_POINTS_VALUE,
        data
    }
}

export function deleteUploadImage(image, indexNumber, type) {

    return (dispatch, getState) => {
        const product = {...getState().products.product};
        const images = [...getState().products.images]
        let pictures = [...product.pictures];
        pictures.splice(indexNumber, 1)
        images.splice(indexNumber, 1)
        product.pictures = pictures;
        dispatch(setDeletedImages(product, images))
    }
}

export function setDeletedImages(product, images) {

    return {
        type: SET_DELETED_IMAGES,
        product,
        images
    }
}

export function SetUploadImages(name, image) {

    return (dispatch, getState) => {

        let product = {...getState().products.product}
        if (product[name]) {
            product[name].push({name: `${Date.now()}_${image.name/*.split('.')[0]*/}`})
        } else {
            product[name] = [{name: `${Date.now()}_${image.name/*.split('.')[0]*/}`}]
        }
        dispatch(AddUploadImages(product))
    }
}

export function deleteUploadImages(imageItem) {

    return (dispatch, getState) => {
        let product = {...getState().products.product}
        product.pictures.forEach(
            (item, index) => {
                if (item.name === imageItem.name) {
                    product.pictures.splice(index, 1);
                }
            }
        )
        dispatch(AddUploadImages(product))
    }
}

export function AddUploadImages(product) {

    return {
        type: ADD_UPLOAD_IMAGES,
        product
    }
}

export function setMainImage(imageFile) {

    return (dispatch, getState) => {

        let product = {...getState().products.product}
        product['image'] = imageFile;
        dispatch(AddUploadImages(product))

    }
}

export function setSearchProductValue(value, name) {

    return (dispatch, getState) => {
        let searchProduct = {...getState().products.searchProduct};
        let products = [...getState().products.products];
        searchProduct[name] = value;
        dispatch(AddValue(searchProduct))
        switch (name) {

            case 'sku':
            case 'name':
            case 'suppliers':
            case 'description': {
                let searchProductResult = [];
                for (let item in searchProduct) {
                    if (item !== name) {
                        searchProduct[item] = '';
                    }
                }
                searchProduct[name] = value;
                if (/\d/.test(value)) {
                    for (let product of products) {
                        if (product[name] && product[name].search(searchProduct[name]) !== -1) {
                            let index = false;
                            for (let item of searchProductResult) {
                                if (product.id === item.id) {
                                    index = true
                                }
                            }
                            if (!index) {
                                searchProductResult.push(product)
                            }
                        } else {
                            dispatch(searchProductError(name))
                        }
                    }
                } else {
                    for (let product of products) {
                        if (product[name] && product[name].trim().toLowerCase().search(searchProduct[name].trim().toLowerCase()) !== -1) {
                            let index = false;
                            for (let item of searchProductResult) {
                                if (product.id === item.id) {
                                    index = true
                                }
                            }
                            if (!index) {
                                searchProductResult.push(product)
                            }
                        } else {
                            dispatch(searchProductError(name))
                        }
                    }
                }
                dispatch(AddSearchResult(searchProductResult))
                break;
            }
            case 'barcode': {
                let searchProductResult = [];
                for (let item in searchProduct) {
                    if (item !== name) {
                        searchProduct[item] = '';
                    }
                }
                searchProduct[name] = value;
                if (/\d/.test(value)) {
                    for (let product of products) {
                        for (let barcodeItem of product.barcode) {
                            if (barcodeItem[name] && barcodeItem[name].search(searchProduct[name]) !== -1) {
                                let index = false;
                                for (let item of searchProductResult) {
                                    if (product.id === item.id) {
                                        index = true
                                    }
                                }
                                if (!index) {
                                    searchProductResult.push(product)
                                }
                            } else {
                                dispatch(searchProductError(name))
                            }
                        }
                    }
                } else {
                    for (let product of products) {
                        for (let barcodeItem of product.barcode) {
                            if (barcodeItem[name] && barcodeItem[name].trim().toLowerCase().search(searchProduct[name].trim().toLowerCase()) !== -1) {
                                let index = false;
                                for (let item of searchProductResult) {
                                    if (product.id === item.id) {
                                        index = true
                                    }
                                }
                                if (!index) {
                                    searchProductResult.push(product)
                                }
                            } else {
                                dispatch(searchProductError(name))
                            }
                        }
                    }
                }
                dispatch(AddSearchResult(searchProductResult))
                break;
            }
            default:
                break;
        }
    }
}

export function searchProductError(name) {

    return {
        type: SEARCH_ERROR,
        name
    }
}

export function AddSearchResult(result) {

    return {
        type: ADD_RESULT,
        result
    }
}

export function AddValue(data) {

    return {
        type: ADD_VALUE,
        data
    }
}

export function selectClassifiersGroup(group) {

    return {
        type: SELECT_GROUP,
        group
    }
}

export function selectGroupsNode(elemsIdInArray) {

    return {
        type: SELECT_ID_IN_ARRAY,
        elemsIdInArray
    }
}

export function createClassifiers() {

    return (dispatch, getState) => {
        let object = [];
        let elemsIdInArray = getState().products.elemsIdInArray ? [...getState().products.elemsIdInArray] : null;
        let group = {...getState().products.group};
        let advancedSearchConfig = {...getState().products.advancedSearchConfig};
        let groups = [...getState().group.groups];
        let subGroups = getState().group.subGroups;
        if (elemsIdInArray) {
            for (let itemId of elemsIdInArray) {
                for (let item of groups) {
                    if (parseInt(item.id) === parseInt(itemId)) {
                        object.push(item)
                    }
                }
                for (let item of subGroups) {
                    if (parseInt(item.id) === parseInt(itemId)) {
                        object.push(item)
                    }
                }
            }
        } else {
            if (group) {
                object.push(group)
            } else {
                dispatch(createClassifiersError())
            }
        }
        advancedSearchConfig['classifiers'] = object
        dispatch(createClassifiersSuccess(advancedSearchConfig))
    }
}

export function removeSelectedClassifier(data) {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig}

        for (let [key, value] of Object.entries(advancedSearchConfig.classifiers)) {

            if (data.id === value.id) {
                advancedSearchConfig.classifiers.splice(key, 1);
            }
        }
        if (advancedSearchConfig.classifiers.length === 0) {
            delete advancedSearchConfig.classifiers
            dispatch(createClassifiersSuccess(advancedSearchConfig))
        } else {
            dispatch(createClassifiersSuccess(advancedSearchConfig))
        }
    }
}

export function toggleSwitchValue(name, value) {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig}
        advancedSearchConfig[name] = !advancedSearchConfig[name]
        dispatch(createClassifiersSuccess(advancedSearchConfig))
    }
}

export function toggleCheckBoxValue(name, check, value = false, classifier) {

    return (dispatch, getState) => {
        console.log(check)
        let advancedSearchConfig = {...getState().products.advancedSearchConfig}

        if (value === false) {
            if (check) {
                advancedSearchConfig[name] = check
            } else {
                delete advancedSearchConfig[name]
            }
        } else {
            if (check) {
                advancedSearchConfig[name] = classifier
            } else {
                delete advancedSearchConfig[name]
            }
        }
        dispatch(createClassifiersSuccess(advancedSearchConfig))
    }
}

export function changePageSize(value) {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig}

        if (value !== 'all') {
            advancedSearchConfig.pageSize = +value
        } else {
            advancedSearchConfig.pageSize = value
        }
        dispatch(createClassifiersSuccess(advancedSearchConfig))
    }
}

export function createClassifiersError() {

    return {
        type: CREATE_CLASSIFIERS_ERROR
    }
}

export function createClassifiersSuccess(data) {
    sessionStorage.setItem('advancedSearchConfig', JSON.stringify(data))
    return {
        type: CREATE_CLASSIFIERS_SUCCESS,
        data
    }
}

export function setSearchText(text) {

    return (dispatch, getState) => {
        let advancedSearchText = {...getState().products.advancedSearchText}

        advancedSearchText = text
        dispatch(addSearchText(advancedSearchText))
    }
}

export function addSearchText(advancedSearchText) {

    return {
        type: ADD_SEARCH_TEXT,
        advancedSearchText
    }
}

export function classifiersToggleModal() {

    return {
        type: CLASSIFIERS_TOGGLE_MODAL
    }
}

export function editabledProduct() {

    return {
        type: EDITABLED_PRODUCT
    }
}

export function toggleClassifierState(active, isOpen) {

    return {
        type: TOGGLE_CLASSIFIERS_STATE,
        active, isOpen
    }
}

/*----------------------------------*/

export const toggleModal = (modalType, id, status = false) => {

    return (dispatch, getState) => {
        if (status === false) {
            let imageObject = [];
            let prodId = null;
            if (modalType === 'edit') {
                let products = getState().products.products;
                for (let product of products) {
                    if (product.id === id) {
                        if (product.pictures && product.pictures.length) {
                            prodId = product.id;
                            for (let img of product.pictures) {
                                let imgName = img.image.split('/');
                                imageObject.push({
                                    id: product.id,
                                    original: img.image,
                                    thumbnail: img.image,
                                    originalAlt: imgName[imgName.length - 1]
                                })
                            }
                        }
                    }
                }
                if (prodId === id) {
                    dispatch(setProductImage(imageObject))
                }
            }
        } else if (status === true) {
            dispatch(setProductImage([]))
        }
        dispatch(setToggleModal(modalType, id))
    }
}

export function setProductImage(images) {

    return {
        type: SET_IMAGES_DATA,
        images
    }
}

export const setToggleModal = (modalType, id) => {
    let obj = {"id": id};
    return {
        type: TOGGLE_PRODUCT_MODAL,
        modalType,
        obj
    }
}
/*
*   product/
* */
/*----------------------------------------------------------*/

/*-------------------Test-----------------------------------*/

export function getToken(error, refreshToken) {
    return async dispatch => {
        try {
            const res = await axios.post('token/refresh/', refreshToken);
            let uderData = jwt_decode(res.data.access);
            let user = {
                firstname: uderData.firstname,
                lastname: uderData.lastname,
                user_id: uderData.user_id
            }
            let resData = {};
            resData.refresh = res.data.refresh;
            resData.access = res.data.access;
            axios.defaults.headers['Authorization'] = "JWT " + resData.access;
            error.config.headers['Authorization'] = "JWT " + resData.access;
            saveSession('auth', resData);
            const options = {
                path: '/',
            };
            SessionStorage.set('access', resData.access, options);
            SessionStorage.set('refresh', resData.refresh, options);
            SessionStorage.set('user', user, options);
            return {
                access: resData.access,
                refresh: resData.refresh,
                user: user
            }
        } catch (error) {
            console.log('Error !')
        }
    }
}


export function testFetchNewProduct(type, data, images) {
    return async (dispatch, getState) => {

        const access = SessionStorage.get("access");
        const picture = [...getState().products.product.pictures]

        switch (type) {

            case 'add': {
                    for (let [key, value] of Object.entries(picture)) {

                        let imageName = value.name
                        let form_data = new FormData();
                        let image = images[key];

                        form_data.append('file', image)
                        form_data.append('filename', imageName)
                        try {
                        await axios.post('/product/upload/', form_data, {
                            headers: {
                                'content-type': 'multipart/form-data',
                                'Authorization': `JWT ${access}`
                            }
                        })
                        } catch (error) {
                            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                                const refresh_token = getSession('refresh');
                                let new_token_data = getToken(error, {refresh: refresh_token})
                                if ((await new_token_data).access === getSession('access') && (await new_token_data).refresh === getSession('refresh')) {
                                    return axios.post('/product/upload/', form_data, {
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                            'Authorization': `JWT ${access}`
                                        }
                                    })
                                        .then(
                                            response => response.data
                                        )
                                        .catch(err => {
                                            console('Error')
                                        })
                                }
                            }
                        }
                    }

                    dispatch(fetchImages(data, type))
                break;
            }
            case 'edit': {
                if (images) {
                    for (let [key, value] of Object.entries(picture)) {

                        let imageName = value.name
                        let form_data = new FormData();
                        let image = images[key];

                        form_data.append('file', image)
                        form_data.append('filename', imageName)

                        try {
                            await axios.post('/product/upload/', form_data, {
                                headers: {
                                    'content-type': 'multipart/form-data',
                                    'Authorization': `JWT ${access}`
                                }
                            })
                        } catch (error) {
                            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                                const refresh_token = getSession('refresh');
                                let new_token_data = getToken(error, {refresh: refresh_token})
                                if ((await new_token_data).access === getSession('access') && (await new_token_data).refresh === getSession('refresh')) {
                                    return axios.post('/product/upload/', form_data, {
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                            'Authorization': `JWT ${access}`
                                        }
                                    })
                                        .then(
                                            response => response.data
                                        )
                                        .catch(err => {
                                            console('Error')
                                        })
                                }
                            }
                        }
                    }

                    dispatch(fetchImages(data, type))
                } else {
                    dispatch(fetchImages(data, type))
                }
                break;
            }
            default: return ;
        }
    }
}

export function fetchImages(data, type) {

    return async (dispatch, getState) => {
        console.log('DASA', data, type)
        const access = SessionStorage.get("access");
        let response;
        switch (type) {

            case 'add': {
                try {
                    response = await axios.post('product/', data, {
                        headers: {
                            "Authorization": `JWT ${access}`
                        }
                    })
                    console.log('RESPONSE', response)
                    dispatch(addedProduct(response.data))
                } catch (error) {
                    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                        const refresh_token = getSession('refresh');
                        let new_token_data = getToken(error, {refresh: refresh_token})
                        if ((await new_token_data).access === getSession('access') && (await new_token_data).refresh === getSession('refresh')) {
                            response = await axios.post('product/', data, {
                                headers: {
                                    'Authorization': `JWT ${access}`
                                }
                            })
                            dispatch(addedProduct(response.data))
                        }
                    }
                }
                break;
            }
            case 'edit': {
                try {
                    response = await axios.put(`product/${data.id}`, data, {
                        headers: {
                            "Authorization": `JWT ${access}`
                        }
                    })
                    dispatch(addedProduct(response.data))
                } catch (error) {
                    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                        const refresh_token = getSession('refresh');
                        let new_token_data = getToken(error, {refresh: refresh_token})
                        if ((await new_token_data).access === getSession('access') && (await new_token_data).refresh === getSession('refresh')) {
                            response = await axios.post(`product/${data.id}`, data, {
                                headers: {
                                    'Authorization': `JWT ${access}`
                                }
                            })
                            dispatch(addedProduct(response.data))
                        }
                    }
                }
                break;
            }
            default:
                break;
        }
    }
}

export function addedProduct(data) {

    return (dispatch, getState) => {
        try {
            let products = [...getState().products.products]
            products.push(data)
            dispatch(setAddedProduct(products))
            dispatch(addProductStatus(true, 'success', 'product added successfully'))
        } catch (e) {
            dispatch(addProductStatus(true, 'error', 'failed to add product'))
        }
    }
}

export function setAddedProduct(data) {

    return {
        type: SET_ADDED_PRODUCT,
        data
    }
}

export function subGroupCollapses(id) {

    return (dispatch, getState) => {
        let index = false;
        let collapsedStatus = {...getState().products.collapsedStatus}
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
        dispatch(setGroupCollapses(collapsedStatus))
    }
}

export function setGroupCollapses(collapsedStatus) {

    return {
        type: SET_PRODUCT_COLLAPSED,
        collapsedStatus
    }
}

export function addProductStatus(status, severity, text) {

    return {
        type: ADD_PRODUCT_STATUS,
        status,
        severity,
        text
    }
}