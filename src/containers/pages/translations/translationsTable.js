import React from "react";
import {Table/*, Input */} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import PaginationTable from "../../../components/PaginationTable/paginationTable";
import SessionStorage from "../../../services/SessionStorage";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {

    editBtnHandler = (item) => {
        this.props.toggleModal('edit', item.id);
        this.props.actions("get", item)
    }

    deleteBtnHandler = id => {
        this.props.toggleModal('delete', id)
    }

    newDataHandler = () => {
        let arr = this.props.data;
        let obj = {id: 1000, key: 'for test', value: 'for test', language: 'am'};
        let obj1 = {id: 1000, key: 'for test', value: 'for test', language: 'ru'};
        let obj2 = {id: 1000, key: 'for test', value: 'for test', language: 'en'};
        if (arr.length > 0) {
            arr.forEach(
                (elem, index) => {
                    if (elem.id === obj.id) {
                        arr.splice(index, 1)
                    }
                    if (elem.id === obj1.id) {
                        arr.splice(index, 1)
                    }
                    if (elem.id === obj2.id) {
                        arr.splice(index, 1)
                    }
                }
            )
        }
        return arr;
    }

    render() {
        return (
            <>
                {/*<Table responsive>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <td>#</td>*/}
                {/*        <td><Translate name={'key'}/></td>*/}
                {/*        <td><Translate name={'value'}/></td>*/}
                {/*        <td><Translate name={'language'}/></td>*/}
                {/*        <td><Translate name={'E/D'}/></td>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {*/}
                {/*        this.props.data && this.props.data.length > 0 ?*/}
                {/*            this.props.data.map(*/}
                {/*                item => {*/}

                {/*                    return (*/}
                {/*                        <tr key={item.id}>*/}
                {/*                            {Object.keys(item).map((key) => <td key={key}>*/}
                {/*                                {*/}
                {/*                                    item[key]*/}
                {/*                                }*/}
                {/*                            </td>)}*/}
                {/*                            <td>*/}
                {/*                                <EditButton*/}
                {/*                                    perm={'Edit'}*/}
                {/*                                    onClick={this.editBtnHandler.bind(this, item)}*/}
                {/*                                />*/}
                {/*                                <DeleteButton*/}
                {/*                                    perm={'Delete'}*/}
                {/*                                    onClick={*/}
                {/*                                        () => this.props.toggleModal('delete', item.id)*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </td>*/}
                {/*                        </tr>*/}

                {/*                    )*/}
                {/*                }*/}
                {/*            )*/}
                {/*            :*/}
                {/*            null*/}
                {/*    }*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
                {
                    this.props.data && this.props.data.length > 0 ?
                        <PaginationTable
                            editEvent={this.editBtnHandler}
                            deleteEvent={this.deleteBtnHandler}
                            data={this.newDataHandler()}
                            dataKey={<Translate name={'key'}/>}
                            value={<Translate name={'value'}/>}
                            lang={<Translate name={'language'}/>}
                            // buttons={<Translate name={'E/D'}/>}
                        />
                        :
                        null
                }
            </>

        );
    }
}