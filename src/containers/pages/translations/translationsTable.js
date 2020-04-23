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
                    <td>#</td>
                    <td><Translate name={'key'}/></td>
                    <td><Translate name={'value'}/></td>
                    <td><Translate name={'language'}/></td>
                    <td><Translate name={'E/D'}/></td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data && this.props.data.length > 0 ?
                        this.props.data.map(
                            item => {

                                return (
                                    <tr key={item.id}>
                                        {Object.keys(item).map((key) => <td key={key}>
                                            {
                                                item[key]
                                            }
                                        </td>)}
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