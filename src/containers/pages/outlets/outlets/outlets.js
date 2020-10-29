import React, {useState, useEffect, useRef} from 'react'
import Search from "../search/search"
import Login from "../modal/login"
import style from "./outlets.module.css"
import {
    TextField, 
    Button,
} from "@material-ui/core"
import Table from "../resultsTable/table"
import Axios from 'axios';
import cookie from "../../../../services/cookies";
import {useSpring, animated} from 'react-spring'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import Total from '../total/total'



export default function Outlets() {
    let id = Date.now()
    const [selecteds, setSelected] = useState()
    const [openLogin, setOpenLogin] = useState(true)
    const [quanty, setQuany] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [cashbox, setCashbox] = useState([])
    const [cashiers, setCashiers] = useState()
    const [selectedCahier, setSelectedCashier] = useState({})
    const [items, setItems] = useState([])
    const [turns, setTurns] = useState([{i:1, id:id, items:[]}])
    const [currentTurn, setCurrentTurn] = useState(id)
    const [props, set, stop] = useSpring(() => ({opacity: 1}))
    const [focus, setFocus] = useState()
    const quantyRef = useRef()
    const sellingPriceRef = useRef()

    const contentRef = useRef()



    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_API_URL}?path=Cashboxes/Cashboxes&addons=1&cols=id,name,cashier_stay_time,cashbox_version_id`, {
            headers: {
                "lang": cookie.get('language') || "am",
                "Content-Type": "application/json",
                "Authorization": `JWT ${cookie.get('access')}`
            }
        }).then(res=>{
            setCashiers(res.data.results)
        }).catch(err=>{
            console.log(err)
        })
    },[])




    useEffect(()=>{
        if(selectedCahier){
            let cashier = localStorage.getItem(`${selectedCahier.id}`)
            if(cashier){
                    cashier = JSON.parse(cashier)
                    console.log(cashier)
                    if(cashier.items){
                        setItems(cashier.items)
                    }
            }
        }
    },[selectedCahier])



    useEffect(()=>{
        let clone = JSON.parse(JSON.stringify(turns))
        clone.map(item=>{
            if(item.id === currentTurn){
                return {
                    ...item,
                    items:items
                }
            }
            return {...item} 
        })
    },[items])

    useEffect(()=>{
        let items = turns.find(x=>x.id === currentTurn)
        setItems(items.items)
    },[currentTurn])


    useEffect(()=>{
        if(cashiers && selectedCahier){
            let allTurns = turns.map(item=>{
                if(item.id === currentTurn){
                    return {...item, items:items}
                }
                return {...item}
            })
            localStorage.setItem(`${selectedCahier.id}`, JSON.stringify(allTurns))
        }
    },[items, cashiers])



    function changeTurn(item, i) {
        set({opacity: 0})
        setTimeout(()=>{
            set({opacity: 1})
        },200)
        setCurrentTurn(item.id)
    }

    function get_float_num_length(num){
        num = num.toString()
        if(num.includes(".")){
        let arr = num.split(".")
        return arr[1].length
        }else{
            return 0
          }
    }


    function addRow(params) {
        let index = items.findIndex(x=>x.selected===selecteds.item_name)
        if(index === -1){
            setItems([...items, {selected: selecteds.item_name, quanty, sellingPrice}])
        }else{
            let clone = JSON.parse(JSON.stringify(items))
            // console.log(typeof(quanty), typeof(clone[index].quanty))
            get_float_num_length(clone[index].quanty)
            get_float_num_length(quanty)
            clone[index].quanty = (+clone[index].quanty + +quanty).toFixed(Math.max( get_float_num_length(clone[index].quanty), get_float_num_length(quanty)))
            setItems(clone)
        }
    }




    return (
        <div className={style.content}>
            <div className={style.cashiers} >
                {cashiers && cashiers.map(((item,i)=>{
                    return <button
                    key={i}
                        className={selectedCahier.id===item.id ? style.activeCashboxes : style.cashboxes}
                        onClick={()=>{setSelectedCashier(item);}}
                    >
                            {item.name}
                        </button>
                })) }
                
            </div>
             <Login setSelectedCashier={setSelectedCashier} cashiers={cashiers} open={openLogin} setOpen={setOpenLogin} />
             <div className={style.tabs} >
                 {turns.map((item, i)=>{
                     return <button 
                     key={i}
                     className={ item.id===currentTurn ? style.actieTurn : style.turns}
                     onClick={()=>{changeTurn(item,i)}}
                 >
                     {`TURN ${i+1}`}
                 </button>
                 })}
                 <IconButton style={{color:"white"}} onClick={()=>{setTurns([...turns, {i:turns.length, id:Date.now()}])}} >
                    <AddIcon color="inherit" />
                </IconButton>
            </div>
            <animated.div style={props} >
             <div className={style.filters} >
            
                <Search cashbox={cashbox} reff = {quantyRef} setFocus={setFocus} setCashbox={setCashbox} selecteds={selecteds} setSelected={setSelected}/>
                <TextField
                    margin="none"
                    style={{margin:"0px 10px"}}
                    size="small"
                    focused={focus==="quanty"}
                    inputRef={quantyRef}
                    onKeyUp = {(e)=>{if(e.keyCode===13) {sellingPriceRef.current.focus()} }}
                    label="quanty"
                    type="number"
                    value={quanty}
                    onChange={(e)=>{setQuany(+e.target.value)}}
                    variant="outlined"
                />
                 <TextField
                    size="small"
                    style={{margin:"0px 10px 0px 0px"}}
                    inputRef={sellingPriceRef}
                    autoFocus={focus==="sellingPrice"}
                    label="selling Price"
                    type="number"
                    value={sellingPrice}
                    onKeyUp = {(e)=>{if(e.keyCode===13) {addRow()} }}
                    onChange={(e)=>{setSellingPrice(+e.target.value)}}
                    variant="outlined"
                />
                <Button 
                    variant="outlined"
                    size="small"
                    onClick={()=>{addRow()}}
                >
                    Ավելացնել
                </Button>
            </div>
            <div className={style.results} >
                <Table items={items} setItems={setItems} />
            </div>
            <div className={style.totalContainer} >
                <Total 
                    items={items}
                />
            </div>
            </animated.div>
        </div>
    )
}
