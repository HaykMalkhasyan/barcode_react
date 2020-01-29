import React, { Component } from "react";
import {  Col, Card, CardBody, Modal, ModalHeader } from "reactstrap";
import TableComponent from './itemTable';
import ModalComponent from './itemModal';
import Translate from "../../../Translate";
import AddButton from "../../../components/buttons/addButton";


class ItemContainer extends Component {
    constructor(props) {
        super(props)
        this.props.getItems()
    }
    toggle() {
        
        this.props.itemModal("add",!this.props.modal.add)
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.toggle()} />{" "}
                        <TableComponent {...this.props}/>
                    </CardBody>
                </Card>
                <Modal isOpen={this.props.modal.add} toggle={()=>this.toggle()}  size="lg">
                    <ModalHeader toggle={()=>this.toggle()}><Translate name="addItem"/></ModalHeader>
                    <ModalComponent {...this.props}/>
                </Modal>

            </Col>
        )
    }
}


export default ItemContainer;
