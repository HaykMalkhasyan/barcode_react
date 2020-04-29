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
                    <th><Translate name={'hh'}/></th>
                    <th><Translate name={'hvhh'}/></th>
                    <th><Translate name={'address'}/></th>
                    <th><Translate name={'bank'}/></th>
                    <th><Translate name={'short'}/></th>
                    <th><Translate name={'value'}/></th>
                    <th><Translate name={'phone'}/></th>
                    <th><Translate name={'active'}/></th>
                    <th><Translate name={'status'}/></th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.data ?
                        Object.keys(props.data).map(index =>
                            <tr key={index}>
                                {
                                    <>
                                        <td>{props.data[index].id}</td>
                                        <td>{props.data[index].name}</td>
                                        <td>{props.data[index].hh}</td>
                                        <td>{props.data[index].hvhh}</td>
                                        <td>{props.data[index].address}</td>
                                        <td>{props.data[index].tin.bank_id.name}</td>
                                        <td>{props.data[index].tin.currency_id.short}</td>
                                        <td>{props.data[index].tin.tin_value}</td>
                                        {/*<td>{props.data[index].phone}</td>*/}
                                        <td>{props.data[index].active}</td>
                                        <td>{props.data[index].deleted ? <Translate name={'deleted'}/> : ''}</td>
                                    </>
                                    // Object.keys(props.data[index]).map(
                                    //     (key) => {
                                    //         if (key === 'tin') {
                                    //            return  <td style={{width: '300px'}} key={key}>{props.data[index][key] ? props.data[index][key]['bank_id'].name : ''}</td>
                                    //         }
                                    //         return <td key={key}>{props.data[index][key]}</td>
                                    //
                                    //     }
                                    // )
                                }
                                <td>
                                    <EditButton
                                        perm={props.perm}
                                        onClick={function () {
                                            // props.toggleModal('edit', props.data[index].id);
                                            props.openSuppliersAddModal('edit');
                                            console.log('props.data[index]', props.data)
                                            props.setValues(props.data[index])
                                            // props.actions("get", props.data[index])
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