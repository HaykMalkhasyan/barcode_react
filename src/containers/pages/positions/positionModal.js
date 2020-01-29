import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter} from "reactstrap";
import Translate from "../../../Translate";
import PositionDownMenu from "./positionDownMenu";

const PositionModal = (props) => {
    // const pages = props.pages;

    function handleInputChange(key, value) {
        props.setModalValues(key,value)
    }

   

    function handleClick() {
    console.log(props.position)
        props.addPosition(props.position)
    }

    return (
        <React.Fragment>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label for="firstName"><Translate name="name"/></Label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                onChange={event => handleInputChange("name", event.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <PositionDownMenu data = { props.pages } perm={ props.positionPerm } handle = { props.handle }/>
                    </Col>

                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" onClick={handleClick}>
                    <Translate name="confirm"/>
                </Button>
            </ModalFooter>
        </React.Fragment>
    );

};

export default PositionModal;