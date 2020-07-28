import React from 'react'
import classes from './company.module.css'
import CompanyHeader from "./header/header";
import CompanyContent from "./content/content";

const Company = props => {

    return (
        <div className={classes.company}>
            <CompanyHeader/>
            <CompanyContent/>
        </div>
    )
}

export default Company