import React, {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col} from "reactstrap";
import GroupTabContent from "../../../../group/subGroupMenuNew";
import Translate from "../../../../../../Translate";
import {List} from "react-feather"

const ModalExample = props => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal);
        props.getSubGroups(props.group)
    }
    return (
        <div>
            <Row>
                <Col sm="11" className="mr-0">
                    <Input type="text" readOnly="readOnly"
                           value={props.product.groups && props.product.groups[props.dataId] ? props.product.groups[props.dataId].name : ""}
                           placeholder={props.name}/>
                </Col>
                <Col sm="1" className="ml-0">
                    <Button color="primary" onClick={toggle}><List size={16}/></Button>{" "}
                </Col>

            </Row>


            <Modal
                isOpen={modal}
                toggle={toggle}
                className={props.className}
            >
                <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
                <ModalBody>
                    <GroupTabContent
                        data={props.productGroups}
                        group={props.group}
                        lang={props.lang}
                        handleOpen={props.handleOpen}
                        selectGroup={props.selectGroup}
                        selected={props.selected}
                        page="products"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={
                            () => {
                                toggle();
                                props.setModalValues("groups", props.selected)
                            }
                        }
                    >
                        <Translate name="select"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </div>

    );
}

export default ModalExample;