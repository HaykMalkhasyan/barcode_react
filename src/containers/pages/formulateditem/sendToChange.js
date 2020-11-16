import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";

export default function AlertDialog(props) {
  const { open, setOpen, id } = props;
  const [success, setSuccess] = useState({});

  const history = useHistory();

  const handleConfirm = () => {
    let formulated_documents = localStorage.getItem("formulated_documents")
    ? JSON.parse(localStorage.getItem("formulated_documents"))
    : [];
    let index = formulated_documents.findIndex(x=>x["#"]===+id)
    formulated_documents.splice(index,1)
    localStorage.setItem("formulated_documents", JSON.stringify(formulated_documents))
    history.replace(`/itemsByGroup/${id}`)
   return
  };

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open.bool}
        onClose={() => {
          setOpen({ bool: false, index: null });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root,
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          Փոփոխել Փաստաթուղթը 
        </DialogTitle>
        <DialogContent>
          {open.index === "document"
            ? "Դուք համոզված ե՞ք Փոփոխել Փաստաթուղթը"
            : "Դուք համոզված ե՞ք Փոփոխել"}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleConfirm}
            fullWidth
          >
            Ուղարկել Փոփոխման
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
