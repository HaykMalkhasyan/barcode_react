import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import classes from "../group/content.module.css";
import BuildIcon from "@material-ui/icons/Build";
import ButtonUi from "../../../components/buttons/buttonUi";
import Tooltip from '@material-ui/core/Tooltip';

const SupplierTable = (props) => {

    const printCompanyType = (type, companyType) => {
        if (type) {
            for (let item of companyType) {
                if (item.value === +type) {
                    return item.name;
                }
            }
        }
    }

    if (props.data && Object.keys(props.data).length > 0) {
        return (
            <>
                <ButtonUi
                    className={`${classes.buildBtn} ${props.editabledStatus ? classes.buildBtnAnimated : null}`}
                    label={<BuildIcon style={{fontSize: 12}}/>}
                    padding={5}
                    width={'auto'}
                    height={'auto'}
                    color={props.editabledStatus ? 'primary' : 'default'}
                    onClick={props.suppliersEditableToggle}
                />
                <h4 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                    name={'Suppliers'}/></h4>
                <Table
                    bordered
                    responsive
                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th><Translate name={'name'}/></th>
                        <th><Translate name={'type'}/></th>
                        <th><Translate name={'hh'}/></th>
                        <th><Translate name={'hvhh'}/></th>
                        <th><Translate name={'address'}/></th>
                        <th><Translate name={'bank'}/></th>
                        <th><Translate name={'short'}/></th>
                        <th><Translate name={'value'}/></th>
                        <th><Translate name={'phone'}/></th>
                        <th><Translate name={'director'}/></th>
                        <th><Translate name={'active'}/></th>
                        <th><Translate name={'status'}/></th>
                        {
                            props.editabledStatus ?
                                <th style={{width: 74}}><Translate name={'e/d'}/></th>
                                :
                                null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.data && props.data[0] ?
                            Object.keys(props.data).map(index =>
                                <tr key={index}>
                                    {
                                        <>
                                            <td>{props.data[index].id}</td>
                                            <td>{props.data[index].name}</td>

                                            <td>
                                                {
                                                    printCompanyType(props.data[index].type, props.companyTypes)
                                                }
                                            </td>
                                            <td>{props.data[index].hh}</td>
                                            <td>{props.data[index].hvhh}</td>
                                            <td>{props.data[index].address}</td>
                                            <td>
                                                {
                                                    props.data[index].tin.length > 0 ?
                                                        <Tooltip
                                                            title={
                                                                props.data[index].tin.map(
                                                                    (item, index) => {

                                                                        return <React.Fragment key={index}>
                                                                            {
                                                                                item.bank_id ?
                                                                                    <span key={index}>
                                                                                        {item.bank_id.name}
                                                                                    </span>
                                                                                    :
                                                                                    <span
                                                                                        key={index}
                                                                                        className='danger'
                                                                                    >-</span>
                                                                            }
                                                                        </React.Fragment>
                                                                    }
                                                                )
                                                            }
                                                            placement="right"
                                                        >
                                                            <span>
                                                                {props.data[index].tin[0].bank_id.name}
                                                            </span>
                                                        </Tooltip>
                                                        :
                                                        '-'
                                                }
                                            </td>
                                            <td>
                                                {
                                                    props.data[index].tin.length > 0 ?
                                                        <Tooltip
                                                            title={
                                                                props.data[index].tin.map(
                                                                    (item, index) => {
                                                                        return <React.Fragment key={index}>
                                                                            {
                                                                                item.currency_id ?
                                                                                    <span key={index}>
                                                                                        {item.currency_id.short}
                                                                                    </span>
                                                                                    :
                                                                                    <span
                                                                                        key={index}
                                                                                        className='danger'
                                                                                    >-</span>
                                                                            }
                                                                        </React.Fragment>
                                                                    }
                                                                )
                                                            }
                                                            placement="right"
                                                        >
                                                            <span>
                                                                {props.data[index].tin[0].currency_id.short}
                                                            </span>
                                                        </Tooltip>
                                                        :
                                                        '-'
                                                }
                                            </td>
                                            <td>
                                                {
                                                    props.data[index].tin.length > 0 ?
                                                        <Tooltip
                                                            title={
                                                                props.data[index].tin.map(
                                                                    (item, index) => {
                                                                        return <React.Fragment key={index}>
                                                                            {
                                                                                item.tin_value ?
                                                                                    <span key={index}>
                                                                                        {item.tin_value}
                                                                                    </span>
                                                                                    :
                                                                                    <span
                                                                                        key={index}
                                                                                        className='danger'
                                                                                    >-</span>
                                                                            }
                                                                        </React.Fragment>
                                                                    }
                                                                )
                                                            }
                                                            placement="right"
                                                        >
                                                            <span>
                                                                {props.data[index].tin[0].tin_value}
                                                            </span>
                                                        </Tooltip>
                                                        :
                                                        '-'
                                                }
                                            </td>
                                            <td>
                                                {
                                                    props.data[index].phone.length > 0 ?
                                                        <Tooltip
                                                            title={
                                                                props.data[index].phone.map(
                                                                    (item, index) => {
                                                                        return <React.Fragment key={index}>
                                                                            {
                                                                                item.phone ?
                                                                                    <span key={index}>
                                                                                        {item.phone}
                                                                                    </span>
                                                                                    :
                                                                                    <span
                                                                                        key={index}
                                                                                        className='danger'
                                                                                    >-</span>
                                                                            }
                                                                        </React.Fragment>
                                                                    }
                                                                )
                                                            }
                                                            placement="right"
                                                        >
                                                            <span>
                                                                {props.data[index].phone[0].phone}
                                                            </span>
                                                        </Tooltip>
                                                        :
                                                        '-'
                                                }
                                            </td>
                                            <td>
                                                {
                                                    props.data[index].director ? props.data[index].director : '-'
                                                }
                                            </td>
                                            <td>
                                                {
                                                    props.data[index].active === "" ? ' - ' : props.data[index].active
                                                }
                                            </td>
                                            <td>{props.data[index].deleted ? <Translate name={'deleted'}/> : ' - '}</td>
                                        </>
                                    }
                                    {
                                        props.editabledStatus ?
                                            <td style={{width: 74}}>
                                                <EditButton
                                                    perm={props.perm}
                                                    onClick={function () {
                                                        // props.toggleModal('edit', props.data[index].id);
                                                        props.openSuppliersAddModal('edit');
                                                        props.actions("get", props.data[index])
                                                    }}
                                                />
                                                <DeleteButton
                                                    perm={props.perm}
                                                    onClick={() => props.toggleModal('delete', props.data[index].id)}
                                                />
                                            </td>
                                            :
                                            null
                                    }
                                </tr>
                            )
                            :
                            null
                    }
                    </tbody>
                </Table>
            </>
        );
    } else {
        return (
            <div></div>
        )
    }
}
export default SupplierTable;