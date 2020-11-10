import {
    ADD_NEW_PRODUCT,
    BACK_TO_PRODUCT,
    CLOSE_MODALS,
    CLOSE_PRODUCT_MODAL,
    IMPORT_GROUP_IN_PRODUCT,
    IMPORT_GROUP_IN_PRODUCT_CLOSE,
    ONLY_ADD_PRODUCT,
    SET_PRODUCT_MODAL_VALUES,
    SET_PRODUCT_VALUES,
    SET_PRODUCTS,
    SET_SELECT_GROUP_ITEM, SET_SUBGROUP,
    SET_TAB_VALUE
} from "./actionTypes";
import Axios from "axios";
import {createRoad, getToken} from "../../services/services";
import cookie from "../../services/cookies";

const API_URL = process.env.REACT_APP_API_URL;

export function getProduct(id) {

    return async (dispatch, getState) => {
        const main = {...getState().products.main};
        // const classifiers = {...getState().products.classifiers};
        const description = {...getState().products.description};
        // const workers = {...getState().products.workers};
        const pictures = {...getState().products.pictures};
        const images = [...getState().products.images];
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/product/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                const data = response.data;
                main.name = data.name;
                main.short_name = data.short_name;
                main.product_type = data.product_type;
                main.unit_id = data['unit_id'];
                main.active = data.active;
                main.can_in = data.can_in;
                main.can_sale = data.can_sale;
                description['description'] = data['description'];
                data['pictures'].forEach(
                    image => {
                        images.push(image['image'])
                    }
                );
                pictures['pictures'] = data['pictures'];

                dispatch(setProductModalValues(data, main, description, pictures, images))
            } catch (error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setProductValues('error', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getProduct(id))
                    }
                } else {
                    dispatch(setProductValues('error', error.message))
                }
            }
        }
    }
}

export function getAllProducts(page) {
    return async dispatch => {
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(`${API_URL}/product/?page_size=20&page=${page}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get('access')}`
                    }
                });
                dispatch(setProducts(response.data.results, response.data.count))
            } catch(error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = cookie.get('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setProductValues('error', error.message))
                    } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                        dispatch(getAllProducts(page))
                    }
                } else {
                    dispatch(setProductValues('error', error.message))
                }
            }
        }
    }
}

export function advanceSearchHandler(item) {

    return (dispatch, getState) => {
        const advancedSearchConfig = {...getState().products.advancedSearchConfig};
        let classifiers = advancedSearchConfig.classifiers;

        if (classifiers === item) {
            classifiers = null
        } else {
            classifiers = item;
        }
        advancedSearchConfig.classifiers = classifiers;

        dispatch(setProductValues('advancedSearchConfig', advancedSearchConfig))
    }
}

// stugel ,, erevi petq e jnjel kam poxel
export function toggleCheckBoxValue(name, check, value = false, classifier) {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig};

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
        localStorage.setItem('advancedSearchConfig', JSON.stringify(advancedSearchConfig));
        dispatch(setProductValues('advancedSearchConfig', advancedSearchConfig))
    }
}

export function clearSearchClassifiers() {

    return (dispatch, getState) => {
        let advancedSearchConfig = {...getState().products.advancedSearchConfig};
        delete advancedSearchConfig['classifier'];
        localStorage.setItem('advancedSearchConfig', JSON.stringify(advancedSearchConfig));
        dispatch(setProductValues('advancedSearchConfig', advancedSearchConfig))
    }
}

export function setMainData(name, value) {

    return (dispatch, getState) => {
        const main = {...getState().products.main};
        main[name] = value;
        dispatch(setProductValues('main', main))
    }
}

export function setDescriptionData(name, value) {

    return (dispatch, getState) => {
        const description = {...getState().products.description};
        description[name] = value;
        dispatch(setProductValues('description', description))
    }
}

export function setProduct(gallery, type) {

    return (dispatch, getState) => {
        const main = {...getState().products.main};
        const description = {...getState().products.description};
        const pictures = {...getState().products.pictures};
        const errorFields = [...getState().products.errorFields];
        const open = getState().products.open;
        const classifiers_object = {...getState().products.classifiers};
        const classifiers = [...classifiers_object.classifiers];
        const subs = [...getState().products.subs];
        const barcode = [...getState().products.barcode];
        const groups = {...getState().products.groups};
        const data = Object.assign({}, main, description, pictures, groups, {barcode: barcode});

        if (classifiers.length === subs.length && subs.length > 0) {
            data.groups = subs
        } else {
            if (errorFields.indexOf("classifiers") === -1) {
                errorFields.push("classifiers")
            }
        }
        if (data.pictures.length > 0) {
            for (let picture of data.pictures) {
                picture.name = `${Date.now()}-${picture.name}`
            }
        }
        if (data.name.length === 0) {
            if (errorFields.indexOf("name") === -1) {
                errorFields.push("name")
            }
        } else {
            if (errorFields.indexOf("name") !== -1) {
                errorFields.splice(errorFields.indexOf("name"), 1)
            }
        }
        if (data.short_name.length === 0) {
            if (errorFields.indexOf("short_name") === -1) {
                errorFields.push("short_name")
            }
        } else {
            if (errorFields.indexOf("short_name") !== -1) {
                errorFields.splice(errorFields.indexOf("short_name"), 1)
            }
        }
        if (data.product_type.length === 0) {
            if (errorFields.indexOf("product_type") === -1) {
                errorFields.push("product_type")
            }
        } else {
            if (errorFields.indexOf("product_type") !== -1) {
                errorFields.splice(errorFields.indexOf("product_type"), 1)
            }
        }
        if (data.unit_id.length === 0) {
            if(errorFields.indexOf("unit_id") === -1) {
                errorFields.push("unit_id")
            }
        } else {
            if (errorFields.indexOf("unit_id") !== -1) {
                errorFields.splice(errorFields.indexOf("unit_id"), 1)
            }
        }
        data.supplier = [];
        dispatch(setProductValues('errorFields', errorFields));
        if (errorFields.length === 0) {
            if (gallery.length > 0) {
                dispatch(uploadImages(gallery, data, type))
            } else {
                if (open === "add") {
                    dispatch(productDataRequest(data, type))
                } else if (open === "edit") {
                    dispatch(productDataEditRequest(data, type))
                }
            }
        }
    }
}

export function uploadImages(files, data, type) {

    return async (dispatch, getState) => {
        const open = getState().products.open;
        let form_data = new FormData();
        for (let [key] of Object.entries(files)) {
            form_data.append('file', files[key]);
            form_data.append('filename', data.pictures[key].name)
        }
        try {
            const response = await Axios.post(`${API_URL}/product/upload/`, form_data, {
                headers: {
                    "Authorization": `JWT ${cookie.get('access')}`
                }
            });
            if (response.status === 201) {
                if (open === "add") {
                    dispatch(productDataRequest(data, type))
                } else if (open === "edit") {
                    dispatch(productDataEditRequest(data, type))
                }
            }
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(uploadImages(files, data))
                }
            } else {
                dispatch(setProductValues('error', error.message))
            }
        }
    }
}

export function productDataRequest(data, type) {

    return async (dispatch, getState) => {
        const products = [...getState().products.products];
        try {
            const response = await Axios.post(`${API_URL}/product/`, data, {
                headers: {
                    "Authorization": `JWT ${cookie.get('access')}`
                }
            });
            products.push(response.data);
            switch (type) {
                case 'save': {
                    dispatch(setProductValues('open', 'edit'));
                    dispatch(addNewProduct(products));
                    break;
                }
                case 'confirm':
                default: {
                    dispatch(addNewProductWithClose(products));
                    break;
                }
            }
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(productDataRequest(data))
                }
            } else {
                dispatch(setProductValues('error', error.message))
            }
        }
    }
}

export function productDataEditRequest(data, type) {

    return async (dispatch, getState) => {
        const products = [...getState().products.products];
        const product = getState().products.product;
        data.id = product.id;
        for (let item of data.pictures) {
            if (item.image) {
                delete item.image
            }
        }
        try {
            const response = await Axios.put(`${API_URL}/product/${data.id}`, data, {
                headers: {
                    "Authorization": `JWT ${cookie.get('access')}`
                }
            });
            for (let [key, value] of Object.entries(products)) {
                if (value.id === response.data.id) {
                    products[key] = response.data
                }
            }
            switch (type) {
                case 'save': {
                    dispatch(addNewProduct(products));
                    break;
                }
                case 'confirm':
                default: {
                    dispatch(addNewProductWithClose(products));
                    break;
                }
            }
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = cookie.get('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
                    dispatch(productDataEditRequest(data))
                }
            } else {
                dispatch(setProductValues('error', error.message))
            }
        }
    }
}

export function selectProducts(id = null, type) {

    return (dispatch, getState) => {
        let selected_products = [...getState().products.selected_products];
        if (type === 'item') {
            let index = selected_products.indexOf(id);
            index === -1 ?
                selected_products.push(id)
                :
                selected_products.splice(index, 1)
        } else if (type === 'all') {
            const products = [...getState().products.products];
            if (selected_products.length === products.length) {
                selected_products = [];
            } else {
                let index;
                for (let item of products) {
                    index = selected_products.indexOf(item.id);
                    if (index === -1) {
                        selected_products.push(item.id)
                    }
                }
            }
        }
        dispatch(setProductValues('selected_products', selected_products));
    }
}

export function importGroupInProduct(condition, status) {

    if (status === "open") {
        return {
            type: IMPORT_GROUP_IN_PRODUCT,
            condition
        }
    } else if (status === "close") {
        return {
            type: IMPORT_GROUP_IN_PRODUCT_CLOSE,
            condition
        }
    }
}

export function setTabValue(value) {

    return {
        type: SET_TAB_VALUE,
        value
    }
}

export function selectSubgroup(subgroup) {

    return (dispatch, getState) => {
        const classifiers = {...getState().products.classifiers}
        const data = {...subgroup};
        const road = createRoad(subgroup)
        delete data.state;
        delete data.children;
        classifiers[data.cat_id] = data;
        console.log(road, classifiers)
        dispatch(setSubgroup(classifiers));
    }
}

export function setSubgroup(classifiers) {

    return {
        type:  SET_SUBGROUP, classifiers
    }
}

export function selectGroupItem() {

    return (dispatch, getState) => {
        const open = getState().products.open;
        dispatch(setSelectGroupItem(open))
    }
}

export function backToProduct() {
    return (dispatch, getState) => {
        const initialOpen = getState().products.initialOpen;
        dispatch(backToProductSet(initialOpen))
    }
}

// ------------------------------------------

export function closeProductAndSubgroupModals() {

    return {
        type: CLOSE_MODALS
    }
}

export function backToProductSet(initialOpen) {

    return {
        type: BACK_TO_PRODUCT, initialOpen
    }
}

export function setSelectGroupItem(open) {

    return {
        type: SET_SELECT_GROUP_ITEM, open
    }
}

export function setProductModalValues(data, main, description, pictures, images) {

    return {
        type: SET_PRODUCT_MODAL_VALUES,
        data, main, description, pictures, images
    }
}

export function addNewProduct(products) {

    return {
        type: ONLY_ADD_PRODUCT,
        products
    }
}

export function addNewProductWithClose(products) {

    return {
        type: ADD_NEW_PRODUCT,
        products
    }
}

export function closeProductActionModal() {

    return {
        type: CLOSE_PRODUCT_MODAL
    }
}

export function setProductValues(name, value) {

    return {
        type: SET_PRODUCT_VALUES,
        name,
        value
    }
}

export function setProducts(products, count) {

    return {
        type: SET_PRODUCTS,
        products,
        count
    }
}