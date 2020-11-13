import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";

export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const [success, setSuccess] = useState({});
  const [perPage, setPerPage] = useState(50)

  const history = useHistory();

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
            <FormControl margin="dense" variant="outlined" >
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
            <MenuItem value={10} >10</MenuItem>
            <MenuItem value={25} >25</MenuItem>
            <MenuItem value={50} >50</MenuItem>
            <MenuItem value={100} >100</MenuItem>
        </Select>
      </FormControl>
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
