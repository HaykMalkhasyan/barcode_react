import React, {useState} from 'react'
import classes from './advancedSearchWindow.module.css'
import {Collapse} from "@material-ui/core";
import AsItem from "./asItem/asItem";
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";

const AdvancedSearchWindow = props => {
    const [open, setOpen] = useState(null);
    const [focus, setFocus] = useState(null);
    const [value, setValue] = useState({
        warehouse: '',
        price: '',
        supplier: ''
    });

    const clickHandler = (item, name) => {
        const initialValue = {...value};
        initialValue[name] = item.id;
        setValue(initialValue);
        setFocus(null);
        setOpen(null)
    };

    const toggleFocus = name => {
        if (name === open) {
            setFocus(null)
        } else {
            setFocus(name)
        }
    };

    const toggleHandler = name => {
        if (name === open) {
            setOpen(null)
        } else {
            setOpen(name)
        }
    };

    return (
        <div className={`background-fff ${classes.searchContainer}`}>
            <CustomHeader
                type={'collapsed'}
                name={'Լրացուցիչ պարամետրեր'}
                open={props.open}
                // Methods
                onClick={props.collapse}
            />
            <Collapse in={props.open} timeout="auto" unmountOnExit>
                <div className={classes.advancedSearchContainer}>
                    {
                        props.mainFilters && props.mainFilters.length ?
                            props.mainFilters.map(
                                (item, index) => {

                                    return (
                                        <React.Fragment key={item.name + item.id}>
                                            <AsItem
                                                open={open}
                                                label={item.label['am']}
                                                inputLabel={item.input_label['am']}
                                                name={item.name}
                                                focus={focus}
                                                value={value[item.name]}
                                                minLabel={item.min['am']}
                                                minName={item.minName}
                                                maxName={item.maxName}
                                                maxLabel={item.max['am']}
                                                data={item.data}
                                                // Methods
                                                toggle={toggleHandler}
                                                toggleFocus={toggleFocus}
                                                clickHandler={clickHandler}
                                            />
                                            {
                                                index !== props.mainFilters.length - 1 ?
                                                    <hr className={classes.line}/>
                                                    :
                                                    null
                                            }
                                        </React.Fragment>
                                    )
                                }
                            )
                            :
                            <small>դատարկ է</small>
                    }
                </div>
            </Collapse>
        </div>
    )
};

export default AdvancedSearchWindow;