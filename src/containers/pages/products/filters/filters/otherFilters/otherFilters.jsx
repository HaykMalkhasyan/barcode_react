import React, {useEffect, useState} from 'react'
import classes from './otherFilters.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import Collapse from "@material-ui/core/Collapse";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";

const OtherFilters = props => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (props.advancedSearchConfig && Object.keys(props.advancedSearchConfig).length === 0) {
            setSelected([])
        }
    }, [props.advancedSearchConfig])

    const collapsed = () => {
        setOpen(!open)
    };

    const changeHandler = (event, id) => {
        const initial_selected = [...selected];
        if (initial_selected.indexOf(id) === -1) {
            initial_selected.push(id)
        } else {
            initial_selected.splice(initial_selected.indexOf(id), 1)
        }
        setSelected(initial_selected)
        props.otherFiltered(event.target.name, +event.target.value)
    }

    return (
        <div className={classes.otherFilters}>
            <CustomHeader
                type={'collapsed'}
                name={'Այլ պարամետրեր'}
                open={open}
                // Methods
                onClick={collapsed}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div>
                    {
                        props.otherFilters && props.otherFilters.length ?
                            props.otherFilters.map(
                                item => {

                                    return (
                                        <div key={`other-filter-item-${item.id}`} className={classes.checkboxItem}>
                                            <CustomCheckbox
                                                checked={selected.indexOf(item.id) !== -1}
                                                className={classes.checkbox}
                                                checkBoxWindow={classes.checkBoxWindow}
                                                labelStyle={classes.labelStyle}
                                                name={item.name}
                                                value={item.value}
                                                label={item.label}
                                                // EVENTS
                                                onChange={event => {
                                                    changeHandler(event, item.id)
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            )
                            :
                            <small>դատարկ ե</small>
                    }
                </div>
            </Collapse>
        </div>
    )
};

export default OtherFilters;