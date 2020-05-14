import React, {useState} from "react";
import {Col, Row, Label, CustomInput} from "reactstrap";
import {ChevronDown, ChevronRight} from 'react-feather';
import Translate from "../../../Translate";


function SubMenu(props) {
    const [open, setOpen] = useState(false);

    function handleChecked() {
        props.handle(props.id, props.parentId)

    }

    function handleOpen() {
        setOpen(!open)
    }

    function Chevron(props) {
        if (props.checked && props.value) {
            if (!open) {
                return <ChevronRight size={18} className="mr-2" onClick={() => handleOpen()}/>
            }
            return <ChevronDown size={18} className="mr-2" onClick={() => handleOpen()}/>
        }
        return <div></div>
    }

    function SubMenuItem(props) {
        if (props.checked && props.value) {
            return <ul className={open ? "list-group icheck-task" : "list-group icheck-task d-none"}>
                {
                    Object.keys(props.value).map(
                        (elem) => {
                            let checked = (props.perm && props.perm.includes(props.value[elem].id)) ? true : false;
                            return <SubMenu
                                parentId={props.id}
                                key={elem}
                                id={props.value[elem].id}
                                name={props.value[elem].name}
                                checked={checked}
                                disabled={!checked}
                                handle={props.handle}
                            />
                        }
                    )
                }
            </ul>
        }
        return <div></div>
    }

    return (
        <li className={"list-group-item list-group-item-action no-border  bg-lighten-4 py-1"} key={props.elemKey}>
            <Row className="todo-list-group-item">
                <Col sm="1" md="1">
                    <Label
                        for={`chewckbox-${props.elemKey}`}
                        onClick={() => handleChecked()}>
                        <CustomInput
                            id={`chewckbox-${props.elemKey}`}
                            type="checkbox"
                            key={props.elemKey}
                            // checked={props.checked}
                            defaultChecked={props.checked}
                        />
                    </Label>
                </Col>
                <Col sm="10" md="10" onClick={() => handleOpen()}>
                    <p className="mb-0 font-small-3">
                        <Translate name={props.name}/>
                    </p>
                </Col>
                <Col sm="1" md="1">
                    <Chevron {...props}/>
                </Col>
            </Row>
            <SubMenuItem {...props}/>
        </li>
    );
};

const PositionDownMenu = (props) => {
    let data = props.data;
    let perm = props.perm ? props.perm : {};
    return (
        <ul className="list-group icheck-task">
            {
                Object.keys(data).map(
                    elem => {
                        return (
                            <SubMenu
                                key={elem}
                                elemKey={elem}
                                id={data[elem].id}
                                name={data[elem].name}
                                // value={data[elem].value}
                                value={props.tool}
                                checked={(perm[data[elem].id] && perm[data[elem].id].length === 0) ? false : true}
                                perm={perm[data[elem].id]}
                                handle={props.handle}
                            />
                        )
                    }
                )
            }
        </ul>
    );
};
export default PositionDownMenu;