import React, {Component} from 'react'
import classes from './codesTab.module.css'
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import CodeGeneration from "./codeGeneration/codeGeneration";
import CodeData from "./codeData/codeData";
import {connect} from "react-redux";
import {
    addBarcode, deleteBarcodeItem,
    getBarcode,
    getBarcodeItem,
    setBarcodeValue,
    setDataValues
} from "../../../../../../../../../Redux/barcode/actions";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";

class CodesTab extends Component {

    componentDidMount() {
        this.props.getBarcode()
    }

    render() {

        return (
            <div className={classes.codesTab}>
                {
                    this.props.error ?
                        <div className={classes.errorWindow}>
                            <AlertUI
                                severity={'error'}
                                text={'Հարցումը չհաջողվեց !'}
                            />
                        </div>
                        :
                        null
                }
                {
                    this.props.notification ?
                        <div className={classes.errorWindow}>
                            <AlertUI
                                severity={'warning'}
                                text={'Այդպիսի կոդ առդեն գոյություն ունի !'}
                            />
                        </div>
                        :
                        null
                }
                <div className={classes.content}>
                    <p className={classes.information}>
                        Այն ապրանքները, որոնք ունեն գծիկավոր կոդ անհրաժեշտ է կոդ դաշտում լրացնել, որպեսզի տվյալ կոդով
                        հնարավոր լինի վաճառել ապրանքը։ Որոնք կոդեր չունեն կարող եք ծրագրով ստեղծել կոդ՝ սեղմելով
                        "ԳԵՆԵՐԱՑՆԵԼ" կոճակը։
                    </p>
                    <div className={classes.gridContainer}>
                        <div className={classes.codActions}>
                            <SectionWindow
                                label={'Կոդի ավելացում/փոփոխում'}
                                children={
                                    <CodeGeneration
                                        open={this.props.open}
                                        code={this.props.code}
                                        codeTypes={this.props.codeTypes}
                                        errorFields={this.props.errorFields}
                                        // Methods
                                        setBarcodeValue={this.props.setBarcodeValue}
                                        setDataValues={this.props.setDataValues}
                                        addBarcode={this.props.addBarcode}
                                    />
                                }
                            />
                        </div>
                        <div className={classes.attachment}>
                            <SectionWindow
                                label={'Ապրանքին կցված կոդերի ցանկ'}
                                children={
                                    <CodeData
                                        barcode={this.props.barcode}
                                        code_item={this.props.code_item}
                                        // Methods
                                        selectBarcodeItem={this.props.getBarcodeItem}
                                        deleteBarcodeItem={this.props.deleteBarcodeItem}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        open: state.barcode.open,
        codeTypes: state.barcode.codeTypes,
        code: state.barcode.code,
        code_item: state.barcode.code_item,
        errorFields: state.barcode.errorFields,
        error: state.barcode.error,
        notification: state.barcode.notification,
        barcode: state.products.barcode,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getBarcode: () => dispatch(getBarcode()),
        setBarcodeValue: (name, value) => dispatch(setBarcodeValue(name, value)),
        setDataValues: (name, value) => dispatch(setDataValues(name, value)),
        addBarcode: () => dispatch(addBarcode()),
        getBarcodeItem: id => dispatch(getBarcodeItem(id)),
        deleteBarcodeItem: id => dispatch(deleteBarcodeItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodesTab);