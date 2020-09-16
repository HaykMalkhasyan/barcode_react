import React from 'react'
import classes from './codeData.module.css'
import DataItem from "./dataItem/dataItem";
import Icons from "../../../../../../../../../../components/Icons/icons";
import IconButton from "@material-ui/core/IconButton";

const CodeData = props => {

    return (
        <div className={classes.codeData}>
            {
                props.barcode.length ?
                    props.barcode.map(
                        item => {

                            return (
                                <DataItem
                                    key={`barcode-item-${item.id}`}
                                    className={props.code_item && props.code_item.id === item.id ? 'active' : ''}

                                    count={item.count}
                                    barcode={item.barcode}
                                    // Methods
                                    onClick={() => props.selectBarcodeItem(item.id)}
                                />
                            )
                        }
                    )
                    :
                    <small className={classes.isEmpty}>Դատարկ է</small>
            }
            {/*<DataItem className={'active'}/>*/}
            {
                props.code_item ?
                    <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => props.deleteBarcodeItem(props.code_item.id)}>
                        <Icons width={18} height={18} type={'group-delete'} className={classes.groupDelete} opacity={1}/>
                    </IconButton>
                    :
                    null
            }
        </div>
    )
};

export default CodeData;