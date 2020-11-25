import React from 'react'
import classes from './notification-item.module.css'
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";

const NotificationItem = props => {

    return (
        <div className={`${classes.notificationItem} ${props.unread ? `background-f6f6f6 ${classes.unread}` : ''}`}>
            <CustomButton
                className={`background-transparent ${classes.closeButton}`}
                children={<Icons type={'close'} width={9} height={9} className={`fill-4b4b4b stroke-4b4b4b ${classes.closeIcon}`}/>}
            />
            <div>
                <div className={classes.imageWindow}>
                    <img src="https://thebodyisnotanapology.com/wp-content/uploads/2018/02/pexels-photo-459947.jpg"
                         alt="notification-person"/>
                </div>
            </div>
            <div>
                <div className={classes.contentWindow}>
                    <h3 className={props.unread ? "color-3b3b3b font-size-14" : "color-3a3a3a font-size-14"}>Լորեմ Իպսում</h3>
                    <p className={props.unread ? "color-3a3a3a font-size-12" : "font-size-12 color-9c9c9c"}>
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