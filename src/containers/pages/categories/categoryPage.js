import React, { Component } from "react";
import {  Col, Card, CardBody, } from "reactstrap";
import TableComponent from './categoryTable';
import AddButton from "../../../components/buttons/addButton";
import ModalComponent from "./categoryModal";


class UserContainer extends Component {
    constructor(props) {
        super(props)
        this.props.categoryActions("getAll")

    }
    render() {
            return(
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add",0)} />{" "}
                            <TableComponent
                                data = {this.props.categories}
                                toggleModal = {this.props.toggleModal}
                                actions = {this.props.categoryActions}
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


export default UserContainer;
