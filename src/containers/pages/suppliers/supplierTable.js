import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const SupplierTable = (props) => {
    if (props.data && Object.keys(props.data).length>0) {
        return (
            <Table responsive>
                <thead>
                <tr>
                    {Object.keys(props.data[Object.keys(props.data)[0]]).map((key) => <td key={key}><Translate name={key}/></td>)}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(props.data).map(index =>
                    <tr key={index}>
                        {Object.keys(props.data[index]).map((key) => <td key={key}>{props.data[index][key]}</td>)}
                        <td >
                            <EditButton perm = {props.perm} onClick={function(){ props.toggleModal('edit',props.data[index].id); props.actions("get",props.data[index])}}/>
                            <DeleteButton perm = {props.perm}  onClick={() => props.toggleModal('delete',props.data[index].id)}/>
                        </td>
                    </tr>
                )}
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