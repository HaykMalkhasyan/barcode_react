import React from 'react'
import classes from './data.module.css'
import InputUI from "../../../../../../../../components/UI/input/inputUI/inputUI";
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import CustomCheckbox from "../../../../../../../../components/UI/input/customCheckbox/customCheckbox";

const Data = props => {

    const changeHandler = event => {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        let name = event.target.name;
        props.setMainData(name, value);
    };

    const blurHandler = event => {
        const errorFields = [...props.errorFields];
        if (props.data['short_name'].length === 0 && event.target.value.length > 0) {
            if (errorFields.indexOf('short_name') !== -1) {
                errorFields.splice(errorFields.indexOf('short_name'), 1)
            }
            props.setProductValues('errorFields', errorFields);
            props.setMainData('short_name', event.target.value);
        }
    };

    return (
        <>
            {/*<div className={classes.apm}>*/}
            {/*    <span>Հերթական համար (ԱՊՄ) <span>0054151</span></span>*/}
            {/*</div>*/}
            <div className={classes.dataItem}>
                <InputUI
                    required={true}
                    error={props.errorFields.indexOf('name') !== -1}
                    root={classes.textField}
                    id={'long-name'}
                    label={'Անվանում'}
                    name={'name'}
                    value={props.data.name}
                    helperText={props.errorFields.indexOf('name') === -1 ? '' : '"Անվանում" դաշտը լրացրած չէ'}
                    // Methods
                    onChange={changeHandler}
                    onBlur={blurHandler}
                />
            </div>
            <div className={classes.dataItem}>
                <InputUI
                    required={true}
                    error={props.errorFields.indexOf('short_name') !== -1}
                    root={classes.textField}
                    id={'short-name'}
                    label={'Կրճատ անվանում'}
                    name={'short_name'}
                    value={props.data.short_name}
                    helperText={props.errorFields.indexOf('short_name') === -1 ? '' : '"Կրճատ անվանում" դաշտը լրացրած չէ'}
                    // Methods
                    onChange={changeHandler}
                />
            </div>
            <div className={`${classes.dataItem} ${classes.spaceAround}`}>
                <div>
                    <SelectUI
                        required={true}
                        error={props.errorFields.indexOf('product_type') !== -1}
                        labelId={'label-type'}
                        id={'type'}
                        label={'Տեսակ'}
                        root={classes.selectRoot}
                        formControl={classes.formControl}
                        data={props.types}
                        name={'product_type'}
                        value={props.data.product_type}
                        helperText={props.errorFields.indexOf('product_type') === -1 ? '' : '"Տեսակ" դաշտը ընտրված չէ'}
                        // Methods
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <SelectUI
                        required={true}
                        error={props.errorFields.indexOf('measurement') !== -1}
                        labelId={'label-point'}
                        id={'point'}
                        label={'Չափման միավոր'}
                        root={classes.selectRoot}
                        formControl={classes.formControl}
                        data={props.measurements}
                        name={'measurement'}
                        value={props.data.measurement}
                        helperText={props.errorFields.indexOf('measurement') === -1 ? '' : '"Չափման միավոր" դաշտը ընտրված չէ'}
                        // Methods
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className={`${classes.dataItem} ${classes.flexStart}`}>
                <div>
                    <CustomCheckbox
                        id={'active'}
                        className={classes.checkbox}
                        label={'Ակտիվ'}
                        name={'active'}
                        checked={props.data.active}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'admissionAllowed'}
                        className={classes.checkbox}
                        label={'Մուտքը թույլատրելի է'}
                        checked={props.data.access_in}
                        name={'access_in'}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'sailAllowed'}
                        className={classes.checkbox}
                        label={'Վաճառքը թույլատրելի է'}
                        name={'access_sale'}
                        checked={props.data.access_sale}
                        onChange={changeHandler}
                    />
                </div>
            </div>
        </>
    )
};

export default Data