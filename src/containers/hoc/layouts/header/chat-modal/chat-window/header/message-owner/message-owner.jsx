import React from 'react'
import classes from './message-owner.module.css'

const MessageOwner = props => {

    return (
        <div className={classes.messageOwner}>
            <div className={classes.messageOwnerImage}>
                <img src={props.image} alt="message-owner"/>
            </div>
            <h6 className="font-size-11 color-0A0A0A">{props.owner}</h6>
        </div>
    )
};

export default MessageOwner;