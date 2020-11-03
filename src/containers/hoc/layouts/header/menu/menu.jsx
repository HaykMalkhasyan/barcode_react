import React from 'react'
import classes from '../header.module.css'
import Icons from "../../../../../components/Icons/icons";
import Submenu from "../submenu/submenu";
import {withRouter} from "react-router-dom";
import {getLanguage} from "../../../../../controllers/languages/languages";
import StoreIcon from '@material-ui/icons/Store';

const Menu = props => {

    const iconRender = staticName => {

        switch (staticName) {
            case 'products':
                return (
                    <Icons type={'product'} className={classes.icons}/>
                );
            case 'documents':
                return (
                    <Icons type={'document'} className={classes.icons}/>
                );
            case 'sales':
                return (
                    <Icons type={'sell'} className={classes.icons}/>
                );
            case 'suppliers':
                return (
                    <Icons type={'suppliers'} className={classes.icons}/>
                );
            case 'workers':
                return (
                    <Icons type={'workers'} className={classes.icons}/>
                );
            case 'sale':
                return (
                    <StoreIcon/>
                    // <Icons type={'marketing'}  />
                );
            default:
                return null;
        }
    };

    const menuRender = (menus, activeMenu) => {

        return menus.map(
            menu => {

                return (
                    <div
                        key={menu.id}
                        className={
                            props.location.pathname.split('/')[1] === menu.staticName ?
                                props.submenu === menu.id ?
                                    `${classes.menuList} ${classes.menuListActive} ${classes.showArrow}`
                                    :
                                    `${classes.menuList} ${classes.menuListActive}`
                                :
                                (activeMenu && activeMenu.id === menu.id) ?
                                    props.submenu === menu.id ?
                                        `${classes.menuList} ${classes.showArrow}`
                                        :
                                        `${classes.menuList}`
                                    :
                                    classes.menuList
                        }
                        onClick={props.showThisSubMenuHandler.bind(this, menu)}
                    >
                        <div>
                            {
                                iconRender(menu.staticName)
                            }
                        </div>
                        <div
                            className={props.minimize ? `${classes.hiddenElem} ${classes.textElem}` : classes.textElem}>
                            <span>{getLanguage('am',menu.staticName)}</span>
                        </div>
                    </div>
                )
            }
        )
    };

    return (
        <div className={classes.menu}>
            <div>
                {
                    props.menus ?
                        menuRender(props.menus, props.activeMenu)
                        :
                        null
                }
            </div>
            {
                props.submenu ?
                    <Submenu
                        activeMenu={props.activeMenu}
                        // Methods
                        closeSubMenu={props.closeSubMenu}
                    />
                    :
                    null
            }
        </div>
    )
};

export default withRouter(Menu)