import React from "react";
import classes from "./employees-content.module.css";
import WorkerItem from "./workers-item/workers-item";

const EmployeesContent = props => {
    return (
        <div className={classes.workersWindow} onClick={props.onClick}>
            {
                props.selected && props.selected.length ?
                    props.selected.map(
                        item => {

                            return (
                                <WorkerItem
                                    key={`workers-${item.id}`}
                                    label={item.name}
                                    onClick={event => {
                                        event.stopPropagation();
                                        props.removeItem(item)
                                    }}
                                />
                            )
                        }
                    )
                    :
                    null
            }
        </div>
    )
}

export default EmployeesContent