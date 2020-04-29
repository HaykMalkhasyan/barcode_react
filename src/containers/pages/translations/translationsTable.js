import React from "react";
import {Col, FormGroup, Input, Label, Row, Table/*, Input */} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import PaginationTable from "../../../components/PaginationTable/paginationTable";
import PaginationS from "../../../components/pagination/pagination";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {

    editBtnHandler = (item) => {
        this.props.toggleModal('edit', item.id);
        this.props.actions("get", item)
    }

    deleteBtnHandler = id => {
        this.props.toggleModal('delete', id)
    }

    newDataHandler = () => {
        let arr = this.props.data;
        let obj = {id: 1000, key: 'for test', value: 'for test', language: 'am'};
        let obj1 = {id: 1000, key: 'for test', value: 'for test', language: 'ru'};
        let obj2 = {id: 1000, key: 'for test', value: 'for test', language: 'en'};
        if (arr.length > 0) {
            arr.forEach(
                (elem, index) => {
                    if (elem.id === obj.id) {
                        arr.splice(index, 1)
                    }
                    if (elem.id === obj1.id) {
                        arr.splice(index, 1)
                    }
                    if (elem.id === obj2.id) {
                        arr.splice(index, 1)
                    }
                }
            )
        }
        return arr;
    }

    handlePageChange = (pageSize, pageNumber) => {
        this.props.getTranslationPage(pageNumber, pageSize)
    }

    render() {

        return (
            <>
                <Table responsive>
                    {/*<thead>*/}
                    {/*<tr>*/}
                    {/*    <td>#</td>*/}
                    {/*    <td><Translate name={'key'}/></td>*/}
                    {/*    <td><Translate name={'value'}/></td>*/}
                    {/*    <td><Translate name={'language'}/></td>*/}
                    {/*    <td><Translate name={'E/D'}/></td>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody>
                    {
                        this.props.data && this.props.data.length > 0 ?
                            this.props.data.map(
                                item => {

                                    return (
                                        <tr key={item.id}>
                                            {Object.keys(item).map((key) => <td key={key}>
                                                {
                                                    item[key]
                                                }
                                            </td>)}
                                            <td>
                                                <EditButton
                                                    perm={'Edit'}
                                                    onClick={this.editBtnHandler.bind(this, item)}
                                                />
                                                <DeleteButton
                                                    perm={'Delete'}
                                                    onClick={
                                                        () => this.props.toggleModal('delete', item.id)
                                                    }
                                                />
                                            </td>
                                        </tr>

                                    )
                                }
                            )
                            :
                            null
                    }
                    </tbody>
                </Table>
                <Row style={{justifyContent: 'space-between'}}>
                    <Col md={'auto'} >
                        <FormGroup>
                            <Label for="count">
                                <Input
                                    style={{display: 'inline'}}
                                    type="select"
                                    id="count"
                                    value={this.props.itemsCountPerPage || 10}
                                    // defaultValue={"0"}
                                    onChange={event => this.props.setCount(event.target.value)}
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </Input>

                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={'auto'}>
                        <PaginationS
                            onChange={this.handlePageChange.bind(this, this.props.itemsCountPerPage)}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            activePage={this.props.activePage}
                            pageRangeDisplayed={this.props.pageRangeDisplayed}
                            totalItemsCount={this.props.totalItemsCount}
                        />
                    </Col>
                </Row>
                {/*{*/}
                {/*    this.props.data && this.props.data.length > 0 ?*/}
                {/*        <PaginationTable*/}
                {/*            editEvent={this.editBtnHandler}*/}
                {/*            deleteEvent={this.deleteBtnHandler}*/}
                {/*            data={this.newDataHandler()}*/}
                {/*            dataKey={<Translate name={'key'}/>}*/}
                {/*            value={<Translate name={'value'}/>}*/}
                {/*            lang={<Translate name={'language'}/>}*/}
                {/*            // buttons={<Translate name={'E/D'}/>}*/}
                {/*        />*/}
                {/*        :*/}
                {/*        null*/}
                {/*}*/}
            </>

        );
    }
}