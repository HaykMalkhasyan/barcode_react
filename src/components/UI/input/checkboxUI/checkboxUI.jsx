import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxesUi(props) {

    return (
        <label
            className={`p-0 mt-0 mb-0 ${props.className}`}
            style={{
                userSelect: 'none',
                position: 'relative',
                zIndex: 2,
                cursor: 'pointer',
                color: props.useColor
            }}
        >
            <span hidden={props.hidden}>
                <Checkbox
                    style={{
                        position: 'relative',
                        zIndex: -1,
                        padding: props.padding,
                        display: props.display
                    }}
                    classes={{
                        root: props.root,
                        colorSecondary: props.colorSecondary
                    }}
                    checked={props.checked}
                    size={props.size}
                    color={props.color}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
            </span>
            <span className={props.checkClassName}>{props.label}</span>
        </label>
    );
}
