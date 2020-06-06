import React, {useState} from "react";
import {Col, Row} from "reactstrap";
import Translate from "../../../../../../../Translate";
import ButtonUi from "../../../../../../../components/buttons/buttonUi";
import CloseIcon from "@material-ui/icons/Close";
import TextFields from "../../../../../../../components/textFieldUI/textField";
import Tooltip from "@material-ui/core/Tooltip";
import EditButton from "../../../../../../../components/buttons/editButton";
import DeleteButton from "../../../../../../../components/buttons/deleteButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SwitchesUi from "../../../../../../../components/switchUI/switchUI";

const TableType = props => {
    const [searchConfig, setSearchConfig] = useState({
        sku: false,
        name: false,
        suppliers: false,
        barcode: false,
        description: false,
    })

    const searchAreaToggle = (name, searchConf) => {
        const searchConfigCopy = {...searchConf}
        Object.keys(searchConfigCopy).forEach(
            key => searchConfigCopy[key] = false
        )
        searchConfigCopy[name] = true;
        setSearchConfig(searchConfigCopy)
    }

    const searchAreaClose = (name, searchConfig) => {
        props.setSearchProductValue('', name);
        let searchConfigCopy = {...searchConfig};
        searchConfigCopy[name] = false
        setSearchConfig(searchConfigCopy)
    }

    const searchProductHandler = (value, name) => {
        props.setSearchProductValue(value, name)
    }

    const onEditHandler = product => {
        props.toggleModal('edit', product.id)
        props.actions('get', product)
    }

    const onDeleteHandler = product => {
        props.toggleModal('delete', product.id);
        props.actions('get', product)
    }

    return (
        <div style={{overflowX: 'auto', width: '100%'}}>
            <Row style={{minWidth: 996, margin: 0}}>
                <Col md={12}>
                    <Row
                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <Col style={{height: 32}} className='text-center m-0 p-0'>
                            {
                                !searchConfig.sku ?
                                    <b style={{cursor: "pointer"}}
                                       onClick={searchAreaToggle.bind(this, 'sku', searchConfig)}>
                                        <Translate name={'sku'}/>
                                    </b>
                                    :
                                    <>
                                        <div className="d-flex justify-content-center">
                                            <ButtonUi
                                                onClick={searchAreaClose.bind(this, 'sku', searchConfig)}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </ButtonUi>
                                            <TextFields
                                                // label={<Translate name={'sku'}/>}
                                                type={'search'}
                                                value={props.searchProduct.sku}
                                                name={'sku'}
                                                onChange={event => searchProductHandler(event.target.value, event.target.name)}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </div>
                                        {
                                            props.searchErrorName === 'sku' ?
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
                                !searchConfig.name ?
                                    <b style={{cursor: "pointer"}}
                                       onClick={searchAreaToggle.bind(this, 'name', searchConfig)}>
                                        <Translate name={'name'}/>
                                    </b>
                                    :
                                    <>
                                        <div className="d-flex">
                                            <ButtonUi
                                                onClick={searchAreaClose.bind(this, 'name', searchConfig)}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </ButtonUi>
                                            <TextFields
                                                // label={<Translate name={'name'}/>}
                                                type={'search'}
                                                value={props.searchProduct.name}
                                                name={'name'}
                                                onChange={event => searchProductHandler(event.target.value, event.target.name)}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </div>
                                        {
                                            props.searchErrorName === 'name' ?
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
                                !searchConfig.suppliers ?
                                    <b style={{cursor: "pointer"}}
                                       onClick={searchAreaToggle.bind(this, 'suppliers', searchConfig)}>
                                        <Translate name={'suppliers'}/>
                                    </b>
                                    :
                                    <>
                                        <div className="d-flex">
                                            <ButtonUi
                                                onClick={searchAreaClose.bind(this, 'suppliers', searchConfig)}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </ButtonUi>
                                            <TextFields
                                                // label={<Translate name={'suppliers'}/>}
                                                type={'search'}
                                                value={props.searchProduct.suppliers}
                                                name={'suppliers'}
                                                onChange={event => searchProductHandler(event.target.value, event.target.name)}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </div>
                                        {
                                            props.searchErrorName === 'suppliers' ?
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
                                !searchConfig.barcode ?
                                    <b style={{cursor: "pointer"}}
                                       onClick={searchAreaToggle.bind(this, 'barcode', searchConfig)}>
                                        <Translate name={'barcode'}/>
                                    </b>
                                    :
                                    <>
                                        <div className="d-flex">
                                            <ButtonUi
                                                onClick={searchAreaClose.bind(this, 'barcode', searchConfig)}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </ButtonUi>
                                            <TextFields
                                                // label={<Translate name={'barcode'}/>}
                                                type={'search'}
                                                value={props.searchProduct.barcode}
                                                name={'barcode'}
                                                onChange={event => searchProductHandler(event.target.value, event.target.name)}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </div>
                                        {
                                            props.searchErrorName === 'barcode' ?
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
                                !searchConfig.description ?
                                    <b style={{cursor: "pointer"}}
                                       onClick={searchAreaToggle.bind(this, 'description', searchConfig)}>
                                        <Translate name={'description'}/>
                                    </b>
                                    :
                                    <>
                                        <div className='d-flex'>
                                            <ButtonUi
                                                onClick={searchAreaClose.bind(this, 'description', searchConfig)}
                                            >
                                                <CloseIcon fontSize='small'/>
                                            </ButtonUi>
                                            <TextFields
                                                // label={<Translate name={'description'}/>}
                                                type={'search'}
                                                value={props.searchProduct.description}
                                                name={'description'}
                                                onChange={event => searchProductHandler(event.target.value, event.target.name)}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </div>
                                        {
                                            props.searchErrorName === 'description' ?
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
                            props.editabledStatus ?
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
                    props.data && props.data.length > 0 ?
                        props.searchProductResult.length ?
                            props.searchProductResult.map(
                                product => {

                                    return (

                                        <Col md={12} key={product.id}>
                                            <Row
                                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.sku ?
                                                            product.sku
                                                            :
                                                            '-'
                                                    }
                                                </Col>
                                                <Col className='text-center py-1'>{product.name}</Col>
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.supplier ?
                                                            <span>
                                                                                {product.supplier.name}
                                                                            </span>
                                                            :
                                                            '-'
                                                    }
                                                </Col>
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.barcode.length ?
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
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.description ?
                                                            product.description.length > 10 ?
                                                                <Tooltip title={product.description}>
                                                                    <span>
                                                                        {`${product.description.slice(0, 10)}...`}
                                                                    </span>
                                                                </Tooltip>
                                                                :
                                                                <span>
                                                                    {product.description}
                                                                </span>
                                                            :
                                                            '-'
                                                    }
                                                </Col>
                                                <Col className='text-center py-1'>
                                                    <SwitchesUi
                                                        size='small'
                                                        mBottom={0}
                                                        name={'hasSuppliers'}
                                                        color={"primary"}
                                                        value={product.active}
                                                        // onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                                                    />
                                                    {/*{*/}
                                                    {/*    product.active ?*/}
                                                    {/*        <Translate name={'active'}/>*/}
                                                    {/*        :*/}
                                                    {/*        <Translate name={'inactive'}/>*/}
                                                    {/*}*/}
                                                </Col>
                                                {
                                                    props.editabledStatus ?
                                                        <Col xs={1} className='text-center py-1'>
                                                            <EditButton
                                                                styles={'#444 !important'}
                                                                perm={'Edit'}
                                                                onClick={onEditHandler.bind(this, product)}
                                                            />
                                                            <DeleteButton
                                                                perm={'Delete'}
                                                                onClick={onDeleteHandler.bind(this, product)}
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
                            props.data.map(
                                product => {

                                    return (
                                        <Col md={12} key={product.id}>
                                            <Row
                                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.sku ?
                                                            product.sku
                                                            :
                                                            '-'
                                                    }
                                                </Col>
                                                <Col className='text-center py-1'>{product.name}</Col>
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.supplier ?
                                                            <span>
                                                                {product.supplier.name}
                                                            </span>
                                                            :
                                                            '-'
                                                    }
                                                </Col>
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
                                                <Col className='text-center py-1'>
                                                    {
                                                        product.description ?
                                                            product.description.length > 10 ?
                                                                <Tooltip title={product.description}>
                                                                    <span>
                                                                        {`${product.description.slice(0, 10)}...`}
                                                                    </span>
                                                                </Tooltip>
                                                                :
                                                                <span>
                                                                    {product.description}
                                                                </span>
                                                            :
                                                            '-'
                                                    }
                                                </Col>
                                                <Col className='text-center py-1'>
                                                    <SwitchesUi
                                                        size='small'
                                                        mBottom={0}
                                                        name={'hasSuppliers'}
                                                        color={"primary"}
                                                        value={product.active}
                                                        // onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                                                    />
                                                    {/*{*/}
                                                    {/*    product.active ?*/}
                                                    {/*        */}
                                                    {/*        // <FiberManualRecordIcon style={{ color: 'green', fontSize: 12 }}/>*/}
                                                    {/*        // <Translate name={'active'}/>*/}
                                                    {/*        :*/}
                                                    {/*        <SwitchesUi*/}
                                                    {/*            mBottom={0}*/}
                                                    {/*            label={'suppliers'}*/}
                                                    {/*            name={'hasSuppliers'}*/}
                                                    {/*            color={"primary"}*/}
                                                    {/*            value={props.advancedSearchConfig.hasSuppliers}*/}
                                                    {/*            onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}*/}
                                                    {/*        />*/}
                                                    {/*        // <FiberManualRecordIcon style={{ color: 'red', fontSize: 12 }}/>*/}
                                                    {/*    // <Translate name={'inactive'}/>*/}
                                                    {/*}*/}
                                                </Col>
                                                {
                                                    props.editabledStatus ?
                                                        <Col xs={1} className='text-center py-1'>
                                                            <EditButton
                                                                styles={'#444 !important'}
                                                                perm={'Edit'}
                                                                onClick={onEditHandler.bind(this, product)}
                                                            />
                                                            <DeleteButton
                                                                perm={'Delete'}
                                                                onClick={onDeleteHandler.bind(this, product)}
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
    )
}

export default TableType