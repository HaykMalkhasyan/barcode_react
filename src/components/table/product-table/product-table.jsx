import React, {useState} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-enterprise";

const ProductTable = props => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

const onColumnEvent = params => {
    console.log("params (>colDef>field):", params.colDef.field)
    if (props.tableType === "product" && params.colDef.field === "item_name") {
        props.clickHandler(params.data.id)
    }
}

    return (
        <div className="ag-theme-alpine" style={{background: 'cyan', height: 897, width: "100%", overflow: "hidden"}} >
            <AgGridReact
                onGridReady={params => {setGridApi(params.api);setGridColumnApi(params.columnApi)}}
                rowData={props.data || []}
                rowSelection={props.rowSelection}
                columnDefs={props.columnDefinition}
                onCellClicked={onColumnEvent.bind(this)}
                animateRows={props.animateRows}
                rowDragManaged={props.rowDragManaged}
                rowClassRules={props.rowClassRules}
                enableMultiRowDragging={props.enableMultiRowDragging}
                frameworkComponents={props.frameworkComponents}
                enableRangeSelection={props.enableRangeSelection}
                enableFillHandle={props.enableFillHandle}
            />
        </div>
    )
}

export default ProductTable;