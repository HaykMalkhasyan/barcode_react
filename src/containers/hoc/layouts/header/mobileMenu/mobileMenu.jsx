import React, {useState} from "react";
import classes from './mobileMenu.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {withRouter} from "react-router-dom";
import Icons from "../../../../../components/Icons/icons";
import {getLanguage} from "../../../../../controllers/languages/languages";

const MobileMenu = props => {
    const [open, setOpen] = useState(null);

    const handleClick = id => {
        open === id ?
            setOpen(null)
            :
            setOpen(id)
    };

    const iconRender = (staticName) => {

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
            default:
                return null;
        }
    };

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
                                <span>{getLanguage('am',menu.staticName)}</span>
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
                                                                setOpen(null);
                                                                props.setMenu(false);
                                                                props.history.push(subMenu.url)
                                                            }
                                                        }
                                                    >
                                                        <ListItemText classes={{primary: classes.listText}}  primary={getLanguage('am', subMenu.name)}/>
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
    };

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
};

export default withRouter(MobileMenu);