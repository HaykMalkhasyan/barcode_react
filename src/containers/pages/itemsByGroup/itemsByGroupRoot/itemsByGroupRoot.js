import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchProduct from "../../outlets/search/search";
import style from "./itemsByGroupRoot.module.css";
import { TextField, Button, Grid, Fab } from "@material-ui/core";
import Table from "../../../../components/table/table";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import PrintIcon from "@material-ui/icons/Print";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import TelegramIcon from "@material-ui/icons/Telegram";
import RemoveIcon from "@material-ui/icons/Remove";
import GavelIcon from "@material-ui/icons/Gavel";
import DeleteRowDialog from "./deleteRowDialog";
import EditIcon from "@material-ui/icons/Edit";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import Editor from "./editor";
import GenerateSellPrices from "./generateSellPrices";
import Axios from "axios";
import cookie from '../../../../services/cookies'
import FormulateDialog from "./FormulateDocument"

export default function ItemsByGroup() {
  const initialData = [
    {
      "#": 1,
      ԱՊՄ: "",
      Անվանում: "",
      Մնացորդ: 0,
      ԱՏԳ: 0,
      Քանակ: 0,
      "Մատակարարի գին": 0,
      Զեղչ: 0,
      "Առքի գին": 0,
      "Առքի գումար": 0,
      "Վաճ գին Վաճառքի գին": 0,
      "Վաճ գումար Վաճառքի գին": 0,
      "Տոկոս Վաճառքի գին": 0,
      Բարկոդ: "",
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const [selecteds, setSelected] = useState();
  const [sellingPrice, setSellingPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [quanty, setQuanty] = useState(0);
  const [percent, setPercent] = useState(0);
  const [cashbox, setCashbox] = useState([]);
  const quantyRef = useRef();
  const sellingPriceRef = useRef();
  const searchRef = useRef();
  const buyPriceRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [keyAutoComplate] = useState(1);
  const [rowData, setRowData] = useState(initialData);
  const [document, setDocument] = useState();
  const id = location.pathname.split("/")[2];
  const [openDelete, setOpenDelete] = useState({ bool: false, index: null });
  const [success, setSuccess] = useState({});
  const [editorOpen, setEditorOpen] = useState({ bool: false, type: null });
  const [openFormulateDialog, setOpenFormulateDialog] = useState(false)


  const [supliers, setSupliers] = useState([
    { name: "Գրանդ Քենդի", id: 1256 },
    { name: "789789", id: 2666 },
  ]);
  const [storeHouses, setStoreHouses] = useState([
    { name: "Հիմնական", id: 1256 },
    { name: "Պահեստ 2", id: 2666 },
  ]);

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
  }, []);

  const [openSellGen, setOpenSellGen] = useState(false);

  useEffect(() => {
    if (id) {
      let documents = localStorage.getItem("documents");
      if (documents) {
        documents = JSON.parse(documents);
        let item = documents.find((x) => x["#"] == id);
        if (item) {
          setDocument(item);
          let rowdata = localStorage.getItem(`document_${id}`);
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

  function addRow() {
    if (!selecteds) {
      return;
    }

    let data = {
      "#":
        rowData.length === 1 &&
        JSON.stringify(initialData) === JSON.stringify(rowData)
          ? 1
          : rowData.length + 1,
      ԱՊՄ: selecteds.articul,
      Անվանում: selecteds.item_name,
      Մնացորդ: 0,
      ԱՏԳ: selecteds.adgt,
      Քանակ: quanty,
      "Մատակարարի գին": buyPrice,
      Զեղչ: 0,
      "Առքի գին": buyPrice,
      "Առքի գումար": +buyPrice * +quanty,
      "Վաճ գին Վաճառքի գին": sellingPrice,
      "Վաճ գումար Վաճառքի գին": +sellingPrice * +quanty,
      "Տոկոս Վաճառքի գին": percent.toFixed() + "%",
      Բարկոդ: "",
    };
    //
    if (
      rowData.length === 1 &&
      JSON.stringify(initialData) === JSON.stringify(rowData)
    ) {
      setRowData([data]);
    } else {
      setRowData([...rowData, data]);
    }
    return;
  }

  function saveAll() {
    localStorage.setItem(`document_${id}`, JSON.stringify(rowData));
    setSuccess({
      status: "success",
      message: "Փոփոխությունները հաջողությամբ պահպանվել են",
      open: true,
    });
  }

  function updateRowData(index, data, params) {
    console.log("params", params);
    let changedField = params.colDef.field;
    setRowData(initialData);
    let clone = JSON.parse(JSON.stringify(rowData));
    data["Մատակարարի գին"] = +data["Մատակարարի գին"];
    data["Առքի գին"] = +data["Առքի գին"];
    data["Վաճ գին Վաճառքի գին"] = +data["Վաճ գին Վաճառքի գին"];
    data["Տոկոս Վաճառքի գին"] = +data["Տոկոս Վաճառքի գին"];
    data["Զեղչ"] = +data["Զեղչ"];
    data["Քանակ"] = +data["Քանակ"];

    switch (changedField) {
      case "Մատակարարի գին":
        data["Առքի գին"] =
          data["Զեղչ"] > 0
            ? data["Մատակարարի գին"] -
              (data["Մատակարարի գին"] * data["Զեղչ"]) / 100
            : data["Մատակարարի գին"];
        data["Առքի գումար"] = data["Առքի գին"] * data["Քանակ"];
        break;

      case "Առքի գին":
        if (data["Առքի գին"] > data["Մատակարարի գին"]) {
          setSuccess({
            status: "error",
            message: "Արժեքը չի կարող լինել Մատակարարի Գնից մեծ",
            open: true,
          });
          data[changedField] = params.oldValue;
          break;
        }
        data["Զեղչ"] = 100 - (data["Առքի գին"] * 100) / data["Մատակարարի գին"];
        data["Առքի գումար"] = data["Առքի գին"] * data["Քանակ"];
        break;

      case "Առքի գումար":
        data["Առքի գին"] = data["Առքի գումար"] / data["Քանակ"];
        if (data["Առքի գին"] > data["Մատակարարի գին"]) {
          setSuccess({
            status: "error",
            message: "Արժեքը չի կարող լինել Մատակարարի Գնից մեծ",
            open: true,
          });
          data[changedField] = params.oldValue;
          data["Առքի գին"] = data["Առքի գումար"] / data["Քանակ"];
          break;
        }
        data["Զեղչ"] = 100 - (data["Առքի գին"] * 100) / data["Մատակարարի գին"];
        break;

      case "Զեղչ":
        if (data[changedField] < 0 || data[changedField] >= 100) {
          setSuccess({
            status: "error",
            message: "Արժեքը պետք է լինի 0-99 միջակայքում",
            open: true,
          });
          data[changedField] = params.oldValue;
          break;
        }
        data["Առքի գին"] =
          data["Զեղչ"] > 0
            ? data["Մատակարարի գին"] -
              (data["Մատակարարի գին"] * data["Զեղչ"]) / 100
            : data["Մատակարարի գին"];
        data["Առքի գումար"] = data["Առքի գին"] * data["Քանակ"];
        break;

      case "Վաճ գին Վաճառքի գին" || "Մատակարարի գին":
        data["Վաճ գումար Վաճառքի գին"] =
          data["Վաճ գին Վաճառքի գին"] * data["Քանակ"];
        break;
      case "Վաճ գումար Վաճառքի գին":
        data["Վաճ գին Վաճառքի գին"] =
          data["Վաճ գումար Վաճառքի գին"] / data["Քանակ"];
        break;
      case "Քանակ":
        data["Վաճ գումար Վաճառքի գին"] =
          data["Վաճ գին Վաճառքի գին"] * data["Քանակ"];
        data["Առքի գումար"] = data["Առքի գին"] * data["Քանակ"];
        break;

      default:
        break;
    }

    let percent =
      ((data["Վաճ գին Վաճառքի գին"] - data["Առքի գին"]) * 100) /
      data["Առքի գին"];
    data["Տոկոս Վաճառքի գին"] = Number.isInteger(percent)
      ? percent + "%"
      : percent.toFixed(2) + "%";
    console.log("data", data);
    clone[index] = data;
    localStorage.setItem(`document_${id}`, JSON.stringify(clone));
    setRowData([...clone]);
  }

  function generateSellingPrices(percent, byWhom, fixBy) {
    let clone = JSON.parse(JSON.stringify(rowData));
    clone = clone.map((item) => {
      let sellingPrice = item["Վաճ գումար Վաճառքի գին"];
      let quanty = item["Քանակ"];
      if (byWhom === "Առքի գին") {
        sellingPrice = item["Առքի գին"] + (item["Առքի գին"] * percent) / 100;
      } else {
        sellingPrice =
          item["Մատակարարի գին"] + (item["Մատակարարի գին"] * percent) / 100;
      }
      if (fixBy === 5) {
        sellingPrice = Math.ceil(sellingPrice / 5) * 5;
      } else {
        sellingPrice = Math.ceil(sellingPrice / 10) * 10;
      }
      let percentTotal =
        ((sellingPrice - item["Առքի գին"]) * 100) / item["Առքի գին"];
      percentTotal = Number.isInteger(percentTotal)
        ? percentTotal
        : percentTotal.toFixed(2);
      console.log("obj", {
        ...item,
        "Վաճ գումար Վաճառքի գին": sellingPrice * quanty,
        "Վաճ գին Վաճառքի գին": sellingPrice,
        "Տոկոս Վաճառքի գին": percentTotal,
      });
      return {
        ...item,
        "Վաճ գումար Վաճառքի գին": sellingPrice * quanty,
        "Վաճ գին Վաճառքի գին": sellingPrice,
        "Տոկոս Վաճառքի գին": percentTotal + "%",
      };
    });
    setRowData(clone);
  }

  return (
    <div style={{ padding: "144px 18px 8px" }}>
      <FormulateDialog 
        open={openFormulateDialog}
        setOpen={setOpenFormulateDialog}
        document={document}
        id={id}
        rowData={rowData}
        
      />
      <GenerateSellPrices
        generateSellingPrices={generateSellingPrices}
        open={openSellGen}
        setOpen={setOpenSellGen}
      />
      <Editor
        open={editorOpen}
        setOpen={setEditorOpen}
        values={
          editorOpen.type === "Մատակարար"
            ? supliers
            : editorOpen.type === "Պահեստ"
            ? storeHouses
            : null
        }
        document={document}
        setDocument={setDocument}
        id={id}
      />
      <SnackbarMessage open={success} setOpen={setSuccess} />

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
            if (sellingPrice) {
              let percent =
                ((sellingPrice - +e.target.value) * 100) / +e.target.value;
              setPercent(percent);
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
            if (buyPrice) {
              let percent = ((+e.target.value - buyPrice) * 100) / buyPrice;
              setPercent(percent);
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

      <div className={style.table}>
        <Grid container>
          <Grid item xs={6}>
            <div className={style.contentSection}>
              <span>{`Փաստաթուղթ՝ #${id}`}</span>{" "}
              <span className={style.infoSpan}>
                {`Ամսաթիվ՝ ${
                  document && document["Ամսաթիվ"]
                    ? typeof document["Ամսաթիվ"] === "string" &&
                      document["Ամսաթիվ"].includes("T")
                      ? document["Ամսաթիվ"].split("T").join(" ")
                      : document["Ամսաթիվ"]
                    : "null"
                }`}{" "}
                &nbsp;{" "}
                <Fab
                  size="small"
                  onClick={() => setEditorOpen({ bool: true, type: "Ամսաթիվ" })}
                >
                  {" "}
                  <EditIcon htmlColor="#3f51b5" />{" "}
                </Fab>{" "}
              </span>
              <div className={style.buttonsCont}>
                <span style={{ marginRight: "40px" }}>{`Գործողութ․ `} </span>
                <Button variant="contained" style={{ marginRight: "20px" }}>
                  Մատակարարի Ապրանքներ &nbsp;
                  <ViewComfyIcon />
                </Button>
                <Button style={{ marginRight: "20px" }} variant="contained">
                  Տպել &nbsp;
                  <PrintIcon />
                </Button>
                <Button variant="contained">
                  իմպորտ Excel &nbsp;
                  <ArrowDownwardIcon />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={style.contentSection}>
              <span className={style.infoSpan}>
                {`Մատակարար՝ ${document && document["Մատակարար"]}`} &nbsp;{" "}
                <Fab
                  size="small"
                  onClick={() =>
                    setEditorOpen({ bool: true, type: "Մատակարար" })
                  }
                >
                  {" "}
                  <EditIcon htmlColor="#3f51b5" />{" "}
                </Fab>
              </span>
              <span className={style.infoSpan}>
                {`Պահեստ՝ ${document && document["Պահեստ"]}`} &nbsp;{" "}
                <Fab
                  size="small"
                  onClick={() => setEditorOpen({ bool: true, type: "Պահեստ" })}
                >
                  {" "}
                  <EditIcon htmlColor="#3f51b5" />{" "}
                </Fab>
              </span>
              <div className={style.buttonsCont}>
                <span style={{ marginRight: "40px" }}>{`Այլ՝ `}</span>
                <Button variant="contained" style={{ marginRight: "20px" }}>
                  ՈՒղարկել &nbsp;
                  <TelegramIcon />
                </Button>
                <Button style={{ marginRight: "20px" }} variant="contained">
                  Զրոյացնել քան․ &nbsp;
                  <RemoveIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenSellGen(true);
                  }}
                >
                  Գեներացնել վաճ․ գները &nbsp;
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
        <div className={style.downButtons}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ margin: "0px" }}
            onClick={saveAll}
          >
            Պահպանել Փոփոխությունները
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            style={{ margin: "5px 0px" }}
            onClick={() => {
              setOpenDelete({ bool: true, index: "document", documentId: id });
            }}
          >
            Ջնջել Թաստաթուղթը
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            fullWidth
            style={{ margin: "0px" }}
            onClick={()=>{setOpenFormulateDialog(true)}}
          >
            Ձևակերպել Թաստաթուղթը
          </Button>
        </div>
      </div>
    </div>
  );
}
