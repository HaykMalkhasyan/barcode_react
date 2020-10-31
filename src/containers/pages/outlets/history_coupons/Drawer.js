import React from 'react';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import "./paperAnchorBottom.css"
import style from "./CouponsHistory.module.css"
import { Button } from '@material-ui/core';


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
  const [date, setDate] = React.useState(new Date());

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
            </div>
            <div className={style.table} >
                {[
                    {coupon:"b10002", time:"12:55:29", quanty:1, disscount:"0 դրամ", total:"26000 դրամ"},
                    {coupon:"b10001", time:"12:54:33", quanty:1, disscount:"0 դրամ", total:"1000 դրամ"},
                ]
                .map((row)=>{
                    return <div className={style.tableRow}>
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
                                    buttons
                                </div>
                        </div>
                })}
            </div>
            <div className={style.footer} >
                {["Կտրոն", "Ժամ", "ապ․ քանակ", "Զեղչ", "ընդ․ գումար"].map((item)=>{
                    return <span className={style.footerItems} >
                    {item}
                </span>
                })}
            </div>              
            
        </div>
    </div>
  );
  function handleClose(){
    props.setOpen(false)
}

  return (
    <div>
        <React.Fragment>
          <SwipeableDrawer
            anchor={"bottom"}
            open={props.open}
            onClose={()=>{props.setOpen(false)}}
            // onOpen={toggleDrawer(anchor, true)}
          >
            {list("bottom")}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
