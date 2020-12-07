import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const RadioUI = props => {

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={props.handleChange}>
                {props.children}
                {/*<FormControlLabel value="female" control={<Radio />} label="Female" />*/}
                {/*<FormControlLabel value="male" control={<Radio />} label="Male" />*/}
                {/*<FormControlLabel value="other" control={<Radio />} label="Other" />*/}
                {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioUI