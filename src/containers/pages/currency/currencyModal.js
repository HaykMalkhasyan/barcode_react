import React from "react";
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";

const CurrencyModal = props => {

    return (
        <Modal
            isOpen={props.isOpen}
            toggle={
                () => props.toggleModal()
            }
        >
            <ModalHeader>
                <Translate name={'editCurrency'}/>
            </ModalHeader>
            <ModalBody>
                <form>
                    <FormGroup row>
                        <Label for={'name'} sm={3}>
                            <Translate name={'name'}/>

                        </Label>
                        <Col sm={7} className={'pr-0'}>
                            <input
                                id={'name'}
                                type={'text'}
                                required={true}
                                className={`form-control square ${props.formValidate.name ? 'is-invalid' : null}`}
                                placeholder={'US dollar'}
                                name={'name'}
                                value={props.setCurrency.name}
                                onBlur={
                                    event => props.checkCurrencyValue(event.target.name, event.target.value)
                                }
                                onChange={
                                    event => props.setCurrencyValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.formValidate.name ?
                                    <span className='danger font-small-1'><Translate name={props.formValidate.name}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'short'} sm={3}>
                            <Translate name={'short'}/>

                        </Label>
                        <Col sm={7} className={'pr-0'}>
                            <input
                                id={'short'}
                                type={'text'}
                                name={'short'}
                                required={true}
                                className={`form-control square ${props.formValidate.short ? 'is-invalid' : null}`}
                                placeholder={'USD'}
                                value={props.setCurrency.short}
                                onBlur={
                                    event => props.checkCurrencyValue(event.target.name, event.target.value)
                                }
                                onChange={
                                    event => props.setCurrencyValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.formValidate.short ?
                                    <span className='danger font-small-1'><Translate name={props.formValidate.short}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'value'} sm={3}>
                            <Translate name={'currency'}/>

                        </Label>
                        <Col sm={7} className={'pr-0'}>
                            <input
                                id={'value'}
                                type={'number'}
                                required={true}
                                className={`form-control square ${props.formValidate.value ? 'is-invalid' : null}`}
                                placeholder={524}
                                min={0}
                                name={'value'}
                                value={props.setCurrency.value}
                                onBlur={
                                    event => props.checkCurrencyValue(event.target.name, event.target.value)
                                }
                                onChange={
                                    event => props.setCurrencyValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.formValidate.value ?
                                    <span className='danger font-small-1'><Translate name={props.formValidate.value}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={
                        !props.formValidate.name && !props.formValidate.short && !props.formValidate.value ?
                            false
                            :
                            true
                    }
                    color="primary"
                    className="btn-square"
                    outline type="submit"
                    onClick={
                        () => props.fetchCurrency(props.setCurrency)
                    }
                >
                    <Translate name={'confirm'}/>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CurrencyModal