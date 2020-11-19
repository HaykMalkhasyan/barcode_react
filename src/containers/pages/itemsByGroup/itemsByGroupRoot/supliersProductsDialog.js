import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import Table from "../../../../components/table/table";
import Axios from "axios";
import cookie from "../../../../services/cookies";
import { setTabValue } from "../../../../Redux/products/actions";
import { getMissing, mult } from "../../../../services/services";


export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const [success, setSuccess] = useState({});
  const [perPage, setPerPage] = useState(50)
  const [rowData, setRowData] = useState([])
  const [table, setTable] = useState([])
  const [fullData, setFullData] = useState([])

  const history = useHistory();
  // useEffect(()=>{
  //   console.log('props', props)
  //   },[props])

  useEffect(()=>{
    let fullDocumentData = localStorage.getItem("Full_Documents")
    if(fullDocumentData){
      fullDocumentData = JSON.parse(fullDocumentData)
    }else{
      fullDocumentData = []
    }
    
    

    let fullData = fullDocumentData.find(x=>x["#"]==props.id)
    let suplierId = fullData["Մատակարար"] && Object.keys(fullData["Մատակարար"])[0]
    Axios.get(`${process.env.REACT_APP_API_URL}?path=Products/Search&param={"firms":"${suplierId}"}`,{
      headers: {
        lang: cookie.get("language") || "am",
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access")}`,
      },
    })
    .then((res)=>{
      console.log('res', res)
      let tableData = res.data.data
      setFullData(tableData)
      tableData = tableData.map(item=>{
        return {
          "#": item.id,
          "ԱՊՄ":item.articul,
          "Անվանում": item.item_name,
          "Մնացորդ": item.in_stores,
          "Քանակ": 0,
          "Մատակարարի գին": 0,
          "Առքի գին": 0,
          "Վաճառքի գին": 0,
        }
      })  
      setTable(tableData)
      setRowData(tableData)
    })
    .catch(err=>{
      console.log('err', err)
    })
  },[props.document])

  const handleConfirm = () => {
    console.log('rowData', rowData)
    let getAddRows = rowData.reduce((total, item)=>{
      if(+item["Քանակ"]){
        let itemFullData = fullData.find(x=>x.id==item["#"])
        console.log('itemFullData', itemFullData)
        total.push({
          "#": getMissing(props.parentRowData.map(item=>+item["#"])),
          ԱՊՄ: itemFullData.articul,
          Անվանում: itemFullData.item_name,
          Մնացորդ: itemFullData.in_stores,
          ԱՏԳ: itemFullData.adgt,
          Քանակ: item["Քանակ"],
          "Մատակարարի գին": 0,
          Զեղչ: 0,
          "Առքի գին": item["Առքի գին"],
          "Առքի գումար": mult(item["Առքի գին"], item["Քանակ"]),
          "Վաճ գին Վաճառքի գին": 0,
          "Վաճ գումար Վաճառքի գին": 0,
          "Տոկոս Վաճառքի գին": 0,
          Բարկոդ: "",
        })
        
      }
      return total
    },[])
    console.log('getAddRows', getAddRows)

    if(getAddRows.length){
      props.setParentRowData([...props.parentRowData, ...getAddRows])
      var newItems = getAddRows;
              
                props.gridApi && props.gridApi.applyTransaction({
                add: newItems,
                addIndex: props.parentRowData.length,
              })
    }
    setOpen(false);
   return
  };

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root,
        }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
            Ավելացնել մատակարարին պատկանող ապրանքներ

        </DialogTitle>
        <DialogContent>
            <div>
                ՄԱՏԱԿԱՐԱՐԻ ԱՊՐԱՆՔՆԵՐ
            </div>
            {/* <FormControl margin="dense" variant="outlined" >
        <InputLabel htmlFor="outlined-age-native-simple">Ցուցադրել</InputLabel>
           <Select
          value={perPage}
          fullWidth
          style={{width:"100px"}}
          onChange={(e)=>{setPerPage(e.target.value)}}
          label="Ցուցադրել"
          variant="outlined"
          inputProps={{
            name: 'Ցուցադրել',
            id: 'outlined-age-native-simple',
          }}
        >
            <MenuItem value={1} >10</MenuItem>
            <MenuItem value={25} >25</MenuItem>
            <MenuItem value={50} >50</MenuItem>
            <MenuItem value={100} >100</MenuItem>
        </Select>
      </FormControl> */}
      {!!rowData.length && <Table
          setOpenSulierProductDialog={setOpen}
          setParentRowData={props.setParentRowData}
          parentRowData={props.parentRowData}
          parentGridApi={props.gridApi}
          fullData={fullData}
          rowData={rowData}
          editabeFields={[
            "Քանակ",
            "Առքի գին",
          ]}
          perPage={perPage}
          // dataUpdater={updateRowData}
            settings={"add"}
          // setOpenDelete={setOpenDelete}
        />}
        </DialogContent>
        <DialogActions style={{color:"#fff"}} >
          <Button
            color="inherit"
            size="large"
            style={{backgroundColor:"#95b75d"}}
            variant="contained"
            onClick={handleConfirm}
            fullWidth
          >
            Ավելացնել ամբողջը
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
