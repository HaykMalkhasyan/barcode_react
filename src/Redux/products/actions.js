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
    SET_SELECT_GROUP_ITEM,
    SET_SUBGROUP,
    SET_TAB_VALUE
} from "./actionTypes";
import Axios from "axios";
import {getHeaders, getToken} from "../../services/services";
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
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
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
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
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
        // const description = {...getState().products.description};
        // const pictures = {...getState().products.pictures};
        const errorFields = [...getState().products.errorFields];
        const open = getState().products.open;
        const init_classifiers = {...getState().products.classifiers};
        const classifiers = {};
        for (let index of Object.keys(init_classifiers)) {
            console.log("classifiers: ", index, init_classifiers[index])
            classifiers[index] = {value: init_classifiers[index].id, type_id: init_classifiers[index].cat_id};
        }
        const barcode = [...getState().barcode.barcode];
        // const data = Object.assign({}, /*description,*/ /*pictures,*/ );
        const data = {};
        const init_supplier = getState().suppliers.selected;
        const supplier = init_supplier ? [...init_supplier] : [];
        const price = {...getState().price.values};

        // Prices
        const prices = []
        for (let [key, item] of Object.entries(price)) {
            prices.push({
                sub_shop_id: key,
                item_price: item
            })
        }
        data.prices = [...prices]

        // Details (barcode)
        if (barcode.length > 0) {
            data.details = [...barcode];
            if (errorFields.indexOf("barcode") !== -1) {
                errorFields.splice(errorFields.indexOf("barcode"), 1)
            }
        } else {
            if (errorFields.indexOf("barcode") === -1) {
                errorFields.push("barcode")
            }
        }

        // Suppliers
        if (Object.keys(supplier).length) {
            data.firms = ""
            supplier.forEach(item => {
                if (data.firms.length) {
                    data.firms += `,${item.id}`;
                } else {
                    data.firms += item.id
                }
            })
        }/* else {
            if (errorFields.indexOf("suppliers") === -1) {
                errorFields.push("suppliers")
            }
        }*/

        // Classifiers
        if (Object.keys(classifiers).length && classifiers[0]) {
            data["catedory_id"] = classifiers[0].value;
            delete classifiers[0];
            data["custom_category"] = {...classifiers};
        } else {
            if (errorFields.indexOf("classifiers") === -1) {
                errorFields.push("classifiers")
            }
        }

        // Pictures
        // if (data.pictures.length > 0) {
        //     for (let picture of data.pictures) {
        //         picture.name = `${Date.now()}-${picture.name}`
        //     }
        // }
        // Item name
        if (main.item_name !== "") {
            data.item_name = main.item_name;
            if (errorFields.indexOf("item_name") !== -1) {
                errorFields.splice(errorFields.indexOf("item_name"), 1)
            }
        } else {
            if (errorFields.indexOf("item_name") === -1) {
                errorFields.push("item_name")
            }
        }
        // Short name, don't used
        // if (data.short_name.length === 0) {
        //     if (errorFields.indexOf("short_name") === -1) {
        //         errorFields.push("short_name")
        //     }
        // } else {
        //     if (errorFields.indexOf("short_name") !== -1) {
        //         errorFields.splice(errorFields.indexOf("short_name"), 1)
        //     }
        // }

        // Service (product type)
        if (main.product_type !== "") {
            data.service = main["product_type"];
            if (errorFields.indexOf("product_type") !== -1) {
                errorFields.splice(errorFields.indexOf("product_type"), 1)
            }
        } else {
            if (errorFields.indexOf("product_type") === -1) {
                errorFields.push("product_type")
            }
        }

        data.item_type = "piece";
        data.articul = Math.floor(1000 * Math.random());
        data.details = [];
        data.images = {};
        data.active = main.active;

        // Unit (unit_id)
        if (main.unit_id !== "") {
            data.unit = main["unit_id"]
            if (errorFields.indexOf("unit_id") !== -1) {
                errorFields.splice(errorFields.indexOf("unit_id"), 1)
            }
        } else {
            if (errorFields.indexOf("unit_id") === -1) {
                errorFields.push("unit_id")
            }
        }
        dispatch(setProductValues('errorFields', errorFields));
        console.log(data)
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
            const response = await Axios.post(API_URL, {path: "Products/Product", param: {...data}}, getHeaders({}, {}));
            console.log(response.data)
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
            console.log("Product add error")
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
        delete data.state;
        delete data.children;
        classifiers[data.cat_id] = data;
        dispatch(setSubgroup(classifiers));
    }
}

export function setSubgroup(classifiers) {

    return {
        type: SET_SUBGROUP, classifiers
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