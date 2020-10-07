import React, {Component} from 'react'
import classes from './codeData.module.css'
import DataItem from "./dataItem/dataItem";
import Icons from "../../../../../../../../../../components/Icons/icons";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";

class CodeData extends Component{

    // codeTypeRender = (types, id) => {
    //     for (let item of types) {
    //         if (item.id === +id) {
    //             return item.name
    //         }
    //     }
    //     return null
    // };

    render() {

        return (
            <div className={classes.codeData}>
                {
                    this.props.barcode.length ?
                        this.props.barcode.map(
                            item => {

                                return (
                                    <DataItem
                                        key={`barcode-item-${item.id}`}
                                        className={this.props.code_item && this.props.code_item.id === item.id ? 'active' : ''}

                                        count={item.count}
                                        barcode={item.barcode}
                                        // Methods
                                        onClick={() => this.props.selectBarcodeItem(item.id)}
                                    />
                                )
                            }
                        )
                        :
                        <small className={classes.isEmpty}>Դատարկ է</small>
                }
                {
                    this.props.code_item ?
                        <div className={classes.barcodeActionButtons}>

                            <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => this.props.setBarcodeValue('print_tool', true)}>
                                <PrintIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => this.props.deleteBarcodeItem(this.props.code_item.id)}>
                                <Icons width={18} height={18} type={'group-delete'} className={classes.groupDelete} opacity={1}/>
                            </IconButton>
                        </div>
                        :
                        null
                }
                {/*{*/}
                {/*    this.props.code_item ?*/}
                {/*        <div style={{display: "none"}}>*/}
                {/*            <PrintComponent*/}
                {/*                ref={el => (this.componentRef = el)}*/}
                {/*                name={this.props.main.name}*/}
                {/*                barcode={this.props.code_item.barcode}*/}
                {/*                format={this.codeTypeRender(this.props.codeTypes, this.props.code_item.barcode_type)}*/}
                {/*                font={'cursive'}*/}
                {/*                count={this.props.code_item.count}*/}
                {/*                price={'5000$'}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        :*/}
                {/*        null*/}
                {/*}*/}
            </div>
        )
    }
}

export default CodeData;