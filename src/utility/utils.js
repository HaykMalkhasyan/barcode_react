export const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const IsRequiredField = (requiredFields,field,errors) => {
        if(requiredFields.includes(field.key) && field.value===""){
            errors[field.key] = "Required";
        }else{
            delete errors[field.key];
        }

    return errors;
}
export const IsRequiredFields = (requiredFields,fields,errors) => {
    requiredFields.forEach(function(val, index){
            if(!fields[val] || fields[val]===""){
                errors[val]= "reqired"
            }
    })
    return errors;
}

