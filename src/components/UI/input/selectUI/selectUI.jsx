import React from 'react'
import {FormControl, InputLabel, Select, MenuItem} from "@material-ui/core"
import FormHelperText from "@material-ui/core/FormHelperText";

const SelectUI = props => {

    return (
        <FormControl className={props.formControl} error={props.error} required={props.required}>
            <InputLabel className={props.labelStyle} id={props.labelId}>{props.label}</InputLabel>
            <Select
                classes={{root: props.root}}
                labelId={props.labelId}
                id={props.id}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            >
                {
                    props.data && props.data.length ?
                        props.data.map(
                            item => {
                                return (
                                    <MenuItem
                                        key={props.name + '-' + item.id}
                                        value={item.value}
                                    >
                                        {item.name}
                                    </MenuItem>
                                )
                            }
                        )
                        :
                        <MenuItem value={''}>դատարկ է</MenuItem>
                }
            </Select>
            {
                props.error ?
                    <FormHelperText>{props.helperText}</FormHelperText>
                    :
                    null
            }
        </FormControl>
    )
};

export default SelectUI;