import React, { useState} from "react";
import {Row, Col} from "reactstrap";
import {ChevronDown, ChevronRight} from "react-feather";
import PlusButton from "../../../components/buttons/plusButton";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

function SubMenu(props) {
    const [open, setOpen] = useState(false);
    function handleOpen() {
        setOpen(!open)
    }

    function SubMenuItem(props) {
        if (open && props.data.children) {
            return <Menu
                data={props.data.children}
                toggleModal={props.toggleModal}
                actions={props.actions}
            />
        }
        return <div></div>
    }

    function Chevron(props) {
        if (props.data) {
            if (!open) {
                return <ChevronRight size={18} className="mr-2" onClick={() => handleOpen()}/>
            }
            return <ChevronDown size={18} className="mr-2" onClick={() => handleOpen()}/>
        }
        return <div></div>
    }
    return (
        <li className={"list-group-item list-group-item-action  py-1"}>
            <Row className="todo-list-group-item">
                <Col sm="9" md="9" onClick={() => handleOpen()}><Chevron data={props.data.children}/>{props.data.name}
                </Col>
                <Col sm="3" md="3">
                    <PlusButton perm={props.perm} onClick={() => props.toggleModal('add',props.data.id)}/>
                    <EditButton perm={props.perm} onClick={function(){ props.toggleModal('edit',props.data.id); props.actions("get",props.data)}}/>
                    <DeleteButton perm={props.perm} onClick={() => props.toggleModal('delete',props.data.id)}/>
                </Col>
            </Row>
            <SubMenuItem {...props}/>
        </li>
    )


};

function Menu(props) {
    if (props.data.length > 0) {
        return <ul className="list-group ">
            {props.data.map((value, index) => {
                return (
                    <SubMenu key = {index} data={value} toggleModal = {props.toggleModal} perm={props.perm} actions={props.actions}/>
                )
            })}

        </ul>

    } else {
        return <div></div>
    }
}

function categoryTable(props) {
    return (
        <Menu {...props}/>
    );
}

export default categoryTable;