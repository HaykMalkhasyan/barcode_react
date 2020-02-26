import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './productTable';
import ModalComponent from './productModal';
import AddButton from "../../../components/buttons/addButton";


class ProductContainer extends Component {
    constructor(props) {
        super(props)
        this.props.productActions("getAll")
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add",0)} />{" "}
                        <TableComponent
                            data = {this.props.products}
                            toggleModal = {this.props.toggleModal}
                            actions = {this.props.productActions}
                            perm = {this.props.perm}/>
                    </CardBody>
                </Card>
                <ModalComponent {...this.props} type={'add'} />
                <ModalComponent {...this.props} type={'edit'} />
                <ModalComponent {...this.props} type={'delete'} />


            </Col>
        )
    }
}


export default ProductContainer;
