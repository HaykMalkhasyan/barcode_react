import React, { useEffect, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "./excelLikeTable.css";
// import "./table.css"
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
// import ClickableStatusBarComponent from './tableStatusBar';
import printStyles from "./printStyle.module.css"

const App = (props) => {
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [, setFloatingFilter] = useState(true);
  const [rowData, setRowData] = useState(createData(50, 25));

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


  // useEffect(() => {
  //   console.log('props.rowData', props.rowData)
  //   gridApi && gridApi.refreshCells();
  // }, [props.rowData]);

  // useEffect(()=>{
  //   if(rowData){
  //     // setTimeout(()=>{
  //       setAllExpandedCell(
  //         { row: 5, col: "A", colSize: rowData.length, rowSize: 1 },
  //       )
  //     // },1000)
  //   }
  // },[rowData])


  // useEffect(()=>{
  //   let a=[]
  //   for (let i=0; i<10000; i++){
  //       a.push({
  //           "#": i,
  //           "ԱՊՄ": "000035",
  //           'ԱՏԳ': "4015",
  //           'Անվանում': "Ձեռնոց մեկանգամյա 100հ",
  //           'Առքի գին': Math.floor(Math.random() * 100),
  //           'Առքի գումար': Math.floor(Math.random() * 10000),
  //           'Բարկոդ': "",
  //           'Զեղչ': 0,
  //           'Մատակարարի գին': Math.floor(Math.random() * 100),
  //           'Մնացորդ': 0,
  //           'Վաճ գին Վաճառքի գին': Math.floor(Math.random() * 100),
  //           'Վաճ գումար Վաճառքի գին': Math.floor(Math.random() * 10000),
  //           'Տոկոս Վաճառքի գին': "871%",
  //           'Քանակ': Math.floor(Math.random() * 100),
  //           })
  //   }
  //   localStorage.setItem("document_buy_1", JSON.stringify(a))
  // },[])


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

  function createData(n, m) {
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
    let len = headers.length;
    let header = headers[len-4]
    let arrLen = arr.length 
    arr[1][header] = "Մատակարարի Տվյալներ";
    arr[2][header] = "Հասցե՝";
    arr[3][header] = "ՀՎՀՀ՝";
    arr[4][header] = "Էլ. Փոստ՝";
    arr[5][header] = "Հեռ.՝";
    arr[6][header] = "Կոնտ. Անձ՝";


    arr[arrLen-8].A = "Հանձնեց՝";
    arr[arrLen-7].A = "Անուն Ազգանուն";
    arr[arrLen-6].A = "Ստորագրություն";
    arr[arrLen-4].A = "Ընդունեց՝";
    arr[arrLen-3].A = "Անուն Ազգանուն";
    arr[arrLen-2].A = "Ստորագրություն";

    return arr;
  }

  useEffect(() => {
    if (!!props.rowData && props.rowData.length && !!gridApi) {
      try {
        let start = 10;
        let keysprops = Object.keys(props.rowData[0]);
        let keysLocale = Object.keys(rowData[0]);
        // > 26 ? keysprops.length + 10 : 24;
        let fullScreenCount = Math.ceil(tableRef.current.offsetWidth/69)
        
        let colsSize = fullScreenCount;
        let rowsSize = props.rowData.length + 20; 
        // 
        // props.rowData.length+2
        let clone = createData(300, 100);
        for (let j = 0, i = 0; i < keysprops.length; i++, j++) {
          if (keysprops[i] === "#") {
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

  useEffect(() => {
    gridApi && gridApi.refreshCells();
  }, [rowData]);

  let width = "2086px"
  console.log('window.innerWidth', window.innerWidth)

  const handlePrint = useReactToPrint({
    onBeforeGetContent: ()=>{gridApi.clearRangeSelection(); gridApi.deselectAll(); gridApi.setDomLayout("print"); },
    content: () => tableRef.current,
    pageStyle:`@page { 297mm 210mm;
      margin: 25mm;
      margin-right: 45mm; }`,
      // calc(${window.innerWidth}px - 48px);  
    // bodyClass:`${printStyles.body}`,
    onAfterPrint: () => {
      // columnApi.setColumnsVisible(columnApi.getAllColumns(), true);
      // props.setPrintSize({height:null, width:null})
      props.setExportStatus({ bool: false });
      gridApi.setDomLayout(null)
      props.setPending(false)
      // setTimeout(()=>{
      //   gridApi.sizeColumnsToFit()
      // },100)
      // tableAddRef.current[0].style.display="none"; tableAddRef.current[1].style.display="none";
    },
    // onBeforePrint:()=>{ console.log('tableAddRef', tableAddRef.current[0].style); tableAddRef.current[0].style.display="flex"; tableAddRef.current[1].style.display="flex";},
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

  // function NumericCellEditor() {}

  // NumericCellEditor.prototype.init = function (params) {
  //   this.eInput = document.createElement("input");
  //   this.eInput.className = style.editableInput;
  //   // this.eInput.focus();
  //   // this.eInput.select();
  //   if (isCharNumeric(params.charPress)) {
  //     this.eInput.value = params.charPress;
  //   } else {
  //     if (params.value !== undefined && params.value !== null) {
  //       this.eInput.value = params.value;
  //     }
  //   }

  //   var that = this;
  //   this.eInput.addEventListener("keypress", function (event) {
  //     if (!isKeyPressedNumeric(event)) {
  //       if (event.preventDefault) event.preventDefault();
  //     } else if (that.isKeyPressedNavigation(event)) {
  //       event.stopPropagation();
  //     }
  //   });
  //   this.eInput.addEventListener("keyup", (e) => {
  //     handleKeyPress(e, params);
  //   });
  //   var charPressIsNotANumber =
  //     params.charPress && "1234567890.".indexOf(params.charPress) < 0;
  //   if (!charPressIsNotANumber) {
  //     this.eInput.value = params.charPress ? params.charPress : params.value;
  //   }
  //   this.cancelBeforeStart = charPressIsNotANumber;
  // };

  const columnDefinition = [
    ...Object.keys(rowData[0]).map((item) => {
      if (item === "/") {
        return {
          field: item,
          cellStyle: {
            lineHeight:"14px !important",
            border: "none",
            backgroundColor: "#f8f8f8",
            color: "black",
            boxSizing: "border-box",
          },
          // flex: 1,
          // maxWidth:
          //   item === "Անվանում"
          //     ? 306
          //     : window.innerWidth / rowData[0].length,
          width: props.rowData.length<1000 ? 60 : 75,
          // filter:
          //   typeof rowData[0][item] === "number"
          //     ? "agNumberColumnFilter"
          //     : "agTextColumnFilter",
          sortable: false,
          resizable: false,
          enableCellChangeFlash: false,
          // floatingFilter: floatingFilter,
          editable: false,
        };
      }
      return {
        field: item,

        // colSpan: function (params) {
        //   if (params.data["/"] === 1 && item === "A") {
        //     return 4;
        //   } else if (
        //     (params.data["/"] === 1 ||
        //       params.data["/"] === 2 ||
        //       params.data["/"] === 3 ||
        //       params.data["/"] === 4) &&
        //     item === "B"
        //   ) {
        //     return 3;
        //   } else {
        //     return 1;
        //   }
        // },
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
          // display:"flex",
          // justifyContent:"center",
          // alignItems:"center",
          lineHeight:"14px !important"
        },
        // flex: 1,
        // maxWidth:
        //   item === "Անվանում"
        //     ? 306
        //     : window.innerWidth / rowData[0].length,
        // flex:
        //   props.rowData[0] && Object.keys(props.rowData[0]) > 26
        //     ? undefined
        //     : 1,
        width: "69.12px",
        // filter:
        //   typeof rowData[0][item] === "number"
        //     ? "agNumberColumnFilter"
        //     : "agTextColumnFilter",
        sortable: false,
        resizable: true,
        enableCellChangeFlash: true,
        // floatingFilter: floatingFilter,
        // cellRenderer:
        //   !!props.editabeFields &&
        //   !!Array.isArray(props.editabeFields) &&
        //   !!props.editabeFields.includes(item)
        //     ? "editableRender"
        //     : null,
        editable: true,
      };
    }),
  ];

  // columnDefinition = columnDefinition.filter(item=>!!item)

  useEffect(() => {
    if (props.exportStatus && props.exportStatus.bool) {
      console.log("props.exportStatus", props.exportStatus);
      if (props.exportStatus.type === "excel") {
        gridApi.exportDataAsExcel({});
      } else if (props.exportStatus.type === "csv") {
        gridApi.exportDataAsCsv({});
      } else if (props.exportStatus.type === "print") {
        var api = gridApi;
        // api.setDomLayout("print");
        // setFloatingFilter(false);
        // setTimeout(() => {
        //   gridApi.refreshHeader();
        // }, 0);
        setTimeout(function () {
          handlePrint();
          props.setExportStatus({ bool: false, type: "" });
          // api.setDomLayout(null);
          // setFloatingFilter(true);
          // setTimeout(() => {
          //   gridApi.refreshHeader();
          // }, 0);
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
      console.log('clone[index]', clone[index])
      clone[index].cellStyle = function (params) {
        let expandedIndex = allExpandedCells.findIndex(
          (x) => x.col === params.colDef.field && x.row === params.data["/"]
        );
        if (expandedIndex !== -1) {
          return { zIndex: "2 !important", backgroundColor:"#fff", border: "1px solid #d3d3d34d", lineHeight:"14px !important"};
        } 
        else if(selecteds[clone[index].field] && selecteds[clone[index].field].hasOwnProperty(params.data["/"])){
            return selecteds[clone[index].field][params.data["/"]]
          }else{
            return {border: "1px solid #d3d3d34d",  lineHeight:"14px !important" 
          };
          }
      };
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
      // setTimeout(()=>{
        gridApi.setColumnDefs(clone);
      // })
      // gridApi.refreshCells()
    }
  }
  }, [allExpandedCells, gridApi]);

  // function handleKeyPress(e, params) {
  //   e.preventDefault();
  //   let currentFocused = params.api.getFocusedCell();
  //   if (e.keyCode === 40) {
  //     params.api.setFocusedCell(
  //       currentFocused.rowIndex + 1,
  //       currentFocused.column,
  //       null
  //     );
  //     params.api.startEditingCell(
  //       currentFocused.rowIndex + 1,
  //       currentFocused.column
  //     );
  //   } else if (e.keyCode === 38) {
  //     params.api.setFocusedCell(
  //       currentFocused.rowIndex - 1,
  //       currentFocused.column,
  //       null
  //     );
  //     params.api.startEditingCell(
  //       currentFocused.rowIndex - 1,
  //       currentFocused.column
  //     );
  //   } else {
  //     return;
  //   }
  // }

  function handleCellChange(params) {
    const { rowIndex, data } = params;
    props.dataUpdater && props.dataUpdater(rowIndex, data, params);
  }

  function handleExpand(parentParams, size, action) {
    // console.log('params', params)
    // console.log('columnDefinition', columnDefinition)
    // let clone = JSON.parse(JSON.stringify(allExpandedCells))
    // clone.push({[params.column.colDef.field]: params.node.data["/"]})
    // console.log('parentParams', parentParams)
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
    // expandedCellObj.__proto__.toJSON = extendedCellObjtoJSON.bind(expandedCellObj)
    console.log("expandedCellObj", expandedCellObj);
    setAllExpandedCell(expandedCellObj);

    // console.log('clone', clone)
    // setColumnDefinition(columnDefinition)
  }

  function isCellExpanded(col, row) {
    console.log("allExpandedCells", allExpandedCells);
    let index = allExpandedCells.findIndex(
      (x) => x.col === col && x.row === row
    );
    return index !== -1;
  }

  function getContextMenuItems(params) {
    let selectedCells = params.api.getCellRanges();
    console.log("params", params);
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
            // (!params.node.columnApi.columnController.colSpanActive),
          },
        ],
        // cssClasses: ['redFont', 'bold'],
      },
      {
        name: "Color",
        action: function () {
          // console.log('params', params)
          // clone = params.api.getColumnDefs()
          // let index = col
          // clone[index].cellStyle=function(paramss){
          //   return {...clone[index].cellStyle, border:"1px solid red"}
          // }
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

  return (
    <div >
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <TableOptins
          setPrintSize={props.setPrintSize}
          gridApi={gridApi}
          columnApi={columnApi}
          selectedRangeCellsHeader={selectedRangeCellsHeader}
          functionalCells={functionalCells}
          setFunctionalCells={setFunctionalCells}
          selecteds={selecteds}
          setSelecteds={setSelecteds}
          allExpandedCells={allExpandedCells}
        />
      </div>
      <div
      ref={tableRef}
        className="ag-theme-alpine"
        style={{
          margin:"0 auto",
          height: props.height ? props.height : 500,
          width: props.width ? props.width : "100%",
          opacity: `${opacity}`,
          transitionDuration: "0.1s",
        }}
        
      >
        <AgGridReact
        
          onCellEditingStopped={(params) => {
            console.log("params", params);
            console.log("functionalCells", functionalCells);
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
            // if(params.finished && !params.started){
            let range = params.api.getCellRanges();
            // console.log('range', range)
            if (range[0]) {
              let obj = {
                col: range[0].startColumn.colDef.field,
                row: range[0].startRow.rowIndex,
              };
              setSelectedRangeCellsHeader(obj);
            }
            // }
          }}
          // onRangeSelectionChanged={(params)=>{
          //   if(params.finished && !params.started){
          //     console.log('params', params.api.getCellRanges())
          // let range = params.api.getCellRanges()
          // let obj = {col:range[0].startColumn.colDef.field, row:range[0].startRow.rowIndex}
          // setSelectedRangeCellsHeader(obj)
          // }
          // }}
          suppressRowHoverHighlight={true}
          suppressRowTransform={true}
          headerHeight={props.headerHeight}
          rowHeight={20.16}
          // domLayout="print"
          columnDefs={
            props.columnDefinition ? props.columnDefinition : columnDefinition
          }
          // rowBuffer={10}
          // debounceVerticalScrollbar={true}
          getContextMenuItems={getContextMenuItems}
          groupHeaderHeight={props.groupHeaderHeight}
          suppressRowClickSelection={true}
          rowData={rowData}
          // pagination={props.pagination === "false" ? false : true}
          // paginationPageSize={15}
          enableRangeSelection={true}
          onGridReady={(params) => {
            setGridApi(params.api);
            setColumnApi(params.columnApi);
            props.setGridApi(params.api)
            // params.api.setDomLayout("print")
            setTimeout(() => {
              setOpacity(1);
              let colDefs = params.api.getColumnDefs();
              
              let headers;
              if(props.rowData[0]){
                headers = Object.keys(props.rowData[0])
              }else{
                headers = new Array(26).fill("")
              }
              let len = headers.length;
              let header = String.fromCharCode(65+len-5) 
              let heightLen = props.rowData.length ? props.rowData.length + 21 : 51

              let selecteds = selectedsF(heightLen, header, len)

              

              let defExpandeds = defExpandedsF(heightLen, len)
              String.fromCharCode(65+len-2)  
              setAllExpandedCells(defExpandeds);
              setSelecteds(selecteds);         

              params.api.setColumnDefs([]);

              colDefs.forEach((item) => {
                if (selecteds.hasOwnProperty(item.field)) {
                  item.cellStyle = function (params) {
                    if (
                      selecteds[item.field].hasOwnProperty(params.data["/"])
                    ) {
                      return selecteds[item.field][params.data["/"]];
                    }else{
                      return {border: "1px solid #d3d3d34d", lineHeight:"14px !important" };
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
            }, 10);
          }}
          // immutableData={true}
          // onCellEditingStopped={handleCellChange}
          // rowSelection="multiple"
          // paginationAutoPageSize={props.pagination ? !!props.pagination : true}
          // rowMultiSelectWithClick={true}
          // props.setGridApi && props.setGridApi(params.api);
          // props.setColumnApi && props.setColumnApi(params.columnApi);
          // props.mode && params.api.setDomLayout(props.mode);
          // onCellFocused={(params)=>{
          //   let selectedCell = params.api.getFocusedCell()
          //   console.log('selectedCell', selectedCell)
          //   selectedCell.column.colDef.cellStyle = {border:"none"}
          //   params.api.refreshCells()
          // }}

          
          // rowClassRules={{
          //   [style.formulatedRow]: function (params) {
          //     return (
          //       allFormulateds
          //         .map((item) => item["#"])
          //         .includes(params.data["#"]) &&
          //       window.location.pathname === "/income"
          //     );
          //   },
          //   [style.unformulatedRow]: function (params) {
          //     return (
          //       !allFormulateds
          //         .map((item) => item["#"])
          //         .includes(params.data["#"]) &&
          //       window.location.pathname === "/income"
          //     );
          //   },
          // }}
          // groupSelectsChildren={true}
          // autoGroupColumnDef={{
          //   headerName: "Model",
          //   field: "model",
          //   cellRenderer: "agGroupCellRenderer",
          //   cellRendererParams: {
          //     checkbox: true,
          //   },
          // }}

          // pinnedBottomRowData={createData(1, 'Bottom')}
          // statusBar={{
          //   statusPanels: [
          //     {
          //       statusPanel: 'statusBarComponent',
          //       key: 'statusBarCompKey',
          //     },
          //     {
          //       statusPanel: 'agAggregationComponent',
          //       statusPanelParams: {
          //           aggFuncs: ['min', 'max', 'sum']
          //       }
          //   }
          //   ],
          // }}
        >
          {/* {columnDefinition.map(column => (<AgGridColumn {...column} key={column.field}/>))} */}
        </AgGridReact>
      </div>
    </div>
  );
};

export default App;
