import React, {useState} from 'react';
import {
    Card,
    CardBody,
    Col,
    Collapse,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap';
import SubGroupMenu from "./subGroupMenu"

import {ChevronDown, ChevronRight} from "react-feather";
import PlusButton from "../../../components/buttons/plusButton";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const GroupTableItem = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    function Chevron(props) {
        if (props.data && props.data.length > 0) {
            if (!isOpen) {
                return <ChevronRight size={25} className="mr-2" onClick={toggle}/>
            }
            return <ChevronDown size={25} className="mr-2" onClick={toggle}/>
        }
        return <span className="mr-4"></span>
    }

    return (
        <ListGroup className="py-0 my-1 ">
            <ListGroupItem active className="rounded-0 justify-content-between">
                <Row className="todo-list-group-item">
                    <Col sm="11" md={10} className='text-left'>
                        <Chevron data={props.subGroups}/>
                        {props.data.name/*[props.lang.active]*/}
                    </Col>
                    <Col sm="" md={2} className='text-right'>
                        <PlusButton perm={props.perm} color="#fff"
                                    onClick={() => props.toggleSubModal('add', 0, props.data.id)}/>
                        <EditButton perm={props.perm} onClick={() => {
                            props.toggleModal('edit', props.data.id);
                            props.groupActions("get", props.data)
                        }}/>
                        <DeleteButton perm={props.perm} onClick={() => props.toggleModal('delete', props.data.id)}/>
                    </Col>
                </Row>
            </ListGroupItem>
            <Collapse isOpen={isOpen}>
                <Card className="my-1">
                    <CardBody className="py-0">
                        <SubGroupMenu
                            data={props.subGroups}
                            toggleSubModal={props.toggleSubModal}
                            handleOpen={props.handleOpen}
                            selectGroup={props.selectGroup}
                            actions={props.subGroupActions}
                            group_id={props.data.id}
                            selected={props.selected}
                            lang={props.lang}
                        />

                    </CardBody>
                </Card>
            </Collapse>
        </ListGroup>

    )

}
const GroupTable = props => {
    if (Object.keys(props.groups).length > 0) {
        return <div>
            {
                props.groups.map(
                    key => {
                        let sGroup = [];
                        props.subGroups.forEach(
                            item => item.group_id ?
                                item.group_id.id === key.id ?
                                    sGroup.push(item)
                                    :
                                    null
                                :
                                null
                        )
                        return (
                            <GroupTableItem
                                key={key.id}
                                data={key}
                                subGroups={sGroup}
                                toggleModal={props.toggleModal}
                                toggleSubModal={props.toggleSubModal}
                                perm={props.perm}
                                handleOpen={props.handleOpen}
                                selectGroup={props.selectGroup}
                                selected={props.selected}
                                groupActions={props.groupActions}
                                subGroupActions={props.subGroupActions}
                                lang={props.lang}
                            />
                        )
                    }
                )
            }

        </div>
    } else {
        return <div></div>
    }

}

export default GroupTable;