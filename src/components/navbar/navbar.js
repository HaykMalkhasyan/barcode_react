import React, {useEffect, useState} from 'react';
import cls from './nabar.module.css'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import {NavLink, withRouter} from "react-router-dom";
import SessionStorage from "../../services/SessionStorage";
import CustomButton from "../buttons/myButton";
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from "../backdrop/backdrop";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

// const StyledMenu = withStyles({
//     paper: {
//         border: '1px solid #d3d4d5',
//     },
// })((props) => (
//     <Menu
//         elevation={0}
//         getContentAnchorEl={null}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//         }}
//         {...props}
//     />
// ));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            // backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

const ProminentAppBar = props => {
    const classes = useStyles();
    const [scroll, setScroll] = useState(0)
    const [sticky, setSticky] = useState(false)
    const [hideText, setHideText] = useState(false)
    const [menu, setMenu] = useState(false)
    const [minimaze, setMinimaze] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [user] = useState(SessionStorage.get("user"))
    const [confWindow, setConfWindow] = useState(true)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const toggleConfigurationWindow = () => {
        setConfWindow(
            !confWindow
        )
    }

    const windowScrolling = event => {
        setScroll(window.pageYOffset)
        if (window.pageYOffset > 0) {
            setSticky(true)
        } else {
            setSticky(false)
        }

        if (window.pageYOffset > 200) {
            setMinimaze(true)
        } else {
            setMinimaze(false)
        }

        if (window.pageYOffset > 400) {
            setHideText(true)
        } else {
            setHideText(false)
        }

        if (scroll > window.pageYOffset) {
            setMinimaze(false)
            setSticky(false)
            setHideText(false)
        }

    }

    useEffect(
        () => {
            setScroll(window.pageYOffset)
            if (window.innerWidth > 768) {
                window.addEventListener('scroll', windowScrolling)
            } else {
                setMinimaze(false)
                setSticky(false)
                setHideText(false)
            }


            return () => {
                window.removeEventListener('scroll', windowScrolling)
            }
        }
    )

    const showThisSubMenuHandler = (menu) => {
        setMenu(false)
        props.setActiveMenu(menu)
    }

    const iconRender = (staticName) => {

        switch (staticName) {
            case 'products':
                return (
                    <svg width={26} height={25} viewBox="0 0 26.664 25.655">
                        <path
                            className={cls.prod}
                            d="M31.971,10.469a.448.448,0,0,0-.34-.156H10.466L9.6,7.42a.449.449,0,0,0-.43-.32H5.864a.449.449,0,0,0,0,.9H8.839l5.452,18.271,0,.006.677,2.3a2.345,2.345,0,1,0,3.993,1.782h5.878c0,.016,0,.033,0,.049a2.352,2.352,0,1,0,.2-.946H18.836a2.34,2.34,0,0,0-2.209-1.568h0a2.329,2.329,0,0,0-.87.169l-.434-1.475H29.278a.448.448,0,0,0,.443-.381l2.352-15.38A.448.448,0,0,0,31.971,10.469ZM27.186,28.96a1.449,1.449,0,1,1-1.448,1.449A1.451,1.451,0,0,1,27.186,28.96Zm-10.56-.169h0a1.448,1.448,0,0,1,1.446,1.448,1.448,1.448,0,1,1-1.447-1.448Zm12.267-3.1H15.058l-.848-2.885a.448.448,0,0,0-.045-.1l-3.431-11.5H31.108Z"
                            transform="translate(-5.415 -7.1)"
                        />
                    </svg>
                );
            case 'documents':
                return (
                    <svg width={21.273} height={25.541} viewBox="0 0 21.273 25.541">
                        <g transform="translate(-463.535 -2009.614)">
                            <path
                                className={cls.docs}
                                d="M482.948,2022.473l-2.912.728.728-2.912,7.279-7.281,2.184,2.184Z"
                                transform="translate(-7.464 -1.35)"
                            />
                            <path
                                className={cls.docs}
                                d="M497.229,2013.843l1.092-1.091a1.544,1.544,0,0,0-2.184-2.184l-1.092,1.091"
                                transform="translate(-14.466 0)"
                            />
                            <path className={cls.docs} d="M484.308,2015.449v19.206H464.035v-24.541h14.938"/>
                            <line className={cls.docs} x2={9.07} transform="translate(467.236 2015.449)"/>
                            <line className={cls.docs} x2={5.869} transform="translate(467.236 2018.65)"/>
                            <line className={cls.docs} x2={3.201} transform="translate(467.236 2021.851)"/>
                        </g>
                    </svg>
                );
            case 'sales':
                return (
                    <svg width={26.997} height={26.655} viewBox="0 0 26.997 26.655">
                        <g transform="translate(-10.5 -2.5)">
                            <path
                                className={cls.sell}
                                d="M36.984,36.029H35.447V15.013a.513.513,0,0,0-.513-.513H30.15a.513.513,0,0,0-.513.513V36.029H26.9V22.873a.513.513,0,0,0-.513-.513H21.606a.513.513,0,0,0-.513.513V36.029H18.36V30.391a.513.513,0,0,0-.513-.513H13.063a.513.513,0,0,0-.513.513v5.639H11.013a.513.513,0,1,0,0,1.025H36.984a.513.513,0,0,0,0-1.025Zm-6.322-20.5h3.759v20.5H30.662Zm-8.543,7.86h3.759V36.029H22.119ZM13.576,30.9h3.759v5.126H13.576Z"
                                transform="translate(0 -7.899)"
                            />
                            <path
                                className={cls.sell}
                                d="M12.013,18.562a.513.513,0,0,0,.362-.15L26.537,4.25V6.43a.513.513,0,1,0,1.025,0V3.013a.509.509,0,0,0-.038-.188h0a.513.513,0,0,0-.28-.28h0A.509.509,0,0,0,27.05,2.5H23.632a.513.513,0,0,0,0,1.025h2.18L11.651,17.687a.513.513,0,0,0,.362.875Z"
                                transform="translate(-0.659)"
                            />
                        </g>
                    </svg>
                );
            case 'suppliers':
                return (
                    <svg width={26.056} height={26.655} viewBox="0 0 26.056 26.655">
                        <g transform="translate(-6.5 -1.5)">
                            <path
                                className={cls.frends}
                                d="M35.64,68.5a6.146,6.146,0,0,0-6.14,6.14.449.449,0,0,0,.449.449H41.33a.449.449,0,0,0,.449-.449A6.146,6.146,0,0,0,35.64,68.5Zm-5.223,5.69a5.241,5.241,0,0,1,10.444,0Z"
                                transform="translate(-16.112 -46.934)"
                            />
                            <path
                                className={cls.frends}
                                d="M42.645,50.789A3.145,3.145,0,1,0,39.5,47.645,3.145,3.145,0,0,0,42.645,50.789Zm0-5.391A2.246,2.246,0,1,1,40.4,47.645,2.246,2.246,0,0,1,42.645,45.4Z"
                                transform="translate(-23.117 -30.122)"
                            />
                            <path
                                className={cls.frends}
                                d="M67.131,51.5a6.2,6.2,0,0,0-2.357.449.449.449,0,1,0,.338.833,5.307,5.307,0,0,1,2.019-.383,5.07,5.07,0,0,1,5.13,4.492H65.14a.449.449,0,1,0,0,.9h7.592a.449.449,0,0,0,.449-.449A5.955,5.955,0,0,0,67.131,51.5Z"
                                transform="translate(-40.625 -35.025)"
                            />
                            <path
                                className={cls.frends}
                                d="M65.645,32.789A3.145,3.145,0,1,0,62.5,29.645,3.145,3.145,0,0,0,65.645,32.789Zm0-5.391A2.246,2.246,0,1,1,63.4,29.645,2.246,2.246,0,0,1,65.645,27.4Z"
                                transform="translate(-39.228 -17.513)"
                            />
                            <path
                                className={cls.frends}
                                d="M14.883,57.326a.449.449,0,0,0-.446-.449H7.419a5.082,5.082,0,0,1,5.133-4.492,5.319,5.319,0,0,1,2.013.389.452.452,0,0,0,.338-.839,6.212,6.212,0,0,0-2.351-.455A5.966,5.966,0,0,0,6.5,57.326a.449.449,0,0,0,.449.449h7.487A.449.449,0,0,0,14.883,57.326Z"
                                transform="translate(0 -35.011)"
                            />
                            <path
                                className={cls.frends}
                                d="M19.645,32.789A3.145,3.145,0,1,0,16.5,29.645,3.145,3.145,0,0,0,19.645,32.789Zm0-5.391A2.246,2.246,0,1,1,17.4,29.645,2.246,2.246,0,0,1,19.645,27.4Z"
                                transform="translate(-7.005 -17.513)"
                            />
                            <path
                                className={cls.frends}
                                d="M42.4,8.167a.449.449,0,1,0-.9,0,2.3,2.3,0,0,0,2.1,2.141v.626a.449.449,0,0,0,.9,0v-.623a2.3,2.3,0,0,0,2.1-2.141,2.3,2.3,0,0,0-2.1-2.141V3.486a1.376,1.376,0,0,1,1.2,1.231.449.449,0,1,0,.9,0,2.3,2.3,0,0,0-2.1-2.141V1.949a.449.449,0,1,0-.9,0v.623a2.3,2.3,0,0,0-2.1,2.141,2.3,2.3,0,0,0,2.1,2.138V9.4A1.379,1.379,0,0,1,42.4,8.167Zm3.294,0a1.365,1.365,0,0,1-1.2,1.231V6.939A1.378,1.378,0,0,1,45.693,8.167ZM42.4,4.714a1.365,1.365,0,0,1,1.2-1.231V5.939a1.37,1.37,0,0,1-1.2-1.225Z"
                                transform="translate(-24.518)"
                            />
                        </g>
                    </svg>
                );
            case 'worckers':
                return (
                    <svg width={26.655} height={26.655} viewBox="0 0 26.655 26.655">
                        <g transform="translate(-1103.889 -70.487)">
                            <path
                                className={cls.workers}
                                d="M38.038,68.5A8.546,8.546,0,0,0,29.5,77.038a.625.625,0,0,0,.625.625H45.951a.625.625,0,0,0,.625-.625A8.546,8.546,0,0,0,38.038,68.5Zm-7.264,7.913a7.289,7.289,0,0,1,14.523,0Z"
                                transform="translate(1074.389 19.48)"
                            />
                            <path
                                className={cls.workers}
                                d="M43.873,53.246A4.373,4.373,0,1,0,39.5,48.873,4.373,4.373,0,0,0,43.873,53.246Zm0-7.5a3.124,3.124,0,1,1-3.124,3.124A3.124,3.124,0,0,1,43.873,45.749Z"
                                transform="translate(1068.554 33.484)"
                            />
                            <path
                                className={cls.workers}
                                d="M68.162,51.5a8.621,8.621,0,0,0-3.278.625.625.625,0,1,0,.471,1.158,7.38,7.38,0,0,1,2.807-.533A7.051,7.051,0,0,1,75.3,59h-9.9a.625.625,0,0,0,0,1.249H75.95a.625.625,0,0,0,.625-.625A8.281,8.281,0,0,0,68.162,51.5Z"
                                transform="translate(1053.969 29.4)"
                            />
                            <path
                                className={cls.workers}
                                d="M66.873,35.246A4.373,4.373,0,1,0,62.5,30.873,4.373,4.373,0,0,0,66.873,35.246Zm0-7.5a3.124,3.124,0,1,1-3.124,3.124A3.124,3.124,0,0,1,66.873,27.749Z"
                                transform="translate(1055.132 43.987)"
                            />
                        </g>
                    </svg>
                )
            default:
                return null;
        }
    }

    const menuRender = (menus, activeMenu) => {

        return menus.map(
            menu => {

                return (
                    <div
                        className={
                            minimaze ?
                                activeMenu && activeMenu.id === menu.id ?
                                    `${cls.minimaze} ${cls.menuList} ${cls.prodLink} ${cls.menuListActive}`
                                    :
                                    `${cls.minimaze} ${cls.menuList} ${cls.prodLink}`
                                :
                                activeMenu && activeMenu.id === menu.id ?
                                    `${cls.menuList} ${cls.prodLink} ${cls.menuListActive}`
                                    :
                                    `${cls.menuList} ${cls.prodLink}`
                        }
                        onClick={showThisSubMenuHandler.bind(this, menu)}
                    >
                        <div>
                            {
                                iconRender(menu.staticName)
                            }
                        </div>
                        <div className={minimaze ? `${cls.hiddenElem} ${cls.textElem}` : cls.textElem}>
                            <span>{menu.name}</span>
                        </div>
                    </div>
                )
            }
        )
    }

    return (
        <div
            className={hideText ? `${cls.hideAppBar} ${cls.appBar}` : cls.appBar}
            color={'inherit'}
            position={props.position}
            style={{
                zIndex: 14,
                backgroundColor: props.headerBackgroundColor,
                transition: '500ms',
                color: props.headerFontColor,
            }}
        >
            {
                menu ?
                    window.innerWidth < 768 ?
                        <Backdrop
                            onClick={toggleMenu}
                            className={cls.backdropMenu}
                        />
                        :
                        null
                    :
                    null
            }
            <div className={sticky ? `${cls.hidden} ${cls.upPanel}` : cls.upPanel}>
                <div>
                    <CustomButton
                        onClick={toggleMenu}
                        className={menu ? `${cls.menuBtnOpen} ${cls.menuBtn}` : cls.menuBtn}
                    >
                        {
                            menu ?
                                <MenuOpenIcon/>
                                :
                                <MenuIcon/>
                        }
                    </CustomButton>
                    <span
                        onClick={
                            () => {
                                props.setActiveMenu(null)
                                props.history.push('/')
                            }
                        }
                        className={cls.projectName}
                    >
                        Barcode.am
                    </span>
                </div>
                <div className={cls.toolsPanel}>
                    <div>
                        <span className={cls.notIcons}>
                            <span className={cls.notificationsCount}>1</span>
                            <svg width={22} height={22} viewBox="0 0 20.59 22.845">
                                <defs>
                                  <style>{".a{fill:#fff;stroke:#fff;stroke-width:0.5px;}"}</style>
                                </defs>
                                <path
                                    className="a"
                                    d="M33.495,25.05a2.05,2.05,0,1,1,4.1,0v.69a7.587,7.587,0,0,1,5.535,7.3v4.92a.613.613,0,0,0,.614.616,1.845,1.845,0,1,1,0,3.69H27.349a1.845,1.845,0,1,1,0-3.69.616.616,0,0,0,.614-.616v-4.92a7.586,7.586,0,0,1,5.535-7.3Zm.256,1.046a7.176,7.176,0,0,0-5.381,6.949v4.92a1.026,1.026,0,0,1-1.024,1.026,1.435,1.435,0,1,0,0,2.87H43.741a1.435,1.435,0,1,0,0-2.87,1.023,1.023,0,0,1-1.024-1.026v-4.92A7.177,7.177,0,0,0,37.339,26.1l-.154-.04V25.05a1.64,1.64,0,1,0-3.28,0v1.006ZM32.47,42.27h.41a2.665,2.665,0,1,0,5.33,0h.41a3.075,3.075,0,1,1-6.15,0Z"
                                    transform="translate(-25.25 -22.75)"
                                />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <span className={cls.notIcons}>
                            <span className={cls.messageCount}>1</span>
                            <svg width={22} height={22} viewBox="0 0 22.657 23.061">
                                <defs>
                                  <style>{".a{fill:#fff;stroke:#fff;stroke-width:0.5px;}"}</style>
                                </defs>
                                <path
                                    className="a"
                                    d="M17.942,38.926a.416.416,0,0,0,.269.135h.067l6.128-1.078A11.072,11.072,0,1,0,17.1,27.578a11.764,11.764,0,0,0,.741,4.041,10.585,10.585,0,0,0,1.751,2.963L17.874,38.59A.607.607,0,0,0,17.942,38.926Zm2.391-4.276a.309.309,0,0,0-.067-.337,11.033,11.033,0,0,1-1.785-2.93,10.413,10.413,0,1,1,9.7,6.6,10.82,10.82,0,0,1-3.6-.64.153.153,0,0,0-.168,0l-5.623.977Z"
                                    transform="translate(-16.85 -16.25)"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className={cls.userWindow}>
                        <div className={cls.user} onClick={toggleConfigurationWindow}>
                            <svg width={22} height={22} viewBox="0 0 23.011 23.561">
                                <defs>
                                    <style>{".b{fill:none;stroke:#fff;stroke-width:1px;}"}</style>
                                </defs>
                                <g transform="translate(-7.5 -6.5)">
                                    <g transform="translate(8 7)">
                                        <path
                                            className="b"
                                            d="M38.106,13.053a6.053,6.053,0,1,0-6.053,6.053A6.071,6.071,0,0,0,38.106,13.053Z"
                                            transform="translate(-21.047 -7)"
                                        />
                                        <path
                                            className="b"
                                            d="M21.4,54.728a7.63,7.63,0,0,1-4.787,0A6.153,6.153,0,0,0,9.9,56.544,8.477,8.477,0,0,0,8,61.882a2.031,2.031,0,0,0,2.036,2.036H27.975a2.031,2.031,0,0,0,2.036-2.036,8.477,8.477,0,0,0-1.9-5.338A6.166,6.166,0,0,0,21.4,54.728Z"
                                            transform="translate(-8 -41.356)"
                                        />
                                    </g>
                                </g>
                            </svg>
                            <span>{user.firstname}</span>
                            <svg width={9} height={6} viewBox="0 0 6.695 3.586">
                                <defs>
                                    <style>{".c{fill:#fff;}"}</style>
                                </defs>
                                <path
                                    className="c"
                                    d="M25.268,990.878a.357.357,0,0,0,.2-.1l2.975-2.856a.357.357,0,1,0-.491-.517l-2.73,2.622-2.73-2.622a.357.357,0,1,0-.491.517l2.975,2.856A.357.357,0,0,0,25.268,990.878Z"
                                    transform="translate(-21.872 -987.294)"
                                />
                            </svg>
                        </div>
                        {
                            !confWindow ?
                                <div className={cls.backdrop} onClick={toggleConfigurationWindow}/>
                                :
                                null
                        }
                        <div hidden={confWindow} className={cls.userContnet}>
                            <ul>
                                <li className={cls.userName}>
                                    <span>{user.firstname} {user.lastname}</span>
                                </li>
                                <NavLink to={'/user-page'} className={cls.dropLinks} activeClassName={cls.dropActive}>
                                    <li className={cls.myPage}>
                                        <svg width={21} height={21} viewBox="0 0 21.005 21.005">
                                            <defs>
                                                <style>{".mayPageIcon{fill:#3b3b3b;}"}</style>
                                            </defs>
                                            <g transform="translate(-5 -5)">
                                                <path
                                                    className="mayPageIcon"
                                                    d="M15.5,5A10.5,10.5,0,1,0,26,15.5,10.5,10.5,0,0,0,15.5,5ZM9.714,22.635a7.87,7.87,0,0,1,11.574,0A9.165,9.165,0,0,1,9.714,22.635Zm12.533-.9a9.181,9.181,0,0,0-13.487,0,9.191,9.191,0,1,1,13.487,0Z"
                                                />
                                                <path
                                                    className="mayPageIcon"
                                                    d="M34.905,21.88a4.6,4.6,0,1,0,4.6,4.593A4.6,4.6,0,0,0,34.905,21.88Zm0,7.877a3.281,3.281,0,1,1,3.281-3.284,3.281,3.281,0,0,1-3.281,3.284Z"
                                                    transform="translate(-19.403 -12.94)"
                                                />
                                            </g>
                                        </svg>
                                        <span>Իմ էջը</span>
                                    </li>
                                </NavLink>
                                <NavLink to={'/configurations'} className={cls.dropLinks}
                                         activeClassName={cls.dropActive}>
                                    <li className={cls.configuration}>
                                        <svg width={21} height={21} viewBox="0 0 21.005 20.976">
                                            <defs>
                                                <style>{".configurationIcon{fill:#3b3b3b;}"}</style>
                                            </defs>
                                            <g transform="translate(-4.2 -4.225)">
                                                <g transform="translate(4.2 4.225)">
                                                    <path
                                                        className="configurationIcon"
                                                        d="M24.953,12.456l-.458-.046c-.435-.046-.938-.092-1.487-.114a10.091,10.091,0,0,0-.732-1.785c.366-.412.686-.8.961-1.144l.275-.343-.252-.366A10.486,10.486,0,0,0,20.7,6.1l-.366-.252-.343.275c-.343.275-.732.618-1.144.961a8.618,8.618,0,0,0-1.785-.732,13.947,13.947,0,0,0-.092-1.464l-.046-.435-.435-.069a10.789,10.789,0,0,0-3.638,0l-.435.069-.023.435c-.046.435-.092.938-.114,1.487a10.091,10.091,0,0,0-1.785.732c-.412-.366-.8-.686-1.144-.961l-.343-.275-.366.252A10.486,10.486,0,0,0,6.076,8.681l-.252.366L6.1,9.39c.275.343.618.732.961,1.144a8.618,8.618,0,0,0-.732,1.785,13.947,13.947,0,0,0-1.464.092l-.435.046-.069.435A9.825,9.825,0,0,0,4.2,14.7a9.654,9.654,0,0,0,.16,1.808l.069.435.435.046c.435.046.938.092,1.487.114a10.091,10.091,0,0,0,.732,1.785c-.366.412-.686.8-.961,1.144l-.275.343.252.366A10.486,10.486,0,0,0,8.662,23.3l.366.252.343-.275c.343-.3.732-.618,1.144-.961a8.618,8.618,0,0,0,1.785.732c.046.549.069,1.053.114,1.487l.046.435.435.069a9.825,9.825,0,0,0,1.808.16,9.654,9.654,0,0,0,1.808-.16l.435-.069.046-.435c.046-.435.092-.938.114-1.487a10.091,10.091,0,0,0,1.785-.732c.412.366.8.686,1.144.961l.343.275.366-.252a10.486,10.486,0,0,0,2.563-2.563l.252-.366-.275-.343c-.275-.343-.618-.732-.961-1.144a8.618,8.618,0,0,0,.732-1.785c.549-.046,1.053-.069,1.487-.114l.435-.046.069-.435A9.825,9.825,0,0,0,25.2,14.7a9.654,9.654,0,0,0-.16-1.808Zm-1.007,3.432c-.435.046-.915.069-1.419.092L22.093,16,22,16.438a7.843,7.843,0,0,1-.915,2.219l-.229.366.275.32c.343.389.664.755.938,1.075a9.617,9.617,0,0,1-1.67,1.67c-.343-.275-.686-.595-1.075-.938L19,20.877l-.366.229a7.23,7.23,0,0,1-2.219.915l-.412.092-.023.435c-.023.5-.069.984-.092,1.419a10.346,10.346,0,0,1-2.38,0c-.046-.435-.069-.915-.092-1.419l-.023-.435-.458-.092a7.843,7.843,0,0,1-2.219-.915l-.366-.229-.32.275c-.389.343-.755.664-1.075.938a9.616,9.616,0,0,1-1.67-1.67c.275-.32.595-.686.938-1.075l.275-.32-.229-.366a7.23,7.23,0,0,1-.915-2.219l-.092-.412L6.831,16c-.5-.023-.984-.069-1.419-.092a10.372,10.372,0,0,1-.069-1.19,10.677,10.677,0,0,1,.069-1.19c.435-.046.915-.069,1.419-.092l.435-.023.092-.412a7.843,7.843,0,0,1,.915-2.219L8.5,10.42l-.275-.32c-.343-.389-.664-.755-.938-1.075a9.616,9.616,0,0,1,1.67-1.67c.32.275.686.595,1.075.938l.32.275.366-.229a7.23,7.23,0,0,1,2.219-.915l.412-.092.023-.435c.023-.5.069-.984.092-1.419a10.346,10.346,0,0,1,2.38,0c.046.435.069.915.092,1.419l.023.435.412.092a7.843,7.843,0,0,1,2.219.915l.366.229.32-.275c.389-.343.755-.664,1.075-.938a9.617,9.617,0,0,1,1.67,1.67c-.275.32-.595.686-.938,1.075l-.229.275.229.366A7.23,7.23,0,0,1,22,12.96l.092.412.435.023c.5.023.984.069,1.419.092a10.372,10.372,0,0,1,.069,1.19A10.772,10.772,0,0,1,23.946,15.889Z"
                                                        transform="translate(-4.2 -4.225)"
                                                    />
                                                    <path
                                                        className="configurationIcon"
                                                        d="M30.489,24.7a5.789,5.789,0,1,0,5.789,5.789A5.8,5.8,0,0,0,30.489,24.7Zm0,10.411a4.622,4.622,0,1,1,4.622-4.622A4.639,4.639,0,0,1,30.489,35.111Z"
                                                        transform="translate(-20.009 -20.015)"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                        <span>Կարգավորումներ</span>
                                    </li>
                                </NavLink>
                                <span
                                    onClick={
                                        () => {
                                            props.logout()
                                        }
                                    }
                                    className={cls.dropLinks}
                                    activeClassName={cls.dropActive}
                                >
                                    <li className={cls.logout}>
                                        <svg width={21} height={21} viewBox="0 0 20.205 23.455">
                                            <defs>
                                                <style>{".logoutIcon{fill:#3b3b3b;}"}</style>
                                            </defs>
                                            <g transform="translate(-11.236 -5)">
                                                <path
                                                    className="logoutIcon"
                                                    d="M25.526,18.6a.505.505,0,0,0-.505.505v4.686a.506.506,0,0,1-.506.505H21.207V9.71a1.686,1.686,0,0,0-1.032-1.5l-5.712-2.2H24.515a.506.506,0,0,1,.505.505V11.2a.505.505,0,1,0,1.01,0V6.516A1.517,1.517,0,0,0,24.515,5H11.742a.647.647,0,0,0-.067.007c-.014,0-.027,0-.04.005a.452.452,0,0,0-.048.015.464.464,0,0,0-.045.015c-.015.007-.028.015-.042.023s-.029.015-.042.024a.507.507,0,0,0-.041.034c-.011.009-.023.018-.033.028a.465.465,0,0,0-.032.039c-.01.012-.021.024-.03.038s-.013.025-.02.037a.476.476,0,0,0-.027.053.307.307,0,0,0-.013.041.556.556,0,0,0-.015.055.463.463,0,0,0-.006.056c0,.012,0,.024,0,.036V24.8a.639.639,0,0,0,.007.067c0,.013,0,.028.005.04a.433.433,0,0,0,.015.047c.005.016.009.032.016.047s.014.026.021.038a.442.442,0,0,0,.026.046.407.407,0,0,0,.03.036.456.456,0,0,0,.033.038.385.385,0,0,0,.034.028.452.452,0,0,0,.043.034.277.277,0,0,0,.032.017.567.567,0,0,0,.058.029l8.022,3.086a1.389,1.389,0,0,0,.5.1,1.115,1.115,0,0,0,.636-.192,1.21,1.21,0,0,0,.5-1.024v-1.93h3.308a1.518,1.518,0,0,0,1.516-1.516V19.106A.5.5,0,0,0,25.526,18.6Zm-5.33,0v8.638h0a.16.16,0,0,1-.257.176l-7.692-2.959V6.242l7.565,2.909a.7.7,0,0,1,.384.559Z"
                                                />
                                                <path
                                                    className="logoutIcon"
                                                    d="M65.9,33.23l-2.91-2.91a.505.505,0,1,0-.715.715L64.5,33.261H58.642a.505.505,0,0,0,0,1.011H64.5L62.272,36.5a.505.505,0,1,0,.715.715L65.9,34.3a.758.758,0,0,0,0-1.072Z"
                                                    transform="translate(-34.678 -18.612)"
                                                />
                                            </g>
                                        </svg>
                                        <span>Ելք</span>
                                    </li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={menu ? `${cls.openMenu} ${cls.menu}` : cls.menu}>
                <div>
                    {
                        props.menus ?
                            menuRender(props.menus, props.activeMenu)
                            :
                            null
                    }
                </div>
            </div>
            <div className={cls.subMenu}>
                <ul className={cls.subMenuList}>
                    {
                        props.activeMenu ?
                            props.activeMenu.subMenus.length ?
                                props.activeMenu.subMenus.map(
                                    subMenu => {

                                        return (
                                            <li>
                                                <NavLink to={subMenu.url} className={cls.subMenuLink}
                                                         activeClassName={cls.subMenuActive}>
                                                    <span>
                                                        {subMenu.name}
                                                    </span>
                                                </NavLink>
                                            </li>
                                        )
                                    }
                                )
                                :
                                null
                            :
                            null
                    }
                </ul>
            </div>
            {/*<Toolbar className={classes.toolbar} style={{minHeight: 'auto', transition: '500ms', padding: 0}}>*/}
            {/*    <h5*/}
            {/*        onClick={() => props.history.push('/')}*/}
            {/*        className='px-0 pt-2 mx-1 my-0 d-block d-lg-none'*/}
            {/*        style={{*/}
            {/*            alignSelf: 'flex-start',*/}
            {/*            fontWeight: 100,*/}
            {/*            transition: '500ms',*/}
            {/*            color: props.headerFontColor,*/}
            {/*            cursor: 'pointer'*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {props.name}*/}
            {/*    </h5>*/}
            {/*    <div className="ml-auto py-0 py-sm-0 d-block d-lg-none">*/}
            {/*        <Collapse isOpen={true} navbar>*/}
            {/*            <Nav className="d-flex p-0 m-0">*/}
            {/*                <Localize headerFontColor={props.headerFontColor}/>*/}
            {/*                <UncontrolledDropdown nav inNavbar className="p-0">*/}
            {/*                    <DropdownToggle nav>*/}
            {/*                        <img src={userImage} alt="logged-in-user" className="rounded-circle width-35"/>*/}
            {/*                    </DropdownToggle>*/}
            {/*                    <DropdownMenu right>*/}
            {/*                        <DropdownItem>*/}
            {/*                     <span className="font-small-3"*/}
            {/*                           style={{color: props.headerFontColor, transition: '500ms'}}>*/}
            {/*                        {user.firstname} {user.lastname} <span*/}
            {/*                         className="text-muted">({user.position})</span>*/}
            {/*                     </span>*/}
            {/*                        </DropdownItem>*/}
            {/*                        <DropdownItem divider/>*/}

            {/*                        <LogoutComponent headerFontColor={props.headerFontColor}/>*/}
            {/*                    </DropdownMenu>*/}
            {/*                </UncontrolledDropdown>*/}
            {/*            </Nav>*/}
            {/*        </Collapse>*/}
            {/*    </div>*/}
            {/*</Toolbar>*/}
            {/*<Toolbar className={classes.toolbar} style={{minHeight: 'auto', transition: '500ms', padding: 0}}>*/}
            {/*    <h3*/}
            {/*        onClick={() => props.history.push('/')}*/}
            {/*        className='p-2 mr-2 d-none d-lg-inline'*/}
            {/*        style={{*/}
            {/*            alignSelf: 'flex-start',*/}
            {/*            fontWeight: 100,*/}
            {/*            borderRight: '1px solid #d5d5d5',*/}
            {/*            userSelect: 'none',*/}
            {/*            transition: '500ms',*/}
            {/*            color: props.headerFontColor,*/}
            {/*            cursor: 'pointer'*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {props.name}*/}
            {/*    </h3>*/}
            {/*    {*/}
            {/*        props.searchIcon ?*/}
            {/*            <IconButton aria-label="search" color="inherit">*/}
            {/*                <SearchIcon style={{color: props.headerIconColor, transition: '500ms'}}/>*/}
            {/*            </IconButton>*/}
            {/*            :*/}
            {/*            null*/}
            {/*    }*/}
            {/*    {*/}
            {/*        props.data ?*/}
            {/*            Object.entries(props.data).length > 0 ?*/}
            {/*                Object.keys(props.data).map(*/}
            {/*                    item => sideMenuItem(item)*/}
            {/*                )*/}
            {/*                :*/}
            {/*                null*/}
            {/*            :*/}
            {/*            null*/}
            {/*    }*/}
            {/*    <StyledMenuItem*/}
            {/*        className='my-0 mb-1 my-lg-2 mx-1'*/}
            {/*        aria-label="display more actions"*/}
            {/*        edge="end"*/}
            {/*        color="inherit"*/}
            {/*        aria-controls="customized-menu"*/}
            {/*        aria-haspopup="true"*/}
            {/*        onClick={handleClick}*/}
            {/*        style={{outline: 'none', cursor: "pointer"}}*/}
            {/*    >*/}
            {/*        {*/}
            {/*            !isOpen ?*/}
            {/*                <SettingsIcon style={{color: props.headerIconColor, transition: '500ms'}}/>*/}
            {/*                :*/}
            {/*                <SettingsApplicationsIcon style={{color: props.headerIconColor, transition: '500ms'}}/>*/}
            {/*        }*/}
            {/*        <span className="menu-item-text d-none d-md-inline"*/}
            {/*              style={{color: props.headerFontColor, transition: '500ms'}}>*/}
            {/*            <Translate name={'Settings'}/>*/}
            {/*        </span>*/}
            {/*    </StyledMenuItem>*/}
            {/*    <div className="ml-auto py-2 py-sm-0 d-none d-lg-block">*/}
            {/*        <Collapse isOpen={true} navbar>*/}
            {/*            <Nav className="d-flex p-0 m-0">*/}
            {/*                <Localize headerFontColor={props.headerFontColor}/>*/}
            {/*                <UncontrolledDropdown nav inNavbar className="p-0">*/}
            {/*                    <DropdownToggle nav>*/}
            {/*                        <img src={userImage} alt="logged-in-user" className="rounded-circle width-35"/>*/}
            {/*                    </DropdownToggle>*/}
            {/*                    <DropdownMenu right>*/}
            {/*                        <DropdownItem>*/}
            {/*                     <span className="font-small-3"*/}
            {/*                           style={{color: props.headerFontColor, transition: '500ms'}}>*/}
            {/*                        {user.firstname} {user.lastname} <span*/}
            {/*                         className="text-muted">({user.position})</span>*/}
            {/*                     </span>*/}
            {/*                        </DropdownItem>*/}
            {/*                        <DropdownItem divider/>*/}

            {/*                        <LogoutComponent headerFontColor={props.headerFontColor}/>*/}
            {/*                    </DropdownMenu>*/}
            {/*                </UncontrolledDropdown>*/}
            {/*            </Nav>*/}
            {/*        </Collapse>*/}
            {/*    </div>*/}
            {/*</Toolbar>*/}
            {/*<CollapseUi in={isOpen} timeout="auto" unmountOnExit>*/}
            {/*    <hr style={{width: '97%', borderColor: '#eee', marginBottom: 0, marginTop: 0}}/>*/}
            {/*    <Toolbar className={classes.toolbar}*/}
            {/*             style={{minHeight: 'auto', transition: '500ms', padding: 0, flexWrap: 'wrap'}}>*/}
            {/*        <NavLink*/}
            {/*            to={`/menu`}*/}
            {/*            className={`${cls.navLink} my-1 my-lg-2 mx-1`}*/}
            {/*            activeClassName={cls.active}*/}
            {/*        >*/}
            {/*            <StyledMenuItem*/}
            {/*                style={props.match.path === `/menu` ? {borderBottom: '1px solid rgba(0, 0, 0, .1)'} : null}*/}
            {/*            >*/}
            {/*                <i className="menu-icon" style={props.headerIconColor ? {*/}
            {/*                    color: props.headerIconColor,*/}
            {/*                    transition: '500ms'*/}
            {/*                } : null}>*/}
            {/*                    <Icon tag={"Edit"}/>*/}
            {/*                </i>*/}
            {/*                <span className="menu-item-text d-none d-lg-inline"*/}
            {/*                      style={{color: props.headerFontColor, transition: '500ms'}}><Translate*/}
            {/*                    name={'EditMenu'}/></span>*/}
            {/*            </StyledMenuItem>*/}
            {/*        </NavLink>*/}
            {/*        {*/}
            {/*            props.data.map(*/}
            {/*                item => {*/}
            {/*                    if (item.name === 'translations' || item.name === 'company' || item.name === 'suppliers' || item.name === 'positions' || item.name === 'Currency' || item.name === 'Import') {*/}

            {/*                        return (*/}
            {/*                            <NavLink*/}
            {/*                                key={item.id}*/}
            {/*                                to={`/${item.name.toLowerCase().trim()}`}*/}
            {/*                                className={`${cls.navLink} my-1 my-lg-2 mx-1`}*/}
            {/*                                activeClassName={cls.active}*/}
            {/*                            >*/}
            {/*                                <StyledMenuItem*/}
            {/*                                    style={props.match.path === `/${item.name.toLowerCase().trim()}` ? {borderBottom: '1px solid rgba(0, 0, 0, .1)'} : null}*/}
            {/*                                >*/}
            {/*                                    <i className="menu-icon" style={props.headerIconColor ? {*/}
            {/*                                        color: props.headerIconColor,*/}
            {/*                                        transition: '500ms'*/}
            {/*                                    } : null}>*/}
            {/*                                        <Icon tag={item.icon.trim()}/>*/}
            {/*                                    </i>*/}
            {/*                                    <span className="menu-item-text d-none d-md-inline"*/}
            {/*                                          style={props.headerFontColor ? {*/}
            {/*                                              color: props.headerFontColor,*/}
            {/*                                              transition: '500ms'*/}
            {/*                                          } : null}><Translate name={item.name.trim()}/></span>*/}
            {/*                                </StyledMenuItem>*/}
            {/*                            </NavLink>*/}
            {/*                        )*/}

            {/*                    } else {*/}
            {/*                        return null*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </Toolbar>*/}
            {/*</CollapseUi>*/}
        </div>
    );
}

export default withRouter(ProminentAppBar)