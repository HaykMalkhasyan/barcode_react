import {
    ADD_NEW_PRODUCT,
    BACK_TO_PRODUCT,
    CLOSE_MODALS,
    CLOSE_PRODUCT_MODAL,
    IMPORT_GROUP_IN_PRODUCT,
    IMPORT_GROUP_IN_PRODUCT_CLOSE,
    ONLY_ADD_PRODUCT,
    SET_ALL_IMAGES, SET_MAIN_IMAGE,
    SET_PRODUCT_ERRORS,
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
import {getActionById} from "../characteristics/actions";

const API_URL = process.env.REACT_APP_API_URL;

export function getProduct(id) {

    return async (dispatch, getState) => {

        if (cookie.get('access')) {
            dispatch(setProductValues("productLoadingStatus", true))
            const main = {...getState().products.main}
            const classifiers = {...getState().products.classifiers}
            const suppliers = [...getState().suppliers.suppliers];
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Products/Product", param: {id: id}}));
                const data = response.data.data[0];
                await dispatch(getActionById("get", null, {path: "Group/SubGroup", id: 0, param: {get_id: data.catedory_id}}, data.catedory_id))
                // console.log("RESPONSE: ", response.data.data[0])
                main.item_name = data.item_name;
                main.product_type = data.service;
                main.unit_id = data.unit;
                main.active = data.active;
                const subgroup = {...getState().characteristics.subgroup}
                classifiers[0] = {...subgroup}
                const firms = data.firms.split(",");
                const selected = [];
                for (let item of suppliers) {
                    if (firms.indexOf(item.id.toString()) !== -1) {
                        selected.push(item)
                    }
                }
                // data['pictures'].forEach(
                //     image => {
                //         images.push(image['image'])
                //     }
                // );

                dispatch(setProductModalValues(data, main, classifiers, selected))
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
                const response = await Axios.get(
                    API_URL,
                    getHeaders(
                        {},
                        {
                            limit: 20,
                            page: page,
                            path: "Products/Product",
                            cols: "id, articul, item_name, image_path, item_type, unit, service, create_date, del_date, firms, active, deleted, sort"
                        }
                        )
                );
                console.log("PRODUCTS: ", response.data)
                dispatch(setProducts(response.data.data, response.data.page_count))
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
        const tabErrors = [...getState().products.tabErrors];
        const open = getState().products.open;
        const init_classifiers = {...getState().products.classifiers};
        const classifiers = {};
        for (let index of Object.keys(init_classifiers)) {
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
            if (tabErrors.indexOf("codes") !== -1) {
                tabErrors.splice(tabErrors.indexOf("codes"), 1)
            }
        } else {
            if (errorFields.indexOf("barcode") === -1) {
                errorFields.push("barcode")
            }
            if (tabErrors.indexOf("codes") === -1) {
                tabErrors.push("codes")
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
            if (errorFields.indexOf("classifiers") !== -1) {
                errorFields.splice(errorFields.indexOf("classifiers"), 1)
            }
            if (tabErrors.indexOf("classifiers") !== -1) {
                tabErrors.splice(tabErrors.indexOf("classifiers"), 1)
            }
        } else {
            if (errorFields.indexOf("classifiers") === -1) {
                errorFields.push("classifiers")
            }
            if (tabErrors.indexOf("classifiers") === -1) {
                tabErrors.push("classifiers")
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
            if (tabErrors.indexOf("main") !== -1) {
                tabErrors.splice(tabErrors.indexOf("main"), 1)
            }
        } else {
            if (errorFields.indexOf("item_name") === -1) {
                errorFields.push("item_name")
            }
            if (tabErrors.indexOf("main") === -1) {
                tabErrors.push("main")
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
            if (tabErrors.indexOf("main") !== -1) {
                tabErrors.splice(tabErrors.indexOf("main"), 1)
            }
        } else {
            if (errorFields.indexOf("product_type") === -1) {
                errorFields.push("product_type")
            }
            if (tabErrors.indexOf("main") === -1) {
                tabErrors.push("main")
            }
        }

        data.item_type = "piece";
        // data.articul = Math.floor(1000 * Math.random());
        data.details = [];
        data.images = {};
        data.active = !main.active;

        // Unit (unit_id)
        if (main.unit_id !== "") {
            data.unit = main["unit_id"]
            if (errorFields.indexOf("unit_id") !== -1) {
                errorFields.splice(errorFields.indexOf("unit_id"), 1)
            }
            if (tabErrors.indexOf("main") !== -1) {
                tabErrors.splice(tabErrors.indexOf("main"), 1)
            }
        } else {
            if (errorFields.indexOf("unit_id") === -1) {
                errorFields.push("unit_id")
            }
            if (tabErrors.indexOf("main") === -1) {
                tabErrors.push("main")
            }
        }
        dispatch(setAddingProductErrors(tabErrors, errorFields));
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

export function setAddingProductErrors(tabErrors, errorFields) {

    return {
        type : SET_PRODUCT_ERRORS, tabErrors, errorFields
    }
}

export function uploadImages(files, data, type) {

    return async (dispatch, getState) => {
        const open = getState().products.open;
        const pictures = {...getState().products.pictures};
        const mainIMage = {...getState().products.image_path};
        data.image_path = Object.keys(mainIMage).length ? mainIMage.name : "";
        let form_data = new FormData();
        for (let [key] of Object.entries(files)) {
            console.log(files[key])
            form_data.append('ax_file_input', files[key])
            form_data.append("ax-file-path", "../items_images/thumb/2000/")
            form_data.append('ax-thumbPostfix', '_thumb')
            form_data.append('ax-file-size', files[key].size)
            form_data.append('ax-max-file-size', '10M')
            form_data.append('ax-last-chunk', 'true')
            form_data.append('ax-start-byte', '0')
            form_data.append('ax-file-name', pictures.pictures[key].name)
            data.images[key] = pictures.pictures[key].name;
            break
        }
        console.log(data)
        try {
            const response = await Axios.post(`http://new.haysell.com/images/upload/config/upload_image_items.php`, form_data);
            if (response.status === 201) {
                if (open === "add") {
                    dispatch(productDataRequest(data, type))
                } else if (open === "edit") {
                    dispatch(productDataEditRequest(data, type))
                }
            }
        } catch (error) {
            console.log("Image upload error !")
        }
    }
}

export function productDataRequest(data, type) {

    return async (dispatch, getState) => {
        const products = [...getState().products.products];
        try {
            const response = await Axios.post(API_URL, {path: "Products/Product", param: {...data}, cols: "id,articul,item_name,image_path,item_type,unit,service,create_date,del_date,firms,active,deleted,sort"}, getHeaders({}, ));
            products.push(response.data.data[0])
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
        try {
            const response = await Axios.put(API_URL, {param: {...data}, path: "Products/Product"}, getHeaders({}, {}));
            console.log("EDIT", response.data.data[0])
            const responseData = response.data.data[0];
            for (let [key, value] of Object.entries(products)) {
                if (value.id === responseData.id) {
                    products[key] = responseData
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
            console.log("Product edit error !")
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

export function setProductModalValues(data, main, classifiers, selected) {

    return {
        type: SET_PRODUCT_MODAL_VALUES,
        data, main, classifiers, selected
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

export function setMainImage(image_path) {

    return {
        type: SET_MAIN_IMAGE, image_path
    }
}

export function setAllImages(images, pictures) {

    return {
        type: SET_ALL_IMAGES, images, pictures
    }
}