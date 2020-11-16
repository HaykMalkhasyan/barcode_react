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


export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const [success, setSuccess] = useState({});
  const [perPage, setPerPage] = useState(50)
  const [rowData, setRowData] = useState([])
  const [table, setTable] = useState([])

  const history = useHistory();
  useEffect(()=>{
    setRowData([])
    console.log('props.perPage', perPage)
    setRowData(table)
    },[perPage])

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
  },[props.document])


  const handleConfirm = () => {
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
