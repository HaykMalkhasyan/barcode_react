import React from 'react'
import classes from './confirmButton.module.css'
import CustomButton from "../customButton/customButton";

const ConfirmButton = props => {

    return (
        <CustomButton
            className={classes.confirmButton}
            children={
                <>
                    <svg width={11.428} height={10.35} viewBox="0 0 11.428 10.35">
                        <path
                            className={classes.confirmButtonIcon}
                            d="M3.629,10.827h0a.672.672,0,0,0,.148.939l4.24,3.084L14.8,5.569h0a.672.672,0,0,0-.146-.939h0a.672.672,0,0,0-.939.146l-5.991,8.2L4.568,10.679h0A.672.672,0,0,0,3.629,10.827Z"
                            transform="translate(-3.5 -4.5)"
                        />
                    </svg>
                    <span className={classes.confirmButtonName}>Հաստատել</span>
                </>
            }
            type={props.type}
            name={props.name}
            // Methods
            onClick={props.onClick}
        />
    )
}

export default ConfirmButton