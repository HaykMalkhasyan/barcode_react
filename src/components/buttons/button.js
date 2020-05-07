import React from "react";
import classes from './button.module.css';

export default function MyButton(props) {
    const cls = [
        classes.MyButton,
        props.active === props.langType ?
            classes.active
            :
            null

    ]

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}
        >
            {
                props.icon ?
                    props.children
                    :
                    `${props.name} - ${props.langType}`
            }
        </button>
    )
}
