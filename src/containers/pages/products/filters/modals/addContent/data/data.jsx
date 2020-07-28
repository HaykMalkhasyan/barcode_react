import React from 'react'
import classes from './data.module.css'
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput";
import CheckboxesUi from "../../../../../../../components/UI/input/checkboxUI/checkboxUI";

const Data = props => {

    return (
        <>
            <div className={classes.dataItem}>
                <CustomInput
                    classNameInput={classes.dataInput}
                    classNameLabel={classes.dataLabel}
                    id={'sku'}
                    label={'ԱՊՄ'}
                />
            </div>
            <div className={classes.dataItem}>
                <CustomInput
                    classNameInput={classes.dataInput}
                    classNameLabel={classes.dataLabel}
                    id={'name'}
                    label={'Անվանում'}
                />
            </div>
            <div className={classes.dataItem}>
                <CustomInput
                    classNameInput={classes.dataInput}
                    classNameLabel={classes.dataLabel}
                    id={'price'}
                    label={'Գին'}
                />
            </div>
            <div className={classes.dataItem}>
                <CustomInput
                    classNameInput={classes.dataInput}
                    classNameLabel={classes.dataLabel}
                    id={'hvhh'}
                    label={'ՀՎՀՀ'}
                />
            </div>
            <div className={classes.dataItem}>
                <CustomInput
                    classNameInput={classes.dataInput}
                    classNameLabel={classes.dataLabel}
                    id={'point'}
                    label={'Միավոր'}
                />
            </div>
            <div className={`${classes.dataItem} ${classes.itemCheckBox}`}>
                <CheckboxesUi
                    className={classes.activeCheckBox}
                    label={'Ակտիվ'}
                />
            </div>
        </>
    )
}

export default Data