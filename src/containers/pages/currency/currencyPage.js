import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import CurrencyTable from './currencyTable';
// import ModalComponent from './supplierModal';
import CurrencyModal from "./currencyModal";
// import SuplliersAddModal from './suppliersAddModal';

class CurrencyContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getAllCurrency()
    }

    render() {
        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        <CurrencyTable
                            editabledStatus={this.props.editabledStatus}
                            currencyEditabkeToggle={this.props.currencyEditabkeToggle}
                            sectionFontColor={this.props.sectionFontColor}
                            data={this.props.currency}
                            editCurrency={this.props.editCurrency}
                            getItemCurrency={this.props.getItemCurrency}
                        />
                    </CardBody>
                </Card>
                <CurrencyModal {...this.props}/>
            </Col>

        )
    }
}


export default CurrencyContainer;
