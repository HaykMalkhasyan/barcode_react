import React from 'react';
import Button from '@material-ui/core/Button';


export default function ButtonUi(props) {

    return (
        <Button
            className={props.className}
            style={{
                padding: props.padding ? props.padding : 0,
                minWidth: props.minWidth ? props.minWidth : 0,
                width: props.width ? props.width : 24,
                height: props.height ? props.height : 24,
                outline: "none",
                margin: props.margin,
                fontSize: props.fontSize,
                fontWeight: props.Weight,
                color: props.fontColor,
                borderRadius: props.borderRadius,
                textAlign: props.textAlign
            }}
            onClick={props.onClick}
            color={props.color}
            disabled={props.disabled}
            variant={props.variant}
            type={props.type || 'button'}
            name={props.name}
        >
            {props.label || props.children}
        </Button>
    );
}
