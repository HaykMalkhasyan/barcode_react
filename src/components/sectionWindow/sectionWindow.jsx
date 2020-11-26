import React from 'react'
import classes from './sectionWindow.module.css'
import CustomButton from "../UI/button/customButton/customButton";

const SectionWindow = props => {

    return (
        <div className={classes.sectionWindow}>
            <header className="color-737373 font-size-12">
                <span>{props.label}</span>
                {
                    props.withButton ?
                        <CustomButton
                            className={`background-transparent ${classes.actionButton}`}
                            children={props.button}
                            // Events
                            onClick={props.onClick}
                        />
                        :
                        null
                }
            </header>
            {props.children}
        </div>
    )
};

export default SectionWindow;