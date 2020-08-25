import React from 'react'
import classes from './measurementFilter.module.css'
import CollapseUI from "../../../../../../../../components/UI/collapseUI/collapseUI";
import FormControlCheckbox from "../../../../../../../../components/UI/input/formControlLabel/formControlLabel";

const MeasurementFilter = props => {

    return (
        <div className={classes.measurementFilter}>
            <CollapseUI
                root={classes.categoryName}
                label={'Չափման միավոր'}
                children={
                    <div className={classes.filterWindow}>
                        <p>
                            <FormControlCheckbox
                                label={'Քաշային'}
                                labelPlacement={'end'}
                                colorSecondary={classes.colorSecondary}
                                labelStyle={classes.labelStyle}
                            />
                        </p>
                        <p>
                            <FormControlCheckbox
                                label={'Հատային'}
                                labelPlacement={'end'}
                                colorSecondary={classes.colorSecondary}
                                labelStyle={classes.labelStyle}
                            />
                        </p>
                    </div>
                }
            />
        </div>
    )
};

export default MeasurementFilter;