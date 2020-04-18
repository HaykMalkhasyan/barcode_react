import React from 'react';
import {Input, Table, InputGroup, Button} from 'reactstrap';
import Translate from "../../../../../../Translate";
import {Settings, Plus, Trash2} from "react-feather";
import DropdownComponent from "../../../../../../components/dropdown/dropdown";


export default class Example extends React.Component {

    state = {
        currentInputValue:"",
        error:false
    }

    addBarcode(){
        if(this.state.currentInputValue!==""){
            this.props.barcodeActions("add",this.state.currentInputValue);
            this.setState({currentInputValue:"",error:false})
        }else{
            this.setState({error:true})
        }
    }
    deleteBarcode(code){
        this.props.barcodeActions("delete",code);
    }

    render() {
        let props=this.props;
        return (
            <Table borderless>
                <thead>
                <tr>
                    <th><Translate name={"barcode"}/></th>
                    <th><Settings size={20}></Settings></th>
                </tr>
                </thead>
                <tbody>
                {this.props.product.barcode && this.props.product.barcode.map(function (value) {
                    return (
                        <tr>
                            <td>{value.barcode}</td>
                            <td>
                                <Button size="sm" color="danger" className="mb-0" onClick={()=>{props.barcodeActions("delete",value.barcode)}}>
                                    <Trash2 size={16}/>
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                className={`form-control  ${this.state.error? 'is-invalid' : ''}`}
                                id="barcode"
                                value={this.state.currentInputValue ? this.state.currentInputValue || '' : ''}
                                onChange={event => this.setState({currentInputValue:event.target.value})}
                            />
                            <DropdownComponent
                                data={this.props.barcodeTypes}
                                onChange={this.props.setModalValues}
                                name='barcodeType'
                            />
                        </InputGroup>
                    </td>
                    <td>
                        <Button size="sm" color="primary" onClick={()=>{this.addBarcode()}}>
                            <Plus size={16}/>
                        </Button>
                    </td>
                </tr>
                </tbody>

            </Table>
        );
    }
}