import React from "react";
import classes from "./list-content-item.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Tooltip} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const ListContentItem = props => {

    const measurementsRender = (data, id) => {

        for (let item of data) {
            if (item.id === id) {
                return item.name
            }
        }
    }

    const firmsRender = (firms, array_id) => {
        const splited_id = array_id.split(",");
        const result = [];
        if (splited_id[0].length > 0 && splited_id[0] !== 0) {
            if (firms && firms.length) {
                for (let item of firms) {
                    if (splited_id.indexOf(item.id.toString()) !== -1) {
                        result.push(
                            <li key={`suppliers-liat-item-${item.id}`}>{item.name}</li>
                        )
                    }
                }
            }
            return result
        }
        return <li>Դատարկ է</li>
    }
    return (
        <div className={classes.content}>
            <header>
                <h1 onClick={event => {event.stopPropagation();props.onClick(props.id);}}>{props.name}</h1>
                <div>
                    {
                        props.show ?
                            <Tooltip title="Ցուցադրված է կայքում" placement="bottom">
                                <span className={classes.showStatus}>
                                    <VisibilityIcon/>
                                </span>
                            </Tooltip>
                            :
                            null
                    }
                    {
                        !props.active ?
                            <Tooltip title="Ակտիվ է" placement="bottom">
                                <span className={classes.showActiveStatus}>
                                    <FiberManualRecordIcon className={classes.activeIcon}/>
                                </span>
                            </Tooltip>
                            :
                            null
                    }
                </div>
            </header>
            <hr className={classes.line}/>
            <ul className={classes.otherInfo}>
                <li>
                    <span>ԱՊՄ։ </span>
                    <b>{props.article}</b>
                </li>
                <li>
                    <span>Չափման միավոր։ </span>
                    <b>{measurementsRender(props.measurements, props.unit)}</b>
                </li>
                <li>
                    <span>Ստեղծման ամսաթիվ։ </span>
                    <b>{props.created}</b>
                </li>
            </ul>
            <div className={classes.firmsWindow}>
                <h3>Մատակարարներ։ </h3>
                <ul className={classes.firmsList}>
                    {firmsRender(props.suppliers, props.firms)}
                </ul>
            </div>
        </div>
    )
}

export default ListContentItem