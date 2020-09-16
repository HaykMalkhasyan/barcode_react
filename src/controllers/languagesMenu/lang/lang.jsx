import React from 'react'
import classes from './lang.module.css'

const Lang = props => {

    return (
        <div className={props.type === 'in' ? `${classes.lang} ${classes.inLang}` : classes.lang}>
            <span>{props.name}</span>
            <img src={props.image} alt={props.name}/>
        </div>
    )
};

export default Lang;