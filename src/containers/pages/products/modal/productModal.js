import React from "react";
import {Form,Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, Input, Modal, ModalHeader,CustomInput} from "reactstrap";
import Translate from "../../../../Translate";
import TabComponent from "./tab/productTab";
import photo6 from "../../../../assets/images/empty_product.svg";
import LocalizeTab from "../../../localize/localizeTab";

const ProductModal = (props) => {
    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )

        }else{
            return(
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <div className="px-3">
                                <Form className="form-horizontal">
                                    <div className="form-body">
                                        <Row>
                                            <Col md="5">
                                                <FormGroup>
                                                    <img className="img-fluid" src={props.uploadedImages[0]?process.env.REACT_APP_API_ENDPOINT+props.uploadedImages[0]:photo6} alt="Timeline 2" />
                                                    <CustomInput
                                                        type="file"
                                                        id="images"
                                                        className="form-control-file"
                                                        value={props.product.images?props.product.images||'':''}
                                                        multiple="multiple"
                                                        onChange={event => {props.uploadImages("products",event);props.setModalValues("images", event.target.value)}}
                                                    />


                                                </FormGroup>
                                            </Col>
                                            <Col md="7">
                                                <FormGroup row className="py-3">
                                                    <Label sm={3}></Label>
                                                    <Col sm={9}>
                                                        <LocalizeTab  />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="sku" sm={3}><Translate name={"sku"} /></Label>
                                                    <Col sm={9}>
                                                        <Input
                                                            type="text"
                                                            id="sku"
                                                            value={props.product.sku?props.product.sku||'':''}
                                                            onChange={event => props.setModalValues("sku", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="name" sm={3}><Translate name={"name"} /></Label>
                                                    <Col sm={9}>
                                                        <Input
                                                            type="text"
                                                            id="name"
                                                            value={props.product.name?props.product.name||'':''}
                                                            onChange={event => props.setModalValues("name", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="active" sm={3}><Translate name={"active"} /></Label>
                                                    <Col sm={9}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="active"
                                                            defaultChecked
                                                            onChange={event => props.setModalValues("active",props.product.hasOwnProperty('active')?(!props.product.active):false)}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                            </Col>

                                        </Row>
                                        <TabComponent {...props}/>
                                    </div>
                                </Form>
                            </div>
                        </Col>

                    </Row>


                </ModalBody>
                )

        }

    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={()=>props.toggleModal(props.type)}  size="lg">
                <ModalHeader toggle={()=>props.toggleModal(props.type)}><Translate name="addProduct"/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary"  outline type="submit" onClick={()=>props.productActions(props.type,props.product)}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default ProductModal;