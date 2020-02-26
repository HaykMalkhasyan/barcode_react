import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './supplierTable';
import ModalComponent from './supplierModal';
import AddButton from "../../../components/buttons/addButton";

class SupplierContainer extends Component {
    constructor(props) {
        super(props)
        this.props.supplierActions("getAll")
        this.props.getBanks()
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add")} />{" "}
                        <TableComponent
                            data = {this.props.suppliers}
                            toggleModal = {this.props.toggleModal}
                            actions = {this.props.supplierActions}
                            perm = {this.props.perm}
                        />
                    </CardBody>
                </Card>
                <ModalComponent {...this.props} type={'add'} />
                <ModalComponent {...this.props} type={'edit'} />
                <ModalComponent {...this.props} type={'delete'} />
            </Col>

        )
    }
}


export default SupplierContainer;
