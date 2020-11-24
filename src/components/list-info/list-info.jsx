import React from "react";
import classes from "./list-info.module.css";
import InfoItem from "./info-item/info-item";

const ListInfo = props => {

    return (
        <div className={classes.container}>
            <h1>{props.label}</h1>
            <div className={classes.list}>
                {
                    props.data && props.data.length ?
                        props.data.map(item => {

                            return (
                                <InfoItem
                                    key={`user-${props.id}-settings-${item.id}`}
                                    data={item}
                                />
                            )
                        })
                        :
                        null
                }
            </div>
        </div>
    )
}

export default ListInfo;