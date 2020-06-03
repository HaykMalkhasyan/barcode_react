import React from "react";
import cls from './productTable.module.css'
import {Col, Row, Table} from "reactstrap";
import Translate from "../../../Translate";
import Tooltip from '@material-ui/core/Tooltip';
import AdvancedSearch from "./searchGroup/advancedSearch/advancedSearch";
import classes from "../group/content.module.css";
import BuildIcon from "@material-ui/icons/Build";
import ButtonUi from "../../../components/buttons/buttonUi";
import TextFields from "../../../components/textFieldUI/textField";
import CloseIcon from '@material-ui/icons/Close';
import ClassifiersModal from "./searchGroup/classifiersModal/classifiersModal";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SwitchesUi from "../../../components/switchUI/switchUI";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import CustomizedSnackbars from "../../../components/snachbarsUI/snachbarsUi";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {
    state = {
        searchConfig: {
            sku: false,
            name: false,
            suppliers: false,
            barcode: false,
            description: false,
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.addProductStatus(false, null, null)
    };

    onEditHandler = product => {
        this.props.toggleModal('edit', product.id)
        this.props.actions('get', product)
    }

    onDeleteHandler = product => {
        this.props.toggleModal('delete', product.id);
        this.props.actions('get', product)
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
                <Row className='mt-0'>

                    <Col md={12} xl={12}>
                        <Row className='my-0'>
                            <Col md={8} className='d-flex' style={{alignItems: 'flex-end', flexWrap: 'wrap'}}>
                                <div className={cls.btnWrap} style={this.props.sectionFontColor ? {
                                    color: this.props.sectionFontColor,
                                    overflow: "hidden",
                                    height: 37
                                } : {overflow: "hidden", height: 37}}>
                                    {/*<ButtonUi*/}
                                    {/*    borderRadius={0}*/}
                                    {/*    margin={'5px  10px 0 0'}*/}
                                    {/*    padding={'5px 15px'}*/}
                                    {/*    variant={'contained'}*/}
                                    {/*    width={'auto'}*/}
                                    {/*    height={'auto'}*/}
                                    {/*    label={<Translate name={'advanced search'}/>}*/}
                                    {/*    onClick={this.toggle}*/}
                                    {/*/>*/}
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
                                } : {overflow: "hidden", height: 37}}
                                >
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
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Row>
                            <Col
                                md={4} xl={3}
                            >
                                <ClassifiersModal
                                    subGroupCollapses={this.props.subGroupCollapses}
                                    collapsedStatus={this.props.collapsedStatus}
                                    sectionFontColor={this.props.sectionFontColor}
                                    toggleCheckBoxValue={this.props.toggleCheckBoxValue}
                                    groups={this.props.groups}
                                    group={this.props.group}
                                    createError={this.props.createError}
                                    classifiersToggleModal={this.props.classifiersToggleModal}
                                    subGroups={this.props.subGroups}
                                    classifiersModal={this.props.classifiersModal}
                                    selectClassifiersGroup={this.props.selectClassifiersGroup}
                                    selectGroupsNode={this.props.selectGroupsNode}
                                    createClassifiers={this.props.createClassifiers}
                                    advancedSearchConfig={this.props.advancedSearchConfig}
                                />

                                {
                                    this.props.advancedSearchConfig.classifiers ?
                                        this.props.advancedSearchConfig.classifiers.length ?
                                            this.props.advancedSearchConfig.classifiers.map(
                                                item => {

                                                    return (
                                                        <p key={item.id}>
                                                            {item.name}
                                                            <ButtonUi
                                                                onClick={this.props.removeSelectedClassifier.bind(this, item)}
                                                            >
                                                                <CloseIcon fontSize={'small'}/>
                                                            </ButtonUi>
                                                        </p>
                                                    )
                                                }
                                            )
                                            :
                                            null
                                        :
                                        null
                                }
                            </Col>
                            <Col md={6} xl={7}>
                                <AdvancedSearch
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
                            <Col
                                md={2}
                                className='d-flex'
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <ButtonUi
                                    width={'50px'}
                                    height={'50px'}
                                    borderRadius={'50%'}
                                    margin={'0'}
                                    padding={'0'}
                                    textAlign={'center'}
                                    color={'primary'}
                                    variant='contained'
                                >
                                    <ArrowForwardIosIcon fontSize={'small'}/>
                                </ButtonUi>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <div style={{overflowX: 'auto', width: '100%'}}>
                            <Row style={{minWidth: 996, margin: 0}}>
                                <Col md={12}>
                                    <Row
                                        style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            {
                                                !this.state.searchConfig.sku ?
                                                    <b style={{cursor: "pointer"}}
                                                       onClick={this.searchAreaToggle.bind(this, 'sku')}>
                                                        <Translate name={'sku'}/>
                                                    </b>
                                                    :
                                                    <>
                                                        <div className="d-flex justify-content-center">
                                                            <ButtonUi
                                                                onClick={this.searchAreaClose.bind(this, 'sku')}
                                                            >
                                                                <CloseIcon fontSize='small'/>
                                                            </ButtonUi>
                                                            <TextFields
                                                                // label={<Translate name={'sku'}/>}
                                                                type={'search'}
                                                                value={this.props.searchProduct.sku}
                                                                name={'sku'}
                                                                onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            this.props.searchErrorName === 'sku' ?
                                                                <span className="info font-small-1">
                                                    {/*<Icon.AlertCircle size={15} className="danger mr-1"/>*/}
                                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </Col>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            {
                                                !this.state.searchConfig.name ?
                                                    <b style={{cursor: "pointer"}}
                                                       onClick={this.searchAreaToggle.bind(this, 'name')}>
                                                        <Translate name={'name'}/>
                                                    </b>
                                                    :
                                                    <>
                                                        <div className="d-flex">
                                                            <ButtonUi
                                                                onClick={this.searchAreaClose.bind(this, 'name')}
                                                            >
                                                                <CloseIcon fontSize='small'/>
                                                            </ButtonUi>
                                                            <TextFields
                                                                // label={<Translate name={'name'}/>}
                                                                type={'search'}
                                                                value={this.props.searchProduct.name}
                                                                name={'name'}
                                                                onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            this.props.searchErrorName === 'name' ?
                                                                <span className="info font-small-1">
                                                    {/*<Icon.AlertCircle size={15} className="danger mr-1"/>*/}
                                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </Col>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            {
                                                !this.state.searchConfig.suppliers ?
                                                    <b style={{cursor: "pointer"}}
                                                       onClick={this.searchAreaToggle.bind(this, 'suppliers')}>
                                                        <Translate name={'suppliers'}/>
                                                    </b>
                                                    :
                                                    <>
                                                        <div className="d-flex">
                                                            <ButtonUi
                                                                onClick={this.searchAreaClose.bind(this, 'suppliers')}
                                                            >
                                                                <CloseIcon fontSize='small'/>
                                                            </ButtonUi>
                                                            <TextFields
                                                                // label={<Translate name={'suppliers'}/>}
                                                                type={'search'}
                                                                value={this.props.searchProduct.suppliers}
                                                                name={'suppliers'}
                                                                onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            this.props.searchErrorName === 'suppliers' ?
                                                                <span className="info font-small-1">
                                                    {/*<Icon.AlertCircle size={15} className="danger mr-1"/>*/}
                                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </Col>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            {
                                                !this.state.searchConfig.barcode ?
                                                    <b style={{cursor: "pointer"}}
                                                       onClick={this.searchAreaToggle.bind(this, 'barcode')}>
                                                        <Translate name={'barcode'}/>
                                                    </b>
                                                    :
                                                    <>
                                                        <div className="d-flex">
                                                            <ButtonUi
                                                                onClick={this.searchAreaClose.bind(this, 'barcode')}
                                                            >
                                                                <CloseIcon fontSize='small'/>
                                                            </ButtonUi>
                                                            <TextFields
                                                                // label={<Translate name={'barcode'}/>}
                                                                type={'search'}
                                                                value={this.props.searchProduct.barcode}
                                                                name={'barcode'}
                                                                onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            this.props.searchErrorName === 'barcode' ?
                                                                <span className="info font-small-1">
                                                    {/*<Icon.AlertCircle size={15} className="danger mr-1"/>*/}
                                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </Col>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            {
                                                !this.state.searchConfig.description ?
                                                    <b style={{cursor: "pointer"}}
                                                       onClick={this.searchAreaToggle.bind(this, 'description')}>
                                                        <Translate name={'description'}/>
                                                    </b>
                                                    :
                                                    <>
                                                        <div className='d-flex'>
                                                            <ButtonUi
                                                                onClick={this.searchAreaClose.bind(this, 'description')}
                                                            >
                                                                <CloseIcon fontSize='small'/>
                                                            </ButtonUi>
                                                            <TextFields
                                                                // label={<Translate name={'description'}/>}
                                                                type={'search'}
                                                                value={this.props.searchProduct.description}
                                                                name={'description'}
                                                                onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            this.props.searchErrorName === 'description' ?
                                                                <span className="info font-small-1">
                                                    {/*<Icon.AlertCircle size={15} className="danger mr-1"/>*/}
                                                                    <Translate name={'the search returned no result'}/>
                                                </span>
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </Col>
                                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                                            <b>
                                                <Translate name={'active'}/>
                                            </b>
                                        </Col>
                                        {
                                            this.props.editabledStatus ?
                                                <Col xs={1} className='text-center'>
                                                    <b>
                                                        <Translate name={'e/d'}/>
                                                    </b>
                                                </Col>
                                                :
                                                <Col xs={1}/>
                                        }
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <hr style={{borderColor: '#eee'}}/>
                                </Col>
                                    {
                                        this.props.data ?
                                            this.props.searchProductResult.length ?
                                                this.props.searchProductResult.map(
                                                    product => {

                                                        return (

                                                            <Col md={12} key={product.id}>
                                                                <Row style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                                                    <Col className='text-center py-1'>
                                                                        {
                                                                            product.sku ?
                                                                                product.sku
                                                                                :
                                                                                '-'
                                                                        }
                                                                    </Col>
                                                                    <Col className='text-center py-1'>{product.name}</Col>
                                                                    <Col className='text-center py-1'>-</Col>
                                                                    <Col className='text-center py-1'>
                                                                        {
                                                                            product.barcode ?
                                                                                <Tooltip
                                                                                    title={
                                                                                        product.barcode.map(
                                                                                            item => <React.Fragment
                                                                                                key={item.id}
                                                                                            >
                                                                                                {item.barcode}
                                                                                                <br/>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    }
                                                                                    placement="right"
                                                                                >
                                                                                    <span className='mr-1'>
                                                                                        {product.barcode[0].barcode}
                                                                                    </span>
                                                                                </Tooltip>
                                                                                :
                                                                                '-'
                                                                        }
                                                                    </Col>
                                                                    <Col className='text-center py-1'>-</Col>
                                                                    <Col className='text-center py-1'>
                                                                        {
                                                                            product.active ?
                                                                                <Translate name={'active'}/>
                                                                                :
                                                                                <Translate name={'inactive'}/>
                                                                        }
                                                                    </Col>
                                                                    {
                                                                        this.props.editabledStatus ?
                                                                            <Col xs={1} className='text-center py-1'>
                                                                                <EditButton
                                                                                    styles={'#444 !important'}
                                                                                    perm={'Edit'}
                                                                                    onClick={this.onEditHandler.bind(this, product)}
                                                                                />
                                                                                <DeleteButton
                                                                                    perm={'Delete'}
                                                                                    onClick={this.onDeleteHandler.bind(this, product)}
                                                                                />
                                                                            </Col>
                                                                            :
                                                                            <Col xs={1}/>
                                                                    }
                                                                </Row>
                                                            </Col>
                                                        )
                                                    }
                                                )
                                                :
                                                this.props.data.map(
                                                    product => {

                                                        return (
                                                            <Col md={12} key={product.id}>
                                                                <Row style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}>
                                                                        <Col className='text-center py-1'>
                                                                            {
                                                                                product.sku ?
                                                                                    product.sku
                                                                                    :
                                                                                    '-'
                                                                            }
                                                                        </Col>
                                                                        <Col className='text-center py-1'>{product.name}</Col>
                                                                        <Col className='text-center py-1'>-</Col>
                                                                        <Col className='text-center py-1'>
                                                                            {
                                                                                product.barcode ?
                                                                                    product.barcode.length ?
                                                                                        <Tooltip
                                                                                            title={
                                                                                                product.barcode.map(
                                                                                                    item => {

                                                                                                        return (
                                                                                                            <React.Fragment
                                                                                                                key={item.id}>
                                                                                                                {`${item.barcode}`}
                                                                                                                <br/>
                                                                                                            </React.Fragment>
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            placement="right"
                                                                                        >
                                                                        <span className='mr-1'>
                                                                            {
                                                                                product.barcode[0].barcode
                                                                            }
                                                                        </span>
                                                                                        </Tooltip>
                                                                                        :
                                                                                        '-'
                                                                                    :
                                                                                    '-'
                                                                            }
                                                                        </Col>
                                                                        <Col className='text-center py-1'>-</Col>
                                                                        <Col className='text-center py-1'>
                                                                            {
                                                                                product.active ?
                                                                                    <Translate name={'active'}/>
                                                                                    :
                                                                                    <Translate name={'inactive'}/>
                                                                            }
                                                                        </Col>
                                                                        {
                                                                            this.props.editabledStatus ?
                                                                                <Col xs={1} className='text-center py-1'>
                                                                                    <EditButton
                                                                                        styles={'#444 !important'}
                                                                                        perm={'Edit'}
                                                                                        onClick={this.onEditHandler.bind(this, product)}
                                                                                    />
                                                                                    <DeleteButton
                                                                                        perm={'Delete'}
                                                                                        onClick={this.onDeleteHandler.bind(this, product)}
                                                                                    />
                                                                                </Col>
                                                                                :
                                                                                <Col xs={1}/>
                                                                        }
                                                                </Row>
                                                            </Col>
                                                        )
                                                    }
                                                )
                                            :
                                            null
                                    }
                            </Row>
                        </div>
                    </Col>
                </Row>
                {
                    this.props.status && this.props.severity && this.props.text ?
                        <CustomizedSnackbars
                            open={this.props.status}
                            severity={this.props.severity}
                            text={this.props.text}
                            handleClose={this.handleClose}
                        />
                        :
                        null
                }
            </>
        );
    }
}