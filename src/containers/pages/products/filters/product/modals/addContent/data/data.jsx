import React from 'react'
import classes from './data.module.css'
import InputUI from "../../../../../../../../components/UI/input/inputUI/inputUI";
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import CustomCheckbox from "../../../../../../../../components/UI/input/customCheckbox/customCheckbox";

const Data = props => {

    return (
        <>
            <div className={classes.apm}>
                <span>Հերթական համար (ԱՊՄ) <span>0054151</span></span>
            </div>
            <div className={classes.dataItem}>
                <InputUI
                    root={classes.textField}
                    id={'long-name'}
                    label={'Անվանում'}
                />
            </div>
            <div className={classes.dataItem}>
                <InputUI
                    root={classes.textField}
                    id={'short-name'}
                    label={'Կրճատ անվանում'}
                />
            </div>
            <div className={`${classes.dataItem} ${classes.spaceAround}`}>
                <div>
                    <SelectUI
                        labelId={'label-type'}
                        id={'type'}
                        label={'Տեսակ'}
                        root={classes.selectRoot}
                        formControl={classes.formControl}
                    />
                </div>
                <div>
                    <SelectUI
                        labelId={'label-point'}
                        id={'point'}
                        label={'Չափման միավոր'}
                        root={classes.selectRoot}
                        formControl={classes.formControl}
                    />
                </div>
            </div>
            <div className={`${classes.dataItem} ${classes.flexStart}`}>
                <div>
                    <CustomCheckbox
                        id={'active'}
                        className={classes.checkbox}
                        label={'Ակտիվ'}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'admissionAllowed'}
                        className={classes.checkbox}
                        label={'Մուտքը թույլատրելի է'}
                    />
                </div>
                <div>
                    <CustomCheckbox
                        id={'sailAllowed'}
                        className={classes.checkbox}
                        label={'Վաճառքը թույլատրելի է'}
                    />
                </div>
            </div>
        </>
    )
};

export default Data