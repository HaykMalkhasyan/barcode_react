import React from "react";
import {
    Col,
    FormGroup,
    Label,
    Button,
    ModalBody,
    ModalFooter,
    Modal,
    ModalHeader, Input
} from "reactstrap";
import Translate from "../../../Translate";
import {Plus,Trash2} from "react-feather"

const SupplierModal = (props) => {
    function phoneElements() {
        let element = [],length = props.supplier.phone?props.supplier.phone.length:1;
        for (let index=0;index<length;index++){
            element.push(
                <FormGroup row key={index}>
                    <Label for="Phone" sm={3}>{index===0?<Translate name={"phone"}/>:""}</Label>
                    <Col sm={9}>
                        <div className="position-relative has-icon-right">
                            <input
                                className={`form-control square `}
                                type="text"
                                id="Phone"
                                value={props.supplier.phone?props.supplier.phone[index]||'':''}
                                onChange={event => props.setModalValues("phone", event.target.value,index)}
                            />
                            <div className="form-control-position">
                                {(index+1===length)?
                                    <Plus size={20} className="success" onClick={() => props.setModalValues("phone", "", index, true)} />:
                                    <Trash2 size={20} className="danger" onClick={() => props.setModalValues("phone", "", index, false)} />
                                }
                            </div>
                        </div>
                    </Col>
                </FormGroup>
            )
        }
        return element;
    }

    function bankElements() {
        let element = [],length = props.supplier.bank?props.supplier.bank.length:1;
        for (let index=0;index<length;index++){
            element.push(

                <FormGroup row key={index}>
                    <Label for="Bank" sm={3}>{index===0?<Translate name={"bank"}/>:""}</Label>
                    <Col sm={3} className="pr-0 ">
                        <Input type="select"  value={(props.supplier.bank_id && props.supplier.bank_id[index])?props.supplier.bank_id[index]:props.setModalValues("bank_id", "1",index)}
                               className={"square"}
                               onChange={event => props.setModalValues("bank_id", event.target.value,index)}>
                            {props.banks.map(function (value,index) {
                                return <option value={value.id} key={index}>{value.name}</option>
                            })}
                        </Input>
                    </Col>
                    <Col sm={2} className="pr-0 pl-0">
                        <Input type="select"  value={(props.supplier.currency_id && props.supplier.currency_id[index])? props.supplier.currency_id[index]:props.setModalValues("currency_id", "1",index)}
                               className={"square"}
                               onChange={event => props.setModalValues("currency_id", event.target.value,index)}>
                            <option value="1">AMD</option>
                            <option value="2">USD</option>
                            <option value="3">RUR</option>
                            <option value="4">GEL</option>
                            <option value="5">GBP</option>
                        </Input>
                    </Col>
                    <Col sm={4} className="pl-0 ">
                        <div className="position-relative has-icon-right">
                        <input
                            className={`form-control square ${props.errors.bank ? 'is-invalid' : ''}`}
                            type="text"
                            id="Bank"
                            value={props.supplier.bank?props.supplier.bank[index] || '':''}
                            onChange={event => props.setModalValues("bank", event.target.value,index)}
                        />
                        <div className="form-control-position">
                            {(index+1===length)?
                                <Plus size={20} className="success" onClick={() => props.setModalValues("bank", "", index, true)} />:
                                <Trash2 size={20} className="danger" onClick={() => props.setModalValues("bank", "", index, false)} />
                            }
                        </div>
                        </div>
                    </Col>
                </FormGroup>
            )
        }
        return element;
    }
    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        } else {
            return (
                <ModalBody>
                    <form>
                        <FormGroup row>
                            <Label for="Name" sm={3}><Translate name="name"/></Label>
                            <Col sm={7} className="pr-0">
                                <input
                                    className={`form-control square ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="firstName"
                                    value={props.supplier.name || ''}
                                    onChange={event => props.setModalValues("name", event.target.value)}
                                />
                            </Col>
                            <Col sm={2} className="pl-0 ">
                                <Input type="select"  value={props.supplier.type || 1}
                                       className={"square"}
                                       onChange={event => props.setModalValues("type", event.target.value)}>
                                    <option value="1">ՍՊԸ</option>
                                    <option value="2">ՓԲԸ</option>
                                    <option value="3">ԲԲԸ</option>
                                    <option value="4">ԱՁ</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="HH" sm={3}><Translate name="hh"/></Label>
                            <Col sm={9}>
                                <input
                                    className={`form-control square  ${props.errors.hh ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="HH"
                                    value={props.supplier.hh || ''}
                                    onChange={event => props.setModalValues("hh", event.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="hvhh" sm={3}><Translate name="hvhh"/></Label>
                            <Col sm={9}>
                                <input
                                    className={`form-control square ${props.errors.hvhh ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="HVHH"
                                    value={props.supplier.hvhh || ''}
                                    onChange={event => props.setModalValues("hvhh", event.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="Address" sm={3}><Translate name="address"/></Label>
                            <Col sm={9}>
                                <input
                                    className={`form-control square  ${props.errors.address ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="Address"
                                    value={props.supplier.address || ''}
                                    onChange={event => props.setModalValues("address", event.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        {bankElements()}
                        <FormGroup row>
                            <Label for="Director" sm={3}><Translate name="director"/></Label>
                            <Col sm={9}>
                                <input
                                    className={`form-control square ${props.errors.director ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="Director"
                                    value={props.supplier.director || ''}
                                    onChange={event => props.setModalValues("director", event.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        {phoneElements()}
                    </form>
                </ModalBody>
            )

        }

    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() =>{ props.toggleModal(props.type)}} size="lg">
                <ModalHeader toggle={() => {props.toggleModal(props.type)}}><Translate
                    name={props.type + "Supplier"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" className="btn-square" outline type="submit" onClick={function () {
                        props.supplierActions(props.type, props.supplier);
                    }}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default SupplierModal;