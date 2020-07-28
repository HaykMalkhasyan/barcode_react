import React, {useState} from 'react'
import classes from './error.module.css'

const Error = props => {
    const [cordsX, setCordsX] =useState(0)
    const [cordsY, setCordsY] =useState(0)

    const moveHandler = event => {
        setCordsX(event.clientX)
        setCordsY(event.clientY)
    }

    return (
        <div onMouseMove={moveHandler} className={classes.errorPage}>
            <div className={classes.text}>
                <h1>
                    <span /*className={classes.forAnimated}*/>4</span>
                    <span className={classes.spanAnimated}>0</span>
                    <span /*className={classes.forAnimated}*/>4</span>
                </h1>
                <h2>Uh, Ohh</h2>
                <h3>Sorry we cant find what you are looking for 'cuz its so dark in here</h3>
            </div>
            <div style={{left: cordsX, top: cordsY}} className={classes.torch}/>
        </div>
    )
}

export default Error