import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter} from "reactstrap";
import Translate from "../../../Translate";
import DropDownMenu from "../../../components/dropDownMenu/dropDownMenu";

const UserModal = (props) => {
    const pages = props.pages;

    function handleInputChange(key, value) {
        props.setModalValues(key,value)
    }

   

    function handleClick() {
        props.addPosition(props.position)
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
                        <DropDownMenu data = { props.pages } perm={ props.positionPerm } handle = { props.handle }/>
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