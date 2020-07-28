import React from 'react'

const CustomButton = props => {

    return (
        <button
            type={props.type}
            name={props.name}
            className={props.className}
            // Methods
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default CustomButton