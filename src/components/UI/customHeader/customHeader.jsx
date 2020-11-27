import React from 'react'
import classes from './customHeader.module.css'
import CustomButton from "../button/customButton/customButton";
import Icons from "../../Icons/icons";

const CustomHeader = props => {

    return (
        <header className={classes.customHeader}>
            <h3 className={`color-333 font-size-18 ${props.type === "collapsed" ? classes.flexed : ''}`} onDoubleClick={props.type === "collapsed" ? props.onClick : null}>
                {
                    props.type === "collapsed" ?
                        <>
                            <span>{props.name}</span>
                            <CustomButton
                                className={`background-transparent ${classes.collapseButton}`}
                                children={
                                    props.open ?
                                        <Icons type={'top-angle'} className="fill-434343"/>
                                        :
                                        <Icons type={'bottom-angle'} className={`fill-434343 stroke-434343 ${classes.angle}`}/>
                                }
                                // Methods
                                onClick={props.onClick}
                            />
                        </>
                        :
                        props.name
                }
            </h3>
            <hr className={classes.line}/>
        </header>
    )
};

export default CustomHeader;