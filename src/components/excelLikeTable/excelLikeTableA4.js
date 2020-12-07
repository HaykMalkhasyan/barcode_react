import React, { useEffect, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
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
    
    const [paperHeight, setPaperHeight] = useState(50)
    const [paperWidth, setPaperWidth] = useState(12)

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
    console.log('initialData', initialData)
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

if(initialData && initialData.length){
  console.log('arr[initialDataLen+3]', arr[initialDataLen+3])
    arr[initialDataLen+2+start].A = "Հանձնեց՝";
    arr[initialDataLen+3+start].A = "Անուն Ազգանուն";
    arr[initialDataLen+4+start].A = "Ստորագրություն";
    arr[initialDataLen+6+start].A = "Ընդունեց՝";
    arr[initialDataLen+7+start].A = "Անուն Ազգանուն";
    arr[initialDataLen+8+start].A = "Ստորագրություն";
}
    return arr;
  }

  useEffect(() => {
    if (!!props.rowData && props.rowData.length && !!gridApi) {
      try {
        let start = 10;
        let keysprops = Object.keys(props.rowData[0]);
        let keysLocale = Object.keys(rowData[0]);
        
        let fullScreenCount = Math.ceil(tableRef.current.offsetWidth/69)
        
        let colsSize = fullScreenCount;
        let rowsSize = props.rowData.length + 20; 
        
        
        console.log('props.rowData', props.rowData)
        let clone = createData(50, keysprops.length-1, props.rowData, start);
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

  const handlePrint = useReactToPrint({
    onBeforeGetContent: ()=>{gridApi.clearRangeSelection(); gridApi.deselectAll();  },
    content: () => tableRef.current,
    
    
    

      
    
    onAfterPrint: () => {
      
      
      props.setExportStatus({ bool: false });
      gridApi.setDomLayout(null)
      props.setPending(false)
      
      
      
      
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
          resizable: true,
          enableCellChangeFlash: false,
          
          editable: false,
        };
      }
      return {
        field: item,
        suppressMenu:true,
        
         
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
      console.log("props.exportStatus", props.exportStatus);
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
        if(selecteds[clone[index].field] && selecteds[clone[index].field].hasOwnProperty(params.data["/"])){
          
          
          
            return {backgroundColor:"#fff", ...selecteds[clone[index].field][params.data["/"]]}
          }else{
            return {border: "1px solid #d3d3d34d",  lineHeight:"14px !important", backgroundColor:"#fff" };
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
    
    console.log("expandedCellObj", expandedCellObj);
    setAllExpandedCell(expandedCellObj);

    
    
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

  return (
    <div >
      <div
        style={{ position:"relative", width: "100%", display: "flex", justifyContent: "flex-end" }}
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
          paperHeight={paperHeight}
          setPaperHeight={setPaperHeight}
          paperWidth={paperWidth}
          setPaperWidth={setPaperWidth}
        />
      </div>
      <div
      ref={tableRef}
        className="ag-theme-alpine"
        style={{
          margin:"0 auto",
          height: props.height ? props.height : 500,
          width: props.width ? props.width : "750px",
          opacity: `${opacity}`,
          transitionDuration: "0.1s",
          
        }}
        
      >
        {console.log('props', props)}
        {/* <div style={{
          height: props.height ? props.height : 500,
          position:"relative",
          width:`${gridRef.current ? gridRef.current.offsetWidth : 2000}px`
        }}>
        <div style={{height:"100%", zIndex:"10", top:"0px", left:"210mm", width:"20px", position:"absolute", backgroundColor:"blue"}} >
        asd
        </div> */}
        
        <AgGridReact
          ref={gridRef}
          rowStyle={{backgroundColor:"#fff", border:"none"}}
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

              params.api.setColumnDefs([]);

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
                  return Object.assign(obj, {border: "1px solid #d3d3d34d", lineHeight:"14px !important",zIndex:"2 !important",})
                }
                if (selecteds.hasOwnProperty(item.field)) {
                  item.cellStyle = function (params) {
                    if (
                      selecteds[item.field].hasOwnProperty(params.data["/"])
                    ) {
                      return {...selecteds[item.field][params.data["/"]], zIndex:"2 !important"};
                    }else{
                      return {border: "1px solid #d3d3d34d", lineHeight:"14px !important", zIndex:"2 !important",};
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
              const allCells = document.getElementsByClassName("ag-center-cols-container")[1]
              allCells.style.left="-35px"
              let el = document.getElementsByClassName("ag-header ag-focus-managed ag-pivot-off")[1]
              el.style.margin="0px 0px 10px -35px"
              el.style.backgroundColor="#fff"
              let root = document.getElementsByClassName("ag-root-wrapper")[1]
              root.style.border="none"
              root.style.overflow="initial"
              params.api.setDomLayout("print")
              let bg = document.getElementsByClassName("ag-root ag-unselectable ag-layout-print")[0]
              console.log('bg', bg)
              let A4 = document.createElement("div")
              A4.setAttribute("id", "paperRef")
              A4.style.position="absolute"
              A4.style.top="25px"
              A4.style.left="25px"
              A4.style.width="210mm"
              A4.style.height="277mm"
              A4.style.boxShadow="0px 0px 12px 2px gray"
              bg.appendChild(A4)
            }, 10);
          }}
          
        >
        </AgGridReact>
      </div>
    </div>
  );
};

export default App;
