import React from "react";
import classes from "./modal-tabs.module.css";
import {ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {getLanguage} from "../../../../../../../controllers/languages/languages";
import cookie from "../../../../../../../services/cookies";


const ModalTabs = props => {

    return (
        <div className={classes.modalTabs}>
            {
                props.modalTabs && props.modalTabs.length ?
                    props.modalTabs.map(({icon:Icon, ...item}) => {

                        return (
                            <ListItem className={props.activeTab === item.index ? `${classes.listItem} ${classes.active}` : classes.listItem} button key={`tabs-item-${item.id}`} onClick={() => props.onClick(item.index)}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <Icon />
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