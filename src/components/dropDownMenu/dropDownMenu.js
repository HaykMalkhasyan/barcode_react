import React, {useState} from "react";
import {Col, Row, Label, CustomInput} from "reactstrap";
import {ChevronDown, ChevronRight} from 'react-feather';
import Translate from "../../Translate";


function SubMenu (props) {
    const [checked, setValue] = useState(props.checked);
    const [open, setOpen] = useState(false);
    const [disabled,setDisabled] = useState(false);

    function handleChecked() {
        setDisabled(checked)
        setValue(!checked)
        props.handle(props.name,props.parent)

    }

    function handleOpen() {
        setOpen(!open)
    }

    function Chevron(props) {
        if(!disabled && props.value) {
            if (!open) {
                return <ChevronRight size={18} className="mr-2" onClick={() => handleOpen()}/>
            }
            return <ChevronDown size={18} className="mr-2" onClick={() => handleOpen()}/>
        }

        return <div></div>
    }
    function SubMenuItem(props) {

        if(!disabled && props.value) {
            return <ul className={open ? "list-group icheck-task" : "list-group icheck-task d-none"}>
                {Object.keys(props.value).map(function (key) {
                    let checked = (props.perm && props.perm.includes(props.value[key].name))?false:true;
                    return <SubMenu
                        parent={props.name}
                        key={key}
                        name={props.value[key].name}
                        checked={checked}
                        disabled={!checked}
                        handle={props.handle}
                    />
                })}
            </ul>
        }
        return <div></div>

    }

    return (
        <li className={"list-group-item list-group-item-action no-border  bg-lighten-4"} key={props.id}>
            <Row className="todo-list-group-item">
                <Col sm="1" md="1"><Label onClick={() => handleChecked()}><CustomInput type="checkbox" checked={checked} defaultChecked={props.checked}/></Label></Col>
                <Col sm="10" md="10" onClick={() => handleOpen()}><p className="mb-0 font-small-3"><Translate name={props.name}/></p></Col>
                <Col sm="1" md="1">
                    <Chevron {...props}/>
                </Col>
            </Row>
            <SubMenuItem {...props}/>
        </li>
    );
};

const DropDownMenu = (props) => {
    let data = props.data;
    let perm = props.perm;
    return (
        <ul className="list-group icheck-task">
            {Object.keys(data).map(function (key) {
                let checked = (perm[data[key].name] && perm[data[key].name].lengt===0)?false:true;
                return <SubMenu
                    key={key}
                    name={data[key].name}
                    value={data[key].value}
                    checked={checked}
                    perm={perm[data[key].name]}
                    handle={props.handle}
                />
            })}
        </ul>
    );
};
export default DropDownMenu;