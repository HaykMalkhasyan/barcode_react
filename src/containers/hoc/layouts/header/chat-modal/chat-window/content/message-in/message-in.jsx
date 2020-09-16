import React from 'react'
import classes from './message-in.module.css'

const MessageIn = props => {

    return (
        <article className={classes.messageIn}>
            <span className={classes.inTime}>{props.time}</span>
            <div className={props.className}>{props.message}</div>
        </article>
    )
};

export default MessageIn;