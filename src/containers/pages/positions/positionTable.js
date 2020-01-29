import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import Translate from "../../../Translate";
import ModalComponent from "./positionModal";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const PositionTable = (props) => {

    function toggle(type,id) {
        props.positionModal(type,!props.modal[type])
        if(id){
            props.getPositions(id)
        }
    }
    function handleClick() {
        props.deletePosition(props.user.id)
    }

    if (props.positions.length) {
        return (
            <Table responsive>
                <thead>
                <tr>
                    {Object.keys(props.positions[0]).map((key) => <td key={key}><Translate name={key}/></td>)}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.positions.map((value, index) =>
                    <tr key={index}>
                        {Object.keys(value).map((key) => <td key={key}>{value[key]}</td>)}
                        <td>
                            <EditButton perm = {props.perm} onClick={() => toggle("edit",value['id'])}/>
                            <DeleteButton perm = {props.perm}  onClick={() => toggle("delete",value['id'])}/>
                        </td>
                    </tr>
                )}
                </tbody>
                <Modal isOpen={props.modal.edit} toggle={()=>toggle("edit")}  size="md">
                    <ModalHeader toggle={()=>toggle("edit")}><Translate name="editPosition"/></ModalHeader>
                    <ModalComponent {...props}/>
                </Modal>
                <Modal isOpen={props.modal.delete} toggle={()=>toggle("delete")}  size="md">
                    <ModalHeader toggle={()=>toggle("delete")}><Translate name="deletePosition"/></ModalHeader>
                    <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={handleClick}>
                            <Translate name="confirm"/>
                        </Button>
                    </ModalFooter>
                </Modal>
            </Table>

        );
    } else {
        return (
            <div></div>
        )
    }
}
export default PositionTable;