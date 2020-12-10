import React from "react";
import classes from "./content-item.module.css";

const ItemContent = props => {

    return (
        <div className={classes.content}>
            <header>
                <h1 onClick={() => props.onClick(props.id)}>{props.name}</h1>
                <hr className={classes.line}/>
                <p className={classes.smallInformation}>
                <span>
                    <span>ԱՊՄ։ </span> <b>{props.article}</b>
                </span>
                    <span>
                    <span>Ամսաթիվ։ </span> <b>{props.date}</b>
                </span>
                </p>
            </header>
        </div>
    )
}

export default ItemContent