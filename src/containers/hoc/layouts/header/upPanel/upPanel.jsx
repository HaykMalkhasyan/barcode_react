import React from 'react'
import classes from '../header.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import MenuIcon from '@material-ui/icons/Menu'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import {NavLink, Redirect, withRouter} from "react-router-dom";
import Icons from "../../../../../components/Icons/icons";
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import ChatModal from "../chat-modal/chat-modal";
import NotificationModal from "../notification-modal/notification-modal";

const UpPanel = props => {

    return (
        <div className={props.sticky ? `${classes.hidden} ${classes.upPanel}` : classes.upPanel}>
            {
                props.notification_modal ?
                    <NotificationModal
                        // Methods
                        toggleNotification={props.toggleNotification}
                    />
                    :
                    null
            }
            {
                props.chat_modal ?
                    <ChatModal
                        interlocutorWindow={props.interlocutorWindow}
                        // Methods
                        toggleChat={props.toggleChat}
                        togglePeople={props.togglePeople}
                    />
                    :
                    null
            }
            <div className={classes.leftBar}>
                <CustomButton
                    onClick={props.toggleMenu}
                    className={props.menu ? `${classes.menuBtnOpen} ${classes.menuBtn}` : classes.menuBtn}
                >
                    {props.menu ? <MenuOpenIcon/> : <MenuIcon/>}
                </CustomButton>
                <span
                    className={classes.projectName}
                    onClick={
                        () => {
                            props.setActiveMenu(null);
                            props.history.push('/')
                        }
                    }
                >
                    Barcode.am
                </span>
            </div>
            <div className={classes.toolsPanel}>
                <div>
                    <CustomButton
                        className={props.notification_modal ? `${classes.socButtons} ${classes.socButtonsActive}` : classes.socButtons}
                        children={
                            <>
                                <span className={classes.notificationsCount}>1</span>
                                <Icons type={'bell'} className={classes.notificationIcon} width={22} height={22}/>
                            </>
                        }
                        // Methods
                        onClick={() => props.toggleNotification(true)}
                    />
                </div>
                <div>
                    <CustomButton
                        className={props.chat_modal ? `${classes.socButtons} ${classes.socButtonsActive}` : classes.socButtons}
                        children={
                            <>
                                <span className={classes.messageCount}>2</span>
                                <Icons type={'chat'} className={classes.chatIcon} width={22} height={22}/>
                            </>
                        }
                        // Methods
                        onClick={() => props.toggleChat(true)}
                    />
                </div>
                <div className={classes.userWindow}>
                    <CustomButton
                        className={!props.confWindow ? `${classes.socButtons} ${classes.socButtonsActive}` : classes.socButtons}
                        children={<Icons type={'person'} className={classes.personIcon} width={26} height={26}/>}
                        // Methods
                        onClick={props.toggleConfigurationWindow}
                    />
                    {/*<div className={classes.user} onClick={props.toggleConfigurationWindow}>*/}
                    {/*    <Icons type={'person'} width={26} height={26}/>*/}
                    {/*</div>*/}
                    {
                        !props.confWindow ?
                            <Backdrop
                                className={classes.backdrop}
                                // Methods
                                onClick={props.toggleConfigurationWindow}
                            />
                            :
                            null
                    }
                    <div hidden={props.confWindow} className={classes.userContent}>
                        <ul>
                            <li className={classes.userName}>
                                <span>{props.user ? `${props.user.firstName} ${props.user.lastName}`: ''}</span>
                            </li>
                            {
                                props.user && props.user.user_id ?
                                    <NavLink
                                        exact
                                        to={`/user/${props.user.user_id}`}
                                        className={classes.dropLinks}
                                        activeClassName={classes.dropActive}
                                    >
                                        <li className={classes.myPage}>
                                            <Icons type={'own-page'}/>
                                            <span className={classes.ownerConf}>Իմ էջը</span>
                                        </li>
                                    </NavLink>
                                    :
                                    <Redirect to={'/'}/>
                            }
                            <NavLink
                                to='/configurations'
                                className={classes.dropLinks}
                                activeClassName={classes.dropActive}
                            >
                                <li className={classes.configuration}>
                                    <Icons type={'configuration'}/>
                                    <span className={classes.ownerConf}>Կարգավորումներ</span>
                                </li>
                            </NavLink>
                            <span
                                className={classes.dropLinks}
                                onClick={
                                    () => props.logout()
                                }
                            >
                                <li className={classes.logout}>
                                    <Icons type={'exit'}/>
                                    <span className={classes.ownerConf}>Ելք</span>
                                </li>
                            </span>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withRouter(UpPanel)