import React from 'react';
import Switch from '@material-ui/core/Switch';
import Translate from "../../Translate";

export default function SwitchesUi(props) {

    return (
        <label
            style={{
                userSelect: 'none',
                marginBottomL: props.mBottom
            }}
        >
            <Translate name={props.label}/>
            <Switch
                checked={props.value}
                onChange={props.onChange}
                color={props.color}
                name={props.name}
                value={props.value}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </label>
    );
}
