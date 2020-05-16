import React from 'react';
import TextField from '@material-ui/core/TextField';
import Translate from "../../Translate";


export default function InputUi(props) {

    return (
        <TextField
            style={{
                margin: props.margin
            }}
            id={props.id ? props.id : 'standard-basic'}
            label={props.label ? <Translate name={props.label}/> : props.label}
            name={props.name}
            type={props.type}
            value={props.value}
            min={0}
            max={props.max}
            onChange={props.onChange}
            onFocus={props.onFocus}
        />
    );
}
