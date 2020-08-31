import React, {useRef} from 'react'
import classes from './customSelect.module.css'
import Backdrop from "../../backdrop/backdrop";
import CustomInput from "../customInput/customInput";
import Icons from "../../../Icons/icons";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

const CustomSelect = props => {
    const inputRef = useRef();

    const inputBlurHandler = () => {
        props.toggleFocus(inputRef.current.name);
        props.toggle(null);
    };

    const labelClickHandler = () => {
        props.toggleFocus(inputRef.current.name);
        props.toggle(inputRef.current.name);
    };

    return (
        <div className={classes.customSelect}>
            {
                props.open === props.name ?
                    <Backdrop
                        className={classes.backdrop}
                        // Methods
                        onClick={inputBlurHandler}
                    />
                    :
                    null
            }
            <div className={props.focus === props.name ? `${classes.select} ${classes.focused}` : classes.select}>
                <div className={props.open === props.name ? `${classes.content} ${classes.contentOpened}` : classes.content}>
                    {
                        props.data && props.data.length ?
                            props.data.map(
                                item => {
                                    return (
                                        <Tooltip key={item.id + Math.random()} title={item.name} placement="right">
                                            <ListItem button onClick={() => props.clickHandler(item, inputRef.current.name)}>
                                                <ListItemText classes={{root: classes.root}} primary={item.name} />
                                            </ListItem>
                                        </Tooltip>
                                    )
                                }
                            )
                            :
                            <small>դատարկ է</small>
                    }
                </div>
                <span className={classes.arrowButton}>
                    <Icons width={8} height={14} type={'tree-arrow-down'} className={classes.arrowDown}/>
                </span>
                <CustomInput
                    id={props.name}
                    // Label
                    label={
                        <div className={props.value.length ? `${classes.labelWindow} ${classes.labelWindowOpened}` : classes.labelWindow}>{props.inputLabel}</div>
                    }
                    classNameLabel={classes.label}
                    name={props.name}
                    // Methods
                    onClick={labelClickHandler}
                    // Input
                    readOnly={true}
                    inputRef={inputRef}
                    classNameInput={classes.input}
                    value={props.value}
                    // Methods
                />
            </div>
        </div>
    )
};

export default CustomSelect;