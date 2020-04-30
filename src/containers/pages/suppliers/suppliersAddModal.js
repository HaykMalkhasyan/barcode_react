import React from "react";
import {
    Col,
    FormGroup,
    Label,
    Button,
    ModalBody,
    ModalFooter,
    Modal,
    ModalHeader, Input
} from "reactstrap";
import Translate from "../../../Translate";
import {Plus, Trash2, Search} from "react-feather";

const SuplliersAddModal = props => {

    const printBankElement = () => {
        let element = [];
        let length = props.setSupplier.tin.length ? props.setSupplier.tin.length : 1;
        for (let i = 0; i < length; i++) {
            element.push(
                <FormGroup row key={i}>
                    <Label for={'bank'} sm={3}>
                        {
                            i === 0 ?
                                <Translate name={'bank'}/>
                                :
                                ''
                        }
                    </Label>
                    <Col sm={3} className={'pr-0'}>
                        <Input
                            type={'select'}
                            className={'square'}
                            name={'bank_id'}
                            value={
                                props.setSupplier.tin.length > 0 && props.setSupplier.tin[i] ?
                                    props.setSupplier.tin[i].bank_id ?
                                        props.setSupplier.tin[i].bank_id.id
                                        :
                                        0
                                    :
                                    0
                            }
                            onChange={
                                event => props.setSuppliersAddModalValue(event.target.name, event.target.value, i)
                            }
                        >
                            <option value={0}>choose...</option>
                            {
                                props.banks ?
                                    props.banks.map(
                                        bank => <option
                                            key={bank.id}
                                            value={bank.id}
                                        >
                                            {bank.name}
                                        </option>
                                    )
                                    :
                                    <option>Empty</option>
                            }
                        </Input>
                    </Col>
                    <Col sm={2} className={'pr-0 pl-0'}>
                        <Input
                            type={'select'}
                            className={'square border-left-0'}
                            name={'currency_id'}
                            value={
                                props.setSupplier.tin.length > 0 ?
                                    props.setSupplier.tin[i].currency_id ?
                                        props.setSupplier.tin[i].currency_id.id
                                        :
                                        0
                                    :
                                    0
                            }
                            onChange={
                                event => props.setSuppliersAddModalValue(event.target.name, event.target.value, i)
                            }
                        >
                            <option value={0}>choose...</option>
                            {
                                props.currency ?
                                    props.currency.map(
                                        item => <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.short}
                                        </option>
                                    )
                                    :
                                    <option>Empty</option>
                            }
                        </Input>
                    </Col>
                    <Col sm={4} className={'pl-0'}>
                        <div className={'position-relative has-icon-right'}>
                            <input
                                className={'form-control square border-left-0'}
                                type={'text'}
                                id={'bank'}
                                placeholder={'currency'}
                                name={'tin_value'}
                                value={
                                    props.setSupplier.tin.length > 0 ?
                                        props.setSupplier.tin[i].tin_value ?
                                            props.setSupplier.tin[i].tin_value
                                            :
                                            ''
                                        :
                                        ''
                                }
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value, i)
                                }
                            />
                            {
                                <div className={'form-control-position'}>
                                    {
                                        i + 1 === length ?
                                            <Plus
                                                size={20}
                                                className={'success cursor-pointer'}
                                                onClick={
                                                    () => props.addTin({
                                                        bank_id: 1,
                                                        currency_id: 1,
                                                        tin_value: ''
                                                    }, i)
                                                }
                                            />
                                            :
                                            <Trash2
                                                size={20}
                                                className={'danger cursor-pointer'}
                                                onClick={
                                                    () => props.reduceTin(i)
                                                }
                                            />
                                    }
                                </div>
                            }
                        </div>
                    </Col>
                </FormGroup>
            )
        }

        return element
    }

    const printPhoneElement = () => {
        let element = [];
        let length = props.setSupplier.phone.length ? props.setSupplier.phone.length : 1;
        for (let i = 0; i < length; i++) {
            element.push(
                <FormGroup row key={i}>
                    <Label for={'phone'} sm={3}>
                        {
                            i === 0 ?
                                <Translate name={'phone'}/>
                                :
                                ''
                        }
                    </Label>
                    <Col sm={9}>
                        <div className={"position-relative has-icon-right"}>
                            <input
                                type={"tel"}
                                className={"form-control square"}
                                placeholder={'example: +374 -- --- ---'}
                                name={'phone'}
                                value={props.setSupplier.phone[i] ? props.setSupplier.phone[i].phone : ''}
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value, i)
                                }
                            />
                            <div className={"form-control-position"}>
                                {
                                    i + 1 === length ?
                                        <Plus
                                            size={20}
                                            className={'success cursor-pointer'}
                                            onClick={
                                                () => props.addPhone(null, i)
                                            }
                                        />
                                        :
                                        <Trash2
                                            size={20}
                                            className={'danger cursor-pointer'}
                                            onClick={
                                                () => props.reducePhone(i)
                                            }
                                        />
                                }
                            </div>
                        </div>
                    </Col>
                </FormGroup>
            )
        }

        return element;
    }

    return (
        <Modal
            isOpen={props.isOpen}
            size='lg'
            toggle={
                () => props.openSuppliersAddModal()
            }
        >
            <ModalHeader>
                <Translate name={`${props.modalType}Supplier`}/>
            </ModalHeader>
            <ModalBody>
                <form>

                    <FormGroup row>
                        <Label for={'firstName'} sm={3}>
                            <Translate name={'name'}/>
                        </Label>
                        <Col sm={7} className={'pr-0'}>
                            <input
                                id={'firstName'}
                                className={`form-control square`}
                                type={'text'}
                                name={'name'}
                                value={props.setSupplier.name}
                                onBlur={
                                    (event => props.checkValue(event.target.name, event.target.value))
                                }
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.checkValueStatus['name'] ?
                                     <span style={{color: '#f66'}}><Translate name={props.checkValueStatus.name}/></span>
                                    :
                                    null
                            }
                        </Col>
                        <Col sm={2} className={'pl-0'}>
                            <Input
                                className={'square border-left-0'}
                                type={'select'}
                                name={'type'}
                                value={+props.setSupplier.type || 1}
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, +event.target.value)
                                }
                            >
                                <option value={1}>ՍՊԸ</option>
                                <option value={2}>ՓԲԸ</option>
                                <option value={3}>ԲԲԸ</option>
                                <option value={4}>ԱՁ</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'hh'} sm={3}>
                            <Translate name={'hh'}/>
                        </Label>
                        <Col sm={9}>
                            <input
                                id={'hh'}
                                className={`form-control square`}
                                type={'text'}
                                name={'hh'}
                                value={props.setSupplier.hh}
                                onBlur={
                                    (event => props.checkValue(event.target.name, event.target.value))
                                }
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.checkValueStatus['hh'] ?
                                    <span style={{color: '#f66'}}><Translate name={props.checkValueStatus['hh']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'hvhh'} sm={3}>
                            <Translate name={'hvhh'}/>
                        </Label>
                        <Col sm={9}>
                            <div className={"position-relative has-icon-right"}>
                                <input
                                    id={'hvhh'}
                                    className={`form-control square`}
                                    type={'text'}
                                    name={'hvhh'}
                                    value={props.setSupplier.hvhh}
                                    onBlur={
                                        (event => props.checkValue(event.target.name, event.target.value))
                                    }
                                    onChange={
                                        event => props.setSuppliersAddModalValue(event.target.name, event.target.value)
                                    }
                                />
                                <div className={"form-control-position"}>
                                    <Search
                                        size={20}
                                        className={'info cursor-pointer'}
                                        onBlur={
                                            (event => props.checkValue(event.target.name, event.target.value))
                                        }
                                        onClick={
                                            () => props.searchRequisite(props.setSupplier.hvhh)
                                        }
                                    />
                                </div>
                            </div>
                            {
                                props.checkValueStatus['hvhh'] ?
                                    <span style={{color: '#f66'}}><Translate name={props.checkValueStatus['hvhh']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'address'} sm={3}>
                            <Translate name={'address'}/>
                        </Label>
                        <Col sm={9}>
                            <input
                                id={'address'}
                                className={`form-control square`}
                                type={'text'}
                                name={'address'}
                                value={props.setSupplier.address}
                                onBlur={
                                    (event => props.checkValue(event.target.name, event.target.value))
                                }
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.checkValueStatus['address'] ?
                                    <span style={{color: '#f66'}}><Translate name={props.checkValueStatus['address']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    {printBankElement()}

                    <FormGroup row>
                        <Label for={'director'} sm={3}>
                            <Translate name={'director'}/>
                        </Label>
                        <Col sm={9}>
                            <input
                                className={'form-control square'}
                                type={'text'}
                                id={'director'}
                                name={'director'}
                                onBlur={
                                    (event => props.checkValue(event.target.name, event.target.value))
                                }
                                value={
                                    props.setSupplier.director ?
                                        props.setSupplier.director
                                        :
                                        ''
                                }
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, event.target.value)
                                }
                            />
                            {
                                props.checkValueStatus['director'] ?
                                    <span style={{color: '#f66'}}><Translate name={props.checkValueStatus['director']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    {
                        printPhoneElement()
                    }

                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    className="btn-square"
                    outline type="submit"
                    onClick={
                        () => {
                            props.modalType === 'add' ?
                                props.fetchSuppliers(props.setSupplier)
                                :
                                props.supplierActions('edit', props.setSupplier)
                        }
                    }
                >
                    <Translate name={'confirm'}/>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SuplliersAddModal;