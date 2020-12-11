import React from "react";
import classes from "./product-list-item.module.css";
import ListContentItem from "./list-content-item/list-content-item";
import ListImageItem from "./list-image-item/list-image-item";

const ProductListItem = props => {
    const cls = [
        classes.product,
        props.selected.indexOf(props.data.id) !== -1 ?
            classes.selected
            :
            ""
    ]

    return (
        <div className={cls.join(" ")} onClick={() => props.setProduct(props.data.id)}>
            {/*{console.log(props.data)}*/}
            <ListImageItem/>
            <ListContentItem
                id={props.data["id"]}
                name={props.data["item_name"]}
                active={props.data["active"]}
                show={props.data["show_in_site"]}
                article={props.data["articul"]}
                created={props.data["create_date"]}
                firms={props.data["firms"]}
                unit={props.data["unit"]}
                measurements={props.measurements}
                suppliers={props.suppliers}
                // Methods
                // Methods
                onClick={props.onClick}
            />
        </div>
    )
}

export default ProductListItem