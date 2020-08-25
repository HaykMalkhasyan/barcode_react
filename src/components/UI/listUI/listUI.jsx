import React from 'react'
import classes from './listUI.module.css'
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ListUI = props => {

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader classes={{root: classes.listSubheaderRoot}} component="div" id="nested-list-subheader">
                    {props.label}
                </ListSubheader>
            }
            className={classes.list}
        >
            {
                props.data && props.data.length ?
                    props.data.map(
                        (item, index) => {

                            return item.id !== 0 ?
                                <ListItem
                                    key={index}
                                    selected={props.selectedIndex === index}
                                    button
                                    // Methods
                                    onClick={() => props.onClick(item.id, index)}
                                >
                                    <ListItemText primary={item.name} />
                                </ListItem>
                                :
                                null
                        }
                    )
                    :
                    <small className={classes.empty}>{props.empty}</small>
            }
        </List>
    )
};

export default ListUI;