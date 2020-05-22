import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";

const CurrencyTable = (props) => {
    if (props.data) {
        return (
            <Table
                responsive
                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
            >
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <Translate name={'name'}/>
                    </th>
                    <th>
                        <Translate name={'short'}/>
                    </th>
                    <th>
                        <Translate name={'currency'}/>
                    </th>
                    <th>
                        <Translate name={'e/d'}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    props.data.map(
                        item => {

                            return (
                                <tr key={item.id}>
                                    <td>
                                        №{item.id}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.short}</td>
                                    <td>{item.value}</td>
                                    <td>
                                        <EditButton
                                            onClick={
                                                () => {
                                                    props.getItemCurrency(item.id);
                                                    props.editCurrency();
                                                }
                                            }
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </Table>
        )
    } else {
        return (
            <div></div>
        )
    }
}
export default CurrencyTable;