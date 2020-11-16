import { Checkbox, Grid, FormControlLabel, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {useSelector} from "react-redux"
import style from "./formulatedItem.module.css";
import Table from "../../../components/table/table";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SendIcon from '@material-ui/icons/Send';
import PrintIcon from '@material-ui/icons/Print';
import SendToChange from "./sendToChange"



export default function FormulatedItem() {
    const user = useSelector(state => state.auth.user)
  const history = useHistory();
  const location = useLocation();
  const id = +location.pathname.split("/")[2];
  const [document, setDocument] = useState([]);
  const [docInfo, setDocInfo] = useState([]);
  const [inventory, setInventory] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [allTotal, setAllTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [debt, setDebt] = useState(0);
  const [alarmDate, setAlarmDate] = useState("")
  const [openSendToChange, setOpenSendToChange] = useState({bool:false, index:null})

  useEffect(() => {
    if (id) {
      let formulated_documents = localStorage.getItem("formulated_documents")
        ? JSON.parse(localStorage.getItem("formulated_documents"))
        : [];
      let formulated_ids = formulated_documents.map((item) => item["#"]);
      if (!formulated_ids.includes(+id)) {
        history.replace("/income");
      }
      let document_data = formulated_documents.find(x=>x["#"]===id)
      if (document_data) {
        setAllTotal(document_data.total);
        setPaid(+document_data.payType.paySize);
        setDebt(+document_data.total - +document_data.payType.paySize)
        setAlarmDate(document_data.date)
      }
      let documents = localStorage.getItem("documents");
      if (documents) {
        documents = JSON.parse(documents);
        let item = documents.find((x) => x["#"] == id);
        if (item) {
          setDocument(item);
          let rowdata = localStorage.getItem(`document_buy_${id}`);
          if (rowdata) {
            setRowData(JSON.parse(rowdata));
          }
        } else {
          history.replace("/income");
        }
      } else {
        history.replace("/income");
      }
    }
  }, [id]);

  useEffect(() => {
    let document = localStorage.getItem(`document_buy_${id}`)
      ? JSON.parse(localStorage.getItem(`document_buy_${id}`))
      : [];
    let docinfo = localStorage.getItem(`documents`)
      ? JSON.parse(localStorage.getItem(`documents`))
      : [];
    setDocument(document);
    setDocInfo(docinfo.find((x) => x["#"] === id));
    console.log("document", document);
    console.log(
      "docinfo",
      docinfo.find((x) => x["#"] === id)
    );
    let rowdata = localStorage.getItem(`document_buy_${id}`);
    if (rowdata) {
      setRowData(JSON.parse(rowdata));
    }
  }, []);



  function  handleChange(){
    setOpenSendToChange({bool:true, index:true})
    
  }








  return (
    <div
      style={{
        margin: "144px 18px 8px",
        backgroundColor: "#fff",
        padding: "18px",
      }}
    >
      <SendToChange
        open={openSendToChange}
        setOpen={setOpenSendToChange}
        id={id}
        />
      <div className={style.title}>
        <span>#ԳՓ - ՄՈՒՏՔ ԳՈՐԾ. #{id}</span>
      </div>
      <Grid container>
        <Grid item xs={4}>
          <div className={style.nameCont}>
            <div className={style.gridlarge}>{user && (user.firstName + " " + user.lastName)}</div>
            <div className={style.gridsmall}>address:</div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={inventory}
                onChange={() => {
                  setInventory(!inventory);
                }}
              />
            }
            label="Հաշիվ-Ապրանքագիր"
          />
        </Grid>
        <Grid item xs={4}>
          <div className={style.infoCont}>
            <div className={style.itemdiv}>Ամսաթիվ`</div>
            <div className={style.itemdiv}>{docInfo["Ամսաթիվ"]}</div>
            <div className={style.itemdiv}>Մատակարար</div>
            <div className={style.itemdiv}>{docInfo["Մատակարար"]}</div>
            <div className={style.itemdiv}>Վճարում`</div>
            <div className={style.itemdiv}>{docInfo["Պահեստ"]}</div>
            <div className={style.itemdiv}>Պահեստ`</div>
            <div className={style.itemdiv}>{docInfo["Պահեստ"]}</div>
            <div className={style.itemdiv}>Հիշեցման Ամսաթիվ`</div>
            <div className={style.itemdiv}>{alarmDate}</div>
          </div>
        </Grid>
      </Grid>
      {!!rowData.length && <Table rowData={rowData} settings={"print"} />}

      <div className={style.totalContainer}>
        <div className={style.item}>{`Ընդհանուր գումար՝ ${allTotal} դրամ`}</div>
        <div className={` ${style.darkBackGround} ${style.item}`}>
          {`Վճարված գումար ${paid ? paid : 0} դրամ`}
        </div>
        <div className={` ${style.lightBackGround} ${style.item}`}>
          {`Մնացորդ՝ ${debt ? debt : 0} դրամ`}
        </div>
      </div>
      <div className={style.ButtonsCont} >
          <span style={{color:"#fff", marginLeft:"10px" }}>
            <Button
                variant="contained"
                size="large"
                color="inherit"
                style={{backgroundColor:"#fa8564"}}
                onClick={handleChange}
            >
                <HighlightOffIcon /> &nbsp; Փոփոխել
            </Button>
            </span>
            <span style={{color:"#fff", marginLeft:"10px" }}>
            <Button
                variant="contained"
                size="large"
                style={{backgroundColor:"#95b75d"}}
                color="inherit"
            >
                <SendIcon /> &nbsp; Ուղարկել
            </Button>
            </span>
            <span style={{color:"#fff", marginLeft:"10px" }}>
            <Button
                variant="contained"
                size="large"
                style={{backgroundColor:"#00a8b3"}}
                color="inherit"
            >
                <PrintIcon /> &nbsp; Տպել գնապիտակներ
            </Button>
            </span>
            <span style={{color:"#fff", marginLeft:"10px" }}>
            <Button
                variant="contained"
                size="large"
                style={{backgroundColor:"#57c8f1"}}
                color="inherit"
            >
                <PrintIcon /> &nbsp; Տպել Բարկոդեր
            </Button>
            </span>
            <span style={{color:"#fff", marginLeft:"10px" }}>
            <Button
                variant="contained"
                size="large"
                style={{backgroundColor:"#f3c022"}}
                color="inherit"
            >
                <PrintIcon /> &nbsp; Տպել Ներքին Գնապիտակներ
            </Button>
            </span>
            
      </div>
    </div>
  );
}
