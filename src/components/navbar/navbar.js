import React, {useState} from 'react';
import cls from './nabar.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "../../containers/layouts/components/sidebar/sidemenu/icons";
import Translate from "../../Translate";
import {NavLink, withRouter} from "react-router-dom";
import Localize from "../../containers/localize/localizeContainer";
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import CollapseUi from '@material-ui/core/Collapse';
import userImage from "../../assets/img/portrait/small/avatar-s-1.png";
import LogoutComponent from "../../containers/auth/logoutContainer";
import SessionStorage from "../../services/SessionStorage";
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';

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
    const [isOpen, setIsOpen] = useState(false)
    const [user] = useState(SessionStorage.get("user"))

    const handleClick = () => {
        setIsOpen(!isOpen)
    };

    const sideMenuItem = key => {

        if (props.data[key].name !== 'translations' && props.data[key].name !== 'company' && props.data[key].name !== 'suppliers' && props.data[key].name !== 'positions' && props.data[key].name !== 'Currency' && props.data[key].name !== 'Import') {
            if (props.permissions[props.data[key].name] && props.permissions[props.data[key].name].length === 0) {
                return <div></div>
            } else {
                return (

                    <NavLink
                        key={key}
                        to={`/${props.data[key].name.trim()}`}
                        className={`${cls.navLink} my-0 mb-1 my-lg-2 mx-1`}
                        activeClassName={cls.active}
                        onClick={() => setIsOpen(false)}
                    >
                        <StyledMenuItem
                        style={props.match.path === `/${props.data[key].name.trim()}` ? {borderBottom: '1px solid rgba(0, 0, 0, .1)'} : null}
                    >
                        <i className="menu-icon" style={props.headerIconColor ? {
                            color: props.headerIconColor,
                            transition: '500ms'
                        } : null}>
                            <Icon tag={props.data[key].icon.trim()}/>
                        </i>
                        <span className="menu-item-text d-none d-sm-inline" style={props.headerFontColor ? {
                            color: props.headerFontColor,
                            transition: '500ms'
                        } : null}><Translate name={props.data[key].name.trim()}/></span>
                    </StyledMenuItem>
                    </NavLink>
                )
            }
        }

    }
    return (
        <AppBar
            color={'inherit'}
            position={props.position}
            style={{
                zIndex: 14,
                paddingTop: 10,
                backgroundColor: props.headerBackgroundColor,
                transition: '500ms',
                color: props.headerFontColor
            }}
        >
            <Toolbar className={classes.toolbar} style={{minHeight: 'auto', transition: '500ms', padding: 0}}>
                <h5
                    onClick={() => props.history.push('/')}
                    className='px-0 pt-2 mx-1 my-0 d-block d-lg-none'
                    style={{
                        alignSelf: 'flex-start',
                        fontWeight: 100,
                        transition: '500ms',
                        color: props.headerFontColor,
                        cursor: 'pointer'
                    }}
                >
                    {props.name}
                </h5>
                <div className="ml-auto py-0 py-sm-0 d-block d-lg-none">
                    <Collapse isOpen={true} navbar>
                        <Nav className="d-flex p-0 m-0">
                            <Localize headerFontColor={props.headerFontColor}/>
                            <UncontrolledDropdown nav inNavbar className="p-0">
                                <DropdownToggle nav>
                                    <img src={userImage} alt="logged-in-user" className="rounded-circle width-35"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                 <span className="font-small-3"
                                       style={{color: props.headerFontColor, transition: '500ms'}}>
                                    {user.firstname} {user.lastname} <span
                                     className="text-muted">({user.position})</span>
                                 </span>
                                    </DropdownItem>
                                    <DropdownItem divider/>

                                    <LogoutComponent headerFontColor={props.headerFontColor}/>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </div>
            </Toolbar>
            <Toolbar className={classes.toolbar} style={{minHeight: 'auto', transition: '500ms', padding: 0}}>
                <h3
                    onClick={() => props.history.push('/')}
                    className='p-2 mr-2 d-none d-lg-inline'
                    style={{
                        alignSelf: 'flex-start',
                        fontWeight: 100,
                        borderRight: '1px solid #d5d5d5',
                        userSelect: 'none',
                        transition: '500ms',
                        color: props.headerFontColor,
                        cursor: 'pointer'
                    }}
                >
                    {props.name}
                </h3>
                {
                    props.searchIcon ?
                        <IconButton aria-label="search" color="inherit">
                            <SearchIcon style={{color: props.headerIconColor, transition: '500ms'}}/>
                        </IconButton>
                        :
                        null
                }
                {
                    props.data ?
                        Object.entries(props.data).length > 0 ?
                            Object.keys(props.data).map(
                                item => sideMenuItem(item)
                            )
                            :
                            null
                        :
                        null
                }
                <StyledMenuItem
                    className='my-0 mb-1 my-lg-2 mx-1'
                    aria-label="display more actions"
                    edge="end"
                    color="inherit"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{outline: 'none', cursor: "pointer"}}
                >
                    {
                        !isOpen ?
                            <SettingsIcon style={{color: props.headerIconColor, transition: '500ms'}}/>
                            :
                            <SettingsApplicationsIcon style={{color: props.headerIconColor, transition: '500ms'}}/>
                    }
                    <span className="menu-item-text d-none d-md-inline"
                          style={{color: props.headerFontColor, transition: '500ms'}}>
                        <Translate name={'Settings'}/>
                    </span>
                </StyledMenuItem>
                <div className="ml-auto py-2 py-sm-0 d-none d-lg-block">
                    <Collapse isOpen={true} navbar>
                        <Nav className="d-flex p-0 m-0">
                            <Localize headerFontColor={props.headerFontColor}/>
                            <UncontrolledDropdown nav inNavbar className="p-0">
                                <DropdownToggle nav>
                                    <img src={userImage} alt="logged-in-user" className="rounded-circle width-35"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                 <span className="font-small-3"
                                       style={{color: props.headerFontColor, transition: '500ms'}}>
                                    {user.firstname} {user.lastname} <span
                                     className="text-muted">({user.position})</span>
                                 </span>
                                    </DropdownItem>
                                    <DropdownItem divider/>

                                    <LogoutComponent headerFontColor={props.headerFontColor}/>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </div>
            </Toolbar>
            <CollapseUi in={isOpen} timeout="auto" unmountOnExit>
                <hr style={{width: '97%', borderColor: '#eee', marginBottom: 0, marginTop: 0}}/>
                <Toolbar className={classes.toolbar}
                         style={{minHeight: 'auto', transition: '500ms', padding: 0, flexWrap: 'wrap'}}>
                    <NavLink
                        to={`/menu`}
                        className={`${cls.navLink} my-1 my-lg-2 mx-1`}
                        activeClassName={cls.active}
                    >
                        <StyledMenuItem
                            style={props.match.path === `/menu` ? {borderBottom: '1px solid rgba(0, 0, 0, .1)'} : null}
                        >
                            <i className="menu-icon" style={props.headerIconColor ? {
                                color: props.headerIconColor,
                                transition: '500ms'
                            } : null}>
                                <Icon tag={"Edit"}/>
                            </i>
                            <span className="menu-item-text d-none d-lg-inline"
                                  style={{color: props.headerFontColor, transition: '500ms'}}><Translate
                                name={'EditMenu'}/></span>
                        </StyledMenuItem>
                    </NavLink>
                    {
                        props.data.map(
                            item => {
                                if (item.name === 'translations' || item.name === 'company' || item.name === 'suppliers' || item.name === 'positions' || item.name === 'Currency' || item.name === 'Import') {

                                    return (
                                        <NavLink
                                            key={item.id}
                                            to={`/${item.name.toLowerCase().trim()}`}
                                            className={`${cls.navLink} my-1 my-lg-2 mx-1`}
                                            activeClassName={cls.active}
                                        >
                                            <StyledMenuItem
                                                style={props.match.path === `/${item.name.toLowerCase().trim()}` ? {borderBottom: '1px solid rgba(0, 0, 0, .1)'} : null}
                                            >
                                                <i className="menu-icon" style={props.headerIconColor ? {
                                                    color: props.headerIconColor,
                                                    transition: '500ms'
                                                } : null}>
                                                    <Icon tag={item.icon.trim()}/>
                                                </i>
                                                <span className="menu-item-text d-none d-md-inline"
                                                      style={props.headerFontColor ? {
                                                          color: props.headerFontColor,
                                                          transition: '500ms'
                                                      } : null}><Translate name={item.name.trim()}/></span>
                                            </StyledMenuItem>
                                        </NavLink>
                                    )

                                } else {
                                    return null
                                }
                            }
                        )
                    }
                </Toolbar>
            </CollapseUi>
        </AppBar>
    );
}

export default withRouter(ProminentAppBar)