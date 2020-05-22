import React from 'react';
import {Badge, Button, Input, InputGroup, ListGroup, ListGroupItem, Table} from 'reactstrap';
import Translate from "../../../../../../Translate";
import {Plus, Settings, Trash2} from "react-feather";
import DropdownComponent from "../../../../../../components/dropdown/dropdown";
import ErrorIcon from '@material-ui/icons/Error';


export default class Example extends React.Component {

    state = {
        currentInputValue: {
            barcode: "",
            type: null
        },
        error: false,
        errorMsg: false
    }

    addBarcode() {
        let index = false
        if (this.state.currentInputValue.barcode !== "" && this.state.currentInputValue.type !== null) {
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
                    newCurrentInput.type = null;
                    this.setState({
                        currentInputValue: newCurrentInput,
                        error: false,
                        errorMsg: false
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
        newCurrentInput.type = id;
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
                                this.state.currentInputValue.type !== null ?
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
                                                type => type.id === this.state.currentInputValue.type ?
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
                                style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}
                                type="text"
                                className={`form-control  ${this.state.error ? 'is-invalid' : ''}`}
                                id="barcode"
                                value={this.state.currentInputValue.barcode ? this.state.currentInputValue.barcode || '' : ''}
                                onChange={event => this.changeBarcode(event.target.value)}
                            />
                            <DropdownComponent
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
                        <Button size="sm" color="primary" onClick={() => {
                            this.addBarcode()
                        }}>
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
                                                                className="border-0 justify-content-between p-0 pl-2 pr-2">
                                                                {value.barcode}
                                                                <Badge pill className="ml-1 font-small-1 p-1" style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
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