import React, {useState, useEffect} from 'react'
import style from './total.module.css'
import {get_float_num_length} from "../helpers/functions"
import Percent from "./percent"
import SearchCostomer from "../search/searchCostomer"
import TextField from '@material-ui/core/TextField';
import SnackbarMessage from "../outlets/snackbar"


export default function Total(props) {

    const {
        allTotal, setAllTotal,
        totalWithDisscount, setTotalWithDisscount,
        // cash, setCash,
        // card, setCard,
        diff, setDiff,
        debt, setDebt,
        disscount, setDisscount,
        disscountType, setDisscountType,
        // disscountCash,
        setDisscountCash,
        // disscountPercent,
        setDisscountPercent,
        paymentTypes,
        setPaymentTypes,
    } = props

    const [success, setSuccess] = useState({})
    // const [allTotal, setAllTotal] = useState(0)
    // const [totalWithDisscount, setTotalWithDisscount] = useState(0)
    // const [cash, setCash] = useState(0)
    // const [card, setCard] = useState(0)
    // const [diff, setDiff] = useState(0)
    // const [debt, setDebt] = useState(0)

  

    useEffect(()=>{
        if(props.items){
        let disscountCopy = disscount ? +disscount : 0
        let allTotal = props.items.reduce((total, item)=>{
            let itemtotal = (item.quanty*item.sellingPrice).toFixed(get_float_num_length(item.quanty)+get_float_num_length(item.sellingPrice))
            return total+= +itemtotal
        },0)
        allTotal = +allTotal.toFixed(2)
        let disscountCash = 0
        if(disscountType==="percent"){
            disscountCash = (allTotal * (+disscountCopy)/100).toFixed(get_float_num_length(allTotal)+get_float_num_length((+disscountCopy)/100))
            setDisscountPercent(disscountCopy)
            setDisscountCash(disscountCash)
        }else if((disscountType==="cash")){
            disscountCash = disscountCopy
            setDisscountPercent(disscountCopy*100/allTotal)
            setDisscountCash(disscountCopy)
        }
        setAllTotal(allTotal.toFixed(2))
        if(disscountCopy){
            let totalDisscount = (allTotal - disscountCash).toFixed(Math.max(get_float_num_length(allTotal), get_float_num_length(disscountCash)))
            setTotalWithDisscount(totalDisscount)
        }else{
            setTotalWithDisscount(allTotal)
        }
    }
    },[props, disscount, disscountType, setAllTotal, setTotalWithDisscount, setDisscountPercent, setDisscountCash])



    useEffect(()=>{
        let sum = paymentTypes.reduce((total, item)=>{
            let sum = (parseFloat(total) + parseFloat(item.value)).toFixed(Math.max(get_float_num_length(+total), get_float_num_length(+item.value)))
            total = sum
            return total
        },0)
        let delta = (+sum - +totalWithDisscount).toFixed(Math.max(get_float_num_length(+sum), get_float_num_length(+totalWithDisscount)))
        if(delta>0){
            setDiff(delta)
            setDebt(0)    
        }else{
            setDebt(-delta)
            setDiff(0)
        }
    },[paymentTypes, totalWithDisscount, setDebt, setDiff])


    function handlePayChange(e, i, arr){
        let clone = JSON.parse(JSON.stringify(arr))
        clone[i].value = e.target.value >= 0 ? e.target.value : 0
        setPaymentTypes(clone)
    }

    return <>
    {paymentTypes && !!paymentTypes.length && <>
        <SnackbarMessage open={success} setOpen={setSuccess} />
        <div className={style.inputsCont} >
            <SearchCostomer
                path="Clients/Search"
                param="first_name"
                inputValue={props.custmerValue} 
                setInputValue={props.setCustomerValue}
                selecteds={props.selectedCustomer} 
                setSelected={props.setSelectedCustomer}
            />
            <Percent success={success} setSuccess={setSuccess} 
                disscount={disscount} 
                setDisscount={setDisscount} 
                disscountType={disscountType} 
                setDisscountType={setDisscountType} 
                allTotal={allTotal}
            />
            <TextField 
                variant="outlined"
                size="small"
                value={props.description}
                onChange={(e)=>{props.setDescription(e.target.value)}}
                fullWidth
                style={{margin:"10px 0px"}}
                multiline
                rows={5}
                placeholder="Նկարագրություն" 
            />
        </div>
        <div className={style.totalContainer}>
            <div className={style.item} >
                {`Ընդհանուր գումար՝ ${allTotal} դրամ`}
            </div>
            <div className={style.item} >
                {`Զեղչ՝ ${disscount ? disscount : 0} ${disscountType==="percent" ? "%" : "Դրամ"}`}
            </div>
            <div className={` ${style.darkBackGround} ${style.item}`} >
                {`Վերջնական գումար՝ ${totalWithDisscount ? totalWithDisscount : 0} դրամ`}
            </div>
            {paymentTypes.map((item, i, arr)=>{
                return <div key={item.id} className={` ${style.lightBackGround} ${style.item}`} >
                {item.name}
                <input
                    onFocus={(e)=>{e.target.select()}}
                    // type="number"
                    className={style.input}
                    value={item.value}
                    onChange={(e)=>{handlePayChange(e, i, arr)}}
                />
                {` դրամ`}
            </div>
            })}
            {/* <div className={` ${style.lightBackGround} ${style.item}`} >
                {`Կանխիկ՝`}
                <input
                    className={style.input}
                    value={cash}
                    onChange={(e)=>{setCash(e.target.value)}}
                />
                {`դրամ`}
            </div>
            <div className={` ${style.lightBackGround} ${style.item}`} >
                {`Քարտով՝`}
                <input
                className={style.input}
                    value={card}
                    onChange={(e)=>{setCard(e.target.value)}}
                />
                {`դրամ`}
            </div> */}
            <div className={` ${style.lightBackGround} ${style.item}`} >
                {`Մնացորդ՝ ${debt ? debt : 0} դրամ`}
            </div>
            <div className={` ${style.diff} ${style.item}`} >
                {`Մանր՝ ${diff ? diff : 0} դրամ`}
            </div>
        </div>
    </>}
    </>
}
