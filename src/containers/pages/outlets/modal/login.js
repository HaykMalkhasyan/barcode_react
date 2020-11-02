import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import style from "./login.module.css"
import SelectCashier from "./selectCashier"

export default function AlertDialog(props) {
  const {open, setOpen} = props
  const [password, setPassword] = useState("")

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
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
            <SelectCashier setSelectedCashier={props.setSelectedCashier} cashiers={props.cashiers} />
          
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined"
            fullWidth
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
