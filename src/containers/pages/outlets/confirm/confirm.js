import React, { useState } from 'react'
import style from './confirm.module.css'
// import Button from "@material-ui/core/Button"
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {exampleObj} from './example'
import {get_float_num_length} from "../helpers/functions"
// import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';

// import SaveIcon from '@material-ui/icons/Save';


export default function Confirm(props) {
    const {
        // cash,
        // card,
        diff,
        debt,
        // items,
        allTotal,
        // disscount,
        // currentTurn,
        // disscountType,
        disscountCash,
        disscountPercent,
        totalWithDisscount,
        deleteTurn,
        // success,
        setSuccess,
        paymentTypes,
        selectedCustomer
    } = props

    const [pending, setPending] = useState(false)
    
    function handleConfirm() {
        setPending(true)

        console.log('openLogin', props.openLogin)
        if(`${props.keyCashBox}` !== localStorage.getItem("keyCashbox") ){
            window.location.reload()
            setSuccess({open:true, message:"Մուտքագրեք տվյալները", status:"error"})
            setPending(false)
            return
        }
        if(!props.items.length){
            setSuccess({open:true, message:"Կտրոնը դատարկ է", status:"error"})
            setPending(false)
            return
        }
        if(!selectedCustomer){
            setSuccess({open:true, message:"Հաճախորդը ընտրված չէ", status:"error"})
            setPending(false)
            return
        }
        if(debt!==0){
            setSuccess({open:true, message:`Վճարումը կատարված չէ (պարտք ${debt} Դրամ)`, status:"error"})
            setPending(false)
            return
        }
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
        var date = new Date();
        let unixtime = Date.now()
        exampleObj.data[0].discount_amount = disscountCash
        exampleObj.data[0].discount_percent = disscountPercent
        exampleObj.data[0].items = JSON.parse(JSON.stringify(clone))
        exampleObj.data[0].close_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        exampleObj.data[0].sum_amount = allTotal
        exampleObj.data[0].total_amount = totalWithDisscount
        exampleObj.data[0].selectedCustomer = selectedCustomer
        exampleObj.data[0].payments = paymentTypes.map(item=>{
            return {
                "amount": item.value,
                "direction": 1,
                "is_change": false,
                "payment_id": item.id,
                "unique_id": "6417",
                "unixtime": unixtime
            }
        }).filter(item=>item.amount)
        if(diff!==0){
            exampleObj.data[0].payments.push({
                "amount": diff,
                "direction": 2,
                "is_change": true,
                "unixtime": unixtime
            })
        }
///////////////////////////////////////////////////////////

        console.log('paymentTypes', paymentTypes)
        console.log('exampleObj', exampleObj)
        let allAccepteds = JSON.parse(localStorage.getItem('accepteds')) 
        if(!allAccepteds) {allAccepteds = []}
        localStorage.setItem("accepteds", JSON.stringify([...allAccepteds,exampleObj]))
        setTimeout(()=>{
            setPending(false)
        },1000)
        deleteTurn()
        setSuccess({status:"success" , message:"Հաջողությամբ Հաստատվեց!", open:true})
    }


    return (
        <div className={style.container} >
            <LoadingButton
                color="primary"
                variant="outlined"
                size="large"
                onClick={handleConfirm}
                pending={pending}
                pendingPosition="start"
                startIcon={<PlaylistAddCheckIcon />}
            >
                Հաստատել
            </LoadingButton>
        </div>
    )
}
