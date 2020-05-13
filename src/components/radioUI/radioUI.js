import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Translate from "../../Translate";

export default function RadioUi(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"><Translate name={props.headerName}/></FormLabel>
            <RadioGroup aria-label="gender" name={props.name} value={parseInt(value)} onChange={handleChange}>
                <FormControlLabel
                    value={0}
                    control={<Radio color={props.color} />}
                    label={<Translate name={'all'}/>}
                />
                {
                    props.data ?
                        props.data.map(
                            item => {

                                return (
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.value}
                                        size={props.size}
                                        control={<Radio color={props.color} />}
                                        label={<Translate name={item.name}/>}
                                    />
                                )
                            }
                        )
                        :
                        null
                }
            </RadioGroup>
        </FormControl>
    );
}
