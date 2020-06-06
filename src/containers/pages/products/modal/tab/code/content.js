import React from 'react';
import {Badge, Button, Input, InputGroup, ListGroup, ListGroupItem, Table} from 'reactstrap';
import Translate from "../../../../../../Translate";
import {Plus, Trash2} from "react-feather";
import DropdownComponent from "../../../../../../components/dropdown/dropdown";
import ErrorIcon from '@material-ui/icons/Error';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import BarChartIcon from '@material-ui/icons/BarChart';

export default class Example extends React.Component {

    state = {
        currentInputValue: {
            barcode: "",
            barcode_type: null,
            count: null
        },
        error: false,
        errorMsg: false,
        pointError: false,
        pointTouched: false
    }

    addBarcode() {
        let index = false
        if (this.state.currentInputValue.barcode !== "" && this.state.currentInputValue.barcode_type !== null && this.state.currentInputValue.count !== null) {
            if (this.props.barcodeTypes) {
                for (let item of this.props.barcodeTypes) {
                    if (item.barcode === this.state.currentInputValue.barcode) {
                        index = true
                    }
                }
                if (!index) {
                    this.props.barcodeActions("add", this.state.currentInputValue);
                    let newCurrentInput = {...this.state.currentInputValue};
                    newCurrentInput.barcode = "";
                    newCurrentInput.barcode_type = null;
                    newCurrentInput.count = null;
                    this.setState({
                        currentInputValue: newCurrentInput,
                        error: false,
                        errorMsg: false,
                        pointError: false,
                        pointTouched: false
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMsg: 'such barcode already exists'
                    })
                }
            }

        } else {
            this.setState({error: true})
        }
    }

    addBarcodeType = (name, id) => {
        let newCurrentInput = {...this.state.currentInputValue};
        newCurrentInput.barcode_type = id;
        this.setState({
            currentInputValue: newCurrentInput
        })
    }

    deleteBarcode(code) {
        this.props.barcodeActions("delete", code);
    }

    changeBarcode(value) {
        let newCurrentInput = {...this.state.currentInputValue};
        newCurrentInput.barcode = value;
        this.setState({currentInputValue: newCurrentInput})
    }

    onPointHandler(value) {
        let newCurrentInput = {...this.state.currentInputValue};
        newCurrentInput.count = value;

        if (value.length > 0) {
            if (value/1) {
                this.setState({
                    pointError: false,
                    pointTouched: true,
                    currentInputValue: newCurrentInput
                })
            } else {
                this.setState({
                    pointError: true
                })
            }
        } else {
            this.setState({
                currentInputValue: newCurrentInput,
                pointTouched: false
            })
        }
    }

    render() {

        let props = this.props;
        return (
            <Table borderless style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                <thead>
                <tr>
                    <th><Translate name={"barcode"}/></th>
                </tr>
                </thead>
                <tbody>
                <tr style={{position: 'sticky', top: 0}}>
                    <td colSpan={1}>
                        <InputGroup size="sm">
                            {
                                this.state.currentInputValue.barcode_type !== null ?
                                    <span
                                        className="bg-primary"
                                        style={{
                                            padding: '3px 5px',
                                            borderRadius: '5px 0 0 5px',
                                            color: '#444',
                                            fontWeight: 600,
                                            fontSize: '13px'
                                        }}
                                    >
                                        {
                                            this.props.types.map(
                                                type => type.id === this.state.currentInputValue.barcode_type ?
                                                    type.name
                                                    :
                                                    null
                                            )
                                        }
                                    </span>
                                    :
                                    null
                            }
                                <Input
                                    style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : {width: '70%'}}
                                    type="text"
                                    className={`form-control py-0 px-1 m-0 ${this.state.error ? 'is-invalid' : ''}`}
                                    id="barcode"
                                    value={this.state.currentInputValue.barcode ? this.state.currentInputValue.barcode || '' : ''}
                                    onChange={event => this.changeBarcode(event.target.value)}
                                />
                                <Input
                                    placeholder={'[0-9]'}
                                    className={`py-0 px-1 m-0 border-left-0 border-right-0 ${this.state.pointTouched ? this.state.pointError ? 'is-invalid' : 'is-valid' : null}`}
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : {width: '10%'}}
                                    type="text"
                                    name="points"
                                    value={this.state.currentInputValue.count ? this.state.currentInputValue.count || '' : ''}
                                    onChange={event => this.onPointHandler(event.target.value)}
                                />
                                <DropdownComponent
                                    style={{borderRadius: '0 5px 5px 0', color: '#fff', width: '100%'}}
                                    // setBarcodeType={this.props.setBarcodeType}
                                    types={this.props.types}
                                    // onChange={this.props.setModalValues}
                                    onClick={this.addBarcodeType}
                                    name='type'
                                />
                        </InputGroup>
                        {
                            this.state.errorMsg ?
                                <span className="danger font-small-1">
                                    <ErrorIcon className="mr-1"/>
                                    <Translate name={this.state.errorMsg}/>
                                </span>
                                :
                                null
                        }
                    </td>
                    <td>
                        <Button
                            size="sm"
                            color="primary"
                            onClick={
                                () => {this.addBarcode()}
                            }
                        >
                            <Plus size={16}/>
                        </Button>
                    </td>
                </tr>
                {

                    this.props.types ?
                        this.props.product.barcode ?
                            this.props.product.barcode.map(
                                (value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td
                                                colSpan={2}
                                            >
                                                <ListGroup>
                                                    {
                                                        value ?
                                                            <ListGroupItem
                                                                action
                                                                className="border-0 justify-content-between p-0 pl-2 pr-2"
                                                            >
                                                                <BarChartIcon className='mr-1'/>
                                                                {value.barcode}
                                                                <ClearAllIcon className='ml-4 mr-1'/>
                                                                <i>
                                                                    {
                                                                        value.count
                                                                    }
                                                                    &nbsp;<Translate name={'pieces'}/>
                                                                </i>
                                                                <Badge pill className="ml-1 font-small-1 p-1"
                                                                       style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                                                    {
                                                                        this.props.types.map(
                                                                            type => type.id === value.type ?
                                                                                type.name
                                                                                :
                                                                                null
                                                                        )
                                                                    }
                                                                </Badge>
                                                                <Button
                                                                    size="sm"
                                                                    color="danger"
                                                                    className="mb-0 pull-right"
                                                                    onClick={
                                                                        () => {
                                                                            props.removeBarcode(value, index)
                                                                        }
                                                                    }
                                                                >
                                                                    <Trash2 size={16}/>
                                                                </Button>
                                                            </ListGroupItem>
                                                            :
                                                            null
                                                    }
                                                </ListGroup>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                            :
                            null
                        :
                        null
                }
                </tbody>

            </Table>
        );
    }
}