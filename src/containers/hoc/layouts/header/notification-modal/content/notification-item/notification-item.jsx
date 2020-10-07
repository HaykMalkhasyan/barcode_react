import React from 'react'
import classes from './notification-item.module.css'
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";

const NotificationItem = props => {

    return (
        <div className={`${classes.notificationItem} ${props.unread ? classes.unread : ''}`}>
            <CustomButton
                className={classes.closeButton}
                children={<Icons type={'close'} width={9} height={9} className={classes.closeIcon}/>}
            />
            <div>
                <div className={classes.imageWindow}>
                    <img src="https://thebodyisnotanapology.com/wp-content/uploads/2018/02/pexels-photo-459947.jpg"
                         alt="notification-person"/>
                </div>
            </div>
            <div>
                <div className={classes.contentWindow}>
                    <h3>Լորեմ Իպսում</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cupiditate illo possimus praesentium
                        quisquam? Ad, aliquam assumenda dicta distinctio eaque explicabo hic, necessitatibus nobis nostrum
                        officia porro repellendus! Dolores, libero!
                    </p>
                </div>
            </div>
        </div>
    )
};

export default NotificationItem;