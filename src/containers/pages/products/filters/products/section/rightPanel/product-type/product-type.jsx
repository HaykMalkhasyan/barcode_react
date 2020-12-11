import React from "react";
import classes from "./product-type.module.css";
import {Grid} from "@material-ui/core";
import ProductItem from "../../../../../../../../components/product-item/product-item";

const ProductType = props => {

    const setProduct = id => {
        const selected = [...props.selected];
        const index = selected.indexOf(id);
        if (index === -1) {
            selected.push(id)
        } else {
            selected.splice(index, 1)
        }
        props.setSelected(selected)
    }

    return (
        <div className={classes.productType}>
            <Grid container spacing={2}>
                {
                    props.products && props.products.length ?
                        props.products.map(item => {

                            return (
                                <div key={`product-item-${item.id}`} className={props.screen ? classes.item : classes.fullscreenItem}>
                                    <ProductItem
                                        data={item}
                                        selected={props.selected}
                                        // Methods
                                        setProduct={setProduct}
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