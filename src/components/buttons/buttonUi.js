import React from 'react';
import Button from '@material-ui/core/Button';


export default function ButtonUi(props) {

    return (
        <Button
            style={{
                padding: props.padding ? props.padding : 0,
                minWidth: props.minWidth ? props.minWidth : 0,
                width: props.width ? props.width : 24,
                height: props.height ? props.height : 24,
                outline: "none",
                margin: props.margin,
                fontSize: props.fontSize,
                fontWeight: props.Weight
            }}
            onClick={props.onClick}
            color={props.color}
            disabled={props.disabled}
            variant={props.variant}
            name={props.name}
        >
            {props.label || props.children}
        </Button>
    );
}
