import React from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from "@material-ui/core/FormControlLabel";


const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const RadioUI = props => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div>
            <FormControlLabel
                value="end"
                onChange={handleChange}
                control={
                    <GreenRadio
                        checked={selectedValue === 'c'}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                    />
                }
                label="Start"
                labelPlacement="end"
            />
        </div>
    );
};

export default RadioUI
