import React from 'react'
import LinearProgress from "@material-ui/core/LinearProgress";

const LinearSpinner = props => {

    return (
        <LinearProgress
            valueBuffer={100}
            value={0}
            classes={{
                root: props.progres,
                colorPrimary: props.progresBgColor,
                barColorPrimary: props.barColorPrimary
            }}
        />
    )
};

export default LinearSpinner;