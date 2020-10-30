import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton"
import DeleteForever from "@material-ui/icons/DeleteForever"
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function BasicTable(props) {

    const {items, setItems, saveOnLocale} = props
  const classes = useStyles();


  function handlechange(e,i) {
    let clone = JSON.parse(JSON.stringify(items)) 
    clone[i].sellingPrice = e.target.value
    setItems(clone)
    saveOnLocale(clone)
  }


  function deleteRow(i) {
    let clone=JSON.parse(JSON.stringify(items))
    clone.splice(i,1)
    setItems(clone)
    saveOnLocale(clone)
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


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small"  aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Անվանում</TableCell>
            <TableCell align="right">Քանակ</TableCell>
            <TableCell align="right">Գին &nbsp;Վաճ․/Առքի</TableCell>
            <TableCell align="right">Զեղչ</TableCell>
            <TableCell align="right">Գումար</TableCell>
            <TableCell align="right"><SettingsIcon/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.map((row,i) => (
            <TableRow key={row.selected.item_name}>
              <TableCell component="th" scope="row">
                {row.selected}
              </TableCell>
              <TableCell align="right">{row.quanty}</TableCell>
              <TableCell align="right">
                <input
                  value={row.sellingPrice}
                  onChange={(e)=>{handlechange(e,i)}}
                  style={{padding:"10px 15px"}}
                >
                </input>
              </TableCell>
              <TableCell align="right">
                <input
                disabled
                  value={0}
                  
                  style={{padding:"10px 15px"}}
                >
                </input>
              </TableCell>
              <TableCell align="right">{(row.quanty*row.sellingPrice).toFixed(get_float_num_length(row.quanty)+get_float_num_length(row.sellingPrice))}</TableCell>
              <TableCell align="right">
                <IconButton onClick={()=>{deleteRow(i)}} >
                  <DeleteForever color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
