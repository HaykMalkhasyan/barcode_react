import React, {Component} from 'react'
import classes from './employeesTab.module.css'
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import {connect} from "react-redux";
import {getSuppliers, setSelected} from "../../../../../../../../../Redux/suppliers/action";
import LinearSpinner from "../../../../../../../../../components/UI/spinners/linearSpiner/linearSpinner";
import EmployeesContent from "./employees-content/employees-content";
import SuppliersAddContent from "./suppliers-add-content/suppliers-add-content";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";
import Collapse from "@material-ui/core/Collapse";
import PageSpecifications from "../../../../../product-modal/page-specifications/page-specifications";

class EmployeesTab extends Component {
    constructor(props) {
        super(props);
        this.props.getSuppliers()
        this.state = {
            open: false
        }
    }

    setSelectSupplier = (supplier) => {
        if (this.props.selected) {
            const selected = [...this.props.selected];
            if (selected.indexOf(supplier) === -1) {
                this.setState({open: false})
                selected.push(supplier);
                this.props.setSelected(selected)
            }
        }

    }

    setSelectCheckedSupplier = suppliers => {
        const selected = [...this.props.selected];
        this.setState({open: false})
        selected.push(...suppliers)
        this.props.setSelected(selected)
    }

    removeItem = supplier => {
        const selected = [...this.props.selected];
        selected.splice(
            selected.indexOf(supplier),
            1
        )
        this.props.setSelected(selected)
    }

    render() {
        return (
            <div className={classes.employeesTab}>
                <div className={classes.content}>
                    <PageSpecifications
                        text={`
                        Գործընկերոջ ընտրելու կամ փոփոխելու համար անրաժեշտ է սեղմել "Գործընկերներ" տողի վրա և ընտրել
                        համապատասխան գործընկերոջը։
                        `}
                    />
                    {
                        this.props.errorFields.length ?
                            this.props.errorFields.indexOf('suppliers') !== -1 ?
                                <div className={classes.errorFields}>
                                    <AlertUI
                                        variant="outlined"
                                        severity="error"
                                        text={'Մատակարարները նշված չեն !'}
                                    />
                                </div>
                                :
                                null
                            :
                            null
                    }
                    <div className={classes.textFieldWindow}>
                        <SectionWindow
                            label={'Գործընկերներ'}
                            /*withButton={this.props.suppliers}
                            button={<Icons type={this.state.open ? "close" : "add"}/>}
                            // Methods
                            onClick={() =>{
                                this.setState({
                                    open: !this.state.open
                                })
                            }}*/
                        >
                            <div className={classes.suppliersContent}>
                                {
                                    this.props.progress ?
                                        <LinearSpinner progres={classes.progress} barColorPrimary={classes.progresBgColor}/>
                                        :
                                        null
                                }
                                <EmployeesContent
                                    selected={this.props.selected}
                                    // Methods
                                    removeItem={this.removeItem}
                                    onClick={event =>{
                                        event.stopPropagation();
                                        this.setState({
                                            open: !this.state.open
                                        })
                                    }}
                                />
                                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                    <SuppliersAddContent
                                        suppliers={this.props.suppliers}
                                        selected={this.props.selected}
                                        // Methods
                                        setSelectSupplier={this.setSelectSupplier}
                                        setSelectCheckedSupplier={this.setSelectCheckedSupplier}
                                    />
                                </Collapse>
                            </div>
                        </SectionWindow>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        progress: state.suppliers.progress,
        suppliers: state.suppliers.suppliers,
        selected: state.suppliers.selected,
        errorFields: state.products.errorFields,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getSuppliers: () => dispatch(getSuppliers()),
        setSelected: data => dispatch(setSelected(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesTab);