import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const UserTable = (props) => {

    if (props.data && props.data.length) {
        return (
            <>
                <h4 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={'Existing users'}/></h4>
                <Table responsive className='mb-5' style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
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
                                    } else  {
                                        return null
                                    }
                                }
                            )
                            :
                            null
                    }
                    </tbody>

                </Table>
                <h4 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={'Deleted users'}/></h4>
                <Table responsive>
                    <thead>
                    <tr style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
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
                                    if (value.deleted === 1) {
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
                                    } else {
                                        return null;
                                    }
                                }
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
export default UserTable;