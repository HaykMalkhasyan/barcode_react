import React from "react";

const Backdrop = props => {

    return (
        <div
            className={props.className}
            onClick={props.onClick}
        />
    )
}

export default Backdrop