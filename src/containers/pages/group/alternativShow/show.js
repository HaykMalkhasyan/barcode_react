import React from "react";
import {ListGroup, ListGroupItem, Alert} from "reactstrap";
import EditButton from "../../../../components/buttons/editButton";
import DeleteButton from "../../../../components/buttons/deleteButton";

const Show = props => {

    const setItems = data => {
        for (let item of props.subGroups) {
            if (parseInt(data.parent_id) === parseInt(item.id)) {

                return setItems(item) ?
                    `${setItems(item)} > ${item.name}`
                    :
                    `${item.name}`
            }
        }
    }

    const roadRender = (data, name) => {
        console.log(name)
        let obj;
        let arrayRoadItems;
        if (data && data.id && data.name) {
            for (let item of props.subGroups) {
                if (item.id === data.id) {
                    obj = item
                }
            }
            arrayRoadItems = setItems(obj)
            if (arrayRoadItems) {
                return name.concat(` > ${arrayRoadItems.concat(` > ${obj.name}`)}`)
            } else {
                return name.concat(` > ${obj.name}`)
            }
        }
    }
console.log(props.group)
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
                                            <h5>
                                                <b>
                                                    {item.name}
                                                </b>
                                            </h5>
                                            <p className="font-small-2" style={{color: '#666'}}>
                                                {roadRender(item, props.group.name)}
                                            </p>
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