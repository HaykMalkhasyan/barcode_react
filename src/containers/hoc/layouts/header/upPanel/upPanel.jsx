import React from 'react'
import classes from '../header.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import MenuIcon from '@material-ui/icons/Menu'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import {NavLink, Redirect, withRouter} from "react-router-dom";
import Icons from "../../../../../components/Icons/icons";

const UpPanel = props => {

    return (
        <div className={props.sticky ? `${classes.hidden} ${classes.upPanel}` : classes.upPanel}>
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
                    <span className={classes.notIcons}>
                        <span className={classes.notificationsCount}>1</span>
                        <Icons type={'bell'} width={22} height={22}/>
                    </span>
                </div>
                <div>
                    <span className={classes.notIcons}>
                        <span className={classes.messageCount}>2</span>
                        <Icons type={'chat'} width={22} height={22}/>
                    </span>
                </div>
                <div className={classes.userWindow}>
                    <div className={classes.user} onClick={props.toggleConfigurationWindow}>
                        <Icons type={'person'} width={26} height={26}/>
                    </div>
                    {
                        !props.confWindow ?
                            <div className={classes.backdrop} onClick={props.toggleConfigurationWindow}/>
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
                                            <span>Իմ էջը</span>
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
                                    <span>Կարգավորումներ</span>
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
                                    <span>Ելք</span>
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