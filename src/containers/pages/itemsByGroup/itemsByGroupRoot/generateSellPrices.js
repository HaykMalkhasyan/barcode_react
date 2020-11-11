import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import SnackbarMessage from "../../outlets/outlets/snackbar"
import { MenuItem, Select, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


export default function AlertDialog(props) {
  const {open, setOpen} = props
  const [success, setSuccess] = useState({})
  
  const [sellGenPercent, setSellGenPercent] = useState("")
  const [sellGenFixBy, setSellGenFixBy] = useState("")
  const [sellGenField, setSellGenField] = useState("")




  const handleConfirm = () => {
    props.generateSellingPrices(+sellGenPercent, sellGenField, sellGenFixBy)
    setOpen(false)
      return
  }

  

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={"sm"}

      >
        <DialogTitle id="alert-dialog-title"> Գեներացնել վաճառքի գներ</DialogTitle>
        <DialogContent style={{
            display:"flex",
            flexDirection:"column"
            }} >
           <TextField
                margin="dense"
                variant={"outlined"}
                color="primary"
                type="number"
                label={"Գեներացնել վաճառքի գները ըստ %"}
                value={sellGenPercent}
                onChange={(e)=>{setSellGenPercent(e.target.value)}}
           />
           <FormControl margin="dense" variant="outlined" >
        <InputLabel htmlFor="outlined-age-native-simple">Կլորացնել</InputLabel>
           <Select
          value={sellGenFixBy}
          onChange={(e)=>{setSellGenFixBy(e.target.value)}}
          label="Կլորացնել"
          variant="outlined"
          inputProps={{
            name: 'Կլորացնել',
            id: 'outlined-age-native-simple',
          }}
        >
          <MenuItem aria-label="None" value=""><em>Չկլորացնել</em></MenuItem>
          <MenuItem value={5}>5 դրամով</MenuItem>
          <MenuItem value={10}>10 դրամով</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="dense" variant="outlined" >
        <InputLabel htmlFor="outlined-age-native-simple">Հաշվարկել ըստ</InputLabel>
        <Select
          value={sellGenField}
          onChange={(e)=>{setSellGenField(e.target.value)}}
          label="Հաշվարկել ըստ"
          variant="outlined"
          inputProps={{
            name: 'Հաշվարկել ըստ',
            id: 'outlined-age-native-simple',
          }}
        >
          <MenuItem value={"Առքի գին"}>Առքի Գնի</MenuItem>
          <MenuItem value={"Մատակարարի գին"}>Մատակարարի Գնի</MenuItem>
        </Select>
      </FormControl>
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
