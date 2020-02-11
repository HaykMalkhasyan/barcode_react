import React from "react";
import {Form,Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, Input, Modal, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import photo6 from "../../../assets/images/empty_product.svg";

const ItemModal = (props) => {
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
                                <Form>
                                    <div className="form-body">
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <img className="img-fluid" src={photo6} alt="Timeline 2" />
                                                    <Input type="file"  className="form-control-file"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">

                                                <FormGroup>
                                                    <Label for="projectinput1">Անվանում</Label>
                                                    <Input type="text" id="projectinput1"   name="fname" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="projectinput3">Կատեգորիա</Label>
                                                    <Input type="select" id="projectinput5" name="interested" >
                                                        <option value="none" defaultValue="" disabled="">Interested in</option>
                                                        <option value="design">design</option>
                                                        <option value="development">development</option>
                                                        <option value="illustration">illustration</option>
                                                        <option value="branding">branding</option>
                                                        <option value="video">video</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="projectinput4">Արտիկուլ</Label>
                                                    <Input type="text" id="projectinput4"   name="phone"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="projectinput2">Բարկոդ</Label>
                                                    <Input type="text" id="projectinput2"   name="lname" />
                                                </FormGroup>
                                            </Col>


                                        </Row>



                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="companyName">ԱՏԳ</Label>
                                                    <Input type="select" id="projectinput5" name="interested" >
                                                        <option value="none" defaultValue="" disabled="">Interested in</option>
                                                        <option value="design">design</option>
                                                        <option value="development">development</option>
                                                        <option value="illustration">illustration</option>
                                                        <option value="branding">branding</option>
                                                        <option value="video">video</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="projectinput6">Ակտիվ</Label>
                                                    <Input type="select" id="projectinput6" name="budget" >
                                                        <option value="0" defaultValue="" disabled="">Այո</option>
                                                        <option value="less than 5000$">Ոչ</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>



                                        <FormGroup>
                                            <Label for="projectinput8">Նկարագրություն</Label>
                                            <Input type="textarea" id="projectinput8" rows="5"  name="comment" />
                                        </FormGroup>
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
                <ModalHeader toggle={()=>props.toggleModal(props.type)}><Translate name="addItem"/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={()=>props.itemActions(props.type,props.item)}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default ItemModal;