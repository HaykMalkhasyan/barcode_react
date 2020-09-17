import React, {Component} from 'react'
import classes from './filters.module.css'
import {Grid} from "@material-ui/core"
import ClassifiersTree from "../classifiersTree/classifiersTree"
import SearchWindow from "../searchWindow/searchWindow"
import {connect} from "react-redux";
import {
    addGroup,
    addSubgroup, closeAction, closeAndBack, closeClassifiers,
    deleteSubgroup,
    editGroup,
    editGroupSubGroup,
    editSubgroup,
    getAllGroup,
    getGroup,
    getOnlySubgroupWithGroupId,
    getSubgroup,
    getSubgroupWithGroupId, onlyCloseHandler, openAction, openClassifiers,
    searchHandler,
    setGroupValues,
    subCollapsed,
    subCollapsedGroup,
    subGroupCollapses,
    subGroupModalCollapses,
    uploadImage
} from "../../../../../Redux/characteristics/actions";
import ModalUI from "../../../../../components/modalUI/modalUI";
import {importGroupInProduct, setProductValues} from "../../../../../Redux/products/actions";
import ModalContent from "../classificatorModals/modalContent/modalContent";
import ClassifiersActionModals from "../classificatorModals/addClassifiers/classifiersActionModals";
import Classifiers from "../classificatorModals/classifiers/classifiers";
import CollapsedFilters from "./collapsedFilters/collapsedFilters";
import OtherFilters from "./otherFilters/otherFilters";
import CustomSearchWindow from "../searchWindow/customSearchWindow/customSearchWindow";

class Filters extends Component {
    constructor(props) {
        super(props);
        this.props.getAllGroup();
    }

    handleOpen = item => {
        this.props.getGroup(item.id);
        this.props.getSubgroupWithGroupId(item.id);
        this.props.setProductValues('classifiersModal', true);
        this.props.openAction({id: item.id, name: item.name, required_group: item.required_group});
    };

    handleClose = () => {
        this.props.setProductValues('classifiersModal', false);
        this.props.closeAction()
    };

    closeHandler = (type = 'close') => {
        this.props.closeAndBack();

        if (type === 'back') {
            if (this.props.groupType === 'group') {
                this.props.setGroupValues('modalGroup', this.props.initialModalGroup)
            } else {
                this.props.setProductValues('classifiersModal', true)
            }
        } else if (type === 'close') {
            this.props.onlyCloseHandler()
        }
    };

    classifierOpenHandler = id => {
        this.props.getAllGroup();
        this.props.setProductValues('classifiersModal', false);
        this.props.openClassifiers(id);
    };

    classifierCloseHandler = () => {
        this.props.closeClassifiers()
    };

    render() {

        return (
            <div className={classes.filters}>
                <div className={classes.mobileMainSearch}>
                    <CustomSearchWindow/>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={3} xl={3}>
                        <ClassifiersTree
                            // Methods
                            handleOpen={this.handleOpen}
                            classifierOpenHandler={this.classifierOpenHandler}
                        />
                        <CollapsedFilters
                            measurementsFilters={this.props.measurementsFilters}
                        />
                        <OtherFilters
                            otherFilters={this.props.otherFilters}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} lg={9} xl={9}>
                        <SearchWindow/>
                    </Grid>
                </Grid>
                <ModalUI
                    open={this.props.classifiersModal}
                    className={classes.modal}
                    // Methods
                    // handleClose={this.handleClose}
                    handleOpen={this.handleOpen}
                >
                    <ModalContent
                        // Data
                        group={this.props.group}
                        groups={this.props.groups}
                        subgroup={this.props.subgroup}
                        customSubgroup={this.props.customSubgroup}
                        collapsed={this.props.collapsed}
                        controllerId={this.props.controllerId}
                        moveElement={this.props.moveElement}
                        collapsedGroup={this.props.collapsedGroup}
                        newGroup={this.props.newGroup}
                        delete={this.props.delete}
                        newSubgroup={this.props.newSubgroup}
                        search={this.props.search}
                        searchResult={this.props.searchResult}
                        changePositionStatus={this.props.changePositionStatus}
                        groupId={this.props.groupId}
                        // Methods
                        subCollapsed={this.props.subCollapsed}
                        subCollapsedGroup={this.props.subCollapsedGroup}
                        setGroupValues={this.props.setGroupValues}
                        handleClose={this.handleClose}
                        handleOpen={this.handleOpen}
                        classifierOpenHandler={this.classifierOpenHandler}
                        getSubgroup={this.props.getSubgroup}
                        getGroup={this.props.getGroup}
                        editSubgroup={this.props.editSubgroup}
                        searchHandler={this.props.searchHandler}
                        setProductValues={this.props.setProductValues}
                        deleteSubgroup={this.props.deleteSubgroup}
                        editGroup={this.props.editGroup}
                        editGroupSubGroup={this.props.editGroupSubGroup}
                    />
                </ModalUI>
                <ModalUI
                    open={this.props.modalType === 'add' || this.props.modalType === 'edit'}
                    className={classes.actionModal}
                    // Methods
                    // handleClose={this.closeHandler}
                >
                    <ClassifiersActionModals
                        modalType={this.props.modalType}
                        newGroup={this.props.newGroup}
                        newSubgroup={this.props.newSubgroup}
                        groupType={this.props.groupType}
                        subgroup={this.props.subgroup}
                        customSubgroup={this.props.customSubgroup}
                        group={this.props.group}
                        error={this.props.error}
                        collapsedModalStatus={this.props.collapsedModalStatus}
                        controllerId={this.props.controllerId}
                        collapsed={this.props.collapsed}
                        // Methods
                        setGroupValues={this.props.setGroupValues}
                        setProductValues={this.props.setProductValues}
                        uploadImage={this.props.uploadImage}
                        addSubgroup={this.props.addSubgroup}
                        editSubgroup={this.props.editSubgroup}
                        addGroup={this.props.addGroup}
                        editGroup={this.props.editGroup}
                        subGroupModalCollapses={this.props.subGroupModalCollapses}
                        closeHandler={this.closeHandler}
                    />
                </ModalUI>
                <ModalUI
                    open={this.props.modalGroup !== null}
                    className={classes.modalGroup}
                    // Methods
                    // handleClose={this.classifierCloseHandler}
                >
                    <Classifiers
                        type={this.props.modalGroup}
                        groups={this.props.groups}
                        groupActiveId={this.props.groupActiveId}
                        newGroup={this.props.newGroup}
                        classifiersSearch={this.props.classifiersSearch}
                        touched={this.props.touched}
                        allError={this.props.allError}
                        initialOpen={this.props.initialOpen}
                        classifiers={this.props.classifiers}
                        initialModalGroup={this.props.initialModalGroup}
                        // Methods
                        classifierCloseHandler={this.classifierCloseHandler}
                        handleOpen={this.handleOpen}
                        getGroup={this.props.getGroup}
                        setProductValues={this.props.setProductValues}
                        setGroupValues={this.props.setGroupValues}
                        importGroupInProduct={this.props.importGroupInProduct}
                        getOnlySubgroupWithGroupId={this.props.getOnlySubgroupWithGroupId}
                        editModalHandleOpen={this.handleOpen}
                    />
                </ModalUI>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        initialOpen: state.products.initialOpen,
        initialModalGroup: state.characteristics.initialModalGroup,
        classifiers: state.products.classifiers,
        classifiersModal: state.products.classifiersModal,
        measurementsFilters: state.products.measurementsFilters,
        otherFilters: state.products.otherFilters,
        group: state.characteristics.group,
        allError: state.characteristics.allError,
        groups: state.characteristics.groups,
        customSubgroup: state.characteristics.customSubgroup,
        collapsed: state.characteristics.collapsed,
        moveElement: state.characteristics.moveElement,
        collapsedGroup: state.characteristics.collapsedGroup,
        subgroup: state.characteristics.subgroup,
        search: state.characteristics.search,
        searchResult: state.characteristics.searchResult,
        changePositionStatus: state.characteristics.changePositionStatus,
        groupId: state.characteristics.groupId,
        prevGroup: state.characteristics.prevGroup,
        nextGroup: state.characteristics.nextGroup,
        indexKey: state.characteristics.indexKey,
        changeStatus: state.characteristics.changeStatus,
        controllerId: state.characteristics.controllerId,
        modalType: state.characteristics.modalType,
        newGroup: state.characteristics.newGroup,
        groupType: state.characteristics.groupType,
        error: state.characteristics.error,
        modalGroup: state.characteristics.modalGroup,
        groupActiveId: state.characteristics.groupActiveId,
        delete: state.characteristics.delete,
        collapsedModalStatus: state.characteristics.collapsedModalStatus,
        classifiersSearch: state.characteristics.classifiersSearch,
        touched: state.characteristics.touched,
        newSubgroup: state.characteristics.newSubgroup,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllGroup: () => dispatch(getAllGroup()),
        addGroup: (data) => dispatch(addGroup(data)),
        editGroup: (data) => dispatch(editGroup(data)),
        addSubgroup: data => dispatch(addSubgroup(data)),
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        getGroup: (id, place) => dispatch(getGroup(id, place)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getSubgroupWithGroupId: id => dispatch(getSubgroupWithGroupId(id)),
        subGroupCollapses: id => dispatch(subGroupCollapses(id)),
        getSubgroup: id => dispatch(getSubgroup(id)),
        editSubgroup: data => dispatch(editSubgroup(data)),
        searchHandler: (name, value) => dispatch(searchHandler(name, value)),
        uploadImage: (type, file, data, modalType) => dispatch(uploadImage(type, file, data, modalType)),
        subGroupModalCollapses: id => dispatch(subGroupModalCollapses(id)),
        deleteSubgroup: id => dispatch(deleteSubgroup(id)),
        subCollapsed: id => dispatch(subCollapsed(id)),
        subCollapsedGroup: id => dispatch(subCollapsedGroup(id)),
        editGroupSubGroup: data => dispatch(editGroupSubGroup(data)),
        importGroupInProduct: (condition, status) => dispatch(importGroupInProduct(condition, status)),
        closeClassifiers: () => dispatch(closeClassifiers()),
        openClassifiers: id => dispatch(openClassifiers(id)),
        onlyCloseHandler: () => dispatch(onlyCloseHandler()),
        closeAndBack: () => dispatch(closeAndBack()),
        closeAction: () => dispatch(closeAction()),
        openAction: data => dispatch(openAction(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)