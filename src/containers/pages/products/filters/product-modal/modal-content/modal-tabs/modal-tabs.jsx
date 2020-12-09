import React from "react";
import classes from "./modal-tabs.module.css";
import {ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {getLanguage} from "../../../../../../../controllers/languages/languages";
import cookie from "../../../../../../../services/cookies";
import ErrorIcon from "@material-ui/icons/Error";
import Tooltip from "@material-ui/core/Tooltip";


const ModalTabs = props => {

    const errorRender = (tab, Icon) => {
        const error = [...props.tabErrors];

        if (tab && (error.indexOf(tab.name) !== -1 ||error.indexOf(`${tab.name}_name`) !== -1 || error.indexOf(`${tab.name}_service`) !== -1 || error.indexOf(`${tab.name}_unit`) !== -1)) {
            return (
                <Tooltip title={'Ունեք չլրացված դաշտեր'} placement="right">
                    <ErrorIcon className={classes.errorIcon}/>
                </Tooltip>
            )
        }
        return <Icon />
    }

    return (
        <div className={classes.modalTabs}>
            {
                props.modalTabs && props.modalTabs.length ?
                    props.modalTabs.map(({icon:Icon, ...item}) => {

                        return (
                            <ListItem
                                key={`tabs-item-${item.id}`}
                                button
                                className={props.activeTab === item.index ? `${classes.listItem} ${classes.active}` : classes.listItem}
                                onClick={() => props.onClick(item.index)}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    {errorRender(item, Icon)}
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={getLanguage(cookie.get("language") || "am", item.name)} />
                            </ListItem>
                        )
                    })
                    :
                    null
            }
        </div>
    )
}

export default ModalTabs