import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "./ag-grid.css";
import "./excelLikeTable.css";

import "ag-grid-enterprise";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PrintIcon from "@material-ui/icons/Print";
import { IconButton } from "@material-ui/core";
import style from "./table.module.css";
import AddIcon from "@material-ui/icons/Add";
import { getMissing, mult, add, div, getFullDate } from "../../services/services";
import TableOptins from "./tableOptions";
import {defExpandedsF, selectedsF} from "./exampleForm/exampleForm"

import printStyles from "./printStyle.module.css"


const App = (props) => {
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [, setFloatingFilter] = useState(true);
  const [rowData, setRowData] = useState(createData(50, 18, props.rowData));

  const {
    setOpenDelete,
    fullData,
    setParentRowData,
    parentRowData,
    setOpenSulierProductDialog,
    parentGridApi,
  } = props;
  const tableRef = useRef();
  const [opacity, setOpacity] = useState(0);
  const [allExpandedCell, setAllExpandedCell] = useState({
    row: 10,
    col: "R",
    colSize: 2,
    rowSize: 3,
  });
  const [allExpandedCells, setAllExpandedCells] = useState([]);
  const [selectedRangeCellsHeader, setSelectedRangeCellsHeader] = useState(
    null
  );

  const [selecteds, setSelecteds] = useState({});

  const [functionalCells, setFunctionalCells] = useState([]);
    const gridRef=useRef()
    const [paperHeight, setPaperHeight] = useState(null)
    const [paperWidth, setPaperWidth] = useState(12)
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);

  function getHeaderName(charcode, add = 0) {
    if (charcode >= 65 && charcode <= 90) {
      let res = "";
      for (let i = 0; i <= add; i++) {
        res += String.fromCharCode(charcode);
      }
      return res;
    } else if (charcode > 90) {
      let quanty = 0;
      while (charcode > 90) {
        charcode -= 26;
        quanty++;
      }
      return getHeaderName(charcode, quanty);
    }
  }

  function createData(n, m, initialData, start=0) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      let obj = {};
      for (let j = 0; j < m; j++) {
        obj[getHeaderName(65 + j)] = "";
      }
      arr[i] = { "/": i + 1, ...obj };
    }
    arr[0].A = `Գնման Փաստաթուղթ՝ #${props.id} / ${getFullDate(null, false, false)} թ.`;
    arr[1].A = "Խանութի Տվյալներ";
    arr[2].A = "Հասցե՝";
    arr[3].A = "ՀՎՀՀ՝";
    arr[4].A = "Էլ. Փոստ՝";
    arr[5].A = "Հեռ.՝";
    arr[6].A = "Կոնտ. Անձ՝";
    let headers = Object.keys(arr[0])
    let len = Object.keys(initialData  && initialData.length ? initialData[0] : arr[0]).length;
    let header = headers[6]
    let arrLen = arr.length 
    let initialDataLen = initialData && initialData.length ? initialData.length : arr.length
    arr[1][header] = "Մատակարարի Տվյալներ";
    arr[2][header] = "Հասցե՝";
    arr[3][header] = "ՀՎՀՀ՝";
    arr[4][header] = "Էլ. Փոստ՝";
    arr[5][header] = "Հեռ.՝";
    arr[6][header] = "Կոնտ. Անձ՝";

// if(initialData && initialData.length){
//     arr[initialDataLen+2+start].A = "Հանձնեց՝";
//     arr[initialDataLen+3+start].A = "Անուն Ազգանուն";
//     arr[initialDataLen+4+start].A = "Ստորագրություն";
//     arr[initialDataLen+6+start].A = "Ընդունեց՝";
//     arr[initialDataLen+7+start].A = "Անուն Ազգանուն";
//     arr[initialDataLen+8+start].A = "Ստորագրություն";
// }
    return arr;
  }

  useEffect(() => {
    if (!!props.rowData && props.rowData.length && !!gridApi) {
      try {
        let start = 10;
        let keysprops = Object.keys(props.rowData[0]);
        let keysLocale = Object.keys(rowData[0]);
        
        let fullScreenCount = Math.ceil(tableRef.current.offsetWidth/69)
        
        let colsSize = keysprops.length;
        let rowsSize = props.rowData.length + 20; 
        let clone = createData(rowsSize, colsSize, props.rowData, start);
        for (let j = 0, i = 0; i < keysprops.length; i++, j++) {
          if (keysprops[i] === "#") {  //skip index of product
            i++;
          }
          clone[start - 1][keysLocale[j + 1]] = keysprops[i];
          for (let k = 0; k < props.rowData.length; k++) {
            clone[start + k][keysLocale[j + 1]] =
              props.rowData[k][keysprops[i]];
          }
        }
        setRowData(clone);
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [props.rowData, gridApi]);



  useEffect(()=>{
let isDown = {bool:false};
let val;
let index;
    function controll(e){
      index=e.target.id
      e.stopPropagation();
      if(e.target.className.includes && (e.target.className.includes("rightControll")||e.target.className.includes("leftControll") || e.target.className.includes("topControll") || e.target.className.includes("bottomControll"))){
        isDown = {bool:true, id: e.target.className.split(" ")[1]}
      }
    }

    function mmtopx(mm){
      return mult(mm, 3.77)
    }

    function controlMove(e){
      if(isDown.bool){
        let currentPaper = document.getElementsByClassName("paperRef")[index]
        let fullWidth = mmtopx(parseInt(currentPaper.style.width)) + currentPaper.getBoundingClientRect().left + window.scrollX
        let fullHeight = mmtopx(parseInt(currentPaper.style.height)) + currentPaper.getBoundingClientRect().top + window.scrollY
        let paperWidthInPx = mmtopx(parseInt(currentPaper.style.width))
        let paperHeightInPx = mmtopx(parseInt(currentPaper.style.height))
        switch (isDown.id) {
          case "rightControll":
            val= fullWidth-e.clientX
            val = val < 0 ? 1 : val > paperWidthInPx ? paperWidthInPx : val
            Array.from(document.getElementsByClassName("rightMarginValue")).forEach(item=>{
              item.style.display = "block"
              item.innerText = `${(val*0.2645833333).toFixed(2)}mm`
            })
            Array.from(document.getElementsByClassName("printMarginRight")).forEach(item=>{
              item.style.width = `${val}px`
            })
           
            Array.from(document.getElementsByClassName("topRulerMarginRight")).forEach(item=>{
              item.style.width = `${val}px`
            }) 
            break;
            case "leftControll":
            val= e.clientX - currentPaper.getBoundingClientRect().left + window.scrollX
            val = val < 0 ? 1 : val > paperWidthInPx ? paperWidthInPx : val
            Array.from(document.getElementsByClassName("leftMarginValue")).forEach(item=>{
              item.style.display = "block"
              item.innerText = `${(val*0.2645833333).toFixed(2)}mm`
            })
            Array.from(document.getElementsByClassName("printMarginLeft")).forEach(item=>{
              item.style.width = `${val}px`
            })
            Array.from(document.getElementsByClassName("topRulerMarginLeft")).forEach(item=>{
              item.style.width = `${val}px`
            })
            break;
            case "topControll":
            val = e.clientY - currentPaper.getBoundingClientRect().top + window.scrollY
            val = val < 0 ? 1 : val > paperHeightInPx ? paperHeightInPx : val
            Array.from(document.getElementsByClassName("topMarginValue")).forEach(item=>{
              item.style.display = "block"
              item.innerText = `${(val*0.2645833333).toFixed(2)}mm`
            })
            Array.from(document.getElementsByClassName("printMarginTop")).forEach(item=>{
              item.style.height = `${val}px`
            })
            Array.from(document.getElementsByClassName("LeftRulerMarginTop")).forEach(item=>{
              item.style.height = `${val}px`
            })
            break;
            case "bottomControll":
            val=  fullHeight - e.clientY
            val = val < 0 ? 1 : val > paperHeightInPx ? paperHeightInPx : val
            
            Array.from(document.getElementsByClassName("bottomMarginValue")).forEach(item=>{
              item.style.display = "block"
              item.innerText = `${(val*0.2645833333).toFixed(2)}mm`
            })
            Array.from(document.getElementsByClassName("printMarginBottom")).forEach(item=>{
              item.style.height = `${val}px`
            })
            Array.from(document.getElementsByClassName("LeftRulerMarginBottom")).forEach(item=>{
              item.style.height = `${val}px`
            })
            break;
        
          default:
            break;
        }
      }
    }

    function controlEnd(e){
      switch (isDown.id) {
        case "topControll":
          Array.from(document.getElementsByClassName("topMarginValue")).forEach(item=>{
            item.style.display = "none"
          })
          setTop(Math.ceil(val))
        break;
        case "rightControll":
          Array.from(document.getElementsByClassName("rightMarginValue")).forEach(item=>{
            item.style.display = "none"
          })
          setRight(Math.ceil(val))
          break;
        case "leftControll":
          Array.from(document.getElementsByClassName("leftMarginValue")).forEach(item=>{
            item.style.display = "none"
          })
          setLeft(Math.ceil(val))
        break;
        case "bottomControll":
          Array.from(document.getElementsByClassName("bottomMarginValue")).forEach(item=>{
            item.style.display = "none"
          })
          setBottom(Math.ceil(val))
        break;
      
        default:
          break;
      }
      isDown={bool:false}
    }
  if(gridApi){
    window.addEventListener("mousedown",controll)
    window.addEventListener("mousemove", controlMove)
    window.addEventListener("mouseup",controlEnd)
  }
    return ()=>{
      window.removeEventListener("mousedown", controll)
      window.removeEventListener("mousemove", controlMove)
      window.removeEventListener("mouseup",controlEnd)
    }
  },[gridApi])



  // useEffect(() => {
  //   gridApi && gridApi.refreshCells();
  // }, [rowData]);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: ()=>{
      gridApi.redrawRows(); 
      gridApi.deselectAll();  
      Array.from(document.getElementsByClassName("rulerTop")).forEach(item=>{
        item.style.display = "none"
      })
      Array.from(document.getElementsByClassName("rulerLeft")).forEach(item=>{
        item.style.display = "none"
      })
      Array.from(document.getElementsByClassName("marginControllerTop")).forEach(item=>{
        item.style.display = "none"
      })
      Array.from(document.getElementsByClassName("marginControllerLeft")).forEach(item=>{
        item.style.display = "none"
      })
      Array.from(document.getElementsByClassName("marginControllerRight")).forEach(item=>{
        item.style.display = "none"
      })
      Array.from(document.getElementsByClassName("marginControllerBottom")).forEach(item=>{
        item.style.display = "none"
      })
      // let papers = document.getElementsByClassName("paperRef")
      // let paperHeight = papers[0].style.height
      // Array.from(papers).forEach((item, i)=>{
      //   item.style.top = `calc(${parseInt(paperHeight)*i}mm)`
      // })
      // gridApi.setHeaderHeight(0)
      let el = document.getElementsByClassName("ag-header ag-focus-managed ag-pivot-off")[1]
              el.style.margin="0px 0px 10px -25px"
              el.style.backgroundColor="#fff"
              el.style.position = "relative"
              el.style.top="unset"
              el.style.zIndex = 20
      const allCells = document.getElementsByClassName(
        "ag-center-cols-container"
      )[1];
  allCells.style.margin = `${0}px ${right}px ${bottom}px ${left}px`;
    },
    onBeforePrint:()=>{
      gridApi.redrawRows(); 
      gridApi.deselectAll();  
    },
    content: () => tableRef.current,
    pageStyle:()=>{
      let marginTop = document.getElementsByClassName("printMarginTop")[0]
      let paper = document.getElementsByClassName("paperRef")[0]
      let paperHeight = paper.style.height
      let paperWidth = paper.style.width
      let orientation = paperWidth > paperHeight ? "landscape" : "portrait"
      let marginInPx = marginTop.style.height ? marginTop.style.height : "0px"
      return `@page {size: ${ orientation };  margin:${marginInPx} 0px 0px 0px !important}`
    },
    onAfterPrint: () => {
      Array.from(document.getElementsByClassName("rulerTop")).forEach(item=>{
        item.style.display = "flex"
      })
      Array.from(document.getElementsByClassName("rulerLeft")).forEach(item=>{
        item.style.display = "flex"
      })
      Array.from(document.getElementsByClassName("marginControllerTop")).forEach(item=>{
        item.style.display = "block"
      })
      Array.from(document.getElementsByClassName("marginControllerLeft")).forEach(item=>{
        item.style.display = "block"
      })
      Array.from(document.getElementsByClassName("marginControllerRight")).forEach(item=>{
        item.style.display = "block"
      })
      Array.from(document.getElementsByClassName("marginControllerBottom")).forEach(item=>{
        item.style.display = "block"
      })
      let el = document.getElementsByClassName("ag-header ag-focus-managed ag-pivot-off")[1]
              el.style.margin="0px 0px 10px -25px"
              el.style.backgroundColor="#fff"
              el.style.position = "sticky"
              el.style.top="40px"
              el.style.zIndex = 20
      const allCells = document.getElementsByClassName(
        "ag-center-cols-container"
      )[1];
      gridApi.setHeaderHeight(15)

  allCells.style.margin = `${top}px ${right}px ${bottom}px ${left}px`;
    
      // let papers = document.getElementsByClassName("paperRef")
      // let paperHeight = papers[0].style.height
      // Array.from(papers).forEach((item, i)=>{
      //   item.style.top = `calc(${parseInt(paperHeight)*i}mm + ${25}px + ${65 * i}px)`
      // })
      props.setExportStatus({ bool: false });
      // gridApi.setDomLayout(null)
      props.setPending(false)
      // gridApi.setHeaderHeight(16)
    },
    
  });
  

  function btnClickedHandler(props) {
    if (allFormulateds.map((item) => item["#"]).includes(+props.data["#"])) {
      history.push(`/formulatedItem/${props.data["#"]}`);
      return;
    }
    history.push(`/itemsByGroup/${props.data["#"]}`);
    return;
  }

  const regExp = new RegExp(/^([0-9]{0,})([.]{0,1}?)([0-9]{1,})$/);

  function isCharNumeric(input, charStr) {
    let isCharTruty = !!/\d/.test(charStr) ? true : charStr === ".";
    if (charStr === "." && input.includes(".")) {
      return false;
    }
    if (!input && isCharTruty) {
      return true;
    }
    if (!isCharTruty) {
      return false;
    } else {
      let isInputTruty = !!input.match(regExp)
        ? true
        : input[input.length - 1] === ".";
      return isInputTruty;
    }
  }
  function getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which == "undefined" ? event.keyCode : event.which;
  }

  function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(event.target.value, charStr);
  }

  

  

  const columnDefinition = [
    ...Object.keys(rowData[0]).map((item) => {
      if (item === "/") {
        return {
          headerClass:"excelHeaderFirst",
          field: item,
          headerName:"",
          cellStyle: {
            lineHeight:"14px !important",
            border: "none",
            backgroundColor: "#f8f8f8 !important",
            color: "black",
            boxSizing: "border-box",
            marginRight:"50px",
          },
          pinned: 'left',
          suppressMenu:true,
          width: props.rowData.length < 1000 ? 60 : 75,
          sortable: false,
          resizable: false,
          enableCellChangeFlash: false,
          
          editable: false,
        };
      }
      return {
        field: item,
        suppressMenu:true,
        headerClass:"excelHeader",
         
        valueFormatter: function (params) {
          if (params.value && params.value[0] === "=") {
            try {
              let range = params.value.split("(")[1].split(")")[0];
              let start, end;
              let arrValues = [];
              if (range.includes(":")) {
                start = range.split(":");
                end = start[1];
                start = start[0];
                let index = start.search(/\d/);
                let startCol = start.substring(0, index);
                let row1 = start.substring(index) - 1;

                let indexEnd = end.search(/\d/);
                let endCol = end.substring(0, indexEnd);
                let row2 = end.substring(indexEnd) - 1;

                let startRow = Math.min(row1, row2);
                let endRow = Math.max(row1, row2);

                for (let i = startRow; i <= endRow; i++) {
                  let data = params.api.getDisplayedRowAtIndex(i).data;
                  for (let key in data)
                    if (key === startCol) {
                      arrValues.push(data[key]);
                    } else if (key === endCol) {
                      arrValues.push(data[key]);
                      break;
                    } else {
                      continue;
                    }
                }
              } else if (range.includes(",")) {
                let rangeArr = range.split(",");
                rangeArr.forEach((item) => {
                  let index = item.search(/\d/);
                  let col = item.substring(0, index);
                  let row = item.substring(index) - 1;
                  arrValues.push(
                    params.api.getDisplayedRowAtIndex(row).data[col]
                  );
                });
              } else {
                return params.value;
              }
              arrValues = arrValues.filter((item) => !!+item);
              if (params.value.includes("SUM")) {
                return arrValues.reduce((total, item) => {
                  return (total = add(total, item));
                }, 0);
              } else if (params.value.includes("AVERAGE")) {
                let total = arrValues.reduce((total, item) => {
                  return (total = add(total, item));
                }, 0);
                return div(total, arrValues.length);
              } else if (params.value.includes("MAX")) {
                return Math.max(...arrValues);
              } else if (params.value.includes("MIN")) {
                return Math.min(...arrValues);
              }
            } catch (err) {
              return params.value;
            }
          } else {
            return params.value;
          }
        },
        cellStyle: {
          border: "1px solid #d3d3d34d",
          boxSizing: "border-box",
          lineHeight:"14px !important",
          zIndex:"1 !important",
        },
        width: "69.12px",
        sortable: false,
        resizable: true,
        enableCellChangeFlash: true,
        editable: true,
      };
    }),
  ];

  

  useEffect(() => {
    if (props.exportStatus && props.exportStatus.bool) {
      if (props.exportStatus.type === "excel") {
        gridApi.exportDataAsExcel({});
      } else if (props.exportStatus.type === "csv") {
        gridApi.exportDataAsCsv({});
      } else if (props.exportStatus.type === "print") {
        var api = gridApi;
        setTimeout(function () {
          handlePrint();
          props.setExportStatus({ bool: false, type: "" });
        }, 100);
      }
    }
  }, [props.exportStatus]);

  useEffect(() => {
    setAllExpandedCells([...allExpandedCells, allExpandedCell]);
  }, [allExpandedCell]);

  useEffect(() => {
    if (gridApi) {
      let clone = gridApi.getColumnDefs();
      gridApi.setColumnDefs([]);
      let index = clone.findIndex((x) => x.field === allExpandedCell.col);
      if(index !== -1){
      clone[index].colSpan = function (params) {
        let expandedIndex = allExpandedCells.findIndex(
          (x) => x.col === allExpandedCell.col && x.row === params.data["/"]
        );
        if (expandedIndex !== -1) {
          return allExpandedCells[expandedIndex].colSize;
        } else {
          return 1;
        }
      };
      clone[index].cellStyle = function (params) {
        let indexCell = allExpandedCells.findIndex(x=>x.col===clone[index].field && params.data["/"] === x.row )
        if(indexCell!==-1){
          console.log('allExpandedCell', allExpandedCells)
          console.log('clone[index]', clone[index])
     
         if(selecteds[clone[index].field] && selecteds[clone[index].field].hasOwnProperty(params.data["/"])){
            return {backgroundColor:"#fff", zIndex:"4 !important", ...selecteds[clone[index].field][params.data["/"]], }
          }else{
            return {border: "1px solid #d3d3d34d", zIndex:"3 !important", lineHeight:"14px !important", backgroundColor:"#fff" };
          }
      }else{
        if(selecteds[clone[index].field] && selecteds[clone[index].field].hasOwnProperty(params.data["/"])){
          return {...selecteds[clone[index].field][params.data["/"]], }
        }else{
          return {border: "1px solid #d3d3d34d", zIndex:"1 !important", lineHeight:"14px !important", backgroundColor:"#fff" };
        }
      }
    }
      gridApi.suppressRowTransform = true;
      clone[index].rowSpan = function (params) {
        let expandedIndex = allExpandedCells.findIndex(
          (x) => x.col === allExpandedCell.col && x.row === params.data["/"]
        );
        if (expandedIndex !== -1) {
          return allExpandedCells[expandedIndex].rowSize
            ? allExpandedCells[expandedIndex].rowSize
            : 3;
        } else {
          return 1;
        }
      };
        gridApi.setColumnDefs(clone);
    }
  }
  }, [allExpandedCells, gridApi]);

  function handleCellChange(params) {
    const { rowIndex, data } = params;
    props.dataUpdater && props.dataUpdater(rowIndex, data, params);
  }

  function handleExpand(parentParams, size, action) {
    if (size === 1) {
      let clone = JSON.parse(JSON.stringify(allExpandedCells));
      let index = clone.findIndex(
        (x) =>
          x.col === parentParams.column.colDef.field &&
          x.row === parentParams.node.data["/"]
      );
      if (index !== -1) {
        clone.splice(index, 1);
      }
      setAllExpandedCells(clone);
      return;
    }
    let expandedCellObj = {
      row: parentParams.node.data["/"],
      col: parentParams.column.colDef.field,
      colSize: size,
      rowSize: size,
    };
    if (action && action.type === "merge" && action.range) {
      expandedCellObj = {
        row: action.range[0].startRow.rowIndex + 1,
        col: action.range[0].startColumn.colDef.field,
        colSize: size,
        rowSize:
          action.range[0].endRow.rowIndex -
          action.range[0].startRow.rowIndex +
          1,
      };
    }
    
    setAllExpandedCell(expandedCellObj);
  }

  function getContextMenuItems(params) {
    let selectedCells = params.api.getCellRanges();
    var result = [
      {
        name: "Expand",
        subMenu: [
          {
            name: "Merge Cells",
            disabled: !(
              selectedCells.length === 1 && selectedCells[0].columns.length > 1
            ),
            action: () => {
              handleExpand(params, selectedCells[0].columns.length, {
                type: "merge",
                range: selectedCells,
              });
            },
          },
          {
            name: "unMerge",
            action: () => {
              handleExpand(params, 1);
            },
            disabled: false,
            
          },
        ],
      },
      {
        name: "Color",
        action: function () {
        },
      },
      "separator",
      "copy",
      "separator",
      "chartRange",
    ];
    return result;
  }

  const allFormulateds = localStorage.getItem("formulated_documents")
    ? JSON.parse(localStorage.getItem("formulated_documents"))
    : [];

    let papers = document.getElementsByClassName("paperRef")
    let topMargin = document.getElementsByClassName("printMarginTop")
    let bottomMargin = document.getElementsByClassName("printMarginBottom")
    let rightMargin = document.getElementsByClassName("printMarginRight")
    let leftMargin = document.getElementsByClassName("printMarginLeft")

    function getNeededPapers(possibleCellsInPaper, allCellsLength, paperHeight, paperWidth){
      let papersCount = Math.ceil(allCellsLength/possibleCellsInPaper)
      let bg = document.getElementById("printable")
      let marginTopHeight = topMargin && topMargin[0] && topMargin[0].style && topMargin[0].style.height;
      let marginBottomHeight = bottomMargin && bottomMargin[0] && bottomMargin[0].style && bottomMargin[0].style.height;
      let marginLeftWidth = leftMargin && leftMargin[0] && leftMargin[0].style && leftMargin[0].style.width;
      let marginRightWidth = rightMargin && rightMargin[0] && rightMargin[0].style && rightMargin[0].style.width;
      Array.from(papers).forEach((item)=>{
        item.remove()
      })
      for(let i=0; i<papersCount; i++){
        let A4 = document.createElement("div")
        let marginTop = document.createElement("div")
        marginTop.classList.add("printMarginTop")
        let topMarginControl = document.createElement("span")
        topMarginControl.classList.add("marginControllerTop")
        topMarginControl.classList.add("topControll")

        let topMarginValue = document.createElement("span")
        topMarginValue.classList.add("topMarginValue")
        topMarginControl.appendChild(topMarginValue)

        topMarginControl.setAttribute("id", i)

        let topRuler = document.createElement("div")
        topRuler.style.display="flex"
        topRuler.style.justifyContent="flex-start"
        let topRulerMarginLeft = document.createElement("div")
        let topRulerMarginRight = document.createElement("div")
        topRulerMarginLeft.classList.add("topRulerMarginLeft")
        topRulerMarginRight.classList.add("topRulerMarginRight")
        
        topRuler.appendChild(topRulerMarginLeft)
        topRuler.appendChild(topRulerMarginRight)
        let topMMCount = Math.floor(parseInt(paperWidth)/20)
        for(let j=0; j<topMMCount; j++){
          let mm20 = document.createElement("span")
          mm20.style.width=`20mm`
          mm20.style.height="15px"
          mm20.style.fontSize="10px"
          mm20.style.textAlign="right"
          mm20.style.borderRight="1px solid black"
          mm20.style.position="relative"
          mm20.style.boxSizing="border-box"
          let unit = document.createElement("span")
          unit.style.position="absolute";
          unit.style.bottom="-5px";
          unit.style.right="0px";
          unit.innerHTML = `${(j+1)*20}mm`
          mm20.appendChild(unit)
          // mm20.style.display = "flex"
          // mm20.style.justifyContent="flex-end"
          // mm20.style.alignItems="flex-end"
          let mm10 = document.createElement("span")
          mm10.style.width=`10mm`
          mm10.style.height="10px"
          mm10.style.position="absolute"
          mm10.style.left="0px"
          mm10.style.borderRight="1px solid black"
          mm10.style.boxSizing="border-box"
          let mm5 = document.createElement("span")
          mm5.style.width=`5mm`
          mm5.style.height="5px"
          mm5.style.position="absolute"
          mm5.style.left="0px"
          mm5.style.borderRight="1px solid black"
          mm5.style.boxSizing="border-box"
          mm10.appendChild(mm5)
          let mm5_2 = mm5.cloneNode(true)
          mm5_2.style.left="10mm"
          mm20.appendChild(mm5_2)
          mm20.appendChild(mm10)
          topRuler.appendChild(mm20)
        }
        topRuler.classList.add("rulerTop")
        marginTop.appendChild(topRuler)
        marginTop.appendChild(topMarginControl)
        marginTop.style.position="absolute"
        marginTop.style.top="0"
        marginTop.style.left="0"
        marginTop.style.width="100%"
        marginTop.style.height=marginTopHeight
        // marginTop.style.borderBottom="1px solid gray"
        marginTop.style.backgroundColor="#f9ebeb"
        // marginTop.style.zIndex="400"
        let marginLeft = document.createElement("div")
        marginLeft.classList.add("printMarginLeft")
        let leftMarginControl = document.createElement("span")
        leftMarginControl.classList.add("marginControllerLeft")
        leftMarginControl.classList.add("leftControll")

        let leftMarginValue = document.createElement("span")
        leftMarginValue.classList.add("leftMarginValue")
        leftMarginControl.appendChild(leftMarginValue)

        leftMarginControl.setAttribute("id", i)
        marginLeft.appendChild(leftMarginControl)
        marginLeft.style.position="absolute"
        marginLeft.style.top="10"
        marginLeft.style.left="0"
        marginLeft.style.width=marginLeftWidth
        marginLeft.style.height="100%"
        marginLeft.style.backgroundColor="#f9ebeb"



        let LeftRuler = document.createElement("div")
        LeftRuler.style.display="flex"
        LeftRuler.style.justifyContent="flex-start"
        LeftRuler.style.flexDirection="column"
        let LeftRulerMarginLeft = document.createElement("div")
        let LeftRulerMarginRight = document.createElement("div")
        LeftRulerMarginLeft.classList.add("LeftRulerMarginTop")
        LeftRulerMarginRight.classList.add("LeftRulerMarginBottom")
        
        LeftRuler.appendChild(LeftRulerMarginLeft)
        LeftRuler.appendChild(LeftRulerMarginRight)
        let LeftMMCount = Math.floor(parseInt(paperHeight)/20)
        for(let j=0; j<LeftMMCount; j++){
          let mm20 = document.createElement("span")
          mm20.style.height=`20mm`
          mm20.style.width="16px"
          mm20.style.fontSize="10px"
          mm20.style.textAlign="right"
          mm20.style.borderBottom="1px solid black"
          mm20.style.position="relative"
          mm20.style.boxSizing="border-box"
          let unit = document.createElement("span")
          unit.style.position="absolute";
          unit.style.bottom="0px";
          unit.style.fontSize="9px"
          unit.style.left="0px";
          unit.innerHTML = `${(j+1)*20}mm`
          mm20.appendChild(unit)
          // mm20.style.display = "flex"
          // mm20.style.justifyContent="flex-end"
          // mm20.style.alignItems="flex-end"
          let mm10 = document.createElement("span")
          mm10.style.height=`10mm`
          mm10.style.width="10px"
          mm10.style.position="absolute"
          mm10.style.left="0px"
          mm10.style.borderBottom="1px solid black"
          mm10.style.boxSizing="border-box"
          let mm5 = document.createElement("span")
          mm5.style.height=`5mm`
          mm5.style.width="5px"
          mm5.style.position="absolute"
          mm5.style.left="0px"
          mm5.style.borderBottom="1px solid black"
          mm5.style.boxSizing="border-box"
          mm10.appendChild(mm5)
          let mm5_2 = mm5.cloneNode(true)
          mm5_2.style.top="10mm"
          mm20.appendChild(mm5_2)
          mm20.appendChild(mm10)
          LeftRuler.appendChild(mm20)
        }
        LeftRuler.classList.add("rulerLeft")
        marginLeft.appendChild(LeftRuler)






        let marginBottom = document.createElement("div")
        marginBottom.classList.add("printMarginBottom")
        let bottomMarginControl = document.createElement("span")
        bottomMarginControl.classList.add("marginControllerBottom")
        bottomMarginControl.classList.add("bottomControll")
        
        let bottomMarginValue = document.createElement("span")
        bottomMarginValue.classList.add("bottomMarginValue")
        bottomMarginControl.appendChild(bottomMarginValue)

        bottomMarginControl.setAttribute("id", i)
        marginBottom.appendChild(bottomMarginControl)
        marginBottom.style.position="absolute"
        marginBottom.style.bottom="0"
        marginBottom.style.left="0"
        marginBottom.style.width="100%"
        marginBottom.style.height=marginBottomHeight
        marginBottom.style.backgroundColor="#f9ebeb"
        let marginRight = document.createElement("div")
        marginRight.classList.add("printMarginRight")
        let rightMarginControl = document.createElement("span")
        rightMarginControl.classList.add("marginControllerRight")
        rightMarginControl.classList.add("rightControll")

        let rightMarginValue = document.createElement("span")
        rightMarginValue.classList.add("rightMarginValue")
        rightMarginControl.appendChild(rightMarginValue)

        rightMarginControl.setAttribute("id", i)

        marginRight.appendChild(rightMarginControl)
        marginRight.style.position="absolute"
        marginRight.style.top="0"
        marginRight.style.right="0"
        marginRight.style.width=marginRightWidth
        marginRight.style.height="100%"
        marginRight.style.backgroundColor="#f9ebeb"
        
        A4.classList.add("paperRef")
        A4.setAttribute("index", i)
        A4.style.position="absolute"
        A4.style.top=`calc(${parseInt(paperHeight)*i}mm + ${25}px + ${65 * (i)}px)`
        A4.style.left="35px"
        A4.style.width=paperWidth
        A4.style.height=paperHeight
        A4.style.boxShadow = i===0 ? "rgba(0, 0, 0, .1) 0px 0px 35px 1000000px" : ""
        A4.style.backgroundColor="#fff"
        A4.appendChild(marginTop)
        A4.appendChild(marginLeft)
        A4.appendChild(marginRight)
        A4.appendChild(marginBottom)
        bg.appendChild(A4)
      }
    }



    useEffect(()=>{
      if(gridApi){
        // let node = gridApi.getDisplayedRowAtIndex(paperHeight-1)
        console.log('paperHeight', paperHeight)
        setTimeout(()=>{
          let papers = document.getElementsByClassName("paperRef")
          let height = papers && papers[0] && papers[0].style && papers[0].style.height ? papers[0].style.height : "297mm"
          let width = papers && papers[0] && papers[0].style && papers[0].style.width ? papers[0].style.width : "210mm"
          let cellsInPaper = Math.floor((parseInt(height) * 3.77  - top - bottom)/20.19)
          getNeededPapers(cellsInPaper, rowData.length, height, width)
          gridApi.redrawRows()
          Array.from(document.getElementsByClassName("LeftRulerMarginTop")).forEach(item=>{
            item.style.height = `${top}px`
          })
          Array.from(document.getElementsByClassName("LeftRulerMarginBottom")).forEach(item=>{
            item.style.height = `${bottom}px`
          })
          Array.from(document.getElementsByClassName("topRulerMarginRight")).forEach(item=>{
            item.style.width = `${right}px`
          })
          Array.from(document.getElementsByClassName("topRulerMarginLeft")).forEach(item=>{
            item.style.width = `${left}px`
          })
        })
      }
    },[paperHeight])


    useEffect(()=>{
      if(gridApi){
        setTimeout(()=>{
          gridApi.redrawRows()
        })
        let papers = document.getElementsByClassName("paperRef")
        let height = papers && papers[0] && papers[0].style && papers[0].style.height ? papers[0].style.height : "297mm"
        let width = papers && papers[0] && papers[0].style && papers[0].style.width ? papers[0].style.width : "210mm"
        let cellsInPaper = Math.floor((parseInt(height) * 3.77  - top - bottom)/20.19)
        getNeededPapers(cellsInPaper, rowData.length, height, width)
        Array.from(document.getElementsByClassName("LeftRulerMarginTop")).forEach(item=>{
          item.style.height = `${top}px`
        })
        Array.from(document.getElementsByClassName("LeftRulerMarginBottom")).forEach(item=>{
          item.style.height = `${bottom}px`
        })
        Array.from(document.getElementsByClassName("topRulerMarginRight")).forEach(item=>{
          item.style.width = `${right}px`
        })
        Array.from(document.getElementsByClassName("topRulerMarginLeft")).forEach(item=>{
          item.style.width = `${left}px`
        })
        
      }
    },[top, bottom])

    // useEffect(()=>{
    //   Array.from(document.getElementsByClassName("topRulerMarginRight")).forEach(item=>{
    //     item.style.width = `${right}px`
    //   })
    //   Array.from(document.getElementsByClassName("topRulerMarginLeft")).forEach(item=>{
    //     item.style.width = `${left}px`
    //   })
    // },[left, right])
    

    function  rowClasses(params){ 
      let height = papers && papers[0] && papers[0].style && papers[0].style.height ? papers[0].style.height : "297mm"
      let marginTop = topMargin && topMargin[0] && topMargin[0].style && topMargin[0].style.height;
      let marginBottom = bottomMargin && bottomMargin[0] && bottomMargin[0].style && bottomMargin[0].style.height;
      marginTop = marginTop ? parseInt(marginTop) : 0
      marginBottom = marginBottom ? parseInt(marginBottom) : 0
      let breakCellIndex = Math.floor((parseInt(height) * 3.77  - marginTop - marginBottom)/20.19)
      return params.data["/"]%(breakCellIndex+1)===0
    }

    function rowMargin(params){
      let height = papers && papers[0] && papers[0].style && papers[0].style.height ? papers[0].style.height : "297mm"
      let marginTop = topMargin && topMargin[0] && topMargin[0].style && topMargin[0].style.height;
      let marginBottom = bottomMargin && bottomMargin[0] && bottomMargin[0].style && bottomMargin[0].style.height;
      marginTop = marginTop ? parseInt(marginTop) : 0
      marginBottom = marginBottom ? parseInt(marginBottom) : 0
      let cellsInPaper = Math.floor((parseInt(height) * 3.77  - marginTop - marginBottom)/20.19)
      let singleCellHeight = 20.19
      if(params.data["/"]%cellsInPaper===0){
        return {marginBottom: `calc(${height} - ${cellsInPaper*singleCellHeight}px + 66px) !important`}
      }
    }

  return (
    <div >
      <div
        style={{ position:"sticky", top:"-10px", zIndex:100, width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <TableOptins
          top={top}
          setTop={setTop} 
          left={left}
          setLeft={setLeft} 
          right={right}
          setRight={setRight} 
          bottom={bottom}
          setBottom={setBottom}
          setPrintSize={props.setPrintSize}
          gridApi={gridApi}
          columnApi={columnApi}
          selectedRangeCellsHeader={selectedRangeCellsHeader}
          functionalCells={functionalCells}
          setFunctionalCells={setFunctionalCells}
          selecteds={selecteds}
          setSelecteds={setSelecteds}
          allExpandedCells={allExpandedCells}
          paperHeight={paperHeight}
          setPaperHeight={setPaperHeight}
          paperWidth={paperWidth}
          setPaperWidth={setPaperWidth}
        />
      </div>
      {/* <div 
      // style={{backgroundColor:"#e8e8e8"}}
      
      > */}
      <div
      ref={tableRef}
      id="tableRef"
        className="ag-theme-alpine"
        style={{
          margin:"20px auto",
          height: props.height ? props.height : 500,
          width: props.width ? props.width : "750px",
          opacity: `${opacity}`,
          transitionDuration: "0.1s",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowStyle={{backgroundColor:"#fff", border:"none"}}
          rowClassRules={{
            "pagebreak": rowClasses,
          }}
          getRowStyle = {rowMargin}
          onCellEditingStopped={(params) => {
            if (!params.value || params.value[0] !== "=") {
              let index = functionalCells.findIndex(
                (item) =>
                  item.colKey === params.colDef.field &&
                  item.rowIndex === params.data["/"] - 1
              );
              if (index !== -1) {
                let clone = JSON.parse(JSON.stringify(functionalCells));
                clone.splice(index, 1);
                setFunctionalCells(clone);
              }
            } else if (params.value && params.value[0] === "=") {
              let index = functionalCells.findIndex(
                (item) =>
                  item.colKey === params.colDef.field &&
                  item.rowIndex === params.data["/"] - 1
              );
              let func;
              if (params.value.includes("SUM")) {
                func = "SUM";
              } else if (params.value.includes("MAX")) {
                func = "MAX";
              } else if (params.value.includes("MIN")) {
                func = "MIN";
              } else if (params.value.includes("AVERAGE")) {
                func = "AVERAGE";
              }
              if (index !== -1) {
                let clone = JSON.parse(JSON.stringify(functionalCells));
                clone[index].func = func;
                setFunctionalCells(clone);
              } else {
                setFunctionalCells([
                  ...functionalCells,
                  {
                    colKey: params.colDef.field,
                    rowIndex: params.data["/"] - 1,
                    func: func,
                  },
                ]);
              }
            }
            params.api.redrawRows();
          }}
          onCellFocused={(params) => {
            
            let range = params.api.getCellRanges();
            
            if (range[0]) {
              let obj = {
                col: range[0].startColumn.colDef.field,
                row: range[0].startRow.rowIndex,
              };
              setSelectedRangeCellsHeader(obj);
            }
            
          }}
          
          
          
          
          
          
          
          
          suppressRowHoverHighlight={true}
          suppressRowTransform={true}
          headerHeight={props.headerHeight ? props.headerHeight : 15}
          
          colResizeDefault='shift'
          rowHeight={20.16}
          
          columnDefs={
            props.columnDefinition ? props.columnDefinition : columnDefinition
          }
          
          
          getContextMenuItems={getContextMenuItems}
          groupHeaderHeight={props.groupHeaderHeight}
          suppressRowClickSelection={true}
          rowData={rowData}
          
          
          enableRangeSelection={true}
          onGridReady={(params) => {
            setGridApi(params.api);
            setColumnApi(params.columnApi);
            props.setGridApi(params.api)
            
            setTimeout(() => {
              setOpacity(1);
              let colDefs = params.api.getColumnDefs();
              
              let headers;
              if(props.rowData[0]){
                headers = Object.keys(props.rowData[0])
              }else{
                headers = new Array(26).fill("")
              }
              let len = paperWidth+1;
              let header = String.fromCharCode(65+len-5) 
              let heightLen = props.rowData.length ? props.rowData.length + 21 : 51

              let selecteds = selectedsF(heightLen, header, len)

              

              let defExpandeds = defExpandedsF(heightLen, len)
              String.fromCharCode(65+len-2)  
              setAllExpandedCells(defExpandeds);
              setSelecteds(selecteds);         

              // params.api.setColumnDefs([]);

              colDefs.forEach((item, i) => {
               
                item.cellStyle=function (params){
                  let obj={};
                   
                  if(i===0){
                    return Object.assign(obj, {
                      
                      backgroundColor: "#fff", 
                      lineHeight:"14px !important", 
                      left:"-10px", 
                      textAlign:"right", 
                      padding:"0",
                      borderRight:"1px solid gray",
                      borderBottom:"1px solid gray",
                    })
                  }
                  // if(params.data["/"]>55){
                  //   return {
                  //     marginTop:"15px !important",
                  //     border: "1px solid #d3d3d34d", 
                  //     lineHeight:"14px !important",
                  //     zIndex:"2 !important",
                  //   }
                  // } 
                  return Object.assign(obj, {border: "1px solid #d3d3d34d", lineHeight:"14px !important",zIndex:"2 !important",})
                }
                if (selecteds.hasOwnProperty(item.field)) {
                  item.cellStyle = function (params) {
                    if (
                      selecteds[item.field].hasOwnProperty(params.data["/"])
                    ) {
                      let index = defExpandeds.findIndex(x=>x.col===item.field && x.row===params.data["/"])
                      if(index!==-1){
                        return { ...selecteds[item.field][params.data["/"]], zIndex:"4 !important"};
                      }else{
                        return {...selecteds[item.field][params.data["/"]], zIndex:"2 !important"};
                      }
                      
                    }else{
                      let index = defExpandeds.findIndex(x=>x.col===item.field && x.row===params.data["/"])
                      if(index!==-1){
                        return {border: "1px solid #d3d3d34d", lineHeight:"14px !important", zIndex:"4 !important",};
                      }else{
                        return {border: "1px solid #d3d3d34d", lineHeight:"14px !important", zIndex:"2 !important",};
                      }
                    }
                  };
                }
                    item.rowSpan = function(params){
                      let index = defExpandeds.findIndex(x=>x.col===item.field && x.row===params.data["/"])
                      if(index!==-1){
                        return defExpandeds[index].rowSize
                      }else{
                        return 1
                      }
                    }
                    item.colSpan = function(params){
                      let index = defExpandeds.findIndex(x=>x.col===item.field && x.row===params.data["/"])
                      if(index!==-1){
                        return defExpandeds[index].colSize
                      }else{
                        return 1
                      }
                    }
              });
              params.api.setColumnDefs(colDefs);
              params.api.refreshCells();
              
              const allCells = document.getElementsByClassName("ag-center-cols-container")[1]
              if(!allCells){
                return
              }
               allCells.style.left="-25px"
              let el = document.getElementsByClassName("ag-header ag-focus-managed ag-pivot-off")[1]
              el.style.margin="0px 0px 10px -25px"
              el.style.backgroundColor="#e5e5e5"
              el.style.border="none"
              el.style.position = "sticky"
              el.style.top="40px"
              el.style.zIndex = 20
              let root = document.getElementsByClassName("ag-root-wrapper")[1]
              root.style.border="none"
              root.style.overflow="initial"
              params.api.setDomLayout("print")
              let bg = document.getElementsByClassName("ag-root ag-unselectable ag-layout-print")[0]
              bg.setAttribute("id","printable")
              let containerHeightFix = document.getElementsByClassName("ag-center-cols-clipper")[1]
              containerHeightFix.style.height="100%"
              getNeededPapers(55, props.rowData.length+20, "297mm", "210mm")
            }, 10);
          }}
          
        >
        </AgGridReact>
      </div>
    </div>
  );
};

export default App;
