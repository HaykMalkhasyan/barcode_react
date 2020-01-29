import React from "react";
import {Button, ModalBody, ModalFooter} from "reactstrap";
import Translate from "../../../Translate";

const CategoryModal = (props) => {

    function handleClick() {
    }

    return (
        <React.Fragment>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" onClick={handleClick}>
                    <Translate name="confirm"/>
                </Button>
            </ModalFooter>
        </React.Fragment>
    );

};

export default CategoryModal;