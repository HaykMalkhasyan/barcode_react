import React, {Component} from 'react'
import classes from './filters.module.css'
import {Grid} from "@material-ui/core"
import ClassifiersTree from "./classifiersTree/classifiersTree"
import SearchWindow from "./searchWindow/searchWindow"
import {connect} from "react-redux";
import {
    addGroup,
    addGroupAction,
    addSubgroup,
    addSubgroupAction,
    cancelEditing,
    changeSubgroupName,
    checkGroup,
    closeAction,
    closeClassifiers,
    copyPaste,
    cutPaste,
    deleteAction,
    deleteClassifiersAction,
    deleteModalClose,
    editGroup,
    editGroupAction,
    editSubgroup,
    editSubgroupAction,
    getActionById,
    getAllGroup,
    getOnlySubgroupWithGroupId,
    getSubgroupWithGroupId,
    openClassifiers,
    openModalContent,
    searchHandler,
    selectTreeGroupItem,
    selectTreeItem,
    setGroupValues,
    setMoveAction,
    setMovingStart,
    sortTree,
    startMoveAction,
    subgroupCopy
} from "../../../../Redux/characteristics/actions";
import ModalUI from "../../../../components/modalUI/modalUI";
import {
    closeProductActionModal,
    importGroupInProduct,
    selectSubgroup,
    setProductValues
} from "../../../../Redux/products/actions";
import ModalContent from "./classificatorModals/modalContent/modalContent";
import Classifiers from "./classificatorModals/classifiers/classifiers";
import CollapsedFilters from "./filters/collapsedFilters/collapsedFilters";
import OtherFilters from "./filters/otherFilters/otherFilters";
import CustomSearchWindow from "./searchWindow/customSearchWindow/customSearchWindow";
import LinearSpinner from "../../../../components/UI/spinners/linearSpiner/linearSpinner";
import Products from "./products/products";
import ProductsModal from "./product-modal/product-modal";

class Filters extends Component {
    constructor(props) {
        super(props);
        this.props.getSubgroupWithGroupId(0, "filter_subgroups")
        this.props.getAllGroup();
    }

    handleClose = () => {
        this.props.closeAction()
    };

    classifierOpenHandler = id => {
        this.props.getAllGroup();
        this.props.openClassifiers(id);
    };

    classifierCloseHandler = () => {
        this.props.closeClassifiers()
    };

    componentWillUnmount() {
        this.props.setGroupValues('active', 0)
    }

    contentRender = () => {
        switch (this.props.type) {
            case 'filters':
                return (
                    <SearchWindow/>
                );
            case 'products':
                return (
                    <Products/>
                );
            default: return null;
        }
    }

    render() {

        return (
            <div className={classes.filters}>
                {
                    this.props.progress ?
                        <LinearSpinner
                            progres={classes.progres}
                            barColorPrimary={classes.progresColor}
                        />
                        :
                        null
                }
                <div className={classes.mobileMainSearch}>
                    <CustomSearchWindow/>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={3} xl={3}>
                        <ClassifiersTree
                            // Methods
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
                        {this.contentRender()}
                    </Grid>
                </Grid>
                <ModalUI
                    open={this.props.classifiersModal}
                    className={classes.modal}
                    // Methods
                    // handleClose={this.handleClose}
                    handleOpen={this.props.openModalContent}
                >
                    <ModalContent
                        // Data
                        treeType={"edit"}
                        group={this.props.group}
                        subgroup={this.props.subgroup}
                        classifierName={this.props.classifierName}
                        newGroup={this.props.newGroup}
                        delete={this.props.delete}
                        newSubgroup={this.props.newSubgroup}
                        search={this.props.search}
                        groupId={this.props.groupId}
                        own_subgroups={this.props.own_subgroups}
                        own_status={this.props.own_status}
                        own_select={this.props.own_select}
                        catId={this.props.catId}
                        edit={this.props.edit}
                        add={this.props.add}
                        node={this.props.node}
                        nodeStatus={this.props.nodeStatus}
                        activeAction={this.props.activeAction}
                        subgroupName={this.props.subgroupName}
                        own_move={this.props.own_move}
                        moveElement={this.props.moveElement}
                        buffer={this.props.buffer}
                        /* ------- */
                        // Methods
                        handleClose={this.handleClose}
                        classifierOpenHandler={this.classifierOpenHandler}
                        setGroupValues={this.props.setGroupValues}
                        changeSubgroupName={this.props.changeSubgroupName}
                        editGroupAction={this.props.editGroupAction}
                        deleteClassifiersAction={this.props.deleteClassifiersAction}
                        editSubgroup={this.props.editSubgroup}
                        searchHandler={this.props.searchHandler}
                        deleteAction={this.props.deleteAction}
                        editGroup={this.props.editGroup}
                        selectTreeItem={this.props.selectTreeItem}
                        selectTreeGroupItem={this.props.selectTreeGroupItem}
                        addSubgroupAction={this.props.addSubgroupAction}
                        addSubgroup={this.props.addSubgroup}
                        addGroupAction={this.props.addGroupAction}
                        editSubgroupAction={this.props.editSubgroupAction}
                        deleteModalClose={this.props.deleteModalClose}
                        getActionById={this.props.getActionById}
                        cancelEditing={this.props.cancelEditing}
                        startMoveAction={this.props.startMoveAction}
                        setMoveAction={this.props.setMoveAction}
                        sortTree={this.props.sortTree}
                        selectSubgroup={this.props.selectSubgroup}
                        subgroupCopy={this.props.subgroupCopy}
                        setMovingStart={this.props.setMovingStart}
                        cutPaste={this.props.cutPaste}
                        copyPaste={this.props.copyPaste}
                    />
                </ModalUI>
                <ModalUI
                    open={this.props.modalGroup !== null}
                    className={classes.modalGroup}
                >
                    <Classifiers
                        type={this.props.modalGroup}
                        groups={this.props.groups}
                        groupActiveId={this.props.groupActiveId}
                        classifiersSearch={this.props.classifiersSearch}
                        allError={this.props.allError}
                        initialOpen={this.props.initialOpen}
                        groupsEditMode={this.props.groupsEditMode}
                        groupLoader={this.props.groupLoader}
                        // Methods
                        classifierCloseHandler={this.classifierCloseHandler}
                        editModalHandleOpen={this.props.openModalContent}
                        setGroupValues={this.props.setGroupValues}
                        importGroupInProduct={this.props.importGroupInProduct}
                        checkGroup={this.props.checkGroup}
                        addGroup={this.props.addGroup}
                    />
                </ModalUI>
                <ProductsModal
                    open={this.props.open}
                    modalTabs={this.props.modalTabs}
                    // Methods
                    handleClose={() => {
                        this.props.closeProductActionModal()
                    }}
                />
                {/*<ProductModal*/}
                {/*    root={classes.root}*/}
                {/*    type={this.props.open}*/}
                {/*    scroll={this.props.scrollB}*/}
                {/*    open={this.props.open}*/}
                {/*    paper={classes.paper}*/}
                {/*    modalTabs={this.props.modalTabs}*/}
                {/*    // Methods*/}
                {/*    handleClose={*/}
                {/*        () => {*/}
                {/*            this.props.closeProductActionModal()*/}
                {/*        }*/}
                {/*    }*/}
                {/*/>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        type: state.filters.type,

        initialOpen: state.products.initialOpen,
        initialModalGroup: state.characteristics.initialModalGroup,
        initialStatus: state.characteristics.initialStatus,
        own_id: state.characteristics.own_id,
        groupName: state.characteristics.groupName,
        classifiers: state.products.classifiers,
        classifiersModal: state.characteristics.classifiersModal,
        measurementsFilters: state.products.measurementsFilters,
        otherFilters: state.products.otherFilters,
        progress: state.characteristics.progress,
        allError: state.characteristics.allError,
        groups: state.characteristics.groups,
        customSubgroup: state.characteristics.customSubgroup,
        prevGroup: state.characteristics.prevGroup,
        nextGroup: state.characteristics.nextGroup,
        indexKey: state.characteristics.indexKey,
        changeStatus: state.characteristics.changeStatus,
        modalType: state.characteristics.modalType,
        groupType: state.characteristics.groupType,
        error: state.characteristics.error,
        modalGroup: state.characteristics.modalGroup,
        groupActiveId: state.characteristics.groupActiveId,
        collapsedModalStatus: state.characteristics.collapsedModalStatus,
        classifiersSearch: state.characteristics.classifiersSearch,
        groupLoader: state.characteristics.groupLoader,
        groupsEditMode: state.characteristics.groupsEditMode,
        // Modal content
        classifierName: state.characteristics.classifierName,
        moveElement: state.characteristics.moveElement,
        own_subgroups: state.characteristics.own_subgroups,
        own_status: state.characteristics.own_status,
        own_select: state.characteristics.own_select,
        catId: state.characteristics.catId,
        group: state.characteristics.group,
        subgroup: state.characteristics.subgroup,
        search: state.characteristics.search,
        groupId: state.characteristics.groupId,
        newGroup: state.characteristics.newGroup,
        delete: state.characteristics.delete,
        newSubgroup: state.characteristics.newSubgroup,
        edit: state.characteristics.edit,
        add: state.characteristics.add,
        subgroupName: state.characteristics.subgroupName,
        node: state.characteristics.node,
        nodeStatus: state.characteristics.nodeStatus,
        activeAction: state.characteristics.activeAction,
        own_move: state.characteristics.own_move,
        buffer: state.characteristics.buffer,
        // Products modal
        modalTabs: state.products.modalTabs,
        open: state.products.open,
        scrollB: state.products.scrollB,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        closeProductActionModal: () => dispatch(closeProductActionModal()),

        getAllGroup: () => dispatch(getAllGroup()),
        addGroup: (data) => dispatch(addGroup(data)),
        editGroup: (data, id) => dispatch(editGroup(data, id)),
        addSubgroup: (data, node, ref) => dispatch(addSubgroup(data, node, ref)),
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getSubgroupWithGroupId: (id, place) => dispatch(getSubgroupWithGroupId(id, place)),
        editSubgroup: data => dispatch(editSubgroup(data)),
        searchHandler: (name, value) => dispatch(searchHandler(name, value)),
        deleteAction: (request, id, catId) => dispatch(deleteAction(request, id, catId)),
        importGroupInProduct: (condition, status) => dispatch(importGroupInProduct(condition, status)),
        closeClassifiers: () => dispatch(closeClassifiers()),
        openClassifiers: id => dispatch(openClassifiers(id)),
        closeAction: () => dispatch(closeAction()),
        openModalContent: item => dispatch(openModalContent(item)),
        selectTreeItem: (node, id, path, catId) => dispatch(selectTreeItem(node, id, path, catId)),
        selectTreeGroupItem: id => dispatch(selectTreeGroupItem(id)),
        addSubgroupAction: id => dispatch(addSubgroupAction(id)),
        addGroupAction: (id) => dispatch(addGroupAction(id)),
        editSubgroupAction: () => dispatch(editSubgroupAction()),
        editGroupAction: (value, newGroup) => dispatch(editGroupAction(value, newGroup)),
        deleteClassifiersAction: (type, param, id) => dispatch(deleteClassifiersAction(type, param, id)),
        getActionById: (requestType, memory, param, id) => dispatch(getActionById(requestType, memory, param, id)),
        deleteModalClose: () => dispatch(deleteModalClose()),
        changeSubgroupName: (name, value) => dispatch(changeSubgroupName(name, value)),
        cancelEditing: () => dispatch(cancelEditing()),
        checkGroup: (type, item, id, place, index) => dispatch(checkGroup(type, item, id, place, index)),
        startMoveAction: () => dispatch(startMoveAction()),
        setMoveAction: () => dispatch(setMoveAction()),
        sortTree: (data, ref, catId, node, level) => dispatch(sortTree(data, ref, catId, node, level)),
        selectSubgroup: subgroup => dispatch(selectSubgroup(subgroup)),
        subgroupCopy: (node, act) => dispatch(subgroupCopy(node, act)),
        cutPaste: tree => dispatch(cutPaste(tree)),
        copyPaste: tree => dispatch(copyPaste(tree)),
        setMovingStart: () => dispatch(setMovingStart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)