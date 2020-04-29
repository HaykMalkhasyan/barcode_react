import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const UserTable = (props) => {

    if (props.data && props.data.length) {
        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th><Translate name={'email'}/></th>
                    <th><Translate name={'username'}/></th>
                    <th><Translate name={'firstname'}/></th>
                    <th><Translate name={'lastname'}/></th>
                    <th><Translate name={'status'}/></th>
                    <th><Translate name={'company'}/></th>
                    <th><Translate name={'position'}/></th>
                    <th><Translate name={'E/D'}/></th>
                </tr>
                </thead>
                <tbody>
                {
                    props.data ?
                        props.data.map(
                            (value, index) => {
                                if (value.deleted === 0) {
                                    return (
                                        <tr key={index}>
                                            {
                                                Object.keys(value).map(
                                                    key => key !== 'deleted' ?
                                                        key === 'is_active' ?
                                                            value[key] ?
                                                                <td key={key}>
                                                                    <small>{'active'}</small>
                                                                </td>
                                                                :
                                                                <td key={key}>
                                                                    <small>{'inactive'}</small>
                                                                </td>
                                                            :
                                                            <td key={key}>{value[key]}</td>
                                                        :
                                                        null
                                                )
                                            }
                                            <td>
                                                <EditButton
                                                    perm={props.perm}
                                                    onClick={function () {
                                                        props.toggleModal('edit', value.id);
                                                        props.actions("get", value)
                                                    }}
                                                />
                                                <DeleteButton
                                                    perm={props.perm}
                                                    onClick={function () {
                                                        props.toggleModal('delete', value);
                                                        props.actions("get", value)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={index} style={{backgroundColor: '#f66'}}>
                                            {
                                                Object.keys(value).map(
                                                    key => key !== 'deleted' ?
                                                        key === 'is_active' ?
                                                            value[key] ?
                                                                <td key={key}>
                                                                    <small>{'active'}</small>
                                                                </td>
                                                                :
                                                                <td key={key}>
                                                                    <small>{'inactive'}</small>
                                                                </td>
                                                            :
                                                            <td key={key}>{value[key]}</td>
                                                        :
                                                        null
                                                )
                                            }
                                            <td>
                                                <b><Translate name={'deleted'}/></b>
                                            </td>
                                        </tr>
                                    )
                                }

                            }
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
export default UserTable;