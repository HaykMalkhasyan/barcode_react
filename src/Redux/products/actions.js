import {
    ADD_NEW_PRODUCT,
    CLOSE_PRODUCT_MODAL,
    ONLY_ADD_PRODUCT,
    SET_PRODUCT_MODAL_VALUES,
    SET_PRODUCT_VALUES,
    SET_PRODUCTS
} from "./actionTypes";
import Axios from "axios";
import {getToken} from "../../services/services";

const API_URL = process.env.REACT_APP_API_URL;

export function getProduct(id) {

    return async (dispatch, getState) => {
        const main = {...getState().products.main};
        // const classifiers = {...getState().products.classifiers};
        const description = {...getState().products.description};
        // const workers = {...getState().products.workers};
        const pictures = {...getState().products.pictures};
        const images = [...getState().products.images];
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/product/${id}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
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
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setProductValues('error', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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
        if (localStorage.getItem('access')) {
            try {
                const response = await Axios.get(`${API_URL}/product/?page_size=20&page=${page}`, {
                    headers: {
                        "lang": "am",
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${localStorage.getItem('access')}`
                    }
                });
                dispatch(setProducts(response.data.results, response.data.count))
            } catch(error) {
                if (error.response  && error.response.status === 401 && error.response.statusText === "Unauthorized") {
                    const refresh_token = localStorage.getItem('refresh');
                    const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                    if ((await new_token_data) === null) {
                        dispatch(setProductValues('error', error.message))
                    } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
                        dispatch(getAllProducts(page))
                    }
                } else {
                    dispatch(setProductValues('error', error.message))
                }
            }
        }
    }
}

export function subGroupCollapses(id) {

    return (dispatch, getState) => {
        const collapsedStatus = [...getState().products.collapsedStatus];
        let index = collapsedStatus.indexOf(id);
        if (index === -1) {
            collapsedStatus.push(id)
        } else {
            collapsedStatus.splice(index, 1)
        }
        dispatch(setProductValues('collapsedStatus', collapsedStatus))
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
        const data = Object.assign({}, main, description, pictures);
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
        data.barcode = [];
        data.supplier = "";
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
        console.log(files)
        console.log(data)
        const open = getState().products.open;
        let form_data = new FormData();
        for (let index in files) {
            form_data.append('file', files[index]);
            form_data.append('filename', data.pictures[index].name)
        }
        try {
            const response = await Axios.post(`${API_URL}/product/upload/`, form_data, {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem('access')}`
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
                const refresh_token = localStorage.getItem('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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
                    "Authorization": `JWT ${localStorage.getItem('access')}`
                }
            });
            products.push(response.data);
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
                const refresh_token = localStorage.getItem('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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
        console.log(data)
        try {
            const response = await Axios.put(`${API_URL}/product/${data.id}`, data, {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem('access')}`
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
                const refresh_token = localStorage.getItem('refresh');
                const new_token_data = getToken(API_URL, error, {refresh: refresh_token});

                if ((await new_token_data) === null) {
                    dispatch(setProductValues('error', error.message))
                } else if ((await new_token_data).access === localStorage.getItem('access') && (await new_token_data).refresh === localStorage.getItem('refresh')) {
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

// ------------------------------------------

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