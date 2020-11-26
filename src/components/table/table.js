import React, { useEffect, useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
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
import { getFullDate, getMissing, mult } from "../../services/services";
// import ClickableStatusBarComponent from './tableStatusBar';

function PrintContent(component) {
  return <div>{component}</div>;
}

const App = (props) => {
  const location = useLocation()
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [floatingFilter, setFloatingFilter] = useState(true);

  const {
    rowData,
    setOpenDelete,
    perPage,
    fullData,
    setParentRowData,
    parentRowData,
    setOpenSulierProductDialog,
    parentGridApi,
  } = props;
  const tableRef = useRef();
  const tableAddRef = useRef([])
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    gridApi && gridApi.refreshCells();
  }, [rowData]);

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

  function NumericCellEditor() {}

  NumericCellEditor.prototype.init = function (params) {
    this.eInput = document.createElement("input");
    this.eInput.className = style.editableInput;
    // this.eInput.focus();
    // this.eInput.select();
    if (isCharNumeric(params.charPress)) {
      this.eInput.value = params.charPress;
    } else {
      if (params.value !== undefined && params.value !== null) {
        this.eInput.value = params.value;
      }
    }

    var that = this;
    this.eInput.addEventListener("keypress", function (event) {
      if (!isKeyPressedNumeric(event)) {
        if (event.preventDefault) event.preventDefault();
      } else if (that.isKeyPressedNavigation(event)) {
        event.stopPropagation();
      }
    });
    this.eInput.addEventListener("keyup", (e) => {
      handleKeyPress(e, params);
    });
    var charPressIsNotANumber =
      params.charPress && "1234567890.".indexOf(params.charPress) < 0;
    if (!charPressIsNotANumber) {
      this.eInput.value = params.charPress ? params.charPress : params.value;
    }
    this.cancelBeforeStart = charPressIsNotANumber;
  };


  let columnDefinition = [
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
          checkboxSelection: true,
          pinned: "left",
          width: 90,
          filter: "agNumberColumnFilter",
          sortable: true,
          resizable: true,
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
          cellEditorSelector: function (params) {
            return {
              component: "numericCellEditor",
            };
          },
          floatingFilter: floatingFilter,
          valueFormatter: function (params) {
            return params.value + "%";
          },
          enableCellChangeFlash: true,
          cellRenderer:
            !!props.editabeFields &&
            !!Array.isArray(props.editabeFields) &&
            !!props.editabeFields.includes(item)
              ? "editableRender"
              : null,
          editable:
            !!props.editabeFields &&
            !!Array.isArray(props.editabeFields) &&
            !!props.editabeFields.includes(item),
        };
      } else {
        return {
          field: item,
          flex: 1,
          maxWidth:
            item === "Անվանում"
              ? 306
              : window.innerWidth / rowData[0].length,
          minWidth: 140,
          filter:
            typeof rowData[0][item] === "number"
              ? "agNumberColumnFilter"
              : "agTextColumnFilter",
          sortable: true,
          resizable: true,
          enableCellChangeFlash: true,
          floatingFilter: floatingFilter,
          cellRenderer:
            !!props.editabeFields &&
            !!Array.isArray(props.editabeFields) &&
            !!props.editabeFields.includes(item)
              ? "editableRender"
              : null,
          cellEditorSelector: function (params) {
            return {
              component: "numericCellEditor",
            };
          },
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
      : props.settings === "settings"
      ? {
          field: "settings",
          width: 150,
          pinned: "right",
          sortable: false,
          resizable: false,
          // floatingFilter: floatingFilter,
          cellRenderer: "btnCellRenderer",
          minWidth: 100,
        }
      : props.settings === "print"
      ? {
          field: "",
          width: 63,
          pinned: "right",
          sortable: false,
          resizable: false,
          // floatingFilter: floatingFilter,
          cellRenderer: "printButton",
        }
      : props.settings === "add"
      ? {
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
        }
      : null,
  ]

  columnDefinition = columnDefinition.filter(item=>!!item)

  NumericCellEditor.prototype.isKeyPressedNavigation = function (event) {
    return event.keyCode === 39 || event.keyCode === 37;
  };

  NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
  };

  NumericCellEditor.prototype.afterGuiAttached = function () {
    this.eInput.focus();
  };

  NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
  };

  NumericCellEditor.prototype.isCancelAfterEnd = function () {
    var value = this.getValue();
    return value.indexOf("007") >= 0;
  };

  NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
  };

  NumericCellEditor.prototype.destroy = function () {};

  NumericCellEditor.prototype.isPopup = function () {
    return false;
  };

  function EditableRender(props) {
    return (
      <div
        style={{ padding: "5px", lineHeight: "28px", boxSizing: "border-box" }}
      >
        <div
          style={{
            border: "1px solid black",
            overflow: "hidden",
            textOverflow: "elipsis",
            backgroundColor: "white",
            padding: "0px 0px 0px 10px",
            borderRadius: "9px",
            boxSizing: "border-box",
          }}
        >
          {props.colDef.field === "Զեղչ" ? props.value + "%" : props.value}
        </div>
      </div>
    );
  }

  function DeleteButton(props) {
    return (
      <IconButton
        size="small"
        color="secondary"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenDelete({
            bool: true,
            clicked: props.data,
            multiple: props.api.getSelectedRows(),
          });
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
          // console.log('fullData', fullData)
          console.log("props", props);
          console.log("props.parentGridApi", parentGridApi);
          if (props.data["Քանակ"] > 0) {
            let itemFullData = fullData.find((x) => x.id == props.data["#"]);
            let tableObj = {
              "#": getMissing(parentRowData.map((item) => +item["#"])),
              ԱՊՄ: itemFullData.articul,
              Անվանում: itemFullData.item_name,
              Մնացորդ: itemFullData.in_stores,
              ԱՏԳ: itemFullData.adgt,
              Քանակ: props.data["Քանակ"],
              "Մատակարարի գին": 0,
              Զեղչ: 0,
              "Առքի գին": props.data["Առքի գին"],
              "Առքի գումար": mult(props.data["Առքի գին"], props.data["Քանակ"]),
              "Վաճ գին Վաճառքի գին": 0,
              "Վաճ գումար Վաճառքի գին": 0,
              "Տոկոս Վաճառքի գին": 0,
              Բարկոդ: "",
            };
            // console.log('} = props', [...parentRowData, tableObj])
            if (itemFullData) {
              let clone = JSON.parse(JSON.stringify(parentRowData));
              clone.push(tableObj);
              setParentRowData(clone);
              var newItems = [tableObj];

              setTimeout(() => {
                parentGridApi &&
                  parentGridApi.applyTransaction({
                    add: newItems,
                    addIndex: parentRowData.length,
                  });
              }, 200);
              setOpenSulierProductDialog(false);
            }
          }
          return;
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
          return;
        }}
      >
        <PrintIcon />
      </IconButton>
    );
  }

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

  function handleKeyPress(e, params) {
    e.preventDefault();
    let currentFocused = params.api.getFocusedCell();
    if (e.keyCode === 40) {
      params.api.setFocusedCell(
        currentFocused.rowIndex + 1,
        currentFocused.column,
        null
      );
      params.api.startEditingCell(
        currentFocused.rowIndex + 1,
        currentFocused.column
      );
    } else if (e.keyCode === 38) {
      params.api.setFocusedCell(
        currentFocused.rowIndex - 1,
        currentFocused.column,
        null
      );
      params.api.startEditingCell(
        currentFocused.rowIndex - 1,
        currentFocused.column
      );
    } else {
      return;
    }
  }

  function handleCellChange(params) {
    const { rowIndex, data } = params;
    props.dataUpdater && props.dataUpdater(rowIndex, data, params);
  }

  const allFormulateds = localStorage.getItem("formulated_documents")
    ? JSON.parse(localStorage.getItem("formulated_documents"))
    : [];

  return (
    <div ref={tableRef}>
    
    <div
      className="ag-theme-alpine"
      
      style={{
        height: props.mode ? "unset" : props.height ? props.height : 557,
        width: props.width ? props.width : "100%",
        opacity: `${opacity}`,
        transitionDuration: "0.1s",
      }}
    >
      
      <AgGridReact
      
        headerHeight={props.headerHeight}
        groupHeaderHeight={props.groupHeaderHeight}
        immutableData={true}
        suppressRowClickSelection={true}
        rowData={rowData}
        onCellEditingStopped={handleCellChange}
        animateRows
        rowSelection="multiple"
        pagination={props.pagination==="false" ? false : true}
        paginationAutoPageSize={props.pagination ? !!props.pagination : true}
        enableRangeSelection={true}
        rowMultiSelectWithClick={true}
        onGridReady={(params) => {
          setGridApi(params.api);
          setColumnApi(params.columnApi);
          props.setGridApi && props.setGridApi(params.api);
          props.setColumnApi && props.setColumnApi(params.columnApi);
          props.mode && params.api.setDomLayout(props.mode);
          setTimeout(() => {
            setOpacity(1);
          }, 10);
        }}
        rowClassRules={{
          [style.formulatedRow]: function (params) {
            return (
              allFormulateds
                .map((item) => item["#"])
                .includes(params.data["#"]) &&
              window.location.pathname === "/income"
            );
          },
          [style.unformulatedRow]: function (params) {
            return (
              !allFormulateds
                .map((item) => item["#"])
                .includes(params.data["#"]) &&
              window.location.pathname === "/income"
            );
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
        columnDefs={props.columnDefinition ? props.columnDefinition : columnDefinition}
        components={{
          numericCellEditor: NumericCellEditor,
        }}
        // pinnedBottomRowData={createData(1, 'Bottom')}
        frameworkComponents={{
          btnCellRenderer: BtnCellRenderer,
          deleteButton: DeleteButton,
          printButton: PrintButton,
          addButton: AddButton,
          editableRender: EditableRender,
          // statusBarComponent: ClickableStatusBarComponent,
        }}

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
      ></AgGridReact>
    
    </div>
    
    </div>
  );
};

export default App;
