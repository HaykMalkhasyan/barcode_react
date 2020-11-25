import React from 'react'
import classes from '../header.module.css'
import Icons from "../../../../../components/Icons/icons";
import Submenu from "../submenu/submenu";
import {withRouter} from "react-router-dom";
import {getLanguage} from "../../../../../controllers/languages/languages";
import StoreIcon from '@material-ui/icons/Store';
import InputIcon from '@material-ui/icons/Input';

const Menu = props => {

    const iconRender = staticName => {

        switch (staticName) {
            case 'products':
                return (
                    <Icons type={'product'} className={`fill-171717 ${classes.icons}`}/>
                );
            case 'documents':
                return (
                    <Icons type={'document'} className={`fill-171717 ${classes.icons}`}/>
                );
            case 'sales':
                return (
                    <Icons type={'sell'} className={`fill-171717 ${classes.icons}`}/>
                );
            case 'suppliers':
                return (
                    <Icons type={'suppliers'} className={`fill-171717 ${classes.icons}`}/>
                );
            case 'workers':
                return (
                    <Icons type={'workers'} className={`fill-171717 ${classes.icons}`}/>
                );
            case 'sale':
                return (
                    <StoreIcon/>
                    // <Icons type={'marketing'}  />
                );
                case 'income_outcome':
                return (
                    <InputIcon/>
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
                            `
                            color-8b8b8b
                            ${
                                props.location.pathname.split('/')[1] === menu.staticName ?
                                    props.submenu === menu.id ?
                                        `${classes.menuList} ${classes.menuListActive} ${classes.showArrow} color-ff8927 fill-ff8927 background-fff`
                                        :
                                        `${classes.menuList} ${classes.menuListActive} color-ff8927 fill-ff8927 background-fff`
                                    :
                                    (activeMenu && activeMenu.id === menu.id) ?
                                        props.submenu === menu.id ?
                                            `${classes.menuList} ${classes.showArrow}`
                                            :
                                            `${classes.menuList}`
                                        :
                                        classes.menuList
                            }
                            `
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
                            <span className="font-size-8">{getLanguage('am',menu.staticName)}</span>
                        </div>
                    </div>
                )
            }
        )
    };

    return (
        <div className={`${classes.menu} background-fff`}>
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