import React from "react";
import {ListGroup, ListGroupItem, Alert} from "reactstrap";
import EditButton from "../../../../components/buttons/editButton";
import DeleteButton from "../../../../components/buttons/deleteButton";

const Show = props => {

    return (
        <div>
            <ListGroup>
                {
                    props.data ?
                        props.data.map(
                            item => {

                                return (
                                    <ListGroupItem
                                        className="d-flex justify-content-between"
                                        key={item.id}
                                        action
                                    >
                                        <div>
                                            {
                                                item.name
                                            }
                                        </div>
                                        <div>
                                            <EditButton
                                                style={{position: 'relative', zIndex: 10}}
                                                // perm={this.props.perm}
                                                onClick={() => {
                                                    props.setActionToggleSubModal('edit');
                                                    props.subGroupActions("get", item.id)
                                                }}
                                            />
                                            <DeleteButton
                                                style={{position: 'relative', zIndex: 10}}
                                                // perm={this.props.perm}
                                                onClick={
                                                    () => {
                                                        props.subGroupActions('get', item.id);
                                                        props.subGroupActions('delete', item.id);
                                                    }
                                                }
                                            />
                                        </div>
                                    </ListGroupItem>
                                )
                            }
                        )
                        :
                        <Alert color="warning">
                            Empty
                        </Alert>
                }
            </ListGroup>
        </div>
    )
}

export default Show