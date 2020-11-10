import React from "react";
import classes from "./item.module.css";
import cookie from "../../../../../../../../../../services/cookies";
import TreeSelect from "../../../../../../../../../../components/tree-select/tree-select";

const Item = props => {

    return (
        <div className={props.open ? `${classes.classifiersItem} ${classes.active}` : classes.classifiersItem}>
            <span className={classes.groupButton}>
                {props.data[`title_${cookie.get("language") || "am"}`]}
            </span>
            <TreeSelect
                id={props.data.id}
                open={props.open}
                // Methods
                toggleWindow={props.toggleWindow}
                // setOpen={setOpen}
            />
        </div>
    )
}

export default Item