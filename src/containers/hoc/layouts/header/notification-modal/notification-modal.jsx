import React from 'react';
import classes from './notification-modal.module.css';
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import Header from "./header/header";
import Content from "./content/content";

const NotificationModal = props => {

    return (
        <>
            <Backdrop
                className={classes.backdrop}
                // Methods
                onClick={() => props.toggleNotification(false)}
            />
            <div className={classes.notificationModal}>
                <Header count={1}/>
                <Content/>
            </div>
        </>
    )
};

export default NotificationModal;