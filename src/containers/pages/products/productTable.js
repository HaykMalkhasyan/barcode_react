import React from "react";
import cls from './productTable.module.css'
import {Col, Row} from "reactstrap";
import Translate from "../../../Translate";
import AdvancedSearch from "./searchGroup/advancedSearch/advancedSearch";
import classes from "../group/content.module.css";
import BuildIcon from "@material-ui/icons/Build";
import ButtonUi from "../../../components/buttons/buttonUi";
import TextFields from "../../../components/textFieldUI/textField";
import CloseIcon from '@material-ui/icons/Close';
import ClassifiersModal from "./searchGroup/classifiersModal/classifiersModal";
import SearchIcon from "@material-ui/icons/Search";
import SwitchesUi from "../../../components/switchUI/switchUI";
import CustomizedSnackbars from "../../../components/snachbarsUI/snachbarsUi";
import {withRouter} from "react-router-dom";

/*name change example to TableComponent*/

class TableComponent extends React.Component {
    state = {
        active: false,
        isOpen: false,
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

    searchHandler = () => {
        console.log(this.props)
        this.props.history.push('/search')
    }

    handleClick = (item) => {
        if (this.state.isOpen === item.name) {
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: item.name,
                active: item.id
            })
            this.props.selectClassifiersGroup(item)
        }
    }

    classifiersSelectHandler = (event, value, check, name) => {
        event.stopPropagation()
        console.log(name)
        this.props.toggleCheckBoxValue('classifier', check, +value, name)
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
                                    active={this.state.active}
                                    isOpen={this.state.isOpen}
                                    handleClick={this.handleClick}
                                    classifiersSelectHandler={this.classifiersSelectHandler}
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
                                    onClick={this.searchHandler}
                                >
                                    <SearchIcon fontSize={'small'}/>
                                </ButtonUi>
                            </Col>
                        </Row>

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

export default withRouter(TableComponent)