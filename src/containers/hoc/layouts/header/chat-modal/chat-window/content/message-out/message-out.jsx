import React from 'react'
import classes from './message-out.module.css'

const MessageOut = props => {

    return (
        <aside className={classes.messageOut}>
            <span className={classes.outTime}>{props.time}</span>
            <div className={props.className}>{props.message}</div>
        </aside>
    )
};

export default MessageOut;