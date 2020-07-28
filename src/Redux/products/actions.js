import {SET_PRODUCT_VALUES} from "./actionTypes";

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

// ------------------------------------------

export function setProductValues(name, value) {

    return {
        type: SET_PRODUCT_VALUES,
        name,
        value
    }
}