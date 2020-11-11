import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import SnackbarMessage from "../../outlets/outlets/snackbar"
import SelectForAll from "../../income/addDocument/select"
import DatePicker from "../../../../components/datePicker/datePicker"
import { getFullDate } from '../../../../services/services';

export default function AlertDialog(props) {
  const {open, setOpen} = props
  const [selected, setSelected] = useState(null)
  const [success, setSuccess] = useState({})
  const [date, setDate] = useState("2020-12-10T17:45:13")

  

  useEffect(() => {
    
    props.document && props.document["Ամսաթիվ"] && setDate(getFullDate(props.document["Ամսաթիվ"], false))
    
  }, [props])



  const handleConfirm = () => {
      let clone = JSON.parse(JSON.stringify(props.document))
      clone[open.type] = open.type==="Ամսաթիվ" ? date : selected.name
      props.setDocument(clone)
      setOpen({bool:false})
      let allDocuments = localStorage.getItem("documents")
      if(allDocuments){
          allDocuments = JSON.parse(allDocuments)
          allDocuments = allDocuments.map(item=>{
              if(item["#"]===clone["#"]){
                  return clone
              }else{
                  return item
              }
          })
          localStorage.setItem("documents", JSON.stringify(allDocuments))
      }
      return
  }

  

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open.bool}
        onClose={()=>{setOpen({...open, bool:false})}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root
        }}
      >
        <DialogTitle id="alert-dialog-title"> {open.type}</DialogTitle>
        <DialogContent>
            {`Ընտրեք ${open.type}`}
           {open.type === "Ամսաթիվ" ? 
           <DatePicker 
            value={date}
            setValue={setDate}
            date={props.document["Ամսաթիվ"]}
           />
           :
           <SelectForAll 
              setSelected={setSelected} 
              values={props.values} 
            />}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConfirm}
            fullWidth
            >
            Հաստատել
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
