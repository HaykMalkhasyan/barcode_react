import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchProduct from "../../outlets/search/search";
import style from "./itemsByGroupRoot.module.css";
import {TextField, Button, Grid} from "@material-ui/core"
import Table from "../../../../components/table/table"
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PrintIcon from '@material-ui/icons/Print';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TelegramIcon from '@material-ui/icons/Telegram';
import RemoveIcon from '@material-ui/icons/Remove';
import GavelIcon from '@material-ui/icons/Gavel';

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
            "Վաճ. գին Վաճառքի գին":0, 
            "Վաճ. գումար Վաճառքի գին": 0, 
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


  useEffect(()=>{
    if(id){
        let documents = localStorage.getItem("documents")
        if(documents){
            documents = JSON.parse(documents)
            console.log('documents', documents)
            let item = documents.find(x=>x["#"]==id)
            console.log(item)
            if(item){
                setDocument(item)
            }else{
                history.replace("/outlets")    
            }
        }else{
            history.replace("/outlets")
        }
    }
  },[id])




  function addRow(params) {
      return
  }


  return (
    <div style={{ padding: "144px 18px 8px" }}>
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
                    <span>{`Ամսաթիվ՝ ${document && document["Ամսաթիվ"]}`}</span>
                    <div className={style.buttonsCont} >
                        <span style={{marginRight:"40px"}} >{`Գործողութ․ `}</span>
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
                    <span>{`Մատակարար՝ ${document && document["Մատակարար"]}`}</span>
                    <span>{`Պահեստ՝ ${document && document["Պահեստ"]}`}</span>
                    <div className={style.buttonsCont} >
                        <span style={{marginRight:"40px"}} >{`Այլ՝ `}</span>
                        <Button
                            variant="contained"
                            style={{marginRight:"20px"}}
                        >
                            ՈՒղառկել
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
          />
          <div className={style.downButtons} >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{margin:"10px"}}
          >
              Պահպանել Փոփոխությունները
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            style={{margin:"10px"}}
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
