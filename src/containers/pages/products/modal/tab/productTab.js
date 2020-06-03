import React, {Component} from "react";
import {Col, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane,} from "reactstrap";
import classnames from "classnames";
import Translate from "../../../../../Translate";
import MultiSelect from "../../../../../components/select/multiSelect"
import {ObjectToArray, RenameKeys} from "../../../../../utility/utils";
import GroupModal from "./group/groupModal";
// import DropdownComponent from "../../../../../components/dropdown/dropdown";
// import {setModalValues} from "../../../../../redux/products/actions";
import CodeContent from "./code/content";
import classes from './productTab.module.css';
import ButtonUi from "../../../../../components/buttons/buttonUi";
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import * as Icon from 'react-feather'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

class TabsBorderBottom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: "code",
            modal: false,
            key: null,
            btnType: null,
            id: null,
            valImg: null
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

    uploadImageHandler = event => {
        this.setState({
            valImg: event.target.files
        })
        this.props.SetUploadImages(event.target.name, event.target.files)
    }
    deleteImageHandler = (item, index) => {
        let valImg = [...this.state.valImg]
        valImg.splice(index, 1);
        if (valImg.length === 0) {
            this.setState({
                valImg: null
            })
        } else {
            this.setState({
                valImg: valImg
            })
        }

        this.props.deleteUploadImages(item)
    }
    selectMainIMage = value => {
        this.props.mainIMg(value)
        this.props.setMainImage(value)
    }

    imagesRender = (settings) => {
        let imgData = this.state.valImg
        let imgObject = []
        if (imgData) {
            for (let [key, value] of Object.entries(imgData)) {
                imgObject.push(
                    <Col
                        key={key}
                        md={3}
                    >
                        <div className={classes.imageWindow}>
                            <div className={classes.imgBord}>
                                <img className={classes.imgBordImage} src={URL.createObjectURL(value)}
                                     alt={value.name}/>
                                {
                                    settings.edit || settings.delete ?
                                        <>
                                            <div className={classes.conttroller}/>
                                            <div className={classes.btns}>
                                                <div className={classes.conttrollerBtnsMain}>
                                                    <ButtonUi
                                                        disabled={!settings.edit}
                                                        onClick={this.selectMainIMage.bind(this, value)}
                                                        color={'primary'}
                                                        variant={"contained"}
                                                        padding={'5px'}
                                                        width={'auto'}
                                                        height={'auto'}
                                                    >
                                                        <AddToHomeScreenIcon/>
                                                    </ButtonUi>
                                                </div>
                                                <div className={classes.conttrollerBtnsDelete}>
                                                    <ButtonUi
                                                        disabled={!settings.delete}
                                                        onClick={this.deleteImageHandler.bind(this, value, key)}
                                                        color={'secondary'}
                                                        variant={"contained"}
                                                        padding={'5px'}
                                                        width={'auto'}
                                                        height={'auto'}
                                                    >
                                                        <RestoreFromTrashIcon/>
                                                    </ButtonUi>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </Col>
                )
            }
        }
        return imgObject;
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
                <TabContent
                    activeTab={this.state.activeTab}
                    style={{height: '230px', overflowY: 'auto'}}
                >
                    <TabPane tabId="classifiers">
                        {
                            this.props.groups.length ?
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
                                                    sectionFontColor={this.props.sectionFontColor}
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
                                :
                                <p className='text-center font-small-5 info p-2 mb-0'>
                                    <Icon.AlertOctagon className='mr-1 warning'/>
                                    <Translate name={'The groups are empty'}/>
                                </p>
                        }
                    </TabPane>

                    <TabPane tabId="suppliers" style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
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
                        <div className='p-2'>
                            {
                                console.log(this.props.product)
                            }
                            {
                                this.props.type === 'edit' ?
                                    this.props.product && this.props.product.supplier ?
                                        <List component="nav" aria-label="secondary mailbox folders">
                                            <ListItem button>
                                                <ListItemText primary={this.props.product.supplier.name} />
                                                <ButtonUi>
                                                    <DeleteForeverRoundedIcon color='secondary' fontSize="small"/>
                                                </ButtonUi>
                                            </ListItem>
                                        </List>
                                        :
                                        null
                                    :
                                    null
                            }
                        </div>
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
                                    <Label for="description" style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}><Translate name={'description'}/></Label>
                                    <Input
                                        style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}
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