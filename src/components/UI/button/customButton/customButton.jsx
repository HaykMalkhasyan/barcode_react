import React from 'react'

const CustomButton = props => {

    return (
        <button
            id={props.id}
            type={props.type}
            name={props.name}
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