import React from 'react'
import classes from "./custom-button.module.css"

const CustomButton = props => {
    const defaultClasses = [
        props.className,
        props.disabled ? classes.disabled : classes.default
    ]

    return (
        <button
            aria-describedby={props.ariaDescribedby}
            tabIndex={props.tabIndex}
            id={props.id}
            type={props.type}
            name={props.name}
            style={props.style}
            className={defaultClasses.join(" ")}
            disabled={props.disabled}
            onDragOver={props.onDragOver}
            onDragEnter={props.onDragEnter}
            onDragLeave={props.onDragLeave}
            onDrop={props.onDrop}

            // Methods
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
};

export default CustomButton