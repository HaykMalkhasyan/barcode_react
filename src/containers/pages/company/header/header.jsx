import React from 'react'
import classes from './header.module.css'
import CustomButton from "../../../../components/UI/button/customButton/customButton";

const CompanyHeader = props => {
    
    return (
        <div className={classes.header}>
            <h1>Իմ կազմակերպությունները</h1>
            <CustomButton
                className={classes.addButton}
                onClick={
                    () => console.log('Add company')
                }
            />
        </div>
    )
}

export default CompanyHeader