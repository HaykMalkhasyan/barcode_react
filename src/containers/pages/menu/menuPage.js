import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import TableComponent from './menuTable';
import ModalComponent from './menuModal';
import AddButton from "../../../components/buttons/addButton";


class MenuContainer extends Component {

    componentDidMount() {
        this.props.getPages()
    }

    render() {
        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm={this.props.perm} onClick={() => this.props.toggleModal("add", 0)}/>{" "}
                        <TableComponent
                            data={this.props.dataMenus}
                            toggleModal={this.props.toggleModal}
                            actions={this.props.menuActions}
                            // perm={this.props.perm}
                         />
                    </CardBody>
                </Card>
                <ModalComponent {...this.props} type={'add'}/>
                <ModalComponent {...this.props} type={'edit'}/>
                <ModalComponent {...this.props} type={'delete'}/>


            </Col>
        )
    }
}


export default MenuContainer;
