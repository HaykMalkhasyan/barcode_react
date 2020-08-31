import React, {useEffect, useState} from 'react'
import classes from './header.module.css'
import UpPanel from "./upPanel/upPanel";
import Backdrop from "../../../../components/UI/backdrop/backdrop";
import {connect} from "react-redux";
import {logout} from "../../../../Redux/auth/actions";
import Menu from "./menu/menu";
import {setActiveMenu} from "../../../../Redux/pages/actions";
import MobileMenu from "./mobileMenu/mobileMenu";
import {withRouter} from "react-router-dom";

const Header = props => {
    const [scroll, setScroll] = useState(0);
    const [sticky, setSticky] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [menu, setMenu] = useState(false);
    const [minimize, setMinimize] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [confWindow, setConfWindow] = useState(true);
    const [submenu, setSubmenu] = useState(null);

    const windowScrolling = () => {
        setScroll(window.pageYOffset);
        if (window.innerWidth > 768) {
            if (window.pageYOffset > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }

            if (window.pageYOffset > 200) {
                setMinimize(true)
            } else {
                setMinimize(false)
            }

            if (window.pageYOffset > 400) {
                setHideText(true)
            } else {
                setHideText(false)
            }
        }

        if (scroll > window.pageYOffset) {
            setMinimize(false);
            setSticky(false);
            setHideText(false)
        }

    };

    useEffect(
        () => {
                window.addEventListener('scroll', windowScrolling);

            return () => {
                window.removeEventListener('scroll', windowScrolling)
            }
        }
    );

    const toggleMenu = () => {
        setMenu(!menu)
    };

    const toggleConfigurationWindow = () => {
        setConfWindow(
            !confWindow
        )
    };

    const showThisSubMenuHandler = menu => {
        setMenu(false);
        setSubmenu(menu.id === submenu ? null : menu.id);
        props.setActiveMenu(menu)
    };

    const closeSubMenuHandler = () => {
        setSubmenu(null)
    };

    return (
        <div className={hideText ? `${classes.hideAppBar} ${classes.appBar}` : classes.appBar}>
            {
                menu ?
                    window.innerWidth < 768 ?
                        <Backdrop
                            className={classes.backdropMenu}
                            // Methods
                            onClick={toggleMenu}
                        />
                        :
                        null
                    :
                    null
            }
            {
                submenu !== null ?
                    <Backdrop
                        className={classes.submenuBackdrop}
                        // Methods
                        onClick={() => setSubmenu(null)}
                    />
                    :
                    null
            }
            <UpPanel
                menu={menu}
                user={user}
                sticky={sticky}
                confWindow={confWindow}
                // Methods
                toggleMenu={toggleMenu}
                setActiveMenu={props.setActiveMenu}
                logout={props.logout}
                toggleConfigurationWindow={toggleConfigurationWindow}
            />
            <Menu
                menu={menu}
                submenu={submenu}
                minimize={minimize}
                menus={props.menus}
                activeMenu={props.activeMenu}
                // Methods
                showThisSubMenuHandler={showThisSubMenuHandler}
                closeSubMenu={closeSubMenuHandler}
            />
            <MobileMenu
                menus={props.menus}
                menu={menu}
                setMenu={setMenu}
                activeMenu={props.activeMenu}
            />
        </div>
    )
};

function mapStateToProps(state) {

    return {
        menus: state.page.menus,
        activeMenu: state.page.activeMenu
    }
}

function mapDispatchToProps(dispatch) {

    return {
        logout: () => dispatch(logout()),
        setActiveMenu: menu => dispatch(setActiveMenu(menu))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))