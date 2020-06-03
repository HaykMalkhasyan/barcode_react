import React from "react";
import {Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import classes from "../group/content.module.css";
import BuildIcon from "@material-ui/icons/Build";
import ButtonUi from "../../../components/buttons/buttonUi";

const CurrencyTable = (props) => {
    if (props.data) {
        return (
            <>
                <ButtonUi
                    className={`${classes.buildBtn} ${props.editabledStatus ? classes.buildBtnAnimated : null}`}
                    label={<BuildIcon style={{fontSize: 12}}/>}
                    padding={5}
                    width={'auto'}
                    height={'auto'}
                    color={props.editabledStatus ? 'primary' : 'default'}
                    onClick={props.currencyEditabkeToggle}
                />
                <h4 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={'currency'}/></h4>
                <Table
                    bordered
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
                        {
                            props.editabledStatus ?
                                <th>
                                    <Translate name={'edit'}/>
                                </th>
                                :
                                null
                        }
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
                                        {
                                            props.editabledStatus ?
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
                                                :
                                                null
                                        }
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </Table>
            </>
        )
    } else {
        return (
            <div></div>
        )
    }
}
export default CurrencyTable;