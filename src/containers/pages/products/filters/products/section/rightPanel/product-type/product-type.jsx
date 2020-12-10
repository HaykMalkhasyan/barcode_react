import React from "react";
import classes from "./product-type.module.css";
import {Grid} from "@material-ui/core";
import ProductItem from "../../../../../../../../components/product-item/product-item";

const ProductType = props => {

    return (
        <div className={classes.productType}>
            <Grid container spacing={2}>
                {
                    props.products && props.products.length ?
                        props.products.map(item => {

                            return (
                                <div key={`product-item-${item.id}`} className={props.screen ? classes.item : classes.fullscreenItem}>
                                    <ProductItem
                                        key={`product-item-${item.id}`}
                                        data={item}
                                        // Methods
                                        onClick={props.onClick}
                                    />
                                </div>
                            )
                        })
                        :
                        null
                }
            </Grid>
        </div>
    )
}

export default ProductType