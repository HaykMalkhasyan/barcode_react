import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import style from "./addDocument.module.css";
import SelectForAll from "./select";
import LoadingButton from "@material-ui/lab/LoadingButton";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import AddIcon from "@material-ui/icons/Add";
import { getFullDate } from "../../../../services/services";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import cookie from '../../../../services/cookies'

export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const history = useHistory();
  const [selectedStoreHouse, setSelectedStoreHouse] = useState(null);
  const [selectedSuplier, setSelectedSuplier] = useState(null);
  const [selectedSuplierError, setSelectedSuplierError] = useState(false);
  const [selectedStoreHouseError, setSelectedStoreHouseError] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState({});
  const [supliers, setSupliers] = useState();
  const [storeHouses, setStoreHouses] = useState();

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}?path=Stores/Store&cols=id,name`,{
      headers: {
        lang: cookie.get("language") || "am",
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access")}`,
      },
    })
    .then((res)=>{
      setStoreHouses(res.data.data)
    })
    // setSupliers([
    //   { name: "Գրանդ Քենդի", id: 1256 },
    //   { name: "789789", id: 2666 },
    // ]);
    Axios.get(`${process.env.REACT_APP_API_URL}?path=Providers/Provider&cols=id,name`,{
      headers: {
        lang: cookie.get("language") || "am",
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access")}`,
      },
    })
    .then((res)=>{
      setSupliers(res.data.data)
    })
    // setStoreHouses([
    //   { name: "Հիմնական", id: 1256 },
    //   { name: "Պահեստ 2", id: 2666 },
    // ]);
  }, []);

  function getMissing(arr){
    if(!arr.length){
      return 1
    }
      let length = arr.length
      arr.sort((x,y)=>x-y)
      if(arr[0]!==1){
        return 1
      }
      for(let i=0; i<length; i++){
          if(arr[i+1]-arr[i]!==1){
          return arr[i] + 1
      }
    }
      return arr.length
  }

  const handleCheck = () => {
    setPending(true);
    if (!selectedStoreHouse) {
      setSelectedStoreHouseError(true);
      if (!selectedSuplier) {
        setSelectedSuplierError(true);
        setPending(false);
        return;
      } else {
        setSelectedSuplierError(false);
      }
      setPending(false);
      return;
    } else {
      setSelectedStoreHouseError(false);
    }
    if (!selectedSuplier) {
      setSelectedSuplierError(true);
      setPending(false);
      return;
    } else {
      setSelectedSuplierError(false);
    }

    let documents = localStorage.getItem("documents");
    let fullDocuments = localStorage.getItem("Full_Documents");
    if (fullDocuments) {
      fullDocuments = JSON.parse(fullDocuments);
    } else {
      fullDocuments = [];
    }
    if (documents) {
      documents = JSON.parse(documents);
    } else {
      documents = [];
    }
    let docNum = getMissing(documents.map(item=>+item["#"]))
    
    let newDocument = {
      "#": docNum,
      Մատակարար: selectedSuplier.name,
      Պահեստ: selectedStoreHouse.name,
      Ամսաթիվ: getFullDate(null, false),
      Քանակ: 0,
      Նկարագիր: "---",
      "Գին առանց ԱԱՀ-ի": 0,
      "ԱԱՀ Գում․": 0,
      "Առքի գումար": 0,
      "Վճարված է": 0,
      "Հաշիվ-Ապրանքագիր": "Դեռ ուղարկված չէ",
      ՀՎՀՀ: 0,
    };
    let newFullDocument = {
      "#": docNum,
      Մատակարար: {[selectedSuplier.id]:selectedSuplier.name},
      Պահեստ: {[selectedStoreHouse.id]:selectedStoreHouse.name},
    };
    documents.push(newDocument);
    fullDocuments.push(newFullDocument);
    localStorage.setItem("Full_Documents", JSON.stringify(fullDocuments));

    localStorage.setItem("documents", JSON.stringify(documents));
    props.setRowData(documents);
    setPending(false);
    // setTimeout(()=>{
    history.push(`/itemsByGroup/${docNum}`);
    // },2000)
    handleClose();
    return;
  };

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            handleCheck();
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root,
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Ավելացնել Փաստաթուղթ"}
        </DialogTitle>
        <DialogContent>
          <div className={style.inputs}>
            Պահեստ
            <SelectForAll
              setSelected={setSelectedStoreHouse}
              values={storeHouses}
              error={selectedStoreHouseError}
            />
            <div style={{ marginTop: "10px" }}>
              Ընտրեք մատակարարին
              <div style={{ display: "flex" }}>
                <SelectForAll
                  setSelected={setSelectedSuplier}
                  values={supliers}
                  error={selectedSuplierError}
                />
                <Button variant="contained">
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="primary"
            variant="contained"
            onClick={handleCheck}
            pending={pending}
            fullWidth
            pendingPosition="start"
          >
            Ավելացնել
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}


