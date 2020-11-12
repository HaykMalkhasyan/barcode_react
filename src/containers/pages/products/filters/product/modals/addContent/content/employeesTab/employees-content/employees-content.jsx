import React from "react";
import classes from "./employees-content.module.css";
import WorkerItem from "./workers-item/workers-item";

const EmployeesContent = props => {
    return (
        <div className={classes.workersWindow}>
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
                    <small className={classes.empty}>Դուք չունեք ընտրված մատակարար</small>
            }
        </div>
    )
}

export default EmployeesContent