import React from "react";
import {Table/*, Input */} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {

    editBtnHandler = (item) => {
        this.props.toggleModal('edit', item.id);
        this.props.actions("get", item)
    }
    render() {
        return (
            <Table responsive>
                <thead>
                <tr>
                    {
                        this.props.data.length !== 0 ?
                            Object.keys(this.props.data[0]).map((key) => <td key={key}><Translate name={key}/></td>)
                            :
                            null
                    }
                    <td>E/D</td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.length !== 0 ?
                        this.props.data.map(
                            item => {

                                return (
                                    <tr key={item.id}>
                                        {Object.keys(item).map((key) => <td key={key}>{item[key]}</td>)}
                                        <td>
                                            <EditButton
                                                perm={'Edit'}
                                                onClick={this.editBtnHandler.bind(this, item)}
                                            />
                                            <DeleteButton
                                                perm={'Delete'}
                                                onClick={
                                                    () => this.props.toggleModal('delete', item.id)
                                                }
                                            />
                                        </td>
                                    </tr>

                                )
                            }
                        )
                        :
                        null
                }
                </tbody>
            </Table>

        );
    }
}