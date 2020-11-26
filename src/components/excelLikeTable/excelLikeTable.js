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
import { getMissing, mult } from "../../services/services";
import TableOptins from "./tableOptions"
// import ClickableStatusBarComponent from './tableStatusBar';



const App = (props) => {
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [, setFloatingFilter] = useState(true);
  const [rowData, setRowData] = useState(createData(50,25))

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
  const [allExpandedCell, setAllExpandedCell] = useState({row: 10, col: "R", colSize: 2, rowSize: 3})
  const [allExpandedCells, setAllExpandedCells] = useState([{row: 10, col: "R", colSize: 2, rowSize: 3}])
  const [selectedRangeCellsHeader, setSelectedRangeCellsHeader] = useState(null)

  // useEffect(() => {
  //   console.log('props.rowData', props.rowData)
  //   gridApi && gridApi.refreshCells();
  // }, [props.rowData]);

  function getHeaderName(charcode, add=0) {
    if(charcode>=65 && charcode<=90){
      let res = ""
      for(let i=0; i<=add; i++){
        res += String.fromCharCode(charcode);
      }
      return res
    }else if(charcode>90){
      let quanty = 0
      while(charcode>90){
        charcode -= 26;
        quanty++;
      }
      return getHeaderName(charcode, quanty)

    }    
  }

  function createData(n,m) {
    let arr = []
    for(let i=0; i<n; i++){
      let obj={}
      for(let j=0; j<m; j++){
        obj[getHeaderName(65+j)] = ""
      }
      arr[i]={"/":i+1, ...obj}
    }
    arr[0].A="Մատակարար"
    arr[1].A="Անուն"
    arr[2].A="Հեռ․"
    arr[3].A="Ստորագ․"
    arr[13].A="հանձնեց"
    arr[14].A="ընդունեց"
    return arr
  }


useEffect(()=>{
 if(!!props.rowData && props.rowData.length && !!gridApi){ 
   try{
    console.log('props.rowData', props.rowData)
    console.log('rowData', rowData)
    let start = 6;
    let keysprops = Object.keys(props.rowData[0])
    let keysLocale = Object.keys(rowData[0])
    console.log('keysprops', keysprops)
    console.log('keysLocale', keysLocale)
    let colsSize =  keysprops.length > 26 ? keysprops.length + 10 : 26
    let rowsSize = Math.ceil((props.rowData.length + 10) / 15) * 15;
    // props.rowData.length+2
    let clone = createData(rowsSize, colsSize)
    for(let j=0, i=0; i<keysprops.length; i++, j++){
      if(keysprops[i] ==="#"){
        i++;
      }
      clone[start-1][keysLocale[j+1]] = keysprops[i] 
      for(let k=0; k<props.rowData.length; k++){
        clone[start+k][keysLocale[j+1]] = props.rowData[k][keysprops[i]] 
      }
    }
    setRowData(clone)
  }catch(err){
    console.log('err', err)
  }
  }
},[props.rowData, gridApi])

useEffect(()=>{
  gridApi && gridApi.refreshCells()
},[rowData])

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    onAfterPrint: () => {
      columnApi.setColumnsVisible(columnApi.getAllColumns(), true);
      props.setExportStatus({ bool: false });
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


  const columnDefinition = ([
    ...Object.keys(rowData[0]).map((item) => {
      if(item==="/"){
        return{
          field: item,
          cellStyle: {border: 'none', backgroundColor:"#f8f8f8", color:"black", boxSizing:"border-box"},
          // flex: 1,
          // maxWidth:
          //   item === "Անվանում"
          //     ? 306
          //     : window.innerWidth / rowData[0].length,
          width: 60,
          // filter:
          //   typeof rowData[0][item] === "number"
          //     ? "agNumberColumnFilter"
          //     : "agTextColumnFilter",
          sortable: false,
          resizable: false,
          enableCellChangeFlash: false,
          // floatingFilter: floatingFilter,
          editable: false
        }
      }
      return {
          field: item,
          colSpan: function(params) {
            if(params.data["/"] === 1 && item==="A"){
                return 4
            }else if((params.data["/"] === 1 || params.data["/"] === 2 || params.data["/"] === 3 || params.data["/"] === 4) && item==="B"){
              return 3
            } else {
              return 1
            }
        },
          cellStyle: {borderRight: '1px solid lightgray', boxSizing:"border-box"},
          // flex: 1,
          // maxWidth:
          //   item === "Անվանում"
          //     ? 306
          //     : window.innerWidth / rowData[0].length,
          flex: props.rowData[0] && Object.keys(props.rowData[0]) > 26 ? undefined : 1,
          width: 80,
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
          editable:true
        }  
      })    
  ])

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
        api.setDomLayout("print");
        setFloatingFilter(false);
        setTimeout(() => {
          gridApi.refreshHeader();
        }, 0);
        setTimeout(function () {
          handlePrint();
          props.setExportStatus({ bool: false, type: "" });
          api.setDomLayout(null);
          setFloatingFilter(true);
          setTimeout(() => {
            gridApi.refreshHeader();
          }, 0);
        }, 100);
      }
    }
  }, [props.exportStatus]);


  useEffect(()=>{
    setAllExpandedCells([...allExpandedCells, allExpandedCell])
  },[allExpandedCell])

   useEffect(()=>{
    if(gridApi){
      let clone = gridApi.getColumnDefs()
      gridApi.setColumnDefs([]) 
      let index = clone.findIndex(x=>x.field===allExpandedCell.col)
      clone[index].colSpan = function(params) {
        let expandedIndex = allExpandedCells.findIndex(x=>x.col===allExpandedCell.col && x.row===params.data["/"])
        if(expandedIndex !== -1){
          return allExpandedCells[expandedIndex].colSize
        }else{
          return 1
        }
      }
      // console.log('clone[index]', clone[index])
      clone[index].cellStyle=function(params) {
        let expandedIndex = allExpandedCells.findIndex(x=>x.col===params.colDef.field && x.row===params.data["/"])
        if(expandedIndex!==-1){
          return {zIndex:"2 !important", }
        }else{
          return {}
        }
      }
      gridApi.suppressRowTransform = true
      clone[index].rowSpan = function(params) {
        let expandedIndex = allExpandedCells.findIndex(x=>x.col===allExpandedCell.col && x.row===params.data["/"])
        if(expandedIndex!==-1){
          return allExpandedCells[expandedIndex].rowSize ? allExpandedCells[expandedIndex].rowSize : 3
        }else{
          return 1
        }
      }
      gridApi.setColumnDefs(clone) 
      // gridApi.refreshCells()
    }
      
  },[allExpandedCells])




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

  function handleExpand(parentParams, size, action){
    // console.log('params', params)
    // console.log('columnDefinition', columnDefinition)
    // let clone = JSON.parse(JSON.stringify(allExpandedCells))
    // clone.push({[params.column.colDef.field]: params.node.data["/"]})
    // console.log('parentParams', parentParams)
    if(size===1){
      let clone = JSON.parse(JSON.stringify(allExpandedCells))
      let index = clone.findIndex(x=>x.col===parentParams.column.colDef.field && x.row===parentParams.node.data["/"])
      if(index!==-1){
        clone.splice(index,1)
      }
      setAllExpandedCells(clone)
      return
    }
    let expandedCellObj = {
      row: parentParams.node.data["/"],
      col: parentParams.column.colDef.field,
      colSize: size,
      rowSize: size,
    }
    if(action && action.type==="merge" && action.range){
      expandedCellObj = {
        row: action.range[0].startRow.rowIndex + 1,
        col: action.range[0].startColumn.colDef.field,
        colSize: size,
        rowSize: action.range[0].endRow.rowIndex - action.range[0].startRow.rowIndex + 1
      }
    }
    // expandedCellObj.__proto__.toJSON = extendedCellObjtoJSON.bind(expandedCellObj)
    console.log('expandedCellObj', expandedCellObj)
    setAllExpandedCell(expandedCellObj)
   
    // console.log('clone', clone)
    // setColumnDefinition(columnDefinition)

  }

  function isCellExpanded(col, row){
    console.log('allExpandedCells', allExpandedCells)
   let index = allExpandedCells.findIndex(x=>x.col===col && x.row===row)
   return index !== -1
  }


  function getContextMenuItems(params){
    let selectedCells = params.api.getCellRanges()
    console.log('params', params)
    var result = [
      {
        name: "Expand",
        subMenu: [
          {
            name: "Merge Cells",
            disabled: !(selectedCells.length===1 && selectedCells[0].columns.length>1),
            action: ()=>{handleExpand(params, selectedCells[0].columns.length, {type:"merge", range:selectedCells})}
          },
          {
            name: 'unMerge',
            action: ()=>{handleExpand(params, 1)},
            disabled: false, 
            // (!params.node.columnApi.columnController.colSpanActive),
          },
         
        ]
        // cssClasses: ['redFont', 'bold'],
      },
      {
        name:"Color",
        action: function() {
          // console.log('params', params)
          // clone = params.api.getColumnDefs()
          // let index = col
          // clone[index].cellStyle=function(paramss){
          //   return {...clone[index].cellStyle, border:"1px solid red"}
          // }
        }
      },
      'separator',
      'copy',
      'separator',
      'chartRange',
    ];
    return result;
  }

  const allFormulateds = localStorage.getItem("formulated_documents")
    ? JSON.parse(localStorage.getItem("formulated_documents"))
    : [];

  return (
    <div ref={tableRef}>
    <div style={{width:"100%", display: "flex", justifyContent:"flex-end"}} >
        <TableOptins
          gridApi={gridApi}
          columnApi={columnApi}
          selectedRangeCellsHeader={selectedRangeCellsHeader}
        />
    </div>
    <div
      className="ag-theme-alpine"
      
      style={{
        height: props.mode ? "unset" : props.height ? props.height : 500,
        width: props.width ? props.width : "100%",
        opacity: `${opacity}`,
        transitionDuration: "0.1s",
      }}
    >
      
      <AgGridReact
      onCellFocused = {(params)=>{
        // if(params.finished && !params.started){
          let range = params.api.getCellRanges()
          let obj = {col:range[0].startColumn.colDef.field, row:range[0].startRow.rowIndex}
          console.log('params', obj)
          setSelectedRangeCellsHeader(obj)
        // }
      }}
      //   onRangeSelectionChanged={(params)=>{
      //     if(params.finished && !params.started){
      //       console.log('params', params.api.getCellRanges())
      //       let range = params.api.getCellRanges()
      //       let obj = {col:range[0].startColumn.colDef.field, row:range[0].startRow.rowIndex}
      //       setSelectedRangeCellsHeader(obj)
      //     }
      //   }}
        suppressRowTransform={true}
        headerHeight={props.headerHeight}
        columnDefs={props.columnDefinition ? props.columnDefinition : columnDefinition}
        getContextMenuItems={getContextMenuItems}
        groupHeaderHeight={props.groupHeaderHeight}
        suppressRowClickSelection={true}
        rowData={rowData}
        pagination={props.pagination==="false" ? false : true}
        paginationPageSize={15}
        enableRangeSelection={true}
        onGridReady={(params) => {
          setGridApi(params.api);
          setColumnApi(params.columnApi);
          setTimeout(() => {
            setOpacity(1);
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
        
        // rowBuffer={10}
        // debounceVerticalScrollbar={true}
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
