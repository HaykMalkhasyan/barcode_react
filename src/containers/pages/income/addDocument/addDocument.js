import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import style from "./login.module.css"
import SelectCashier from "./selectCashier"
import Axios from "axios"
import { getHeaders } from '../../../../services/services';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SnackbarMessage from "../../outlets/outlets/snackbar"

export default function AlertDialog(props) {
  const {open, setOpen} = props
  const [password, setPassword] = useState("")
  const [selectedCahier, setSelectedCashier] = useState(null)
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState({})

  const handleClose = () => {
    setOpen(false);
  };



  const handleCheck = () => {
    return
  }

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        onKeyUp={(e)=>{if(e.keyCode===13){handleCheck()}}}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Select Cashier"}</DialogTitle>
        <DialogContent>
            <div className={style.inputs} >
            <SelectCashier 
              setSelected={setSelectedCashier} 
              cashiers={props.values} 
            />
            <SelectCashier 
              setSelected={setSelectedCashier} 
              cashiers={props.values} 
            />
          
          
          </div>
        </DialogContent>
        <DialogActions>
        <LoadingButton
                color="primary"
                variant="outlined"
                onClick={handleCheck}
                pending={pending}
                fullWidth
                pendingPosition="start"
            >
                Հաստատել
            </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
