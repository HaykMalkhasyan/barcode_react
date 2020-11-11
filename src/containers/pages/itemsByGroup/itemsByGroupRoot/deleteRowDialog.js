import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";

export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const [success, setSuccess] = useState({});

  const history = useHistory();

  const handleDelete = () => {
    if (Number.isInteger(open.index)) {
      let clone = JSON.parse(JSON.stringify(props.rowData));
      clone.splice(open.index, 1);
      if (clone.length === 0) {
        props.setRowData(props.initialData);
      } else {
        props.setRowData(clone);
      }
      setOpen({ bool: false, index: null });
    } else {
      localStorage.removeItem(`document_${open.documentId}`);
      let allDocuments = localStorage.getItem("documents");
      if (allDocuments) {
        allDocuments = JSON.parse(allDocuments);
        let index = allDocuments.findIndex((x) => x["#"] === +open.documentId);
        if (index !== -1) {
          allDocuments.splice(index, 1);
          if (allDocuments.length === 0) {
            localStorage.removeItem(`documents`);
          } else {
            localStorage.setItem("documents", JSON.stringify(allDocuments));
          }
        }
      }
      history.push("/income");
    }
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
          {open.index === "document" ? "Ջնջել Փաստաթուղթը" : "Ջնջել ապրանքը"}
        </DialogTitle>
        <DialogContent>
          {open.index === "document"
            ? "Դուք համոզված ե՞ք ջնջել Փաստաթուղթը"
            : "Դուք համոզված ե՞ք ջնջել"}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleDelete}
            fullWidth
          >
            Ջնջել
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
