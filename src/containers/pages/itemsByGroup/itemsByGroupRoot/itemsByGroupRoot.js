import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchProduct from "../../outlets/search/search";
import style from "./itemsByGroupRoot.module.css";
import {TextField, Button, Grid, IconButton, Fab} from "@material-ui/core"
import Table from "../../../../components/table/table"
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PrintIcon from '@material-ui/icons/Print';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TelegramIcon from '@material-ui/icons/Telegram';
import RemoveIcon from '@material-ui/icons/Remove';
import GavelIcon from '@material-ui/icons/Gavel';
import DeleteRowDialog from "./deleteRowDialog";
import EditIcon from '@material-ui/icons/Edit';
import SnackbarMessage from "../../outlets/outlets/snackbar"
import Editor from "./editor"


export default function ItemsByGroup(props) {
    const initialData =[
        {
            "#":1, 
            "ԱՊՄ": "", 
            "Անվանում": "", 
            "Մնացորդ": 0, 
            "ԱՏԳ": 0, 
            "Քանակ": 0, 
            "Մատակարարի գին": 0, 
            "Զեղչ": 0, 
            "Առքի գին": 0, 
            "Առքի գումար": 0, 
            "Վաճ գին Վաճառքի գին":0, 
            "Վաճ գումար Վաճառքի գին": 0, 
            "Տոկոս Վաճառքի գին":0, 
            "Բարկոդ":"", 
        },
    ]  
    
  const location = useLocation();
  const history = useHistory()
  const [selecteds, setSelected] = useState();
  const [sellingPrice, setSellingPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [quanty, setQuanty] = useState(0);
  const [percent, setPercent] = useState(0)
  const [cashbox, setCashbox] = useState([]);
  const quantyRef = useRef();
  const sellingPriceRef = useRef();
  const searchRef = useRef();
  const buyPriceRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [keyAutoComplate, setKeyAutoComplate] = useState(1);
  const [rowData, setRowData] = useState(initialData);
  const [document, setDocument] = useState()
  const id = location.pathname.split("/")[2]
  const [openDelete, setOpenDelete] = useState({bool:false, index:null})
  const [success, setSuccess] = useState({})
  const [editorOpen, setEditorOpen] = useState({bool:false, type:null})
  
  const [supliers, setSupliers] = useState([{name:"Գրանդ Քենդի", id:1256}, {name:"789789", id:2666}]);
  const [storeHouses, setStoreHouses] = useState([{name:"Հիմնական", id:1256}, {name:"Պահեստ 2", id:2666}]);


  useEffect(()=>{
    if(id){
        let documents = localStorage.getItem("documents")
        if(documents){
            documents = JSON.parse(documents)
            let item = documents.find(x=>x["#"]==id)
            if(item){
                setDocument(item)
                let rowdata = localStorage.getItem(`document_${id}`)
                if(rowdata){
                  setRowData(JSON.parse(rowdata))
                }
            }else{
                history.replace("/income")    
            }
        }else{
            history.replace("/income")
        }
    }
  },[id])




  function addRow(params) {
    if(selecteds.item_name)
    console.log('buyPrice', buyPrice)
    console.log('+buyPrice*+quanty', +buyPrice*+quanty)
    console.log('sellingPrice', sellingPrice)
    console.log('+sellingPrice*+quanty', +sellingPrice*+quanty)
    
      let data =  {
        "#": rowData.length===1 && JSON.stringify(initialData)===JSON.stringify(rowData) ? 1 : rowData.length+1, 
        "ԱՊՄ": "", 
        "Անվանում": selecteds.item_name, 
        "Մնացորդ": 0, 
        "ԱՏԳ": 0, 
        "Քանակ": quanty, 
        "Մատակարարի գին": buyPrice, 
        "Զեղչ": 0, 
        "Առքի գին": buyPrice, 
        "Առքի գումար": +buyPrice * +quanty, 
        "Վաճ գին Վաճառքի գին":sellingPrice, 
        "Վաճ գումար Վաճառքի գին": +sellingPrice * +quanty, 
        "Տոկոս Վաճառքի գին":percent.toFixed()+"%", 
        "Բարկոդ":"",
    }
      // 
      if(rowData.length===1 && JSON.stringify(initialData)===JSON.stringify(rowData)){
        setRowData([data])
      }else{
        setRowData([...rowData, data])
      }
      return
  }

  function saveAll(params) {
    localStorage.setItem(`document_${id}`, JSON.stringify(rowData))
    setSuccess({status:"success", message:"Փոփոխությունները հաջողությամբ պահպանվել են",open: true})
  }


  function updateRowData(index, data) {
    setRowData(initialData)
    let clone = JSON.parse(JSON.stringify(rowData))
    let buyprice = +data['Առքի գին']
    let sellPrice = +data['Վաճ գին Վաճառքի գին']
    let percent = +data['Տոկոս Վաճառքի գին']
    let buyPercent = +data['Զեղչ']
    let quanty = +data['Քանակ']
    if(+buyPercent>0){
      buyprice = buyprice-(buyprice * buyPercent)/100
    }
    percent = ((+sellPrice - +buyprice)*100)/+buyprice
    data['Մատակարարի գին'] = buyprice
    data['Առքի գումար'] = quanty * buyprice
    data['Վաճ գումար Վաճառքի գին'] = quanty * sellPrice
    data['Տոկոս Վաճառքի գին'] = percent+"%"
    console.log('data', data)
    clone[index] = data
    localStorage.setItem(`document_${id}`, JSON.stringify(clone))
      setRowData([...clone])
  } 


  return (
    <div style={{ padding: "144px 18px 8px" }}>
      <Editor
        open={editorOpen}
        setOpen={setEditorOpen}
        values={editorOpen.type==="Մատակարար" ? supliers : editorOpen.type==="Պահեստ" ? storeHouses : null }
        document={document}
        setDocument={setDocument}
        id={id}
      />
      <SnackbarMessage 
        open={success} 
        setOpen={setSuccess} 
      />

      <DeleteRowDialog 
        open={openDelete}
        setOpen={setOpenDelete}
        setRowData={setRowData}
        rowData={rowData}
        initialData={initialData}
      />
      <div className={style.addProduct}>
        <SearchProduct
            path="Products"
            param="item_name"
            product={true}
            keyAutoComplate={keyAutoComplate}
            inputValue={inputValue}
            setInputValue={setInputValue}
            cashbox={cashbox}
            reff={quantyRef}
            searchRef={searchRef}
            setCashbox={setCashbox}
            selecteds={selecteds}
            setSelected={setSelected}
            setSellingPrice={setSellingPrice}
            buyPrice={buyPrice}
            setBuyPrice={setBuyPrice}
            quanty={quanty}
            setQuanty={setQuanty}
        />

        <TextField
          margin="none"
          style={{ margin: "0px 10px" }}
          size="small"
          inputRef={quantyRef}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              quanty && buyPriceRef.current.focus();
            }
          }}
          label="Քանակ"
          type="number"
          value={quanty}
          onChange={(e) => {
            setQuanty(+e.target.value);
          }}
          variant="outlined"
          onFocus={(event) => {
            event.target.select();
          }}
        />
        <TextField
            size="small"
            style={{ margin: "0px 10px 0px 0px" }}
            inputRef={buyPriceRef}
            label="Առքի Գին"
            type="number"
            value={buyPrice}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                buyPrice && sellingPriceRef.current.focus();
              }
            }}
            
            onChange={(e) => {
              setBuyPrice(+e.target.value);
              if(sellingPrice){
                let percent = ((sellingPrice - +e.target.value)*100)/+e.target.value
                setPercent(percent)
              }
            }}
            variant="outlined"
            onFocus={(event) => {
              event.target.select();
            }}
          />
        <TextField
            size="small"
            style={{ margin: "0px 10px 0px 0px" }}
            inputRef={sellingPriceRef}
            label="Վաճառքի Գին"
            type="number"
            value={sellingPrice}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                addRow();
              }
            }}
            onChange={(e) => {
              setSellingPrice(+e.target.value);
              if(buyPrice){
                let percent = ((+e.target.value - buyPrice)*100)/buyPrice
                setPercent(percent)
              }
            }}
            variant="outlined"
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              addRow();
            }}
          >
            Ավելացնել
          </Button>
      </div>

      <div className={style.table} >
          <Grid container >
              <Grid item xs={6}>
                <div className={style.contentSection} >
                    <span>{`Փաստաթուղթ՝ #${id}`}</span>
                    <span className={style.infoSpan} >{`Ամսաթիվ՝ ${document && document["Ամսաթիվ"]}`} &nbsp;  <Fab size="small" onClick={()=>setEditorOpen({bool:true, type:"Ամսաթիվ"})} > <EditIcon htmlColor="#3f51b5" /> </Fab> </span>
                    <div className={style.buttonsCont} >
                        <span style={{marginRight:"40px"}} >{`Գործողութ․ `} </span>
                        <Button
                            variant="contained"
                            style={{marginRight:"20px"}}
                        >
                            Մատակարարի Ապրանքներ
                            &nbsp;
                            <ViewComfyIcon />
                        </Button>
                        <Button
                        style={{marginRight:"20px"}}
                            variant="contained"
                        >
                            Տպել
                            &nbsp;
                            <PrintIcon />
                        </Button>
                        <Button
                            variant="contained"
                        >
                            իմպորտ Excel
                            &nbsp;
                            <ArrowDownwardIcon />
                        </Button>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={style.contentSection} >
                    <span className={style.infoSpan} >{`Մատակարար՝ ${document && document["Մատակարար"]}`}  &nbsp;  <Fab size="small" onClick={()=>setEditorOpen({bool:true, type:"Մատակարար"})} > <EditIcon htmlColor="#3f51b5" /> </Fab></span>
                    <span className={style.infoSpan} >{`Պահեստ՝ ${document && document["Պահեստ"]}`}  &nbsp;  <Fab size="small" onClick={()=>setEditorOpen({bool:true, type:"Պահեստ"})} > <EditIcon htmlColor="#3f51b5" /> </Fab></span>
                    <div className={style.buttonsCont} >
                        <span style={{marginRight:"40px"}} >{`Այլ՝ `}</span>
                        <Button
                            variant="contained"
                            style={{marginRight:"20px"}}
                        >
                            ՈՒղարկել
                            &nbsp;
                            <TelegramIcon />
                        </Button>
                        <Button
                        style={{marginRight:"20px"}}
                            variant="contained"
                        >
                            Զրոյացնել քան․
                            &nbsp;
                            <RemoveIcon />
                        </Button>
                        <Button
                            variant="contained"
                        >
                            Գեներացնել վաճ․ գները
                            &nbsp;
                            <GavelIcon />
                        </Button>
                    </div>
                </div>
            </Grid>
          </Grid>
          <Table
            rowData={rowData} 
            editabeFields={[
              "Քանակ",
              "Մատակարարի գին",
              "Զեղչ",
              "Առքի գին",
              "Առքի գումար",
              "Վաճ գին Վաճառքի գին",
            ]}
            dataUpdater={updateRowData}
            settings={"delete"}
            setOpenDelete={setOpenDelete}
          />
          <div className={style.downButtons} >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{margin:"10px"}}
            onClick={saveAll}
          >
              Պահպանել Փոփոխությունները
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            style={{margin:"10px"}}
            onClick={()=>{
              setOpenDelete({bool:true, index:"document", documentId:id})
            }}
          >
              Ջնջել Թաստաթուղթը
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            fullWidth
            style={{margin:"10px"}}
          >
              Ձևակերպել Թաստաթուղթը
          </Button>
          </div>
      </div>
    </div>
  );
}
