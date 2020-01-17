import React, { Component } from "react";
import {  Col, Card, CardBody, Modal, ModalHeader } from "reactstrap";
import TableComponent from './positionTable';
import PositionModal from './positionModal';
import Translate from "../../../Translate";
import AddButton from "../../../components/buttons/addButton";


class UserContainer extends Component {
    constructor(props) {
        super(props)
        this.props.getPositions()
    }
    toggle() {
        
        this.props.positionModal("add",!this.props.modal.add)
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
                <Modal isOpen={this.props.modal.add} toggle={()=>this.toggle()}  size="md">
                    <ModalHeader toggle={()=>this.toggle()}><Translate name="addPosition"/></ModalHeader>
                    <PositionModal {...this.props}/>
                </Modal>

            </Col>
        )
    }
}


export default UserContainer;
