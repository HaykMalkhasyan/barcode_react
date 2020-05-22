import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Translate from "../../Translate";

export default function CollapseUi(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={<Translate name={props.btnName}/>} style={{color: props.customBackgroundColor}} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit style={{color: props.customBackgroundColor}}>
                {props.children}
            </Collapse>
        </>
    );
}
