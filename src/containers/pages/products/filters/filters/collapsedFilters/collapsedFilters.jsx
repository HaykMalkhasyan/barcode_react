import React, {useState} from 'react'
import classes from './collapsedFilters.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import RadioUI from "../../../../../../components/UI/input/radioUI/radioUI";
import Collapse from "@material-ui/core/Collapse";

const CollapsedFilters = props => {
    const [open, setOpen] = useState(true);

    const collapsed = () => {
      setOpen(!open)
    };

    return (
        <div className={`background-fff ${classes.collapsedFilters}`}>
            <CustomHeader
                type={'collapsed'}
                name={'Չափման միավոր'}
                open={open}
                // Methods
                onClick={collapsed}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div>
                    <RadioUI
                        emptyStyle={classes.empty}
                        empty={'դատարկ է'}
                        data={props.measurementsFilters}
                        color={classes.radioColor}
                        labelStyle="font-size-12 color-5D5D5D"
                    />
                </div>
            </Collapse>
        </div>
    )
};

export default CollapsedFilters;