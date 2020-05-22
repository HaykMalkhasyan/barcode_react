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
                    <Label for={'bank'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        {
                            i === 0 ?
                                <Translate name={'bank'}/>
                                :
                                ''
                        }
                    </Label>
                    <Col sm={3} className={'pr-0'} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <Input
                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                            type={'select'}
                            className={'square'}
                            name={`bank_id-${i}`}
                            value={
                                props.setSupplier.tin.length > 0 && props.setSupplier.tin[i] ?
                                    props.setSupplier.tin[i].bank_id ?
                                        props.setSupplier.tin[i].bank_id.id
                                        :
                                        0
                                    :
                                    0
                            }
                            onBlur={
                                event => props.checkValue(event.target.name, event.target.value, i)
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
                        {
                            props.checkValueStatus['bank_id'] && props.checkValueStatus['bank_id'][i] ?
                                <span className='danger font-small-1'><Translate
                                    name={props.checkValueStatus['bank_id'][i]}/></span>
                                :
                                null
                        }
                    </Col>
                    <Col sm={2} className={'pr-0 pl-0'} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <Input
                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                            type={'select'}
                            className={'square border-left-0'}
                            name={`currency_id-${i}`}
                            value={
                                props.setSupplier.tin && props.setSupplier.tin[i] ?
                                    props.setSupplier.tin[i].currency_id ?
                                        props.setSupplier.tin[i].currency_id.id
                                        :
                                        0
                                    :
                                    0
                            }
                            onBlur={
                                event => props.checkValue(event.target.name, event.target.value, i)
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
                        {
                            props.checkValueStatus['currency_id'] && props.checkValueStatus['currency_id'][i] ?
                                <span className='danger font-small-1'><Translate
                                    name={props.checkValueStatus['currency_id'][i]}/></span>
                                :
                                null
                        }
                    </Col>
                    <Col sm={4} className={'pl-0'} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <div className={'position-relative has-icon-right'}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                className={'form-control square border-left-0'}
                                type={'text'}
                                id={'bank1'}
                                placeholder={'currency'}
                                name={`tin_value-${i}`}
                                value={
                                    props.setSupplier.tin && props.setSupplier.tin[i] ?
                                        props.setSupplier.tin[i].tin_value ?
                                            props.setSupplier.tin[i].tin_value
                                            :
                                            ''
                                        :
                                        ''
                                }
                                onBlur={
                                    event => props.checkValue(event.target.name, event.target.value, i)
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
                                                    () => props.addTin({}, i)
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
                        {
                            props.checkValueStatus['tin_value'] && props.checkValueStatus['tin_value'][i] ?
                                <span className='danger font-small-1'><Translate
                                    name={props.checkValueStatus['tin_value'][i]}/></span>
                                :
                                null
                        }
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
                    <Label for={'phone'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        {
                            i === 0 ?
                                <Translate name={'phone'}/>
                                :
                                ''
                        }
                    </Label>
                    <Col sm={9} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <div className={"position-relative has-icon-right"}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                type={"tel"}
                                className={"form-control square"}
                                placeholder={'example: 098 --- ---'}
                                name={`phone-${i}`}
                                value={props.setSupplier.phone[i] ? props.setSupplier.phone[i].phone : ''}
                                onBlur={
                                    event => props.checkValue(event.target.name, event.target.value, i)
                                }
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
                        {
                            props.checkValueStatus['phone'] && props.checkValueStatus['phone'][i] ?
                                <span className='danger font-small-1'><Translate
                                    name={props.checkValueStatus['phone'][i]}/></span>
                                :
                                null
                        }
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
            <ModalHeader style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                <Translate name={`${props.modalType}Supplier`}/>
            </ModalHeader>
            <ModalBody>
                <form>

                    <FormGroup row>
                        <Label for={'firstName'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Translate name={'name'}/>
                        </Label>
                        <Col sm={7} className={'pr-0'} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                id={'firstName'}
                                className={`form-control square ${props.checkValueStatus['name'] ? 'is-invalid' : null}`}
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
                                    <span className='danger font-small-1'><Translate
                                        name={props.checkValueStatus.name}/></span>
                                    :
                                    null
                            }
                        </Col>
                        <Col sm={2} className={'pl-0'} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                className={'square border-left-0'}
                                type={'select'}
                                name={'type'}
                                value={+props.setSupplier.type || 0}
                                onChange={
                                    event => props.setSuppliersAddModalValue(event.target.name, +event.target.value)
                                }
                            >
                                <option value={0}>choose...</option>
                                {
                                    props.companyTypes ?
                                        props.companyTypes.map(
                                            type => {

                                                return (
                                                    <option
                                                        key={type.id}
                                                        value={type.value}
                                                    >
                                                        {type.name}
                                                    </option>
                                                )
                                            }
                                        )
                                        :
                                        <option>Empty</option>
                                }
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'hh'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Translate name={'hh'}/>
                        </Label>
                        <Col sm={9} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                id={'hh'}
                                className={`form-control square ${props.checkValueStatus['hh'] ? 'is-invalid' : null}`}
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
                                    <span className='danger font-small-1'><Translate
                                        name={props.checkValueStatus['hh']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'hvhh'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Translate name={'hvhh'}/>
                        </Label>
                        <Col sm={9} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <div className={"position-relative has-icon-right"}>
                                <input
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <span className='danger font-small-1'><Translate
                                        name={props.checkValueStatus['hvhh']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={'address'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Translate name={'address'}/>
                        </Label>
                        <Col sm={9} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                id={'address'}
                                className={`form-control square ${props.checkValueStatus['address'] ? 'is-invalid' : null}`}
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
                                    <span className='danger font-small-1'><Translate
                                        name={props.checkValueStatus['address']}/></span>
                                    :
                                    null
                            }
                        </Col>
                    </FormGroup>

                    {printBankElement()}

                    <FormGroup row>
                        <Label for={'director'} sm={3} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <Translate name={'director'}/>
                        </Label>
                        <Col sm={9} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <input
                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                className={`form-control square ${props.checkValueStatus['director'] ? 'is-invalid' : null}`}
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
                                    <span className='danger font-small-1'><Translate
                                        name={props.checkValueStatus['director']}/></span>
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
                {
                    props.setSupplier.name.length && props.setSupplier.hh.length && props.setSupplier.hvhh.length && props.setSupplier.address.length && props.setSupplier.tin.length > 0 && props.setSupplier.director.length && props.setSupplier.phone.length && props.setSupplier.type ?
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
                        :
                        <span className='danger font-small-3'><Translate name={'The entire field is required'}/></span>
                }
            </ModalFooter>
        </Modal>
    )
}

export default SuplliersAddModal;