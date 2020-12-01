import React, {useState} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-enterprise";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ProductTable = props => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);

    const columnDefinition = [
        ...Object.entries(props.data).map(([key, item]) => {

            return {
                field: Object.keys(item)[key]
            }
        })
    ]

    return (
        <div className="ag-theme-alpine" style={{background: 'cyan', height: 700, width: "100%", overflow: "hidden"}} >
            <AgGridReact
                onGridReady={params => {setGridApi(params.api);setGridColumnApi(params.columnApi);console.log(params)}}
                rowData={props.data}
                rowSelection={props.rowSelection}
                columnDefs={columnDefinition}
            />
        </div>
    )
}

export default ProductTable;