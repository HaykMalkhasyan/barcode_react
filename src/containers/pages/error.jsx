import React from 'react'
import classes from './error.module.css'
import {NavLink} from "react-router-dom";
import Icons from "../../components/Icons/icons";

const Error = props => {

    return (
        <>
            <div className={classes.error}/>
            <header className={classes.header}>
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
            <div className={classes.errorPage}>
                <div>
                    <h1>This is an uncharted puzzle in the ocean</h1>
                    <p><b>Error #404</b> Sorry, that page can't be found.</p>
                    <div className={classes.linksWindow}>
                        <NavLink
                            className={classes.link}
                            to={'/'}
                        >
                            Go to homepage
                            &nbsp;
                            <Icons type={'right-angle'} className={classes.rightAngle}/>
                        </NavLink>
                        <NavLink
                            className={classes.link}
                            to={'/website'}
                        >
                            Go to website
                            &nbsp;
                            <Icons type={'right-angle'} className={classes.rightAngle}/>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <div className={classes.puzzle}>
                        <img
                            src="https://www.pngonly.com/wp-content/uploads/2017/06/Jigsaw-Puzzle-PNG.png"
                            alt="puzzle"
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Error