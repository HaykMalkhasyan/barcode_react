import React from "react";
import classes from "./modal-tab-pages.module.css";

const ModalTabPages = ({component: Component, ...props}) => {

    return (
        <section className={classes.modalTabPages}>
            <Component {...props}/>
        </section>
    )
}

export default ModalTabPages