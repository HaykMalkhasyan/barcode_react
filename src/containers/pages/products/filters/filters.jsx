import React, {Component} from 'react'
import classes from './filters.module.css'
import {Grid} from "@material-ui/core"
import ClassifiersTree from "./classifiersTree/classifiersTree"
import SearchWindow from "./searchWindow/searchWindow"
import {connect} from "react-redux";
import {
    addGroup,
    checkGroup,
    closeClassifiers,
    getAllGroup,
    getOnlySubgroupWithGroupId,
    getSubgroupWithGroupId,
    openClassifiers,
    openModalContent,
    setGroupValues
} from "../../../../Redux/characteristics/actions";
import ModalUI from "../../../../components/modalUI/modalUI";
import {
    classifiersFiltered,
    closeProductActionModal,
    importGroupInProduct,
    measurementFiltered,
    otherFiltered,
    setProductValues
} from "../../../../Redux/products/actions";
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

    classifierOpenHandler = id => {
        this.props.getAllGroup();
        this.props.openClassifiers(id);
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
                            classifiersFiltered={this.props.classifiersFiltered}
                        />
                        <CollapsedFilters
                            measurements={this.props.measurements}
                            // Methods
                            measurementFiltered={this.props.measurementFiltered}
                        />
                        <OtherFilters
                            otherFilters={this.props.otherFilters}
                            // Methods
                            otherFiltered={this.props.otherFiltered}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} lg={9} xl={9}>
                        {this.contentRender()}
                    </Grid>
                </Grid>
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
                        classifierCloseHandler={this.props.closeClassifiers}
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
        measurements: state.products.measurements,
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
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getSubgroupWithGroupId: (id, place) => dispatch(getSubgroupWithGroupId(id, place)),
        importGroupInProduct: (condition, status) => dispatch(importGroupInProduct(condition, status)),
        closeClassifiers: () => dispatch(closeClassifiers()),
        openClassifiers: id => dispatch(openClassifiers(id)),
        openModalContent: item => dispatch(openModalContent(item)),
        checkGroup: (type, item, id, place, index) => dispatch(checkGroup(type, item, id, place, index)),
        measurementFiltered: selected => dispatch(measurementFiltered(selected)),
        otherFiltered: (name, value) => dispatch(otherFiltered(name, value)),
        classifiersFiltered: classifier => dispatch(classifiersFiltered(classifier)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)