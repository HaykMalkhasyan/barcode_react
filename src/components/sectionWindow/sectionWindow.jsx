import React from 'react'
import classes from './sectionWindow.module.css'

const SectionWindow = props => {

    return (
        <div className={classes.sectionWindow}>
            <header>{props.label}</header>
            {props.children}
        </div>
    )
};

export default SectionWindow;