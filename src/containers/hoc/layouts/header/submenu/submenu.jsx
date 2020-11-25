import React from 'react'
import classes from '../header.module.css'
import {NavLink} from "react-router-dom";
import {getLanguage} from "../../../../../controllers/languages/languages";

const Submenu = props => {

    return (
        <div className={`background-fff ${classes.subMenu}`}>
            <ul className={classes.subMenuList}>
                {
                    props.activeMenu ?
                        props.activeMenu.subMenus.map(
                            submenu => {

                                return (
                                    <li key={submenu.id}>
                                        <NavLink
                                            onClick={props.closeSubMenu}
                                            exact
                                            to={submenu.url}
                                            className={`${classes.subMenuLink} font-size-12 color-313131 background-transparent`}
                                            activeClassName={classes.subMenuActive}>
                                            <span>{getLanguage('am', submenu.name)}</span>
                                        </NavLink>
                                    </li>
                                )
                            }
                        )
                        :
                        null
                }
            </ul>
        </div>
    )
};

export default Submenu