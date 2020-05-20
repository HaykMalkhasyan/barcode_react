import React, {Component} from "react";
import {Card, CardBody, Col,} from "reactstrap";
import AddButton from "../../../components/buttons/addButton";
import GroupModal from "./groupModal";
import SubGroupModal from "./subGroupModal";
import ContentTable from "./content";

class UserContainer extends Component {
    constructor(props) {
        super(props)
        this.props.groupActions("getAll")
        this.props.subGroupActions("getAll")
    }
    render() {

            return(
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <ContentTable {...this.props} />
                            {/*<TableComponent {...this.props} />*/}
                        </CardBody>
                    </Card>
                    <GroupModal {...this.props}  type={'add'} />
                    <GroupModal {...this.props} type={'edit'} />
                    <GroupModal {...this.props}  type={'delete'} />
                    <SubGroupModal {...this.props}  type={'add'} />
                    <SubGroupModal {...this.props}  type={'edit'} />
                    <SubGroupModal {...this.props}  type={'delete'} />
                </Col>

            )
    }
}


export default UserContainer;
