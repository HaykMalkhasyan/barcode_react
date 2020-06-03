import React, {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col} from "reactstrap";
import GroupTabContent from "../../../../group/subGroupMenuNew";
import Translate from "../../../../../../Translate";
import {default as Icon, List} from "react-feather"
import * as MyIcon from 'react-feather'

const ModalExample = props => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal);
        props.getSubGroups(props.group)
    }

    const setItems = data => {
        for (let item of props.data) {
            if (parseInt(data.parent_id) === parseInt(item.id)) {
                // return `${setItems(item) ? setItems(item) : null} > ${item.name}`

                return setItems(item) ?
                    `${item.name} < ${setItems(item)}`
                    :
                    `${item.name}`
            }
        }
    }

    const roadRender = (data, name) => {
        let obj;
        let arrayRoadItems;
        if (data && data.id && data.name) {
            for (let item of props.data) {
                if (item.id === data.id) {
                    obj = item
                }
            }
            arrayRoadItems = setItems(obj)
            if (arrayRoadItems) {
                return obj.name.concat(` < ${arrayRoadItems}`)
            } else {
                return obj.name
            }
        }
    }

    return (
        <div>
            <Row>
                <Col sm="11" className="mr-0 mb-0">
                    {
                        props.product.groups ?
                            <span key={props.dataId} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                {
                                    roadRender(props.product.groups[props.dataId], props.group.name)
                                }
                            </span>
                            :
                            null
                        // <Input type="text" readOnly="readOnly"
                        //        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                        //        value={props.product.groups ? roadRender(props.product.groups[props.dataId], props.group.name) : ""}
                        //        placeholder={props.name}
                        // />
                    }
                </Col>
                <Col sm="1" className="ml-0 mb-0">
                    <Button color="primary" className="mb-0" onClick={toggle}><List size={16}/></Button>{" "}
                </Col>

            </Row>


            <Modal
                isOpen={modal}
                toggle={toggle}
                className={props.className}
            >
                <ModalHeader toggle={toggle}
                             style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>{props.name}</ModalHeader>
                <ModalBody>
                    {
                        props.productGroups.length ?
                            <GroupTabContent
                                sectionFontColor={props.sectionFontColor}
                                data={props.productGroups}
                                group={props.group}
                                lang={props.lang}
                                handleOpen={props.handleOpen}
                                selectGroup={props.selectGroup}
                                selected={props.selected}
                                page="products"
                            />
                            :
                            <p className='text-center font-small-5 info p-2 mb-0'>
                                <MyIcon.AlertOctagon className='mr-1 warning'/>
                                <Translate name={'The sub groups are empty'}/>
                            </p>
                    }

                </ModalBody>
                <ModalFooter>
                    {

                        Object.keys(props.selected).length ?
                            <Button
                                color="primary"
                                disabled={props.productGroups.length ? false : true}
                                onClick={
                                    () => {
                                        toggle();
                                        props.setModalValues("groups", props.selected);
                                    }
                                }
                            >
                                <Translate name="select"/>
                            </Button>
                            :
                            <span className='info text-right'>
                                <MyIcon.AlertTriangle className='warning mr-1'/>
                                <Translate name={'You have not selected a subgroup'}/>
                            </span>
                    }
                </ModalFooter>
            </Modal>

        </div>

    );
}

export default ModalExample;