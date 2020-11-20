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
    if(open.documentId){
      let doc = localStorage.getItem(`documents`)
      if(doc){
        doc=JSON.parse(doc)
        let index = doc.findIndex(x=>x["#"]==open.documentId)
        if(index !== -1){
          doc.splice(index, 1)
          localStorage.setItem(`documents`, JSON.stringify(doc))
          history.replace("/income")
        }
      }
    }
    if (open.multiple && open.multiple.length) {
      let clone = JSON.parse(JSON.stringify(props.rowData));
      let deletingIds = open.multiple.map(item=>item["#"])
      for(let i=0; i<clone.length; i++){
        let index = clone.findIndex(item=>deletingIds.includes(item["#"]))
        if(index!==-1){
          clone.splice(index,1)
          --i;
        }
      }
      if (clone.length === 0) {
        props.setRowData([]);
      } else {
        props.setRowData(clone);
      }
      var selectedData = props.gridApi.getSelectedRows();
    props.gridApi.applyTransaction({ remove: selectedData });
      setOpen({ bool: false, multiple: null });
    }else if(open.clicked){
      let clone = JSON.parse(JSON.stringify(props.rowData));
      let deletingIds = [open.clicked["#"]]
      for(let i=0; i<clone.length; i++){
        let index = clone.findIndex(item=>deletingIds.includes(item["#"]))
        if(index!==-1){
          clone.splice(index,1)
          --i;
        }
      }
      if (clone.length === 0) {
        props.setRowData([]);
      } else {
        props.setRowData(clone);
      }
      var selectedData = props.gridApi.getSelectedRows();
      props.gridApi.applyTransaction({ remove: [open.clicked] });
      setOpen({ bool: false, multiple: null });
    } 
    

    // else {
    //   localStorage.removeItem(`document_buy_${open.documentId}`);
    //   let allDocuments = localStorage.getItem("documents");
    //   if (allDocuments) {
    //     allDocuments = JSON.parse(allDocuments);
    //     let index = allDocuments.findIndex((x) => x["#"] === +open.documentId);
    //     if (index !== -1) {
    //       allDocuments.splice(index, 1);
    //       if (allDocuments.length === 0) {
    //         localStorage.removeItem(`documents`);
    //       } else {
    //         localStorage.setItem("documents", JSON.stringify(allDocuments));
    //       }
    //     }
    //   }
    //   let formulated_documents = localStorage.getItem("formulated_documents") ? JSON.parse(localStorage.getItem("formulated_documents")) : []
    //   let index = formulated_documents.indexOf(+props.id)
    //   if(index!==-1){
    //     formulated_documents.splice(index, 1)
    //     localStorage.setItem("formulated_documents", JSON.stringify(formulated_documents))
    //   }
      
    //   history.push("/income");
    // }
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
