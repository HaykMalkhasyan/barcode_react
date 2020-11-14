import React, {useState} from 'react'
import classes from './data.module.css'
import InputUI from "../../../../../../../../components/UI/input/inputUI/inputUI";
import CustomCheckbox from "../../../../../../../../components/UI/input/customCheckbox/customCheckbox";
import CustomSelect from "../../../../../../../../components/UI/input/customSelect/customSelect";

const Data = props => {
    const [open, setOpen] = useState(null);
    const [focus, setFocus] = useState(null);

    const toggleFocus = name => {
        if (name === open) {
            setFocus(null)
        } else {
            setFocus(name)
        }
    };

    const toggleHandler = name => {
        if (name === open) {
            setOpen(null)
        } else {
            setOpen(name)
        }
    };

    const changeSelect = (item, name) => {
        props.setMainData(name, item.id);
        setOpen(null);
        setFocus(null)
    };

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
                    error={props.errorFields.indexOf('item_name') !== -1}
                    root={classes.textField}
                    id={'long-name'}
                    label={'Անվանում'}
                    name={'item_name'}
                    value={props.data.name}
                    helperText={props.errorFields.indexOf('item_name') === -1 ? '' : '"Անվանում" դաշտը լրացրած չէ'}
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
            <div className={classes.flexLgContainer}>
                <div className={`${classes.dataItem} ${classes.spaceAround}`}>
                    <CustomSelect
                        className={classes.customSelect}
                        open={open}
                        focus={focus}
                        inputLabel={'Տեսակ'}
                        name={'product_type'}
                        value={props.data.product_type}
                        data={props.types}
                        // Methods
                        toggle={toggleHandler}
                        toggleFocus={toggleFocus}
                        clickHandler={changeSelect}
                    />
                </div>
                <div className={`${classes.dataItem} ${classes.spaceAround}`}>
                    <CustomSelect
                        className={classes.customSelect}
                        open={open}
                        focus={focus}
                        inputLabel={'Չափման միավոր'}
                        name={'unit_id'}
                        value={props.data.unit_id}
                        data={props.measurements}
                        // Methods
                        toggle={toggleHandler}
                        toggleFocus={toggleFocus}
                        clickHandler={changeSelect}
                    />
                </div>
            </div>
            <div className={`${classes.dataItem} ${classes.flexStart}`}>
                <div>
                    <CustomCheckbox
                        checkBoxWindow={classes.checkBoxWindow}
                        id={'product_active'}
                        className={classes.checkbox}
                        label={'Ակտիվ'}
                        checked={props.data.active}
                        name={'active'}
                        onChange={event => props.setMainData(event.target.name, event.target.checked)}
                    />
                </div>
                {/*<div>*/}
                {/*    <CustomCheckbox*/}
                {/*        checkBoxWindow={classes.checkBoxWindow}*/}
                {/*        id={'can_in'}*/}
                {/*        className={classes.checkbox}*/}
                {/*        label={'Մուտքը թույլատրելի է'}*/}
                {/*        checked={props.data.can_in}*/}
                {/*        name={'can_in'}*/}
                {/*        onChange={event => props.setMainData(event.target.name, event.target.checked)}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <CustomCheckbox*/}
                {/*        checkBoxWindow={classes.checkBoxWindow}*/}
                {/*        id={'can_sale'}*/}
                {/*        className={classes.checkbox}*/}
                {/*        label={'Վաճառքը թույլատրելի է'}*/}
                {/*        name={'can_sale'}*/}
                {/*        checked={props.data.can_sale}*/}
                {/*        onChange={event => props.setMainData(event.target.name, event.target.checked)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </>
    )
};

export default Data