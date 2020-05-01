import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const SupplierTable = (props) => {
    if (props.data && Object.keys(props.data).length > 0) {
        return (
            <Table responsive>
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
                    <th>Actions</th>
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
                                                props.data[index].type === "" ? ' - ' : props.data[index].type
                                            }
                                        </td>
                                        <td>{props.data[index].hh}</td>
                                        <td>{props.data[index].hvhh}</td>
                                        <td>{props.data[index].address}</td>
                                        <td>
                                            {
                                                props.data[index].tin.length > 0 ?
                                                    <Table responsive>
                                                        <tbody>
                                                        {
                                                            props.data[index].tin.map(
                                                                (item, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {
                                                                                    item.bank_id ? item.bank_id.name : <span className='danger'>-</span>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                        </tbody>
                                                    </Table>
                                                    :
                                                    '-'
                                            }
                                        </td>
                                        <td>
                                            {
                                                props.data[index].tin.length > 0 ?
                                                    <Table responsive>
                                                        <tbody>
                                                        {
                                                            props.data[index].tin.map(
                                                                (item, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {
                                                                                    item.currency_id ? item.currency_id.short : <span className='danger'>-</span>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                        </tbody>
                                                    </Table>
                                                    :
                                                    '-'
                                            }
                                        </td>
                                        <td>
                                            {
                                                props.data[index].tin.length > 0 ?
                                                    <Table responsive>
                                                        <tbody>
                                                        {
                                                            props.data[index].tin.map(
                                                                (item, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {
                                                                                    item.tin_value ? item.tin_value : <span className='danger'>-</span>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                        </tbody>
                                                    </Table>
                                                    :
                                                    '-'
                                            }
                                        </td>
                                        <td>
                                            {
                                                props.data[index].phone.length > 0 ?
                                                    <Table responsive>
                                                        <tbody>
                                                        {
                                                            props.data[index].phone.map(
                                                                (item, index) => {

                                                                    return (
                                                                        <tr key={index + Math.random()}>
                                                                            <td>
                                                                                {
                                                                                    item.phone
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                        </tbody>
                                                    </Table>
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
                                <td>
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
                            </tr>
                        )
                        :
                        null
                }
                </tbody>

            </Table>

        );
    } else {
        return (
            <div></div>
        )
    }
}
export default SupplierTable;