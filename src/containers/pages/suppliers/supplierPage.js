import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import TableComponent from './supplierTable';
import ModalComponent from './supplierModal';
import AddButton from "../../../components/buttons/addButton";
import SuplliersAddModal from './suppliersAddModal';

class SupplierContainer extends Component {
    componentDidMount() {
        this.props.supplierActions("getAll")
        this.props.getBanks()
        this.props.getCurrency()
    }

    render() {
        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        {/*<AddButton perm = {this.props.perm} onClick={() => this.props.toggleModal("add")} />*/}
                        {
                            this.props.editabledStatus ?
                                <AddButton
                                    perm={this.props.perm}
                                    onClick={
                                        () => this.props.openSuppliersAddModal('add')
                                    }
                                />
                                :
                                null
                        }

                        <TableComponent
                            editabledStatus={this.props.editabledStatus}
                            suppliersEditableToggle={this.props.suppliersEditableToggle}
                            sectionFontColor={this.props.sectionFontColor}
                            setValues={this.props.setValues}
                            companyTypes={this.props.companyTypes}
                            openSuppliersAddModal={this.props.openSuppliersAddModal}
                            data={this.props.suppliers}
                            toggleModal={this.props.toggleModal}
                            actions={this.props.supplierActions}
                            perm={this.props.perm}
                        />
                    </CardBody>
                </Card>
                <SuplliersAddModal {...this.props} type={'add'}/>
                <SuplliersAddModal {...this.props} type={'edit'}/>
                <ModalComponent {...this.props} type={'delete'}/>
            </Col>

        )
    }
}


export default SupplierContainer;
