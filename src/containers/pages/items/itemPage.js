import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './itemTable';
import ModalComponent from './itemModal';
import AddButton from "../../../components/buttons/addButton";


class ItemContainer extends Component {
    constructor(props) {
        super(props)
        this.props.itemActions("getAll")
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add",0)} />{" "}
                        <TableComponent {...this.props}/>
                    </CardBody>
                </Card>
                <ModalComponent {...this.props} type={'add'} />
                <ModalComponent {...this.props} type={'edit'} />
                <ModalComponent {...this.props} type={'delete'} />


            </Col>
        )
    }
}


export default ItemContainer;
