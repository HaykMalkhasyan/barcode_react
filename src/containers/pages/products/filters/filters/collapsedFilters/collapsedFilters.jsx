import React, {useEffect, useState} from 'react'
import classes from './collapsedFilters.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import Collapse from "@material-ui/core/Collapse";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";

const CollapsedFilters = props => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = React.useState([]);

    useEffect(() => {
        if (props.advancedSearchConfig && Object.keys(props.advancedSearchConfig).length === 0) {
            setValue([])
        }
    }, [props.advancedSearchConfig])

    const handleChange = (event) => {
        const selected = [...value];
        if (selected.indexOf(+event.target.value) === -1) {
            selected.push(+event.target.value)
        } else {
            selected.splice(selected.indexOf(+event.target.value), 1)
        }
        setValue(selected);
        props.measurementFiltered(selected)
    };

    const collapsed = () => {
      setOpen(!open)
    };

    return (
        <div className={classes.collapsedFilters}>
            <CustomHeader
                type={'collapsed'}
                name={'Չափման միավոր'}
                open={open}
                // Methods
                onClick={collapsed}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className={classes.measurementFilterWindow}>
                    {
                        props.measurements && props.measurements.length ?
                            props.measurements.map(item => {

                                return (
                                    <div className={classes.checkboxItem} key={`measurements-filter-${item.id}`}>
                                        <CustomCheckbox
                                            checked={value.indexOf(item.id) !== -1}
                                            className={classes.checkbox}
                                            checkBoxWindow={classes.checkBoxWindow}
                                            labelStyle={classes.labelStyle}
                                            label={item.name}
                                            value={item.value}
                                            // EVENTS
                                            onChange={handleChange}
                                        />
                                    </div>
                                )
                            })
                            :
                            <span className={classes.empty}>Դատարկ է</span>
                    }
                </div>
            </Collapse>
        </div>
    )
};

export default CollapsedFilters;