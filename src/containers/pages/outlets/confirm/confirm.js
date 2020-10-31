import React from 'react'
import style from './confirm.module.css'
import Button from "@material-ui/core/Button"
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {exampleObj} from './example'
import {get_float_num_length} from "../helpers/functions"

export default function Confirm(props) {

    
    function handleConfirm() {
        console.log(props)
        let clone = JSON.parse(JSON.stringify(props.items))
        clone = clone.map(item=>{
            return {
                    "amount": `${(item.quanty*item.sellingPrice).toFixed(get_float_num_length(item.quanty)+get_float_num_length(item.sellingPrice))}`,
                    "barcode": undefined,
                    "current_price": `${item.sellingPrice}`,
                    "discount_amount": `${item.discount_amount ? item.discount_amount : 0}`,
                    "discount_percent": `${item.discount_percent ? item.discount_percent : 0}`,
                    "id": 37778,
                    "position": 1,
                    "product_id": +item.selected.id,
                    "tax_amount": "70",
                    "tax_id": 1,
                    "tax_percent": "16.666667",
                    "total_qty": `${item.quanty}`,
                    "unit_price": `${item.sellingPrice}`
                }
        })
        

        // exampleObj.data = {
        //     ...exampleObj.data,
        //     discount_amount: props.disscountType==="cash" ? props.disscount : "0",
        //     discount_percent: props.disscountType==="percent" ? props.disscount : "0",
        //     items: clone,
        // }
        exampleObj.data[0].discount_amount = props.disscountPercent
        exampleObj.data[0].discount_percent = props.disscountCash
        exampleObj.data[0].items = JSON.parse(JSON.stringify(clone))

        console.log('exampleObj', exampleObj)
        let allAccepteds = JSON.parse(localStorage.getItem('accepteds')) 
        if(!allAccepteds) {allAccepteds = []}
        localStorage.setItem("accepteds", JSON.stringify([...allAccepteds,exampleObj]))
    }


    return (
        <div className={style.container} >
            <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={()=>{handleConfirm()}}
            >
               <PlaylistAddCheckIcon /> &nbsp; Հաստատել
            </Button>
        </div>
    )
}
