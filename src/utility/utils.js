export const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const IsRequiredField = (requiredFields, field, errors) => {
    if (requiredFields.includes(field.key) && field.value === "") {
        errors[field.key] = "Required";
    } else {
        delete errors[field.key];
    }

    return errors;
}

export const IsRequiredFields = (requiredFields, fields, errors) => {
    requiredFields.forEach(function (val, index) {
        if (!fields[val] || fields[val] === "") {
            errors[val] = "Required"
        }
    })
    return errors;
}

export const ObjectToArray = (obj) => {
    let arr = [];
    /*method map I change to forEach*/
    Object.keys(obj).forEach((key) => {
        arr.push(obj[key])
    })
    return arr;
}

export const RenameKeys = (arr, oldKeys, newKeys) => {
    let newArr = [];
    if (arr.length > 0) {
        arr.forEach(function (element) {
            let newEl = {}
            newKeys.forEach(function (key, index) {
                newEl[key] = element[oldKeys[index]]
            })
            newArr.push(newEl);
        })
    }
    return newArr;

}

export const Put = (arr, obj, key) => {
    if (arr.length > 0) {
        arr.forEach(function (element, index) {
            if (element[key] === obj[key]) {
                arr[index] = obj;
            }
        })
    }
    return arr;
}

export const Push = (arr, obj) => {
    arr.unshift(obj)
    return arr
}

export const Remove = (arr, obj, key) => {
    if (arr.length > 0) {
        arr.forEach(function (element, index) {
            if (element[key] === obj[key]) {
                arr.splice(index, 1)
            }
        })
    }
    return arr;
}

export const PutObjectValues = (obj, newObj) => {
    let keys = Object.keys(newObj);
    /*method map I change to forEach*/
    keys.forEach((key) => {
        obj[key] = newObj[key];
    })
    return obj;
}
export const RemoveObjectValues = (obj, key) => {
    delete obj[key];
    return obj;
}


