import {ADD_FILE, CHECK_FILE, SET_FORM_DATA_VALUE} from "./actionTypes";

export function addFile(name, value) {

    return {
        type: ADD_FILE,
        name,
        value
    }
}

export function clearAll() {

    let cleanFormData = {
        departOne: [
            {id: 1, name: 'sku', touched: false, valid: false, error: false},
            {id: 2, name: 'name', touched: false, valid: false, error: false},
            {id: 3, name: 'points', touched: false, valid: false, error: false},
            {id: 4, name: 'measurement'}
        ],
        departTwo: [
            {id: 5, name: 'classifiers', touched: false, valid: false, error: false},
            {id: 6, name: 'suppliers', touched: false, valid: false, error: false},
            {id: 7, name: 'barcode', touched: false, valid: false, error: false},
            {id: 8, name: 'description', touched: false, valid: false, error: false},
        ],
    };
    let cleanFormDataValue = {
        sku: '',
        name: '',
        points: '',
        measurement: '',
        classifiers: '',
        suppliers: '',
        barcode: '',
        description: '',
    }
    return dispatch => {
        dispatch(setFormDataValue(cleanFormDataValue, cleanFormData))
    }
}

export function checkTouched(name, area, id) {

    return (dispatch, getState) => {
        const formData = {...getState().importReducer.formData};
        const formDataValue = {...getState().importReducer.formDataValue};


        formData[area].forEach(
            item => {
                if (item.id === id) {
                    item.touched = true
                    if (formDataValue[name].length === 0) {
                        item.valid = false;
                        item.error = 'value is empty'
                    } else {
                        item.valid = true;
                        item.error = false
                    }
                }
            }
        )
        dispatch(setFormDataValue(formDataValue, formData))
    }
}

export function changeFormDataValue(name, value, area, id) {

    return (dispatch, getState) => {
        const formDataValue = {...getState().importReducer.formDataValue};
        const formData = {...getState().importReducer.formData};
        formData[area].forEach(
            item => {
                if (item.id === id) {
                    if (value.length > 0) {
                        if (value / 1) {
                            item.valid = true;
                            item.error = false
                        } else {
                            item.valid = false;
                            item.error = 'value is invalid'
                        }
                    } else {
                        item.valid = false;
                        item.error = 'value is empty'
                    }
                }
            }
        )
        formDataValue[name] = value
        dispatch(setFormDataValue(formDataValue, formData))
    }
}

export function setFormDataValue(formDataValue, formData) {

    return {
        type: SET_FORM_DATA_VALUE,
        formDataValue,
        formData
    }
}

export function checkFormValidate() {

    return (dispatch, getState) => {
        const formData = {...getState().importReducer.formData};
        const formDataValue = {...getState().importReducer.formDataValue};
        let file = getState().importReducer.file;
        let statusUpload = 0;

        formData.departOne.forEach(
            item => {
                if (item.touched) {
                    if (!item.valid) {
                        if (formDataValue[item.name].length > 0) {
                            item.error = 'value is invalid'
                            dispatch(setFormDataValue(formDataValue, formData))
                        } else {
                            item.error = 'value is empty'
                            dispatch(setFormDataValue(formDataValue, formData))
                        }
                    } else {
                        statusUpload++;
                    }
                } else {
                    item.error = 'value is empty'
                    dispatch(setFormDataValue(formDataValue, formData))
                }
            }
        )

        formData.departTwo.forEach(
            item => {
                if (item.touched) {
                    if (!item.valid) {
                        if (formDataValue[item.name].length > 0) {
                            item.error = 'value is invalid'
                            dispatch(setFormDataValue(formDataValue, formData))
                        } else {
                            item.error = 'value is empty'
                            dispatch(setFormDataValue(formDataValue, formData))
                        }
                    } else {
                        statusUpload++;
                    }
                } else {
                    item.error = 'value is empty'
                    dispatch(setFormDataValue(formDataValue, formData))
                }
            }
        )
        if (file === null) {
            dispatch(checkFile('You did not upload excel file'))
        } else {
            if (Object.keys(formDataValue).length === statusUpload) {
                dispatch(uploadFile(formDataValue))
            }
        }

    }
}

export function checkFile(data) {

    return {
        type: CHECK_FILE,
        data
    }
}

export function uploadFile(formDataValue) {

    return dispatch => {
        console.log(formDataValue)
    }
}