import React from "react";
import {Row, Col} from "reactstrap";
import { Minus, Plus,Check} from "react-feather";
import PlusButton from "../../../components/buttons/plusButton";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

function SubMenu(props) {
    const open = props.data.open;

    function SubMenuItem(props) {
        if (open && props.data.child) {
            return <Menu
                perm={props.perm}
                data={props.data.child}
                handleOpen = {props.handleOpen}
                toggleSubModal = {props.toggleSubModal}
                actions={props.actions}
                lang = {props.lang}
            />
        }
        return <div></div>
    }

    function Chevron(props) {
        if (props.data) {
            if (!open) {
                return <Plus size={18} className="mr-2" onClick={()=>props.handleOpen(props.id,props.group_id)}/>
            }
            return <Minus size={18} className="mr-2" onClick={()=>props.handleOpen(props.id,props.group_id)}/>
        }
        return <Check size={18} className="mr-2" onClick={()=>props.handleOpen(props.id,props.group_id)}/>
    }

    return (
        <li className="list-group-item list-group-item-action border-0 my-0 py-1">
            <Row className="todo-list-group-item border  rounded">
                <Col sm="11" md="11">
                    <Chevron data={props.data.child} handleOpen = {props.handleOpen} id = {props.data.id} group_id = {props.data.group_id}/>
                    {props.data.name[props.lang.active]?props.data.name[props.lang.active]:""}
                </Col>
                <Col sm="1" md="1">
                    <PlusButton perm={props.perm} onClick={() => props.toggleSubModal('add',props.data.id,props.data.group_id)}/>
                    <EditButton perm={props.perm} onClick={() => { props.toggleSubModal('edit',props.data.id,props.data.group_id); props.actions("get",props.data)}}/>
                    <DeleteButton perm={props.perm} onClick={() => props.toggleSubModal('delete',props.data.id,props.data.group_id)}/>
                </Col>
            </Row>
            <SubMenuItem {...props}/>
        </li>
    )
};

function Menu(props) {

    if (props.data && props.data.length > 0) {
        return <ul className="list-group ">
            {props.data.map((value, index) => {
                return (
                    <SubMenu
                        data={value}
                        perm={props.perm}
                        actions={props.actions}
                        handleOpen = {props.handleOpen}
                        toggleSubModal = {props.toggleSubModal}
                        lang = {props.lang}
                    />
                )
            })}

        </ul>

    } else {
        return <div></div>
    }
}


export default Menu;