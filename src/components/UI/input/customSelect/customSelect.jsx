import React, {useEffect, useRef, useState} from 'react'
import classes from './customSelect.module.css'
import Backdrop from "../../backdrop/backdrop";
import CustomInput from "../customInput/customInput";
import Icons from "../../../Icons/icons";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const CustomSelect = props => {
    const inputRef = useRef();
    const [value, setValue] = useState('');
    const cls = [
        classes.select,
        props.focus === props.name ? classes.focused : '',
        value.length ? classes.active : '',
        props.open === props.name ? classes.top : '',
        props.error ? classes.error : ''
    ]

    useEffect(
        () => {
            if (props.value !== undefined && props.data && props.data.length) {
                for (let item of props.data) {
                    if (item.id === parseInt(props.value)) {
                        setValue(item.name)
                    }
                }
            }
        }, [props.value, props.data]
    );

    const inputBlurHandler = () => {
        props.toggleFocus(inputRef.current.name);
        props.toggle(null);
    };

    const labelClickHandler = () => {
        props.toggleFocus(inputRef.current.name);
        props.toggle(inputRef.current.name);
    };

    const selectItemHandler = (item, name) => {
        setValue(item.name);
        props.clickHandler(item, name)
    };

    return (
        <div className={props.className || classes.customSelect}>
            {
                props.open && props.open === props.name ?
                    <Backdrop
                        className={props.open && props.open === props.name ? `${classes.backdrop} ${classes.backdropOpened}` : classes.backdrop}
                        // Methods
                        onClick={inputBlurHandler}
                    />
                    :
                    null
            }
            <div
                className={cls.join(" ")}
            >
                <div
                    className={props.open && props.open === props.name ? `${classes.content} ${classes.contentOpened}` : classes.content}>
                    {
                        props.data && props.data.length ?
                            props.data.map(
                                item => {
                                    return (
                                        <ListItem
                                            key={'slect-list-' + item.id}
                                            button
                                            onClick={() => selectItemHandler(item, inputRef.current.name)}
                                        >
                                            <ListItemText classes={{root: classes.root}} primary={item.name}/>
                                        </ListItem>
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
                        <div
                            className={
                                `
                                ${
                                    value.length ?
                                        `${classes.labelWindow} ${classes.labelWindowOpened}`
                                        :
                                        classes.labelWindow
                                }
                                ${
                                    props.error ?
                                        `${classes.errorLabel} ${classes.labelWindow}`
                                        :
                                        ''
                                }
                                `
                            }
                        >
                            {props.inputLabel}
                        </div>
                    }
                    classNameLabel={classes.label}
                    name={props.name}
                    // Methods
                    onClick={labelClickHandler}
                    // Input
                    readOnly={true}
                    inputRef={inputRef}
                    classNameInput={classes.input}
                    value={value}
                    // Methods
                />
            </div>
        </div>
    )
};

export default CustomSelect;