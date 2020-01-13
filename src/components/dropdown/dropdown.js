import React, { useState } from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, CustomInput} from "reactstrap";
import {ChevronDown ,ChevronRight} from 'react-feather';
import Translate from "../../Translate";
// import MenuItem from "./menuItem";
const DropDownItem = (props) => {
    const [checked,setValue] = useState(props.checked,false);
    // const [open,setOpen]
    function handle() {
        setValue(!checked)
    }
    function handleOpen() {
        // setOpen(!open)
    }

    return (
        <li className={"list-group-item list-group-item-action no-border  bg-lighten-4"} key={props.id}>
            <Row className="todo-list-group-item">
                <Col sm="1" md="1"><Label  onClick={() => handle() }><CustomInput type="checkbox"  checked = {checked} defaultChecked={checked}/></Label></Col>
                <Col sm="10" md="10"><p className="mb-0 font-small-3"><Translate name={props.name}/></p></Col>
            <Col sm="1" md="1"><ChevronRight size={18} className="mr-2" onClick={() => handleOpen()}/></Col>
            </Row>
            {/*<ul className="list-group icheck-task hide">*/}
            {/*{Object.keys(props.pages[key].tools).map(function(id) {*/}
            {/*    if(props.pages[key].tools[id].checked === undefined){*/}
            {/*        props.pages[key].tools[id].checked = true*/}
            {/*    }*/}
            {/*    */}

            {/*})}*/}
            {/*</ul>*/}
        </li>
    );
};

const DropDown = (props) => {
    let pages = props.pages;

    function handle(key) {
        console.log(key)
    }

    return (
        <ul className="list-group icheck-task">
            {Object.keys(pages).map(function (key) {
                let checked = true;
                if (pages[key].checked) {
                    checked = pages[key].checked
                }
                return <DropDownItem id = {key} key={key} name = {pages[key].name} checked = {checked}/>



            })}
        </ul>


    );

};
export default DropDown;