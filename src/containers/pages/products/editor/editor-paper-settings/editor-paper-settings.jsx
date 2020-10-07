import React from 'react'
import classes from './editor-paper-settings.module.css'
import Footer from "./footer/footer";
import Content from "./content/content";
import Header from "./header/header";

const EditorPaperSettings = props => {

    return (
        <div className={classes.editorPaperSettings}>
            <Header label={'Լրացուցիչ կարգավորումներ'}/>
            <Content
                profile={props.profile}
            />
            <hr className={classes.line}/>
            <Footer/>
        </div>
    )
};

export default EditorPaperSettings;