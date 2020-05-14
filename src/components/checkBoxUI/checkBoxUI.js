import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Translate from "../../Translate";

export default function CheckboxesUi(props) {

    return (
            <label className="p-0 mt-0 mb-0">
                <Checkbox
                    checked={props.checked}
                    size={props.size}
                    color={props.color}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
                <span><Translate name={props.label}/></span>
            </label>
    );
}
