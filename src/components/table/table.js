import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';


const App = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const {
        rowData, setRowData
    } = props

    

    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }
    

    return (
            <div className="ag-theme-alpine" style={ { height: 600, width: 2000, margin:"0 auto" } }>
            {/* <button onClick={onButtonClick}>Get selected rows</button> */}
                <AgGridReact
                onGridReady={ params => setGridApi(params.api) } 
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
                           animateRows

                           // setting grid wide date component
                       
                           // setting default column properties
                           defaultColDef={{
                               headerComponentParams: {
                                   menuIcon: 'fa-bars'
                               }
                           }}
                           defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            filter: "agTextColumnFilter",
                            sortable: true,
                            resizable: true,
                            floatingFilter: true,

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
                </AgGridReact>
            </div>
    );
};

export default App;