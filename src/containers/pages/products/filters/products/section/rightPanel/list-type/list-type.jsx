import React from "react";
import classes from "./list-type.module.css";
import ProductListItem from "../../../../../../../../components/product-list-item/product-list-item";

const ListType = props => {
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
        <div className={classes.list}>
            {
                props.products && props.products.length ?
                    props.products.map(item => {

                        return (
                            <div key={`product-item-${item.id}`}>
                                <ProductListItem
                                    data={item}
                                    measurements={props.measurements}
                                    suppliers={props.suppliers}
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
        </div>
    )
}

export default ListType