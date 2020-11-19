import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";

export default function AlertDialog(props) {
  const { open, setOpen, rowData, setRowData } = props;
  const [success, setSuccess] = useState({});

  const history = useHistory();
  const handleConfirm = () => {
    let clone = JSON.parse(JSON.stringify(rowData));
    clone = clone.map((item) => {
      return {
        ...item,
        Քանակ: 0,
      };
    });
    // props.gridApi.refreshCells()
    setOpen(false);
    setRowData(clone);
    var itemsToUpdate = [];
    props.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      var data = rowNode.data;
      data["Քանակ"] = 0
      itemsToUpdate.push(data);
    });
    props.gridApi.applyTransaction({ update: itemsToUpdate });
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
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          Զրոյացնել ապրանքների քանակաները
        </DialogTitle>
        <DialogContent>
          Դուք համոզված ե՞ք զրոյացնել բոլոր ապրանքների քանակները
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleConfirm}
            fullWidth
          >
            զրոյացնել
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
