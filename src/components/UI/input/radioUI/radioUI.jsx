import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const RadioUI = props => {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(+event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                {
                    props.data && props.data.length ?
                        props.data.map(
                            item => {

                                return (
                                    <FormControlLabel
                                        key={item.id + Math.random()}
                                        value={item.id}
                                        classes={{
                                            label: props.labelStyle
                                        }}
                                        control={
                                            <Radio
                                                color={'primary'}
                                                size='small'
                                                classes={{
                                                    colorPrimary: props.color
                                                }}
                                            />
                                        }
                                        label={item.name['am']}
                                    />
                                )
                            }
                        )
                        :
                        <small className={props.emptyStyle}>{props.empty}</small>
                }
                {/*<FormControlLabel value="female" control={<Radio />} label="Female" />*/}
                {/*<FormControlLabel value="male" control={<Radio />} label="Male" />*/}
                {/*<FormControlLabel value="other" control={<Radio />} label="Other" />*/}
                {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioUI