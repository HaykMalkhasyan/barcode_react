import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import TableComponent from './translationsTable';
import ModalComponent from './translationsModal';
import AddButton from "../../../components/buttons/addButton";
import {toggleTranslationModal, translationActions} from "../../../redux/lang/actions";


class MenuContainer extends Component {

    componentDidMount() {
        this.props.getTranslations()
    }

    render() {
        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        {/*<AddButton perm={this.props.perm} onClick={() => this.props.toggleModal("add", 0)}/>{" "}*/}
                        <TableComponent
                            data={this.props.translations}
                            toggleModal={this.props.toggleTranslationModal}
                            actions={this.props.translationActions}
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
