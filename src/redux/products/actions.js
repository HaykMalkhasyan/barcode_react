import {
    ADD_BARCODE,
    ADD_MEASUREMENT_VALUE,
    ADD_POINTS_VALUE,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST,
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
    EDIT_PRODUCT_SUCCESS,
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
    SELECT_ID_IN_ARRAY,
    SET_BARCODE,
    SET_PRODUCT_MODAL,
    TOGGLE_PRODUCT_MODAL
} from "./actionTypes";

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

export function SetUploadImages(name, images) {

    return (dispatch, getState) => {
        let product = {...getState().products.product}
        let names = []
        for (let item of images) {
            names.push(item.name)
        }
        product[name] = names;
        dispatch(AddUploadImages(product))
    }
}

export function deleteUploadImages(imageItem) {

    return (dispatch, getState) => {
        let product = {...getState().products.product}
        product.upImages.forEach(
            (item, index) => {
                if (item.name === imageItem.name) {
                    product.upImages.splice(index, 1);
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
        product['image'] = imageFile.name;
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
                        for(let barcodeItem of product.barcode) {
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
                        for(let barcodeItem of product.barcode) {
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

        for(let [key, value] of Object.entries(advancedSearchConfig.classifiers)) {

            if (data.id === value.id) {
                advancedSearchConfig.classifiers.splice(key, 1);
            }
        }
        if (advancedSearchConfig.classifiers.length === 0 ) {
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

export function toggleCheckBoxValue(name, check) {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig}

        if (check) {
            advancedSearchConfig[name] = check
        } else {
            delete advancedSearchConfig[name]
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

/*----------------------------------*/

export const toggleModal = (modalType, id) => {
    let obj = {"id": id};
    return {
        type: TOGGLE_PRODUCT_MODAL,
        modalType,
        obj
    }
}