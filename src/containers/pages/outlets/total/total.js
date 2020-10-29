import React, {useEffect, useState} from 'react'
import style from './total.module.css'

export default function Total(props) {

    const [allTotal, setAllTotal] = useState(0)
    const [totalWithDisscount, setTotalWithDisscount] = useState(0)
    const [cash, setCash] = useState(0)
    const [card, setCard] = useState(0)
    const [diff, setDiff] = useState(0)
    const [debt, setDebt] = useState(0)


    useEffect(()=>{
        console.log(props.items)
        let disscount = props.Discount ? props.Discount : 0
        let allTotal = props.items.reduce((total, item)=>{
            let itemtotal = (item.quanty*item.sellingPrice).toFixed(get_float_num_length(item.quanty)+get_float_num_length(item.sellingPrice))
            return total+= +itemtotal
        },0)
        setAllTotal(allTotal.toFixed(2))
        if(disscount){
            setTotalWithDisscount( allTotal.toFixed(2) - ((allTotal.toFixed(2) * disscount)/100))
        }else{
            setTotalWithDisscount(allTotal.toFixed(2))
        }
    },[props])

    function get_float_num_length(num){
        num = num.toString()
        if(num.includes(".")){
        let arr = num.split(".")
        return arr[1].length
        }else{
          return 0 
        }
    }

    useEffect(()=>{
        let delta = (+cash + +card - +totalWithDisscount)
        console.log(delta, +cash, +card, +totalWithDisscount)
        if(delta>0){
            setDiff(delta.toFixed(2))
            setDebt(0)    
        }else{
            setDebt(-delta.toFixed(2))
            setDiff(0)
        }
    },[cash, card, totalWithDisscount])


    return (
        <div className={style.totalContainer}>
            <div className={style.item} >
                {`Ընդհանուր գումար՝ ${allTotal} դրամ`}
            </div>
            <div className={style.item} >
                {`Զեղչ՝ ${props.Discount ? props.Discount : 0} %`}
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
    )
}
