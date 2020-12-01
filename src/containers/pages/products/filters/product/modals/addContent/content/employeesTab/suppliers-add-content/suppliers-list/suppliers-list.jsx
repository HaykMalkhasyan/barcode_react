import React from "react";
import classes from "./suppliers-list.module.css";
import List from "@material-ui/core/List";
import SuppliersListItem from "./suppliers-list-item/suppliers-list-item";
import {ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

const SuppliersList = props => {

    const hasHaveItem = (array, item) => {

        for (let itemArray of array) {
            if (itemArray.id === item.id) {
                return true
            }
        }
        return false
    }

    const listContentRender = item => {
        if (item.name.search(props.search) !== -1) {
            if (props.selected && props.selected.length && hasHaveItem(props.selected, item)) {
                return (
                    <ListItem
                        key={`supplier-${item.id}`}
                        className={classes.listItem}
                        button
                    >
                        <ListItemText primary={item.name}/>
                    </ListItem>
                )
            }
            return (
                <SuppliersListItem
                    key={`supplier-${item.id}`}
                    item={item}
                    checked={props.checked}
                    // Methods
                    selectSupplier={props.selectSupplier}
                    handleToggle={props.handleToggle}
                />
            )
        }
    }

    return (
        <List dense={true}>
            {
                props.suppliers ?
                    props.suppliers.length ?
                        props.suppliers.map(item => listContentRender(item))
                        :
                        <small className={classes.empty}>Դատարկ է</small>
                    :
                    null
            }
        </List>
    )
}

export default SuppliersList