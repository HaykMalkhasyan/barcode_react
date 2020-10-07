import React from 'react'
import classes from './printModal.module.css'

const PrintModal = props => {

    return (
        <div className={classes.printModal}>
            {props.children}
        </div>
    )
};

export default PrintModal;