import React from "react";

const Backdrop = props => {

    return (
        <div
            hidden={props.hidden}
            className={props.className}
            onClick={props.onClick}
        />
    )
};

export default Backdrop