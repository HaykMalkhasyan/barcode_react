import React from 'react'
import classes from './activeFilter.module.css'
import CustomCheckbox from "../../../../../../../../components/UI/input/customCheckbox/customCheckbox";

const ActiveFilter = props => {

    return (
        <div className={classes.activeFilter}>
            <CustomCheckbox
                id={'active'}
                checked={true}
                name={'active'}
                className={classes.checkboxLabel}
                label={'Ակտիվ'}
                labelStyle={classes.labelStyle}
            />
        </div>
    )
};

export default ActiveFilter;