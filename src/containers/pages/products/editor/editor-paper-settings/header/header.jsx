import React from 'react'
import classes from './header.module.css'

const Header = props => {

    return (
        <header className={classes.editorPaperSettingsHeader}>{props.label}</header>
    )
};

export default Header;