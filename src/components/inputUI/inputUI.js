import React from 'react';
import TextField from '@material-ui/core/TextField';
import Translate from "../../Translate";


export default function InputUi(props) {

    return (
        <TextField
            id={'standard-basic'}
            label={<Translate name={props.label}/>}
            name={props.name}
            type={props.type}
            min={0}
            max={props.max}
        />
    );
}
