import React, { Component } from "react";
import {  Col, Card, CardBody } from "reactstrap";
import TableComponent from './productTable';
import ModalComponent from './modal/productModal';
import AddButton from "../../../components/buttons/addButton";


class ProductContainer extends Component {
    constructor(props) {
        super(props)
        this.props.productActions("getAll")
        this.props.groupActions("getAll")
        this.props.subGroupActions("getAll")
        this.props.barcodeActions("getTypes")
    }

    render() {
        return(
            <Col sm="12">
                <Card>
                    <CardBody>
                        <AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add",0)} />{" "}
                        <TableComponent
                            selectClassifiersGroup = {this.props.selectClassifiersGroup}
                            advancedSearchConfig = {this.props.advancedSearchConfig}
                            createError = {this.props.createError}
                            createClassifiers = {this.props.createClassifiers}
                            classifiersToggleModal = {this.props.classifiersToggleModal}
                            classifiersModal = {this.props.classifiersModal}
                            selectGroupsNode = {this.props.selectGroupsNode}
                            data = {this.props.products}
                            groups = {this.props.groups}
                            group = {this.props.group}
                            subGroups={this.props.subGroups}
                            searchErrorName = {this.props.searchErrorName}
                            setSearchProductValue = {this.props.setSearchProductValue}
                            searchProductResult = {this.props.searchProductResult}
                            searchProduct = {this.props.searchProduct}
                            types = {this.props.types}
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
