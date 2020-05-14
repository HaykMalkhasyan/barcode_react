import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../../../Translate";
import classes from './classifiersModal.module.css'
import ButtonUi from "../../../../../components/buttons/buttonUi";
import ClassifiersTreeViewer from "./classifiersTreeViewer/classifiersTreeViewer";

const ClassifiersModal = props => {
    const [active, setActive] = useState(false)

    const groupsClickHandler = item => {
        setActive(item.id)
        props.selectClassifiersGroup(item)
    }

    const chooseClassifiersHandler = () => {
        setActive(false)
        props.createClassifiers()
    }

    const toggleModal = () => {
        setActive(false)
        props.classifiersToggleModal()
    }

    return (
        <Modal
            isOpen={props.classifiersModal}
            size='md'
            toggle={toggleModal}
        >
            <ModalHeader>
                <Translate name={'Classifiers'}/>
            </ModalHeader>
            <ModalBody>
                <header className={classes.mBodyHeader}>
                    {
                        props.groups ?
                            props.groups.map(
                                item => {

                                    return (
                                        <ButtonUi
                                            key={item.id}
                                            label={item.name}
                                            name={'group'}
                                            width={'auto'}
                                            height={'auto'}
                                            margin={'3px 5px'}
                                            padding={'2px 8px'}
                                            fontSize={'12px'}
                                            variant={+active === parseInt(item.id) ? 'contained' : 'outlined'}
                                            color={+active === parseInt(item.id) ? 'primary' : 'default'}
                                            onClick={groupsClickHandler.bind(this, item)}
                                        />
                                    )
                                }
                            )
                            :
                            null
                    }
                </header>
                <section className={classes.mBodySection}>
                    {
                        props.group && props.subGroups ?
                            <ClassifiersTreeViewer
                                // DATA
                                data={props.subGroups}
                                group={props.group}
                                // METHODS
                                selectGroupsNode={props.selectGroupsNode}
                            />
                            :
                            <p className="text-center info pt-2 mb-0">
                                <Translate name={'Everyone is selected'}/>
                            </p>
                    }
                </section>
            </ModalBody>
            {
                props.group !== null ?
                    <ModalFooter>
                        <Button
                            color={'primary'}
                            onClick={chooseClassifiersHandler}
                        >
                            <Translate name={'select'}/>
                        </Button>
                    </ModalFooter>
                    :
                    null
            }
            {
                props.createError ?
                    <ModalFooter>
                        <p className="danger font-weight-bold"><Translate
                            name={'Error! The classifier was not selected'}/></p>
                    </ModalFooter>
                    :
                    null
            }
        </Modal>
    )
}

export default ClassifiersModal