import React from "react";
import cls from './productTable.module.css'
import {Col, Row, Table} from "reactstrap";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import AdvancedSearch from "./searchGroup/advancedSearch/advancedSearch";
import classes from "../group/content.module.css";
import BuildIcon from "@material-ui/icons/Build";
import ButtonUi from "../../../components/buttons/buttonUi";
import Tooltip from '@material-ui/core/Tooltip';
import TextFields from "../../../components/textFieldUI/textField";
import * as Icon from "react-feather";
import CloseIcon from '@material-ui/icons/Close';
import ClassifiersModal from "./searchGroup/classifiersModal/classifiersModal";
import SearchIcon from "@material-ui/icons/Search";
import SwitchesUi from "../../../components/switchUI/switchUI";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {
    state = {
        isOpen: false,
        searchConfig: {
            sku: false,
            name: false,
            suppliers: false,
            barcode: false,
            description: false,
        }
    }

    onEditHandler = product => {
        this.props.toggleModal('edit', product.id)
        this.props.actions('get', product)
    }

    onDeleteHandler = id => {
        this.props.toggleModal('delete', id)
    }

    searchProductHandler = (value, name) => {
        this.props.setSearchProductValue(value, name)
    }

    searchAreaToggle = (name) => {
        let searchConfig = {...this.state.searchConfig}
        Object.keys(searchConfig).forEach(
            key => searchConfig[key] = false
        )
        this.setState({
            searchConfig
        })
        searchConfig[name] = true;
        this.setState({
            searchConfig
        })
    }

    searchAreaClose = (name) => {
        this.props.setSearchProductValue('', name);
        let searchConfig = {...this.state.searchConfig};
        searchConfig[name] = false
        this.setState({
            searchConfig
        })
    }

    writeSearchText = (text) => {
        this.props.addSearchText(text)
    }

    changeSwitchHandler = (name, value) => {
        this.props.toggleSwitchValue(name, value)
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        return (
            <>
                <ButtonUi
                    className={`${classes.buildBtn} ${this.props.editabledStatus ? classes.buildBtnAnimated : null}`}
                    label={<BuildIcon style={{fontSize: 12}}/>}
                    padding={5}
                    width={'auto'}
                    height={'auto'}
                    color={this.props.editabledStatus ? 'primary' : 'default'}
                    onClick={this.props.editabledProduct}
                />


                <Row>
                    <Col
                        md={2}
                        className='mt-2'
                    >
                        <ClassifiersModal
                            sectionFontColor={this.props.sectionFontColor}
                            groups={this.props.groups}
                            group={this.props.group}
                            createError={this.props.createError}
                            classifiersToggleModal={this.props.classifiersToggleModal}
                            subGroups={this.props.subGroups}
                            classifiersModal={this.props.classifiersModal}
                            selectClassifiersGroup={this.props.selectClassifiersGroup}
                            selectGroupsNode={this.props.selectGroupsNode}
                            createClassifiers={this.props.createClassifiers}
                        />
                    </Col>
                    <Col md={10}>
                        <Row className='my-0'>
                            <Col md={8} className='d-flex' style={{alignItems: 'flex-end'}}>
                                <div style={this.props.sectionFontColor ? {
                                    color: this.props.sectionFontColor,
                                    overflow: "hidden",
                                    height: 37
                                } : {overflow: "hidden", height: 37}}>
                                    <ButtonUi
                                        borderRadius={0}
                                        margin={'5px  10px 0 0'}
                                        padding={'5px 15px'}
                                        variant={'contained'}
                                        width={'auto'}
                                        height={'auto'}
                                        label={<Translate name={'advanced search'}/>}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <div style={this.props.sectionFontColor ? {
                                    color: this.props.sectionFontColor,
                                    overflow: "hidden",
                                    height: 37
                                } : {overflow: "hidden", height: 37}}>
                                    <SwitchesUi
                                        mBottom={0}
                                        label={'Image'}
                                        name={'image'}
                                        color={"primary"}
                                        value={this.props.advancedSearchConfig.image}
                                        onChange={event => this.changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                                <div style={this.props.sectionFontColor ? {
                                    color: this.props.sectionFontColor,
                                    overflow: "hidden",
                                    height: 37
                                } : {overflow: "hidden", height: 37}}>
                                    <SwitchesUi
                                        mBottom={0}
                                        label={'active'}
                                        name={'hasActive'}
                                        color={"primary"}
                                        value={this.props.advancedSearchConfig.hasActive}
                                        onChange={event => this.changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                                <div style={this.props.sectionFontColor ? {
                                    color: this.props.sectionFontColor,
                                    overflow: "hidden",
                                    height: 37
                                } : {overflow: "hidden", height: 37}}>
                                    <SwitchesUi
                                        mBottom={0}
                                        label={'suppliers'}
                                        name={'hasSuppliers'}
                                        color={"primary"}
                                        value={this.props.advancedSearchConfig.hasSuppliers}
                                        onChange={event => this.changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col md={4} className='pb-2'>
                                <TextFields
                                    type={'search'}
                                    label={<><SearchIcon/><Translate name={'search'}/></>}
                                    name={'searchProduct'}
                                    value={this.props.advancedSearchText}
                                    onChange={event => this.writeSearchText(event.target.value)}
                                />
                            </Col>
                            <Col md={12}>
                                <AdvancedSearch
                                    isOpen={this.state.isOpen}
                                    sectionFontColor={this.props.sectionFontColor}
                                    advancedSearchText={this.props.advancedSearchText}
                                    addSearchText={this.props.addSearchText}
                                    searchItemsKey={this.props.searchProduct}
                                    removeSelectedClassifier={this.props.removeSelectedClassifier}
                                    toggleSwitchValue={this.props.toggleSwitchValue}
                                    toggleCheckBoxValue={this.props.toggleCheckBoxValue}
                                    changePageSize={this.props.changePageSize}
                                    createError={this.props.createError}
                                    classifiersModal={this.props.classifiersModal}
                                    advancedSearchConfig={this.props.advancedSearchConfig}
                                    groups={this.props.groups}
                                    group={this.props.group}
                                    classifiersToggleModal={this.props.classifiersToggleModal}
                                    subGroups={this.props.subGroups}
                                    selectClassifiersGroup={this.props.selectClassifiersGroup}
                                    createClassifiers={this.props.createClassifiers}
                                    selectGroupsNode={this.props.selectGroupsNode}
                                    buttonName={'Advanced search'}
                                />
                            </Col>
                        </Row>
                        <Table bordered responsive className={`mt-3 ${cls.myTable}`}>
                            <thead>
                            <tr style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                <th>
                                    {
                                        !this.state.searchConfig.sku ?
                                            <span style={{cursor: "pointer"}}
                                                  onClick={this.searchAreaToggle.bind(this, 'sku')}>
                                        <Translate name={'sku'}/>
                                    </span>
                                            :
                                            <>
                                                <div className="d-flex">
                                                    <TextFields
                                                        label={<Translate name={'sku'}/>}
                                                        type={'search'}
                                                        value={this.props.searchProduct.sku}
                                                        name={'sku'}
                                                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <ButtonUi
                                                        onClick={this.searchAreaClose.bind(this, 'sku')}
                                                    >
                                                        <CloseIcon fontSize='small'/>
                                                    </ButtonUi>
                                                </div>
                                                {
                                                    this.props.searchErrorName === 'sku' ?
                                                        <span className="info font-small-1">
                                                    <Icon.AlertCircle size={15} className="danger mr-1"/>
                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </th>
                                <th>
                                    {
                                        !this.state.searchConfig.name ?
                                            <span style={{cursor: "pointer"}}
                                                  onClick={this.searchAreaToggle.bind(this, 'name')}>
                                        <Translate name={'name'}/>
                                    </span>
                                            :
                                            <>
                                                <div className="d-flex">
                                                    <TextFields
                                                        label={<Translate name={'name'}/>}
                                                        type={'search'}
                                                        value={this.props.searchProduct.name}
                                                        name={'name'}
                                                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <ButtonUi
                                                        onClick={this.searchAreaClose.bind(this, 'name')}
                                                    >
                                                        <CloseIcon fontSize='small'/>
                                                    </ButtonUi>
                                                </div>
                                                {
                                                    this.props.searchErrorName === 'name' ?
                                                        <span className="info font-small-1">
                                                    <Icon.AlertCircle size={15} className="danger mr-1"/>
                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </th>
                                <th>
                                    {
                                        !this.state.searchConfig.suppliers ?
                                            <span style={{cursor: "pointer"}}
                                                  onClick={this.searchAreaToggle.bind(this, 'suppliers')}>
                                        <Translate name={'suppliers'}/>
                                    </span>
                                            :
                                            <>
                                                <div className="d-flex">
                                                    <TextFields
                                                        label={<Translate name={'suppliers'}/>}
                                                        type={'search'}
                                                        value={this.props.searchProduct.suppliers}
                                                        name={'suppliers'}
                                                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <ButtonUi
                                                        onClick={this.searchAreaClose.bind(this, 'suppliers')}
                                                    >
                                                        <CloseIcon fontSize='small'/>
                                                    </ButtonUi>
                                                </div>
                                                {
                                                    this.props.searchErrorName === 'suppliers' ?
                                                        <span className="info font-small-1">
                                                    <Icon.AlertCircle size={15} className="danger mr-1"/>
                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </th>
                                <th>
                                    {
                                        !this.state.searchConfig.barcode ?
                                            <span style={{cursor: "pointer"}}
                                                  onClick={this.searchAreaToggle.bind(this, 'barcode')}>
                                        <Translate name={'barcode'}/>
                                    </span>
                                            :
                                            <>
                                                <div className="d-flex">
                                                    <TextFields
                                                        label={<Translate name={'barcode'}/>}
                                                        type={'search'}
                                                        value={this.props.searchProduct.barcode}
                                                        name={'barcode'}
                                                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <ButtonUi
                                                        onClick={this.searchAreaClose.bind(this, 'barcode')}
                                                    >
                                                        <CloseIcon fontSize='small'/>
                                                    </ButtonUi>
                                                </div>
                                                {
                                                    this.props.searchErrorName === 'barcode' ?
                                                        <span className="info font-small-1">
                                                    <Icon.AlertCircle size={15} className="danger mr-1"/>
                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </th>
                                <th>
                                    {
                                        !this.state.searchConfig.description ?
                                            <span style={{cursor: "pointer"}}
                                                  onClick={this.searchAreaToggle.bind(this, 'description')}>
                                        <Translate name={'description'}/>
                                    </span>
                                            :
                                            <>
                                                <div className='d-flex'>
                                                    <TextFields
                                                        label={<Translate name={'description'}/>}
                                                        type={'search'}
                                                        value={this.props.searchProduct.description}
                                                        name={'description'}
                                                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <ButtonUi
                                                        onClick={this.searchAreaClose.bind(this, 'description')}
                                                    >
                                                        <CloseIcon fontSize='small'/>
                                                    </ButtonUi>
                                                </div>
                                                {
                                                    this.props.searchErrorName === 'description' ?
                                                        <span className="info font-small-1">
                                                    <Icon.AlertCircle size={15} className="danger mr-1"/>
                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </th>
                                <th>
                                    <Translate name={'active'}/>
                                </th>
                                {
                                    this.props.editabledStatus ?
                                        <th><Translate name={'e/d'}/></th>
                                        :
                                        null
                                }
                            </tr>
                            </thead>
                            <tbody style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                            {
                                this.props.data ?
                                    this.props.searchProductResult.length ?
                                        this.props.searchProductResult.map(
                                            product => {

                                                return (
                                                    <tr
                                                        key={product.id}
                                                    >
                                                        <td style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                                            {
                                                                product.sku ?
                                                                    product.sku
                                                                    :
                                                                    '-'
                                                            }
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>-</td>
                                                        <td>
                                                            {
                                                                product.barcode ?
                                                                    <Tooltip title={
                                                                        product.barcode.map(
                                                                            item => <React.Fragment
                                                                                key={item.id}>{item.barcode}<br/></React.Fragment>
                                                                        )
                                                                    } placement="right">
                                                                    <span className='mr-1'>
                                                                    {product.barcode[0].barcode}
                                                                </span>
                                                                    </Tooltip>
                                                                    :
                                                                    '-'
                                                            }
                                                        </td>
                                                        <td>-</td>
                                                        <td>
                                                            {
                                                                product.active ?
                                                                    <Translate name={'active'}/>
                                                                    :
                                                                    <Translate name={'inactive'}/>
                                                            }
                                                        </td>
                                                        {
                                                            this.props.editabledStatus ?
                                                                <>
                                                                    <td>
                                                                        <EditButton
                                                                            styles={'#444 !important'}
                                                                            perm={'Edit'}
                                                                            onClick={this.onEditHandler.bind(this, product)}
                                                                        />
                                                                        <DeleteButton
                                                                            perm={'Delete'}
                                                                            onClick={this.onDeleteHandler.bind(this, product.id)}
                                                                        />
                                                                    </td>
                                                                </>
                                                                :
                                                                null
                                                        }
                                                    </tr>
                                                )
                                            }
                                        )
                                        :
                                        this.props.data.map(
                                            product => {

                                                return (
                                                    <tr
                                                        key={product.id}
                                                    >
                                                        <td>
                                                            {
                                                                product.sku ?
                                                                    product.sku
                                                                    :
                                                                    '-'
                                                            }
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>-</td>
                                                        <td>
                                                            {
                                                                product.barcode ?
                                                                    <Tooltip title={
                                                                        product.barcode.map(
                                                                            item => <React.Fragment
                                                                                key={item.id}>{item.barcode}<br/></React.Fragment>
                                                                        )
                                                                    } placement="right">
                                                                    <span className='mr-1'>
                                                                    {product.barcode[0].barcode}
                                                                </span>
                                                                    </Tooltip>
                                                                    :
                                                                    '-'
                                                            }
                                                        </td>
                                                        <td>-</td>
                                                        <td>
                                                            {
                                                                product.active ?
                                                                    <Translate name={'active'}/>
                                                                    :
                                                                    <Translate name={'inactive'}/>
                                                            }
                                                        </td>
                                                        {
                                                            this.props.editabledStatus ?
                                                                <>
                                                                    <td>
                                                                        <EditButton
                                                                            styles={'#444 !important'}
                                                                            perm={'Edit'}
                                                                            onClick={this.onEditHandler.bind(this, product)}
                                                                        />
                                                                        <DeleteButton
                                                                            perm={'Delete'}
                                                                            onClick={this.onDeleteHandler.bind(this, product.id)}
                                                                        />
                                                                    </td>
                                                                </>
                                                                :
                                                                null
                                                        }
                                                    </tr>
                                                )
                                            }
                                        )
                                    :
                                    null
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        );
    }
}