import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-enterprise";

const ProductTable = props => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = params => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi)

        if (props.selected && props.selected.length) {
            if (params.api) {
                params.api.forEachNode(node => {
                    if (props.selected.indexOf(node.data.id) !== -1) {
                        // console.log(node)
                        node.setSelected(true)
                    }
                });
            }
        }
    }

    const onColumnEvent = params => {
        console.log(props.selected.indexOf(params.data.id) === -1)
        if (props.tableType === "product" && params.colDef.field === "item_name") {
            if (props.selected.indexOf(params.data.id) === -1) {
                params.node.setSelected(false)
            } else {
                params.node.setSelected(true)
            }
            props.clickHandler(params.data.id)
        } else {
            const selected = [...props.selected];
            const id = params.data.id;
            const index = selected.indexOf(id);
            if (index === -1) {
                selected.push(id)
                // params.api.setSelected(true)
            } else {
                selected.splice(index, 1)
            }
            props.setSelected(selected)
        }
    }

    // const onRowSelected = (event) => {
    //     console.log("onRowSelected", gridApi)
    //     if (colDef !== "item_name") {
    //         const selected = [...props.selected];
    //         const id = event.data.id;
    //         const index = selected.indexOf(id);
    //         if (index === -1) {
    //             selected.push(id)
    //             event.node.setSelected(true)
    //         } else {
    //             selected.splice(index, 1)
    //         }
    //         props.setSelected(selected)
    //     }
    // }

    return (
        <div className="ag-theme-alpine" style={{height: 897, width: "100%", overflow: "hidden"}}>
            <AgGridReact
                onGridReady={onGridReady.bind(this)}
                rowData={props.data || []}
                rowSelection={props.rowSelection}
                columnDefs={props.columnDefinition}
                onCellClicked={onColumnEvent.bind(this)}
                rowMultiSelectWithClick={true}
                animateRows={props.animateRows}
                rowDragManaged={props.rowDragManaged}
                rowClassRules={props.rowClassRules}
                // onRowSelected={onRowSelected.bind(this)}
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