import React, {useState} from 'react'
import classes from './tools-select.module.css'
import Backdrop from "../../backdrop/backdrop";
import Icons from "../../../Icons/icons";
import {ListItemText, ListItem} from "@material-ui/core";

const ToolsSelect = props => {
    const [value, setValue] = useState('Հարմարեցված');

    const selectHandler = item => {
        setValue(item.name);
        props.setDrop(null)
    };

    return (
        <>
            {
                props.open === props.name ?
                    <Backdrop className={classes.backdrop} onClick={() => props.setDrop(null)}/>
                    :
                    null
            }
            <label className={props.labelRoot} htmlFor={props.id} onClick={() => props.setDrop(props.name)}>{props.label}</label>
            <div className={classes.toolsSelect}>
                <div className={classes.openDrop} onClick={() => props.setDrop(props.name)}>
                    {
                        props.open === props.name ?
                            <Icons type={'triangle-up'} className={classes.arrowIcon} width={8} height={4}/>
                            :
                            <Icons type={'triangle-down'} className={classes.arrowIcon} width={8} height={4}/>
                    }
                </div>
                <input
                    name={props.name}
                    readOnly={true}
                    id={props.id}
                    type={'text'}
                    value={value}
                    className={props.open === props.name ? `${classes.input} ${classes.opened}` : classes.input}
                />
                {
                    props.open === props.name ?
                        <div className={classes.selectListWindow}>
                            <ListItem
                                disabled={true}
                                // button
                                classes={{root: props.listItemRoot}}
                            >
                                <ListItemText classes={{root: props.listItemTextRoot}} primary={'Հարմարեցված'} />
                            </ListItem>
                            {props.data && props.data.length ? <hr className={classes.line}/> : null}
                            {
                                props.data && props.data.length ?
                                    props.data.map(
                                        item => {

                                            return (
                                                <ListItem
                                                    key={`drop-list-${props.name}-${item.id}`}
                                                    button
                                                    classes={{root: props.listItemRoot}}
                                                    // Methods
                                                    onClick={() => selectHandler(item)}
                                                >
                                                    <ListItemText classes={{root: props.listItemTextRoot}} primary={item.name} />
                                                </ListItem>
                                            )
                                        }
                                    )
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
            </div>
        </>
    )
};

export default ToolsSelect;