import React from "react";
import classes from "./suppliers-list-item.module.css";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const  SuppliersListItem = props => {

    return (
        <ListItem
            className={classes.listItem}
            button
            onClick={() => {
                props.selectSupplier(props.item)
            }}
        >
            <ListItemText id={props.item.id} primary={props.item.name} />
            {/*<ListItemSecondaryAction>*/}
            {/*    <Checkbox*/}
            {/*        size="small"*/}
            {/*        color={"default"}*/}
            {/*        edge="end"*/}
            {/*        onChange={props.handleToggle(props.item)}*/}
            {/*        checked={props.checked.indexOf(props.item) !== -1}*/}
            {/*        inputProps={{ 'aria-labelledby': props.item.id }}*/}
            {/*    />*/}
            {/*</ListItemSecondaryAction>*/}
        </ListItem>
    )
}

export default SuppliersListItem