import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import "./paperAnchorBottom.css"
import style from "./CouponsHistory.module.css"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [date] = React.useState(new Date());
  const [accepted, setAccepted] = useState([])


  useEffect(()=>{
    let today = new Date()
    let accepteds = localStorage.getItem("accepteds")
    if(accepteds){
      accepteds = JSON.parse(accepteds)
      let arr = []
      
      accepteds.map(item=>item.data[0]).forEach(obj=>{
        let itemInArr = {} 
          itemInArr.date = obj.close_date
          itemInArr.quanty = obj.items.length
          itemInArr.disscount = obj.discount_amount
          itemInArr.total = obj.total_amount
          arr.push(itemInArr)
      })
      arr = arr.map((item,i)=>{
         let couponDate = new Date(item.date)
         if(`${today.getFullYear()}${today.getDate()}${today.getMonth()}` === `${couponDate.getFullYear()}${couponDate.getDate()}${couponDate.getMonth()}`){
          let time = item.date.split(" ") 
          return {
              ...item,
              time: time[1],
              coupon:`b1000${i}`
           }
         }else{
           return null
         }

      })
      setAccepted(arr)

    }
  },[props])





    function handleClose(){
        props.setOpen(false)
    }

  const list = (anchor) => (
    
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
        <div className={style.historyContainer} >

            <div className={style.header} >
                Կտրոնների պատմություն: { `${(date).getFullYear()}/${(date).getMonth()+1}/${(date).getDate()}`}
                <div className={style.downButton} onClick={handleClose} >
                  <ArrowDownwardIcon />
                </div>
            </div>
            {
                accepted.length ? <div className={style.table} >
               {accepted
                // [
                //     {coupon:"b10002", time:"12:55:29", quanty:1, disscount:"0 դրամ", total:"26000 դրամ"},
                //     {coupon:"b10001", time:"12:54:33", quanty:1, disscount:"0 դրամ", total:"1000 դրամ"},
                // ]
                .map((row)=>{
                    if(row){ return <div key={row.time} className={style.tableRow}>
                                <div className={style.tableCell} > 
                                    {row.coupon}
                                </div>
                                <div className={style.tableCell} > 
                                    {row.time}
                                </div>
                                <div className={style.tableCell} > 
                                    {row.quanty}
                                </div>
                                <div className={style.tableCell} > 
                                    {row.disscount}
                                </div>
                                <div className={style.tableCell} > 
                                    {row.total}
                                </div>
                                <div className={`${style.tableCell} ${style.TableButtons}`} > 
                                    <button className={`${style.tableCellButton} ${style.tableCellLook}`}>
                                      <div className={style.tableCellIcons}>
                                      <VisibilityIcon />
                                      </div>
                                    </button>
                                    <button className={`${style.tableCellButton} ${style.tableCellPrint}`}>
                                      <div className={style.tableCellIcons}>
                                      <PrintIcon />
                                      </div>
                                    </button>
                                </div>
                        </div>}else{
                          return null
                        }
                })}
              
            </div>
            :
            <div className={style.emptyTextCont}>
              <div className={style.emptyTextSmollCont} >
                <div className={style.emptyText} >
                  Այսօր վաճառք դեռ չի իրականացվել
                </div>
              </div>
            </div>
            }
            <div className={style.footer} >
                {["Կտրոն", "Ժամ", "ապ․ քանակ", "Զեղչ", "ընդ․ գումար"].map((item)=>{
                    return <span key={item} className={style.footerItems} >
                    {item}
                </span>
                })}
            </div>              
            
        </div>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <SwipeableDrawer
            
            anchor={"bottom"}
            open={props.open}
            onClose={()=>{props.setOpen(false)}}
            onOpen={()=>{}}
          >
            {list("bottom")}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
