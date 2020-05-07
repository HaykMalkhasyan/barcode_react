import React from "react";
import classes from './contextMenu.module.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as Icon from 'react-feather'
import Translate from "../../../../../Translate";

const ContextMenu = props => {

    return (
        <div
            className={classes.myContextMenu}
            style={{left: `${props.left}px`, top: `${props.top}px`}}
        >
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem style={{padding: 0}} button onClick={props.onClick.bind(this, 'add', props.group_id, props.id)}>
                    <Icon.Plus size={18} className="success mr-1"/>
                    <ListItemText primary={<Translate name={'add'}/>} />
                </ListItem>
                <ListItem style={{padding: 0}} button onClick={props.onClick.bind(this, 'edit', props.group_id, props.id)}>
                    <Icon.Edit size={18} className="warning mr-1"/>
                    <ListItemText primary={<Translate name={'edit'}/>} />
                </ListItem>
                <ListItem style={{padding: 0}} button onClick={props.onClick.bind(this, 'move', props.group_id, props.id)}>
                    <Icon.Move size={18} className="info mr-1"/>
                    <ListItemText primary={<Translate name={'move'}/>} />
                </ListItem>
                <ListItem style={{padding: 0}} button onClick={props.onClick.bind(this, 'delete', props.group_id, props.id)}>
                    <Icon.Trash size={18} className="danger mr-1"/>
                    <ListItemText primary={<Translate name={'delete'}/>} />
                </ListItem>

            </List>
        </div>
    )
}

export default ContextMenu