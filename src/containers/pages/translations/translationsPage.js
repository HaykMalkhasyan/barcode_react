import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import TableComponent from './translationsTable';
import ModalComponent from './translationsModal';
// import AddButton from "../../../components/buttons/addButton";
// import {toggleTranslationModal, translationActions} from "../../../redux/lang/actions";


class MenuContainer extends Component {

    componentDidMount() {
        this.props.getTranslations()
        this.props.getTranslationsWithSize(10)
    }

    render() {
        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        {/*<AddButton perm={this.props.perm} onClick={() => this.props.toggleModal("add", 0)}/>{" "}*/}
                        <TableComponent
                            getTranslationPage={this.props.getTranslationPage}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            pageRangeDisplayed={this.props.pageRangeDisplayed}
                            totalItemsCount={this.props.totalItemsCount}
                            activePage={this.props.activePage}
                            setCount={this.props.setCount}
                            data={this.props.translationsSize}
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
