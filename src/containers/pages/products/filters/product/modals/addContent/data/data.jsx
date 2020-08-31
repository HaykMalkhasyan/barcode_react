import React from 'react'
import classes from './data.module.css'
import InputUI from "../../../../../../../../components/UI/input/inputUI/inputUI";
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import CustomCheckbox from "../../../../../../../../components/UI/input/customCheckbox/customCheckbox";

const Data = props => {

    const changeHandler = event => {
        props.setMainData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
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
                        error={props.errorFields.indexOf('unit_id') !== -1}
                        labelId={'label-point'}
                        id={'point'}
                        label={'Չափման միավոր'}
                        root={classes.selectRoot}
                        formControl={classes.formControl}
                        data={props.measurements}
                        name={'unit_id'}
                        value={props.data.unit_id}
                        helperText={props.errorFields.indexOf('unit_id') === -1 ? '' : '"Չափման միավոր" դաշտը ընտրված չէ'}
                        // Methods
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className={`${classes.dataItem} ${classes.flexStart}`}>
                <div>
                    <CustomCheckbox
                        id={'product_active'}
                        className={classes.checkbox}
                        label={'Ակտիվ'}
                        checked={props.data.active}
                        name={'active'}
                        onChange={event => props.setMainData(event.target.name, event.target.checked)}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'can_in'}
                        className={classes.checkbox}
                        label={'Մուտքը թույլատրելի է'}
                        checked={props.data.can_in}
                        name={'can_in'}
                        onChange={event => props.setMainData(event.target.name, !event.target.checked)}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'can_sale'}
                        className={classes.checkbox}
                        label={'Վաճառքը թույլատրելի է'}
                        name={'can_sale'}
                        checked={props.data.can_sale}
                        onChange={event => props.setMainData(event.target.name,!event.target.checked)}
                    />
                </div>
            </div>
        </>
    )
};

export default Data