import React, { useEffect, useRef, useState, Component } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useReactToPrint } from "react-to-print";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';

const App = (props) => {
    const history = useHistory()
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [floatingFilter, setFloatingFilter] = useState(true)

    const {
        rowData, setRowData, setOpenDelete
    } = props
    const tableRef = useRef()


    const handlePrint = useReactToPrint({
        content: () => tableRef.current
      });

      class BtnCellRenderer extends Component {
        constructor(props) {
          super(props);
          this.btnClickedHandler = this.btnClickedHandler.bind(this);
        }
        btnClickedHandler() {

         this.props.clicked(this.props.value);
        }
        render() {
          return (
            <Button
                variant="outlined"
                color="inherit"
                size="small"
                fullWidth
                onClick={this.btnClickedHandler}
            >
                Մանրամասներ
            </Button>
          )
        }
      }

      function DeleteButton(props) {
          return <IconButton
          size="small"
          color="secondary"
            onClick={()=>{
                setOpenDelete({bool:true, index:props.rowIndex})
            }}
          >
              <DeleteForeverIcon />
          </IconButton>
      }
      



    useEffect(()=>{
        if(props.exportStatus && props.exportStatus.bool){
            if(props.exportStatus.type==="excel"){
                gridApi.exportDataAsExcel({});
            }else if(props.exportStatus.type==="csv"){
                gridApi.exportDataAsCsv({});
            }else if(props.exportStatus.type==="print"){
                var api = gridApi;
                api.setDomLayout('print');
                setFloatingFilter(false)
                setTimeout(()=>{
                    gridApi.refreshHeader()
                },0)
                setTimeout(function () {
                    handlePrint()
                    api.setDomLayout(null);
                    setFloatingFilter(true)
                    setTimeout(()=>{
                        gridApi.refreshHeader()
                    },0)

                }, 100);
            }
        }
    },[props.exportStatus])
function handleCellChange(params) {
    const {
        rowIndex,
        data,
    } = params
    props.dataUpdater && props.dataUpdater(rowIndex, data)
}


    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }
    

    return (
            <div className="ag-theme-alpine" ref={tableRef} style={ { height: 557, width: 2000, margin:"0 auto" } }>
            {/* <button onClick={onButtonClick}>Get selected rows</button> */}
                <AgGridReact
                    onGridReady={ params => {setGridApi(params.api); setGridColumnApi(params.columnApi);}} 
                    rowData={rowData}
                    rowSelection="multiple"
                    groupSelectsChildren={true}
                    autoGroupColumnDef={{
                        headerName: "Model",
                        field: "model",
                        cellRenderer:'agGroupCellRenderer',
                        cellRendererParams: {
                            checkbox: true
                        }
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
                              ...Object.keys(rowData[0]).map((item)=>{ 
                                  if(item === "Ամսաթիվ"){
                                return {
                                    field: 'Ամսաթիվ',
                                    flex: 1.2,
                                    minWidth: 150,
                                    filter: "agDateColumnFilter",
                                    sortable: true,
                                    resizable: true,
                                    floatingFilter: floatingFilter,
                                    
                                }
                            }else{
                               return {
                                    field: item,
                                    flex: 1,
                                    minWidth: 100,
                                    filter: typeof(rowData[0][item])==="number" ? "agNumberColumnFilter" : "agTextColumnFilter",
                                    sortable: true,
                                    resizable: true,
                                    floatingFilter: floatingFilter,
                                    editable: !!props.editabeFields && !!Array.isArray(props.editabeFields) && !!props.editabeFields.includes(item)
                                }
                            }
                              }),
                            
                            props.settings === "delete" ? 
                            { 
                                field: 'delete',
                                flex: 1.2,
                                minWidth: 300,
                                sortable: true,
                                resizable: true,
                                floatingFilter: floatingFilter,
                                cellRenderer: 'deleteButton',
                                minWidth: 100,
                                cellRendererParams: {
                                clicked: function(field) {
                                    console.log('field', field)
                                    },
                                },
                            } 
                            :
                             {
                                field: 'settings',
                                flex: 1.2,
                                minWidth: 300,
                                sortable: true,
                                resizable: true,
                                floatingFilter: floatingFilter,
                                cellRenderer: 'btnCellRenderer',
                                minWidth: 100,
                                cellRendererParams: {
                                  clicked: function(field) {
                                    history.push(`/itemsByGroup/${1}`)
                                  },
                                },
                              }
                          ]}
                    frameworkComponents={ {
                        btnCellRenderer: BtnCellRenderer,
                        deleteButton : DeleteButton,
                    }}
                    pagination={true}
                    paginationPageSize={10}
                           >   
                           {Object.keys(rowData[0]).map(item=>{
                               if(item==="Ամսաթիվ"){
                                   return <AgGridColumn filter="agDateColumnFilter" field={item} ></AgGridColumn>
                               }
                               if(item==="#"){
                                return <AgGridColumn filter="agNumberColumnFilter" field={item} ></AgGridColumn>
                            }
                               return <AgGridColumn  field={item} ></AgGridColumn>
                           })}
                            {/* <AgGridColumn  field={"settings"} >
                                
                            </AgGridColumn> */}
                </AgGridReact>
            </div>
    );
};

export default App;