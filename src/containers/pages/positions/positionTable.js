import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const PositionTable = (props) => {
    if (props.data && props.data.length) {
        return (
            <Table responsive>
                <thead>
                <tr>
                    {Object.keys(props.data[0]).map((key) => <td key={key}><Translate name={key}/></td>)}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map((value, index) =>
                    <tr key={index}>
                        {Object.keys(value).map((key) => <td key={key}>{value[key]}</td>)}
                        <td>
                            <EditButton perm = {props.perm} onClick={function(){ props.toggleModal('edit',value.id); props.actions("get",value)}}/>
                            <DeleteButton perm = {props.perm}  onClick={() => props.toggleModal('delete',value.id)}/>
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
export default PositionTable;