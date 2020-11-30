import React, {useState} from 'react'
import classes from './otherFilters.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import Collapse from "@material-ui/core/Collapse";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";

const OtherFilters = props => {
    const [open, setOpen] = useState(true);

    const collapsed = () => {
        setOpen(!open)
    };

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
                                        <div key={item.id + Math.random()} className={classes.checkboxItem}>
                                            <CustomCheckbox
                                                className={classes.checkbox}
                                                checkBoxWindow={classes.checkBoxWindow}
                                                labelStyle={classes.labelStyle}
                                                label={item.name['am']}
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