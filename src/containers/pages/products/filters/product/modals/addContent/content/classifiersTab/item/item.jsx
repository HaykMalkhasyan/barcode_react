import React from "react";
import classes from "./item.module.css";
import cookie from "../../../../../../../../../../services/cookies";
import TreeSelect from "../../../../../../../../../../components/tree-select/tree-select";

const Item = props => {
    const cls = [
        props.classifiers[props.data.id] ? classes.groupButton : `${classes.groupButtonInactive} ${classes.groupButton}`,
        props.open ? classes.active : ''
    ]

    return (
        <div className={classes.classifiersItem}>
            <span className={cls.join(" ")}>
                {props.data[`title_${cookie.get("language") || "am"}`]}
            </span>
            <TreeSelect
                id={props.data.id}
                open={props.open}
                classifiers={props.classifiers}
                own_subgroups={props.own_subgroups}
                // Methods
                toggleWindow={props.toggleWindow}
                select={props.select}
                setProductValues={props.setProductValues}
            />
        </div>
    )
}

export default Item