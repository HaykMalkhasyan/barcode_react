import React, { Component } from "react";
import {  Col, Card, CardBody, Modal, ModalHeader } from "reactstrap";
import TableComponent from './components/table/dropDownTable';
import ModalComponent from './userModal';
import Translate from "../../../Translate";
import AddButton from "../../../components/buttons/addButton";



class UserContainer extends Component {
    constructor(props) {
        super(props)
        this.props.getUsers()
        this.props.getPositions()
    }
    toggle() {
        this.props.userModal("add",!this.props.modal.add)
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <TableComponent data = { this.props.categories } perm={ this.props.categoryPerm } handle = { this.props.handle }/>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}


export default UserContainer;
