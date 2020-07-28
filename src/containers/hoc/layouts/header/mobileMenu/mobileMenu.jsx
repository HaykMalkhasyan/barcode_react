import React, {useState} from "react";
import classes from './mobileMenu.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {withRouter} from "react-router-dom";

const MobileMenu = props => {
    const [open, setOpen] = useState(null);

    const handleClick = id => {
        open === id ?
            setOpen(null)
            :
            setOpen(id)
    }

    const iconRender = (staticName) => {

        switch (staticName) {
            case 'products':
                return (
                    <svg width={26} height={25} viewBox="0 0 26.664 25.655">
                        <path
                            className={classes.prod}
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
                                className={classes.docs}
                                d="M482.948,2022.473l-2.912.728.728-2.912,7.279-7.281,2.184,2.184Z"
                                transform="translate(-7.464 -1.35)"
                            />
                            <path
                                className={classes.docs}
                                d="M497.229,2013.843l1.092-1.091a1.544,1.544,0,0,0-2.184-2.184l-1.092,1.091"
                                transform="translate(-14.466 0)"
                            />
                            <path className={classes.docs} d="M484.308,2015.449v19.206H464.035v-24.541h14.938"/>
                            <line className={classes.docs} x2={9.07} transform="translate(467.236 2015.449)"/>
                            <line className={classes.docs} x2={5.869} transform="translate(467.236 2018.65)"/>
                            <line className={classes.docs} x2={3.201} transform="translate(467.236 2021.851)"/>
                        </g>
                    </svg>
                );
            case 'sales':
                return (
                    <svg width={26.997} height={26.655} viewBox="0 0 26.997 26.655">
                        <g transform="translate(-10.5 -2.5)">
                            <path
                                d="M36.984,36.029H35.447V15.013a.513.513,0,0,0-.513-.513H30.15a.513.513,0,0,0-.513.513V36.029H26.9V22.873a.513.513,0,0,0-.513-.513H21.606a.513.513,0,0,0-.513.513V36.029H18.36V30.391a.513.513,0,0,0-.513-.513H13.063a.513.513,0,0,0-.513.513v5.639H11.013a.513.513,0,1,0,0,1.025H36.984a.513.513,0,0,0,0-1.025Zm-6.322-20.5h3.759v20.5H30.662Zm-8.543,7.86h3.759V36.029H22.119ZM13.576,30.9h3.759v5.126H13.576Z"
                                transform="translate(0 -7.899)"
                            />
                            <path
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
                                d="M35.64,68.5a6.146,6.146,0,0,0-6.14,6.14.449.449,0,0,0,.449.449H41.33a.449.449,0,0,0,.449-.449A6.146,6.146,0,0,0,35.64,68.5Zm-5.223,5.69a5.241,5.241,0,0,1,10.444,0Z"
                                transform="translate(-16.112 -46.934)"
                            />
                            <path
                                d="M42.645,50.789A3.145,3.145,0,1,0,39.5,47.645,3.145,3.145,0,0,0,42.645,50.789Zm0-5.391A2.246,2.246,0,1,1,40.4,47.645,2.246,2.246,0,0,1,42.645,45.4Z"
                                transform="translate(-23.117 -30.122)"
                            />
                            <path
                                d="M67.131,51.5a6.2,6.2,0,0,0-2.357.449.449.449,0,1,0,.338.833,5.307,5.307,0,0,1,2.019-.383,5.07,5.07,0,0,1,5.13,4.492H65.14a.449.449,0,1,0,0,.9h7.592a.449.449,0,0,0,.449-.449A5.955,5.955,0,0,0,67.131,51.5Z"
                                transform="translate(-40.625 -35.025)"
                            />
                            <path
                                d="M65.645,32.789A3.145,3.145,0,1,0,62.5,29.645,3.145,3.145,0,0,0,65.645,32.789Zm0-5.391A2.246,2.246,0,1,1,63.4,29.645,2.246,2.246,0,0,1,65.645,27.4Z"
                                transform="translate(-39.228 -17.513)"
                            />
                            <path
                                d="M14.883,57.326a.449.449,0,0,0-.446-.449H7.419a5.082,5.082,0,0,1,5.133-4.492,5.319,5.319,0,0,1,2.013.389.452.452,0,0,0,.338-.839,6.212,6.212,0,0,0-2.351-.455A5.966,5.966,0,0,0,6.5,57.326a.449.449,0,0,0,.449.449h7.487A.449.449,0,0,0,14.883,57.326Z"
                                transform="translate(0 -35.011)"
                            />
                            <path
                                d="M19.645,32.789A3.145,3.145,0,1,0,16.5,29.645,3.145,3.145,0,0,0,19.645,32.789Zm0-5.391A2.246,2.246,0,1,1,17.4,29.645,2.246,2.246,0,0,1,19.645,27.4Z"
                                transform="translate(-7.005 -17.513)"
                            />
                            <path
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
                                d="M38.038,68.5A8.546,8.546,0,0,0,29.5,77.038a.625.625,0,0,0,.625.625H45.951a.625.625,0,0,0,.625-.625A8.546,8.546,0,0,0,38.038,68.5Zm-7.264,7.913a7.289,7.289,0,0,1,14.523,0Z"
                                transform="translate(1074.389 19.48)"
                            />
                            <path
                                d="M43.873,53.246A4.373,4.373,0,1,0,39.5,48.873,4.373,4.373,0,0,0,43.873,53.246Zm0-7.5a3.124,3.124,0,1,1-3.124,3.124A3.124,3.124,0,0,1,43.873,45.749Z"
                                transform="translate(1068.554 33.484)"
                            />
                            <path
                                d="M68.162,51.5a8.621,8.621,0,0,0-3.278.625.625.625,0,1,0,.471,1.158,7.38,7.38,0,0,1,2.807-.533A7.051,7.051,0,0,1,75.3,59h-9.9a.625.625,0,0,0,0,1.249H75.95a.625.625,0,0,0,.625-.625A8.281,8.281,0,0,0,68.162,51.5Z"
                                transform="translate(1053.969 29.4)"
                            />
                            <path
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

    const menuRender = (menus) => {

        return menus.map(
            menu => {

                return (
                    <React.Fragment key={menu.id}>
                        <ListItem
                            classes={{
                                root: classes.listRoot
                            }}
                            button
                            onClick={handleClick.bind(this, menu.id)}
                            className={
                                open === menu.id ?
                                    `${classes.menuList} ${classes.menuListActive}`
                                    :
                                    classes.menuList
                            }
                        >
                            <div>
                                {
                                    iconRender(menu.staticName)
                                }
                            </div>
                            <div className={classes.textElem}>
                                <span>{menu.name}</span>
                            </div>
                            <div>
                                {open === menu.id ? <ExpandLess/> : <ExpandMore/>}
                            </div>
                        </ListItem>
                        <Collapse classes={{container: classes.nested}} in={open === menu.id} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    menu.subMenus.length ?
                                        menu.subMenus.map(
                                            subMenu => {

                                                return (
                                                    <ListItem
                                                        key={subMenu.id}
                                                        button
                                                        className={classes.nested}
                                                        onClick={
                                                            () => {
                                                                setOpen(null)
                                                                props.setMenu(false)
                                                                props.history.push(subMenu.url)
                                                            }
                                                        }
                                                    >
                                                        <ListItemText classes={{primary: classes.listText}}  primary={subMenu.name}/>
                                                    </ListItem>
                                                )
                                            }
                                        )
                                        :
                                        null
                                }
                            </List>
                        </Collapse>
                    </React.Fragment>
                )
            }
        )
    }

    return (
        <div className={props.menu ? `${classes.menu} ${classes.openMenu}` : classes.menu}>
            <div>
                {
                    props.menus ?
                        menuRender(props.menus)
                        :
                        null
                }
            </div>
        </div>
    )
}

export default withRouter(MobileMenu);