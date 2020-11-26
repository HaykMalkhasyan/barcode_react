import React, {Component} from 'react'
import classes from './codesTab.module.css'
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import CodeGeneration from "./codeGeneration/codeGeneration";
import CodeData from "./codeData/codeData";
import {connect} from "react-redux";
import {
    changeElementSizes,
    deleteBarcodeItem, setBarcode,
    setBarcodeValue,
    setDataValues,
    setPaperSize
} from "../../../../../../../../../Redux/barcode/actions";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";
import PrintModal from "../../../../../../../../../components/printModal/printModal";
import PrintHeader from "./print/print-header/print-header";
import PrintContent from "./print/print-content/print-content";
import PrintComponent from "../../../../../../../../../components/print-component/print-component";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";

class CodesTab extends Component {

    codeTypeRender = (types, id) => {
        for (let item of types) {
            if (item.id === +id) {
                return item.name
            }
        }
        return null
    };

    render() {

        return (
            <>
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
                        <p className={`color-888 font-size-12 ${classes.information}`}>
                            Այն ապրանքները, որոնք ունեն գծիկավոր կոդ անհրաժեշտ է կոդ դաշտում լրացնել, որպեսզի տվյալ կոդով
                            հնարավոր լինի վաճառել ապրանքը։ Որոնք կոդեր չունեն կարող եք ծրագրով ստեղծել կոդ՝ սեղմելով
                            "ԳԵՆԵՐԱՑՆԵԼ" կոճակը։
                        </p>
                        {
                            this.props.eFields.length ?
                                this.props.eFields.indexOf('barcode') !== -1 ?
                                    <div className={classes.errorFields}>
                                        <AlertUI
                                            variant="outlined"
                                            severity="error"
                                            text={'Ապրանքին կցված չեն շտրիխ-կոդ(եր) !'}
                                        />
                                    </div>
                                    :
                                    null
                                :
                                null
                        }
                        <div className={classes.gridContainer}>
                            <div className={classes.codActions}>
                                <SectionWindow
                                    label={'Կոդի ավելացում/փոփոխում'}
                                    children={
                                        <CodeGeneration
                                            open={this.props.open}
                                            code={this.props.code}
                                            barcode={this.props.barcode}
                                            codeTypes={this.props.codeTypes}
                                            errorFields={this.props.errorFields}
                                            // Methods
                                            setBarcodeValue={this.props.setBarcodeValue}
                                            setBarcode={this.props.setBarcode}
                                            setDataValues={this.props.setDataValues}
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
                                            main={this.props.main}
                                            codeTypes={this.props.codeTypes}
                                            // Methods
                                            deleteBarcodeItem={this.props.deleteBarcodeItem}
                                            setBarcodeValue={this.props.setBarcodeValue}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.print_tool ?
                        <PrintModal>
                            <PrintHeader
                                header={'Շտրիխ կոդի կարգավորում'}
                                // Methods
                                setBarcodeValue={this.props.setBarcodeValue}
                            />
                            <PrintContent
                                width={this.props.width}
                                height={this.props.height}
                                font_data={this.props.font_data}
                                font={this.props.font}
                                papers={this.props.papers}
                                content_data={this.props.content_data}
                                elem_data={this.props.elem_data}
                                content={this.props.content}
                                paper_width={this.props.paper_width}
                                paper_height={this.props.paper_height}
                                children={
                                    <>
                                        <ReactToPrint
                                            trigger={
                                                () => <IconButton aria-label="delete" className={classes.printButton}>
                                                    <PrintIcon/>
                                                </IconButton>
                                            }
                                            content={
                                                () => this.componentRef
                                            }
                                        />
                                        <div className={classes.printWindow}>
                                            <PrintComponent
                                                ref={el => (this.componentRef = el)}
                                                active_type={this.props.active_type}
                                                name={this.props.main.name}
                                                barcode={this.props.code_item.barcode}
                                                format={this.codeTypeRender(this.props.codeTypes, this.props.code_item.barcode_type)}
                                                count={this.props.code_item.count}
                                                price={'5000$'}
                                                // Configuration
                                                width={this.props.width}
                                                height={this.props.height}
                                                paper_width={this.props.paper_width}
                                                paper_height={this.props.paper_height}
                                                font={this.props.font}
                                                content_data={this.props.content_data}
                                            />
                                        </div>
                                    </>
                                }
                                // Methods
                                setBarcodeValue={this.props.setBarcodeValue}
                                setPaperSize={this.props.setPaperSize}
                                changeElementSizes={this.props.changeElementSizes}
                            />
                        </PrintModal>
                        :
                        null
                }
            </>
        )
    }
}

function mapStateToProps(state) {

    return {
        main: state.products.main,
        open: state.barcode.open,
        width: state.barcode.width,
        height: state.barcode.height,
        font_data: state.barcode.font_data,
        font: state.barcode.font,
        papers: state.barcode.papers,
        content_data: state.barcode.content_data,
        elem_data: state.barcode.elem_data,
        content: state.barcode.content,
        paper_width: state.barcode.paper_width,
        paper_height: state.barcode.paper_height,
        codeTypes: state.barcode.codeTypes,
        print_tool: state.barcode.print_tool,
        code: state.barcode.code,
        code_item: state.barcode.code_item,
        errorFields: state.barcode.errorFields,
        eFields: state.products.errorFields,
        error: state.barcode.error,
        notification: state.barcode.notification,
        barcode: state.barcode.barcode,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setBarcodeValue: (name, value) => dispatch(setBarcodeValue(name, value)),
        setBarcode: (name, value) => dispatch(setBarcode(name, value)),
        setDataValues: (name, value) => dispatch(setDataValues(name, value)),
        deleteBarcodeItem: id => dispatch(deleteBarcodeItem(id)),
        setPaperSize: (width, height) => dispatch(setPaperSize(width, height)),
        changeElementSizes: (name, value) => dispatch(changeElementSizes(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodesTab);