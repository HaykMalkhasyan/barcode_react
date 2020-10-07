import React from 'react'
import classes from './editor-tool.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../components/Icons/icons";

const EditorTool = props => {

    return (
        <div className={classes.editorTool}>
            <header className={classes.toolHeader}>
                <h1 className={classes.toolName}>Խմբագիր</h1>
                <CustomButton
                    className={classes.toolCloseButton}
                    children={<Icons type={'close'} className={classes.toolCloseIcon}/>}
                />
            </header>
        </div>
    )
};

export default EditorTool;