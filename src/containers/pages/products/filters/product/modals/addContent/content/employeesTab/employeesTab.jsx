import React, {Component} from 'react'
import classes from './employeesTab.module.css'
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import {connect} from "react-redux";
import {getSuppliers, setSelected} from "../../../../../../../../../Redux/suppliers/action";
import LinearSpinner from "../../../../../../../../../components/UI/spinners/linearSpiner/linearSpinner";
import EmployeesContent from "./employees-content/employees-content";
import Icons from "../../../../../../../../../components/Icons/icons";
import SuppliersAddContent from "./suppliers-add-content/suppliers-add-content";
import Backdrop from "../../../../../../../../../components/UI/backdrop/backdrop";

class EmployeesTab extends Component {
    constructor(props) {
        super(props);
        this.props.getSuppliers()
        this.state = {
            open: false
        }
    }

    setSelectSupplier = (supplier) => {
        const selected = [...this.props.selected];
        if (selected.indexOf(supplier) === -1) {
            this.setState({open: false})
            selected.push(supplier);
            this.props.setSelected(selected)
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
                    <p className={classes.information}>
                        Գործընկերոջ ընտրելու կամ փոփոխելու համար անրաժեշտ է սեղմել "Գործընկերներ" տողի վրա և ընտրել
                        համապատասխան գործընկերոջը։
                    </p>
                    <div className={classes.textFieldWindow}>
                        <SectionWindow
                            label={'Գործընկերներ'}
                            withButton={this.props.suppliers}
                            button={<Icons type={"add"}/>}
                            // Methods
                            onClick={() =>{
                                this.setState({
                                    open: !this.state.open
                                })
                            }}
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
                                />
                                {
                                    this.state.open ?
                                        <>
                                            <Backdrop
                                                className={classes.backdrop}
                                                onClick={() => {
                                                    this.setState({
                                                        open: false
                                                    })
                                                }}
                                            />
                                            <SuppliersAddContent
                                                suppliers={this.props.suppliers}
                                                selected={this.props.selected}
                                                // Methods
                                                setSelectSupplier={this.setSelectSupplier}
                                                setSelectCheckedSupplier={this.setSelectCheckedSupplier}
                                            />
                                        </>
                                        :
                                        null
                                }
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
        selected: state.suppliers.selected
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getSuppliers: () => dispatch(getSuppliers()),
        setSelected: data => dispatch(setSelected(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesTab);