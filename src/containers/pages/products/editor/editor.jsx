import React from 'react'
import classes from './editor.module.css'
import {connect} from "react-redux";
import CustomHeader from "../../../../components/UI/customHeader/customHeader";
import CustomButton from "../../../../components/UI/button/customButton/custom-button";
import EditorTool from "./editor-tool/editor-tool";
import ModalUI from "../../../../components/modalUI/modalUI";
import EditorPaperSettings from "./editor-paper-settings/editor-paper-settings";

const LabelsEditor = props => {

    return (
        <div className={classes.editor}>
            <CustomHeader name={'Պիտակի խմբագիր'} />
            <nav className={classes.navigationPanel}>
                <CustomButton
                    className={classes.newLabelButton}
                    children={"Նոր պիտակ"}
                />
            </nav>
            {
                props.tool ?
                    <EditorTool/>
                    :
                    null
            }
            <ModalUI
                open={true}
                className={classes.settingsModal}
            >
                <EditorPaperSettings
                    profile={props.profile}
                />
            </ModalUI>
            <div className={classes.editorContent}>

            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        // EDITOR STATE
        tool: state.editor.tool,
        profile: state.editor.profile,
    }
}

function mapDispatchToProps(dispatch) {

    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsEditor);