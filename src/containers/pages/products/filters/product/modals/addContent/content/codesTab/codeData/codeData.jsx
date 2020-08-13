import React from 'react'
import classes from './codeData.module.css'
import DataItem from "./dataItem/dataItem";

const CodeData = props => {

    return (
        <div className={classes.codeData}>
            <DataItem className={'active'}/>
            <DataItem/>
            <DataItem/>
            <DataItem/>
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
            {/*<DataItem/>*/}
        </div>
    )
};

export default CodeData;