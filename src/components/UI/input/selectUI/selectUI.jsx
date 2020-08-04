import React from 'react'
import {FormControl, InputLabel, Select, MenuItem} from "@material-ui/core"

const SelectUI = props => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl className={props.formControl}>
            <InputLabel id={props.labelId}>{props.label}</InputLabel>
            <Select
                classes={{root: props.root}}
                labelId={props.labelId}
                id={props.id}
                value={age}
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
};

export default SelectUI;