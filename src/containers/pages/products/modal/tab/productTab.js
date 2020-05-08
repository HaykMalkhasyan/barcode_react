import React, {Component} from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col, FormGroup, Label, Input,

} from "reactstrap";
import classnames from "classnames";
import Translate from "../../../../../Translate";
import MultiSelect from "../../../../../components/select/multiSelect"
import {RenameKeys, ObjectToArray} from "../../../../../utility/utils";
import GroupModal from "./group/groupModal";
// import DropdownComponent from "../../../../../components/dropdown/dropdown";
// import {setModalValues} from "../../../../../redux/products/actions";
import CodeContent from "./code/content";
import ButtonUi from "../../../../../components/buttons/buttonUi";

class TabsBorderBottom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: "code",
            modal: false,
            key: null,
            btnType: null,
            id: null
        };
        this.props.supplierActions("getAll");
        this.props.groupActions("getAll");

    }

    toggle1 = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    setGroupId = id => {
        this.setState({
            key: id
        });
    }

    render() {
        return (
            <div>
                <Nav tabs className="nav-border-bottom">
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: this.state.activeTab === "classifiers"
                            })}
                            onClick={() => {
                                this.toggle("classifiers");
                            }}
                        >
                            <Translate name={'classifiers'}/>
                        </NavLink>
                    </NavItem>


                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: this.state.activeTab === "suppliers"
                            })}
                            onClick={() => {
                                this.toggle("suppliers");
                            }}
                        >
                            <Translate name={"suppliers"}/>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: this.state.activeTab === "code"
                            })}
                            onClick={() => {
                                this.toggle("code");
                            }}
                        >
                            <Translate name={"code"}/>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: this.state.activeTab === "description"
                            })}
                            onClick={() => {
                                this.toggle("description");
                            }}
                        >
                            <Translate name={"description"}/>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="classifiers">
                        {
                            Object.keys(this.props.groups).map(
                                (item, index) => {
                                    return (
                                        <Row
                                            key={index}
                                        >
                                            <Col md={3} style={{padding: '11px'}}>
                                                <b>
                                                    {this.props.groups[item].name}
                                                </b>
                                            </Col>
                                            <Col md={9}>
                                                <GroupModal
                                                    getSubGroups={this.props.getSubGroups}
                                                    data={this.props.subGroups}
                                                    productGroups={this.props.productGroups}
                                                    group={this.props.groups[item]}
                                                    name={this.props.groups[item].name}
                                                    lang={this.props.lang}
                                                    handleOpen={this.props.handleOpen}
                                                    selectGroup={this.props.selectGroup}
                                                    selected={this.props.selectedGroups}
                                                    setModalValues={this.props.setModalValues}
                                                    product={this.props.product}
                                                    id={item}
                                                    dataId={this.props.groups[item].id}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                            )
                        }
                    </TabPane>

                    <TabPane tabId="suppliers">
                        <MultiSelect
                            name={"suppliers"}
                            handleChange={this.props.setModalValues}
                            data={
                                RenameKeys(
                                    ObjectToArray(this.props.suppliers),
                                    ['name', 'name'],
                                    ['value', 'label']
                                )
                            }
                        />
                    </TabPane>
                    <TabPane tabId="code">
                        <Row>
                            <Col sm="12">

                                <FormGroup>
                                    <CodeContent {...this.props} />
                                </FormGroup>

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="description">
                        <Row>
                            <Col sm="12">
                                <FormGroup>
                                    <Label for="description">Նկարագրություն</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        rows="5"
                                        value={this.props.product.description ? this.props.product.description || '' : ''}
                                        onChange={event => this.props.setModalValues("description", event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

            </div>
        );
    }
}

export default TabsBorderBottom;