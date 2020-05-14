import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './positionTable';
import ModalComponent from './positionModal';
import AddButton from "../../../components/buttons/addButton";


class PositionContainer extends Component {
    constructor(props) {
        super(props)
        this.props.positionActions("getAll")
    }
    render() {

        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add",0)} />{" "}
                        <TableComponent
                            data = {this.props.positions}
                            toggleModal = {this.props.toggleModal}
                            actions = {this.props.positionActions}
                            perm = {this.props.perm}
                        />
                    </CardBody>
                </Card>

                <ModalComponent {...this.props} type={"add"} />
                <ModalComponent {...this.props} type={"edit"} />
                <ModalComponent {...this.props} type={"delete"} />
            </Col>
        )
    }
}


export default PositionContainer;
