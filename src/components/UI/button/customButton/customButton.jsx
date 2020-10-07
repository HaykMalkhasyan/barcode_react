import React from 'react'

const CustomButton = props => {

    return (
        <button
            aria-describedby={props.ariaDescribedby}
            tabIndex={props.tabIndex}
            id={props.id}
            type={props.type}
            name={props.name}
            style={props.style}
            className={props.className}
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