import React from "react";
import classes from "./product-item.module.css";
import ItemImage from "./item-image/item-image";
import ItemContent from "./content-item/content-item";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Tooltip} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const ProductItem = props => {

    return (
        <div className={classes.product}>
            {
                props.data.show_in_site ?
                    <Tooltip title="Ցուցադրված է կայքում" placement="left">
                            <span className={classes.showStatus}>
                                <VisibilityIcon/>
                            </span>
                    </Tooltip>
                    :
                    null
            }
            {
                props.data.active === 0 ?
                    <Tooltip title="Ակտիվ է" placement="right">
                            <span className={classes.showActiveStatus}>
                                <FiberManualRecordIcon className={classes.activeIcon}/>
                            </span>
                    </Tooltip>
                    :
                    <span/>
            }
            <ItemImage/>
            <ItemContent
                id={props.data.id}
                name={props.data.item_name}
                article={props.data.articul}
                date={props.data.create_date}
                active={props.data.active}
                // Methods
                onClick={props.onClick}
            />
        </div>
    )
}

export default ProductItem