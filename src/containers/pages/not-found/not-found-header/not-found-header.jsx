import React from "react";
import classes from "./not-found-header.module.css";
import {NavLink} from "react-router-dom";

const NotFoundHeader = props => {

    return (
        <header className={classes.header}>
            <span className={classes.projectName}>Barcode.am</span>
            <ul>
                <li>
                    <NavLink className={classes.headerLink} to={'/products/filters'}>Products</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/documents'}>Documents</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/payments'}>Payments</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/worckers'}>Worckers</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/colleagues'}>Colleagues</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/help-center'}>Help center</NavLink>
                </li>
                <li>
                    <NavLink className={classes.headerLink} to={'/barcode'}>Barcode</NavLink>
                </li>
            </ul>
        </header>
    )
}

export default NotFoundHeader