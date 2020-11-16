import React, { useEffect, useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import "./table.css"
import "ag-grid-enterprise";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PrintIcon from '@material-ui/icons/Print';
import { IconButton } from "@material-ui/core";
import style from "./table.module.css"
import AddIcon from '@material-ui/icons/Add';

const App = (props) => {
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [floatingFilter, setFloatingFilter] = useState(true);

  const { rowData, setOpenDelete, perPage } = props;
  const tableRef = useRef();


  useEffect(()=>{
    gridApi && gridApi.refreshCells() 
  },[rowData])

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  function btnClickedHandler(props) {
    console.log("rowData", props);
    if(allFormulateds.map(item=>item["#"]).includes(+props.data["#"])){
      history.push(`/formulatedItem/${props.data["#"]}`);  
      return
    }
    history.push(`/itemsByGroup/${props.data["#"]}`);
    return
  }

  function BtnCellRenderer(props) {
    return (
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        fullWidth
        onClick={() => {
          btnClickedHandler(props);
        }}
      >
        Մանրամասներ
      </Button>
    );
  }

  function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}

  function NumericCellEditor() {
  }

  NumericCellEditor.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.className=style.editableInput
    // this.eInput.parentNode.style={...this.eInput.parentNode.style, display:"flex", justifyContent:"center", alignItems:"center"}
    // console.log('this.eInput', {a:this.eInput.parentElement})

    if (isCharNumeric(params.charPress)) {
        this.eInput.value = params.charPress;
    } else {
        if (params.value !== undefined && params.value !== null) {
            this.eInput.value = params.value;
        }
    }

    var that = this;
    this.eInput.addEventListener('keypress', function (event) {
        if (!isKeyPressedNumeric(event)) {
            that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
        } else if (that.isKeyPressedNavigation(event)){
            event.stopPropagation();
        }
    });

    // only start edit if key pressed is a number, not a letter
    var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
};

NumericCellEditor.prototype.isKeyPressedNavigation = function (event){
  return event.keyCode===39
      || event.keyCode===37;
};


// gets called once when grid ready to insert the element
NumericCellEditor.prototype.getGui = function () {
  return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditor.prototype.afterGuiAttached = function () {
  this.eInput.focus();
};

// returns the new value after editing
NumericCellEditor.prototype.isCancelBeforeStart = function () {
  return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditor.prototype.isCancelAfterEnd = function () {
  var value = this.getValue();
  return value.indexOf('007') >= 0;
};

// returns the new value after editing
NumericCellEditor.prototype.getValue = function () {
  return this.eInput.value;
};

// any cleanup we need to be done here
NumericCellEditor.prototype.destroy = function () {
  // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup 
NumericCellEditor.prototype.isPopup = function () {
  // and we could leave this method out also, false is the default
  return false;
};

  function EditableRender(props){
    // console.log('props', props)
    return <div onClick={()=>{console.log('props', props)}} style={{padding:"5px", lineHeight:"28px", boxSizing:"border-box"}} >
        <div style={{border:"1px solid black",overflow:"hidden", textOverflow:"elipsis", backgroundColor:"white",padding:"0px 0px 0px 10px", borderRadius:"9px", boxSizing:"border-box"}} >
        {props.colDef.field=== "Զեղչ" ? 
        props.value + "%":
        props.value  
      }
      </div>
    </div>
  }

  function DeleteButton(props) {
    return (
      <IconButton
        size="small"
        color="secondary"
        onClick={() => {
          setOpenDelete({ bool: true, index: props.rowIndex });
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    );
  }
  
  function AddButton(props) {
    return (
      <IconButton
        size="small"
        color="primary"
        onClick={() => {
          return
        }}
      >
        <AddIcon />
      </IconButton>
    );
  }

  function PrintButton(props) {
    return (
      <IconButton
        size="small"
        color="primary"
        onClick={() => {
          return
        }}
      >
        <PrintIcon />
      </IconButton>
    );
  }

  useEffect(() => {
    if (props.exportStatus && props.exportStatus.bool) {
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
          api.setDomLayout(null);
          setFloatingFilter(true);
          setTimeout(() => {
            gridApi.refreshHeader();
          }, 0);
        }, 100);
      }
    }
  }, [props.exportStatus]);





  function handleCellChange(params) {
    const { rowIndex, data } = params;
    props.dataUpdater && props.dataUpdater(rowIndex, data, params);
  }
  const allFormulateds= localStorage.getItem("formulated_documents") ? JSON.parse(localStorage.getItem("formulated_documents")) : []

  return (
    <div
      className="ag-theme-alpine"
      ref={tableRef}
      style={{ height: 557, width: "100%", margin: "0 auto" }}
    >
      {/* <button onClick={onButtonClick}>Get selected rows</button> */}
      <AgGridReact
        onGridReady={(params) => {
          setGridApi(params.api);
        }}
        
        
        rowData={rowData}
        rowSelection="multiple"
        rowClassRules={{
          [style.formulatedRow]: function (params) {
            return allFormulateds.map(item=>item["#"]).includes(params.data['#']) && window.location.pathname === "/income"
          },
          [style.unformulatedRow]: function (params) {
            return !allFormulateds.map(item=>item["#"]).includes(params.data['#']) && window.location.pathname === "/income"
          },
        }}
        groupSelectsChildren={true}
        autoGroupColumnDef={{
          headerName: "Model",
          field: "model",
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
            checkbox: true,
          },
        }}
        onCellEditingStopped={handleCellChange}
        animateRows
        // setting grid wide date component
        // setting default column properties
        //    defaultColDef={{
        //        headerComponentParams: {
        //            menuIcon: 'fa-bars'
        //        }
        //    }}
        // defaultColDef={{
        // flex: 1,
        // minWidth: 100,
        // filter: "agTextColumnFilter",
        // sortable: true,
        // resizable: true,
        // floatingFilter: floatingFilter,
        // }}
        columnDefs={[
          ...Object.keys(rowData[0]).map((item) => {
            if (item === "Ամսաթիվ") {
              return {
                field: "Ամսաթիվ",
                width: 150,
                filter: "agDateColumnFilter",
                sortable: true,
                resizable: true,
                floatingFilter: floatingFilter,
              };
            } else if (item === "#") {
              return {
                field: "#",
                pinned: "left",
                width: 70,
                filter: "agNumberColumnFilter",
                sortable: true,
                resizable: true,
              //   cellStyle: function(params) {
              //     if (!!props.editabeFields &&
              //       !!Array.isArray(props.editabeFields) &&
              //       !!props.editabeFields.includes(item)) {
              //         //mark police cells as red
              //         return {color: 'red', backgroundColor: 'green'};
              //     } else {
              //         return null;
              //     }
              // },
                // floatingFilter: floatingFilter,
                editable:
                  !!props.editabeFields &&
                  !!Array.isArray(props.editabeFields) &&
                  !!props.editabeFields.includes(item),
              };
            } else if (item === "Զեղչ") {
              return {
                field: "Զեղչ",
                width: 115,
                filter: "agNumberColumnFilter",
                sortable: true,
                resizable: true,
                cellEditorSelector:function (params) {
                      return {
                          component: 'numericCellEditor'
                      };
                  },
                floatingFilter: floatingFilter,
                valueFormatter: function(params) { return params.value + "%"; },
              //   cellStyle: function(params) {
              //     if (!!props.editabeFields &&
              //       !!Array.isArray(props.editabeFields) &&
              //       !!props.editabeFields.includes(item)) {
              //         //mark police cells as red
              //         return {border: '1px solid black', borderRadius:"9px"};
              //     } else {
              //         return null;
              //     }
              // },
              enableCellChangeFlash:true,
              cellRenderer:!!props.editabeFields &&
                !!Array.isArray(props.editabeFields) &&
                !!props.editabeFields.includes(item) ? "editableRender" : null,
                editable:
                  !!props.editabeFields &&
                  !!Array.isArray(props.editabeFields) &&
                  !!props.editabeFields.includes(item),
              };
            } else {
              return {
                field: item,
                width: item === "Անվանում" ? 306 : window.innerWidth / 16,
                filter:
                  typeof rowData[0][item] === "number"
                    ? "agNumberColumnFilter"
                    : "agTextColumnFilter",
                sortable: true,
                resizable: true,
                enableCellChangeFlash:true,
                floatingFilter: floatingFilter,
                cellRenderer:!!props.editabeFields &&
                !!Array.isArray(props.editabeFields) &&
                !!props.editabeFields.includes(item) ? "editableRender" : null,
                cellEditorSelector:function (params) {
                  return {
                      component: 'numericCellEditor'
                  };
              },
              //   cellStyle: function(params) {
              //     if (!!props.editabeFields &&
              //       !!Array.isArray(props.editabeFields) &&
              //       !!props.editabeFields.includes(item)) {
              //         //mark police cells as red
              //         return {border: '1px solid black', borderRadius:"9px", boxSizing:"border-box"};
              //     } else {
              //         return null;
              //     }
              // },
                editable:
                  !!props.editabeFields &&
                  !!Array.isArray(props.editabeFields) &&
                  !!props.editabeFields.includes(item),
              };
            }
          }),

          props.settings === "delete"
            ? {
                field: "",
                width: 63,
                sortable: false,
                resizable: false,
                // floatingFilter: floatingFilter,
                cellRenderer: "deleteButton",
              }
            : props.settings === "settings" ? {
                field: "settings",
                width:150,
                pinned: "right",
                sortable: false,
                resizable: false,
                // floatingFilter: floatingFilter,
                cellRenderer: "btnCellRenderer",
                minWidth: 100,
                cellRendererParams: {
                  clicked: function (field) {
                    console.log("field", field);
                  },
                },
              } : props.settings === "print" ?  {
                  field: "",
                  width: 63,
                  pinned: "right",
                  sortable: false,
                  resizable: false,
                  // floatingFilter: floatingFilter,
                  cellRenderer: "printButton",
                  
                  cellRendererParams: {
                    clicked: function (field) {
                      console.log("field", field);
                    },
                  },
              } : props.settings === "add" ? {
                field: "",
                  width: 63,
                  pinned: "right",
                  sortable: false,
                  resizable: false,
                  // floatingFilter: floatingFilter,
                  cellRenderer: "addButton",
                  
                  cellRendererParams: {
                    clicked: function (field) {
                      console.log("field", field);
                    },
                  },
              } : {}
        ]}
        components={{
          numericCellEditor:NumericCellEditor,
        }}
        frameworkComponents={{
          btnCellRenderer: BtnCellRenderer,
          deleteButton: DeleteButton,
          printButton: PrintButton,
          addButton: AddButton,
          editableRender:EditableRender,
        }}
        pagination={true}
        paginationAutoPageSize={true}
      >
        {Object.keys(rowData[0]).map((item) => {
          if (item === "Ամսաթիվ") {
            return (
              <AgGridColumn
                filter="agDateColumnFilter"
                field={item}
              ></AgGridColumn>
            );
          }
          if (item === "#") {
            return (
              <AgGridColumn
                filter="agNumberColumnFilter"
                field={item}
              ></AgGridColumn>
            );
          }
          return <AgGridColumn field={item}></AgGridColumn>;
        })}
        {/* <AgGridColumn  field={"settings"} >
                                
                            </AgGridColumn> */}
      </AgGridReact>
    </div>
  );
};

export default App;
