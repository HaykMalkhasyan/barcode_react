import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { add } from '../../services/services';
import "./statusBar.css"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';


export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);
  const [totals, setTotals] = useState({});

  function getAllRows(gridApi) {
    let rowData = [];
    gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }

  useEffect(()=>{
      let initialData={
          Quanty:0,
          SuplierPrice:0,
          BuyPrice:0,
          SumBuyPrice:0,
          SellPrice:0,
          SumSellPrice:0,
      }
    console.log('Selected Row Count: ', getAllRows(props.api));
    let allData = getAllRows(props.api)
    let totals = allData.reduce((total, item)=>{
        total.Quanty = add(+item["Քանակ"], total.Quanty)
        total.SuplierPrice = add(+item["Մատակարարի գին"], total.SuplierPrice)
        total.BuyPrice = add(+item["Առքի գին"], total.BuyPrice)
        total.SumBuyPrice = add(+item["Առքի գումար"], total.SumBuyPrice)
        total.SellPrice = add(+item["Վաճ գին Վաճառքի գին"], total.SellPrice)
        total.SumSellPrice = add(+item["Վաճ գումար Վաճառքի գին"], total.SumSellPrice)
        return total
    },initialData)
    setTotals(totals)
  },[])

  useImperativeHandle(ref, () => {
    return {
      setVisible: (visible) => {
        setVisible(visible);
      },
      isVisible: () => {
        return visible;
      },
    };
  });

  if (visible) {
    return (
      <div className="container">
        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width:"2000px"}} >
            <span>
                <IconButton size="small" >
                    <DeleteForeverIcon />
                </IconButton>
            </span>
            <span style={{width:"150px"}} >-</span>
            <span style={{width:"150px"}} >-</span>
            <span style={{width:"150px"}} >-</span>
            <span style={{width:"150px"}} >-</span>
            <span style={{width:"150px"}} >{totals.Quanty}</span>
            <span style={{width:"150px"}} >{totals.SuplierPrice}</span>
            <span style={{width:"150px"}} >-</span>
            <span style={{width:"150px"}} >{totals.BuyPrice}</span>
            <span style={{width:"150px"}} >{totals.SumBuyPrice}</span>
            <span style={{width:"150px"}} >{totals.SellPrice}</span>
            <span style={{width:"150px"}} >{totals.SumSellPrice}</span>
            <span>-</span>
        </div>
      </div>
    );
  }

  return null;
});