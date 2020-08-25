import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const [value, setValue] = React.useState([0, 1000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={props.classes}>
            <Typography className={props.labelStyle} id="range-slider" gutterBottom>
                {props.label}
            </Typography>
            <Slider
                classes={{
                    root: props.root
                }}
                min={props.min}
                max={props.max}
                step={props.step}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
