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

    const logoutHandler = () => {
        props.history.push('/login');
        props.logout()
        localStorage.clear();
    };

    return (
        <div className={`background-024059 ${props.sticky ? `${classes.hidden} ${classes.upPanel}` : classes.upPanel}`}>
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
                    className={`background-transparent color-fff ${props.menu ? `${classes.menuBtnOpen} ${classes.menuBtn}` : classes.menuBtn}`}
                >
                    {props.menu ? <MenuOpenIcon/> : <MenuIcon/>}
                </CustomButton>
                <span
                    className={`color-fff font-size-14 ${classes.projectName}`}
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
                        className={props.notification_modal ? `background-E6F8FF ${classes.socButtons} ${classes.socButtonsActive}` : `background-transparent ${classes.socButtons}`}
                        children={
                            <>
                                <span className={`background-03D9D9 color-fff font-size-10 ${classes.notificationsCount}`}>1</span>
                                <Icons type={'bell'} className={`fill-fff ${classes.notificationIcon}`} width={22} height={22}/>
                            </>
                        }
                        // Methods
                        onClick={() => props.toggleNotification(true)}
                    />
                </div>
                <div>
                    <CustomButton
                        className={props.chat_modal ? `background-E6F8FF ${classes.socButtons} ${classes.socButtonsActive}` : `background-transparent ${classes.socButtons}`}
                        children={
                            <>
                                <span className={`background-ff8927 color-fff font-size-10 ${classes.messageCount}`}>2</span>
                                <Icons type={'chat'} className={`fill-fff ${classes.chatIcon}`} width={22} height={22}/>
                            </>
                        }
                        // Methods
                        onClick={() => props.toggleChat(true)}
                    />
                </div>
                <div className={classes.userWindow}>
                    <CustomButton
                        className={!props.confWindow ? `background-E6F8FF ${classes.socButtons} ${classes.socButtonsActive}` : `background-transparent ${classes.socButtons}`}
                        children={<Icons type={'person'} className={`fill-fff stroke-fff ${classes.personIcon}`} width={26} height={26}/>}
                        // Methods
                        onClick={props.toggleConfigurationWindow}
                    />
                    {/*<div className={classes.user} onClick={props.toggleConfigurationWindow}>*/}
                    {/*    <Icons type={'person'} width={26} height={26}/>*/}
                    {/*</div>*/}
                    {
                        !props.confWindow ?
                            <Backdrop
                                className={`background-rgba_00008 ${classes.backdrop}`}
                                // Methods
                                onClick={props.toggleConfigurationWindow}
                            />
                            :
                            null
                    }
                    <div hidden={props.confWindow} className={`background-fff ${classes.userContent}`}>
                        <ul>
                            <li className={classes.userName}>
                                <span className="color-3b3b3b font-size-12">{props.user ? `${props.user.firstName} ${props.user.lastName}`: ''}</span>
                            </li>
                            {
                                props.user && props.user.user_id ?
                                    <CustomButton
                                        className={props.location.pathname.split("/")[1] === "user" ? `background-FCFCFC ${classes.dropLinks} ${classes.dropActive}` : `background-transparent ${classes.dropLinks}`}
                                        onClick={props.routeUserPage}
                                    >
                                        <li className={`color-3b3b3b font-size-12 ${classes.myPage}`}>
                                            <Icons type={'own-page'} className="fill-3b3b3b"/>
                                            <span className={classes.ownerConf}>Իմ էջը</span>
                                        </li>
                                    </CustomButton>
                                    :
                                    <Redirect to={'/'}/>
                            }
                            <NavLink
                                to='/configurations'
                                className={`background-transparent ${classes.dropLinks}`}
                                activeClassName={`background-FCFCFC ${classes.dropActive}`}
                            >
                                <li className={classes.configuration}>
                                    <Icons type={'configuration'} className="fill-3b3b3b"/>
                                    <span className={`font-size-12 color-3b3b3b ${classes.ownerConf}`}>Կարգավորումներ</span>
                                </li>
                            </NavLink>
                            <span
                                className={`background-transparent ${classes.dropLinks}`}
                                onClick={logoutHandler}
                            >
                                <li className={classes.logout}>
                                    <Icons type={'exit'} className={classes.exitIcon}/>
                                    <span className={`color-3b3b3b font-size-12 ${classes.ownerConf}`}>Ելք</span>
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