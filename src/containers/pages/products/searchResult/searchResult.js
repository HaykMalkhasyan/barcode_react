import React, {Component} from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import SearchFilters from "./filters/SearchFilters";
import Content from "./content/content";
import ModalComponent from "../modal/productModal";

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.props.productActions("getAll")
        this.props.groupActions("getAll")
        this.props.subGroupActions("getAll")
        this.props.barcodeActions("getTypes")
        this.props.getPages()
    }

    changeCheckboxHandler = (name, check) => {
        this.props.toggleCheckBoxValue(name, check)
    }

    changeSwitchHandler = (name, value) => {
        this.props.toggleSwitchValue(name, value)
    }

    render() {

        return (
            <Card>
                <CardBody>
                    <Row>
                        <SearchFilters
                            //customizations
                            sectionFontColor={this.props.sectionFontColor}
                            //classificators
                            subGroupCollapses={this.props.subGroupCollapses}
                            collapsedStatus={this.props.collapsedStatus}
                            toggleCheckBoxValue={this.props.toggleCheckBoxValue}
                            groups={this.props.groups}
                            group={this.props.group}
                            createError={this.props.createError}
                            classifiersToggleModal={this.props.classifiersToggleModal}
                            subGroups={this.props.subGroups}
                            classifiersModal={this.props.classifiersModal}
                            selectClassifiersGroup={this.props.selectClassifiersGroup}
                            selectGroupsNode={this.props.selectGroupsNode}
                            createClassifiers={this.props.createClassifiers}
                            //product sections
                            searchProduct={this.props.searchProduct}
                            changeCheckboxHandler={this.changeCheckboxHandler}
                            //specifications
                            changeSwitchHandler={this.changeSwitchHandler}
                            //for all
                            advancedSearchConfig={this.props.advancedSearchConfig}
                        />
                        <Content
                            sectionFontColor={this.props.sectionFontColor}
                            searchProduct={this.props.searchProduct}
                            searchErrorName={this.props.searchErrorName}
                            editabledStatus={this.props.editabledStatus}
                            data={this.props.products}
                            searchProductResult={this.props.searchProductResult}
                            //methods
                            setSearchProductValue={this.props.setSearchProductValue}
                            toggleModal={this.props.toggleModal}
                            actions={this.props.productActions}
                            editabledProduct={this.props.editabledProduct}
                        />
                    </Row>
                </CardBody>
                <ModalComponent {...this.props} type={'add'}/>
                <ModalComponent {...this.props} type={'edit'}/>
                <ModalComponent {...this.props} type={'delete'}/>
            </Card>
        )
    }
}

export default SearchResult