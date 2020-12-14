import React from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-enterprise";

const ProductTable = props => {

    return (
        <div className="ag-theme-alpine" style={{height: 897, width: "100%", overflow: "hidden"}}>
            <AgGridReact
                onGridReady={props.onGridReady.bind(this)}
                rowData={props.data || []}
                rowSelection={props.rowSelection}
                columnDefs={props.columnDefinition}
                onCellClicked={props.onColumnEvent.bind(this)}
                rowMultiSelectWithClick={true}
                animateRows={props.animateRows}
                rowDragManaged={props.rowDragManaged}
                rowClassRules={props.rowClassRules}
                enableMultiRowDragging={props.enableMultiRowDragging}
                frameworkComponents={props.frameworkComponents}
                enableRangeSelection={props.enableRangeSelection}
                enableFillHandle={props.enableFillHandle}
                columnTypes={props.columnTypes}
            />
        </div>
    )
}

export default ProductTable;