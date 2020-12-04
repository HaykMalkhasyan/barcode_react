import React from "react";
import classes from "./modal-tab-pages.module.css";

const ModalTabPages = ({component: Component, ...props}) => {

    return (
        <section className={classes.modalTabPages}>
            {
                Component.displayName !== "Connect(MainTab)" && props.main.item_name.length ?
                    <div className={classes.productName}>{props.main.item_name}</div>
                    :
                    null
            }
            <Component {...props}/>
        </section>
    )
}

export default ModalTabPages