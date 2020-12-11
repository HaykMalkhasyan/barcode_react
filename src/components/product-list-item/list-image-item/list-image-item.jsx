import React from "react";
import classes from "./list-image-item.module.css";

const ListImageItem = props => {

    return (
        <div className={classes.imageWindow}>
            <img src="https://img.icons8.com/bubbles/2x/product.png" alt="product-image"/>
        </div>
    )
}

export default ListImageItem