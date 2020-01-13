import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter} from "reactstrap";
import Translate from "../../../Translate";
import Dropdown from "../../../components/dropdown/dropdown";

const UserModal = (props) => {
    const pages = props.pages;

    function handleInputChange(key, value) {
        let new_value = {}
        new_value[key] = value
        props.setModalValues(new_value)
    }

   

    function handleClick() {
        props.addUser(props.user)
    }

    console.log(pages)
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
                        <Dropdown {...props}/>
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

export default UserModal;