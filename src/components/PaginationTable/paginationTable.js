import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import EditButton from "../buttons/editButton";
import DeleteButton from "../buttons/deleteButton";

class PaginationTable extends React.Component {
    state = {
        thColor: '#868e96',
        item: null,
        index: false,
        options: {
            afterSearch: this.afterSearch,
        },
        selectRowProp: {
            mode: 'radio',
            visibility: 'hidden',
            bgColor: '#009DA0',
            clickToSelect: true,
            onSelect: (rowKeys) => this.onRowSelect(rowKeys),
        }
    }

    afterSearch = (searchText, result) => {
    }

    onRowSelect = (rowKeys) => {
        this.setState({
            index: true,
            item: rowKeys,
        })
    }


    render() {
        return (
            <div>
                {
                    this.state.index ?
                        <EditButton
                            perm={'Edit'}
                            onClick={this.props.editEvent.bind(this, this.state.item)}
                        />
                        :
                        null
                }
                {
                    this.state.index ?
                        < DeleteButton
                            perm={'Delete'}
                            onClick={this.props.deleteEvent.bind(this, this.state.item.id)}
                        />
                        :
                        null
                }
                <BootstrapTable
                    ref='table'
                    data={this.props.data}
                    pagination
                    selectRow={this.state.selectRowProp}
                    search={true}
                    options={this.state.options}
                >
                    <TableHeaderColumn dataSort={true} dataField='id' isKey><b style={{color: this.state.thColor}}>#</b></TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='key'><b style={{color: this.state.thColor}}>{this.props.dataKey}</b></TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='value'><b style={{color: this.state.thColor}}>{this.props.value}</b></TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='language'><b style={{color: this.state.thColor}}>{this.props.lang}</b></TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default PaginationTable