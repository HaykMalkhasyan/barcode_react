import React from "react";
import { Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

const ItemTable = (props) => {
    if (props.items.length) {
        return (
            <Table responsive>
                <thead>
                <tr>
                    {Object.keys(props.items[0]).map((key) => <td key={key}><Translate name={key}/></td>)}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.items.map((value, index) =>
                    <tr key={index}>
                        {Object.keys(value).map((key) => <td key={key}>{value[key]}</td>)}
                        <td>
                            <EditButton perm = {props.perm} onClick={function(){ props.toggleModal('edit',props.data.id); props.actions("get",props.data)}}/>
                            <DeleteButton perm = {props.perm} onClick={() => props.toggleModal('delete',props.data.id)}/>
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
export default ItemTable;