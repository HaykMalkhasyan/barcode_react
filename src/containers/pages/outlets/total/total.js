import React, {useEffect} from 'react'
import style from './total.module.css'
import {get_float_num_length} from "../helpers/functions"
import Percent from "./percent"

export default function Total(props) {

    const {
        allTotal, setAllTotal,
        totalWithDisscount, setTotalWithDisscount,
        cash, setCash,
        card, setCard,
        diff, setDiff,
        debt, setDebt,
        disscount, setDisscount,
        disscountType, setDisscountType,
        disscountCash,
        setDisscountCash,
        disscountPercent,
        setDisscountPercent,
    } = props

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
    },[props, disscount, disscountType, setAllTotal, setTotalWithDisscount])



    useEffect(()=>{
        let delta = (+cash + +card - +totalWithDisscount).toFixed(Math.max(get_float_num_length(+cash), get_float_num_length(+card), get_float_num_length(+totalWithDisscount)))
        if(delta>0){
            setDiff(delta)
            setDebt(0)    
        }else{
            setDebt(-delta)
            setDiff(0)
        }
    },[cash, card, totalWithDisscount, setDebt, setDiff])


    return <>
        <div className={style.inputsCont} >
            <Percent disscount={disscount} setDisscount={setDisscount} disscountType={disscountType} setDisscountType={setDisscountType} />
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
            <div className={` ${style.lightBackGround} ${style.item}`} >
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
            </div>
            <div className={` ${style.lightBackGround} ${style.item}`} >
                {`Պարտք՝ ${debt ? debt : 0} դրամ`}
            </div>
            <div className={` ${style.diff} ${style.item}`} >
                {`Մանր՝ ${diff ? diff : 0} դրամ`}
            </div>
        </div>
    </>
}
