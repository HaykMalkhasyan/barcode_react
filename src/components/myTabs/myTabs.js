import React from "react";
import {Button, Col, Row} from "reactstrap";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditButton from "../buttons/editButton";
import DeleteButton from "../buttons/deleteButton";
import classes from "../../containers/pages/group/content.module.css";
import AddIcon from "@material-ui/icons/Add";
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';

const MyTabs = props => {

    const tabsChangeHandler = item => {
        props.clickHandler(item.id)
    }

    return (
        <Row>
            <Col
                md={2}
                style={{
                    borderRight: '1px solid #eee'
                }}
            >
                {
                    props.groups && props.groups.length ?
                        props.groups.map(
                            (item, index) => {

                                return (
                                    <div key={item.id} className='d-flex justify-content-between'>
                                        <ListItem
                                            selected={
                                                props.group.id === item.id ?
                                                    true
                                                    :
                                                    false
                                            }
                                            button
                                            style={
                                                props.editabled ?
                                                    {width: '80%'}
                                                    :
                                                    {width: '100%'}
                                            }
                                            onClick={tabsChangeHandler.bind(this, item)}
                                        >
                                            {
                                                item.required_group === true ?
                                                    <AccountTreeRoundedIcon className='mr-1' fontSize='small' color='secondary'/>
                                                    :
                                                    null
                                            }
                                            <ListItemText primary={item.name}/>
                                        </ListItem>
                                        {
                                            props.editabled ?
                                                <div className={`${classes.controlBtnAll} py-2`} style={{width: '20%'}}>
                                                    <EditButton
                                                        className={classes.controlBtnEdit}
                                                        perm={props.perm}
                                                        onClick={() => {
                                                            props.toggleModal('edit', item.id);
                                                            props.groupActions("get", item)
                                                        }}
                                                    />
                                                    <DeleteButton
                                                        className={classes.controlBtnDelete}
                                                        perm={props.perm}
                                                        onClick={
                                                            () => props.toggleModal('delete', item.id)
                                                        }
                                                    />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                )
                            }
                        )
                        :
                        null
                }
            </Col>
            <Col md={10}>
                {props.children}
            </Col>
        </Row>
    )
}

export default MyTabs