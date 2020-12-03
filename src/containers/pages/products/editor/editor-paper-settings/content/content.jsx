import React, {useState} from 'react'
import classes from './content.module.css'
import CustomInput from "../../../../../../components/UI/input/customInput/customInput";
import ToolsSelect from "../../../../../../components/UI/input/tools-select/tools-select";
import CustomButton from "../../../../../../components/UI/button/customButton/custom-button";
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';

const Content = props => {
    const [open, setOpen] = useState(null);

    const setDrop = value => {
        setOpen(value)
    };

    return (
        <section className={classes.editorPaperSettingsContent}>
            <div className={classes.flexEndContainer}>
                <CustomInput
                    id={'name'}
                    label={'Անվանում'}
                    classNameLabel={classes.labelStyle}
                    classNameInput={classes.inputStyle}
                />
            </div>
            <div className={classes.flexEndContainer}>
                <ToolsSelect
                    open={open}
                    id={'profile'}
                    name={'profile'}
                    label={'Պրոֆիլ'}
                    labelRoot={classes.labelStyle}
                    listItemRoot={classes.listItem}
                    listItemTextRoot={classes.listItemText}
                    data={props.profile}
                    // Methods
                    setDrop={setDrop}
                />
            </div>
            <div className={classes.flexEndContainer}>
                <ToolsSelect
                    open={open}
                    id={'size'}
                    name={'size'}
                    label={'Չափս'}
                    labelRoot={classes.labelStyle}
                    listItemRoot={classes.listItem}
                    listItemTextRoot={classes.listItemText}
                    // Methods
                    setDrop={setDrop}
                />
            </div>
            <div className={classes.flexEndContainer}>
                <div className={classes.fexColumnContainer}>
                    <div className={classes.flexItemContainer}>
                        <CustomInput
                            id={'width'}
                            label={'Լայնություն'}
                            classNameLabel={classes.labelStyle}
                            classNameInput={`${classes.inputStyle} ${classes.changeMaxWidth}`}
                        />
                    </div>
                    <div className={classes.flexItemContainer}>
                        <CustomInput
                            id={'height'}
                            label={'Հարձրություն'}
                            classNameLabel={classes.labelStyle}
                            classNameInput={`${classes.inputStyle} ${classes.changeMaxWidth}`}
                        />
                    </div>
                </div>
                <div className={classes.fexColumnContainer}>
                    <h5 className={classes.orientationName}>Կողմնորոշում</h5>
                    <div className={`${classes.flexItemContainer} ${classes.contentCenter}`}>
                        <CustomButton
                            className={`${classes.orientationButton} ${classes.activeOrientation}`}
                            children={<CropPortraitIcon/>}
                        />
                        <CustomButton
                            className={classes.orientationButton}
                            children={<CropLandscapeIcon/>}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Content;