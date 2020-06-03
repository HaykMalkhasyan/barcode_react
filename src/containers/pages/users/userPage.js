import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './userTable';
import ModalComponent from './userModal';
import AddButton from "../../../components/buttons/addButton";



class UserContainer extends Component {
    constructor(props) {
        super(props)
        this.props.userActions("getAll")
        this.props.positionActions("getAll")
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        {
                            this.props.editabledStatus ?
                                <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add")} />
                                :
                                null
                        }
                        <TableComponent
                            sectionFontColor = {this.props.sectionFontColor}
                            editabledStatus = {this.props.editabledStatus}
                            userEditableToggle = {this.props.userEditableToggle}
                            data = {this.props.users}
                            toggleModal = {this.props.toggleModal}
                            actions = {this.props.userActions}
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
