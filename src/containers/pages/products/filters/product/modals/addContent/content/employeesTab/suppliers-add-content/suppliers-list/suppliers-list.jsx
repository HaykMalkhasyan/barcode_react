import React from "react";
import classes from "./suppliers-list.module.css";
import List from "@material-ui/core/List";
import SuppliersListItem from "./suppliers-list-item/suppliers-list-item";
import {ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

const SuppliersList = props => {

    return (
        <List dense={true}>
            {
                props.suppliers ?
                    props.suppliers.length ?
                        props.suppliers.map(item => {

                            return props.selected.indexOf(item) === -1 ?
                                <SuppliersListItem
                                    key={`supplier-${item.id}`}
                                    item={item}
                                    checked={props.checked}
                                    // Methods
                                    selectSupplier={props.selectSupplier}
                                    handleToggle={props.handleToggle}
                                />
                                :
                                <ListItem
                                    key={`supplier-${item.id}`}
                                    className={classes.listItem}
                                    button
                                >
                                    <ListItemText primary={item.name} />
                                    <ListItemSecondaryAction>
                                        <DoneIcon fontSize="small" style={{color: "#67CA51"}}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                        })
                        :
                        <small className={classes.empty}>Դատարկ է</small>
                    :
                    null
            }
        </List>
    )
}

export default SuppliersList