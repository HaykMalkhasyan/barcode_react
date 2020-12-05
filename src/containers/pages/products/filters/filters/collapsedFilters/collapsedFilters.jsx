import React, {useState} from 'react'
import classes from './collapsedFilters.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import RadioUI from "../../../../../../components/UI/input/radioUI/radioUI";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";

const CollapsedFilters = props => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(+event.target.value);
        props.measurementFiltered(+event.target.value)
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
                                            className={classes.checkbox}
                                            checkBoxWindow={classes.checkBoxWindow}
                                            labelStyle={classes.labelStyle}
                                            label={item.name}
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