import React from "react";

const CustomButton = props => {

    return (
        <button
            className={props.className}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default CustomButton