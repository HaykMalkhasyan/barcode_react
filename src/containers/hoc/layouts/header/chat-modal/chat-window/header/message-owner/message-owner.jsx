import React from 'react'
import classes from './message-owner.module.css'

const MessageOwner = props => {

    return (
        <div className={classes.messageOwner}>
            <div className={classes.messageOwnerImage}>
                <img src={props.image} alt="message-owner"/>
            </div>
            <h6>{props.owner}</h6>
        </div>
    )
};

export default MessageOwner;