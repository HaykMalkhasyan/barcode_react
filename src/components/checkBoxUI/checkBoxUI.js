import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Translate from "../../Translate";

export default function CheckboxesUi(props) {

    return (
            <label
                className="p-0 mt-0 mb-0"
                style={{
                    userSelect: 'none',
                    position: 'relative',
                    zIndex: 10,
                    cursor: 'pointer',
                    color: props.useColor
                }}
            >
                <Checkbox
                    style={{
                        position: 'relative',
                        zIndex: -1,
                        padding: props.padding
                    }}
                    hidden={props.hidden}
                    checked={props.checked}
                    size={props.size}
                    color={props.color}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
                <span>
                    {
                        props.translate ?
                            <Translate name={props.label}/>
                            :
                            props.label
                    }
                </span>
            </label>
    );
}
