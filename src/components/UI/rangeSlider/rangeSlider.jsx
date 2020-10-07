import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider(props) {

    const handleChange = (event, newValue) => {
        props.changeRangeSlider(newValue)
    };

    return (
        <div className={props.classes}>
            <Typography className={props.labelStyle} id={props.labellebdy || "range-slider"} gutterBottom>
                {props.label}
            </Typography>
            <Slider
                classes={{
                    root: props.root,
                    thumb: props.thumb
                }}
                name={props.name}
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                marks={props.marks}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby={props.labellebdy || "range-slider"}
                getAriaValueText={valuetext}
            />
        </div>
    );
}
