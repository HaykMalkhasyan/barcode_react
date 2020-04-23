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

    createTableHandler = (object, item) => {

        return Object.keys(item).map(
            key => {
                if (key === 'icon') {
                    return (
                        <td key={key}>
                            {item[key]}
                        </td>
                    )
                }
                return (
                    <td key={key}>
                        {


                            typeof item[key] === 'number' ?
                            item[key]
                            :
                            <Translate name={item[key]}/>
                        }
                    </td>
                )
            }
        )
    }

    render() {
        return (
            <Table responsive>
                <thead>
                <tr>
                    <td>#</td>
                    <td><Translate name={'Name'}/></td>
                    <td><Translate name={'Icon'}/></td>
                    <td><Translate name={'E/D'}/></td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.length !== 0 ?
                        this.props.data.map(
                            item => {

                                return (
                                    <tr key={item.id}>
                                        {
                                            this.createTableHandler(Object.keys(item), item)

                                        }
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