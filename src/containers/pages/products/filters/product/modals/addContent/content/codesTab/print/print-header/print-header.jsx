import React from 'react'
import classes from './print-header.module.css'
import CloseButton from "../../../../../../../../../../../components/UI/button/closeButton/closeButton";

const PrintHeader = props => {

    return (
        <header className={classes.printHeader}>
            <CloseButton
                className={classes.closeButton}
                // Methods
                onClick={() => props.setBarcodeValue('print_tool', false)}
            />
            <h1>{props.header}</h1>
        </header>
    )
};

export default PrintHeader;