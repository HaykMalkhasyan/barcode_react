import React, {Component} from 'react'
import classes from './filters.module.css'
import {Grid} from "@material-ui/core"
import ClassifiersTree from "./classifiersTree/classifiersTree"
import SearchWindow from "./searchWindow/searchWindow"
import CustomButton from "../../../../components/UI/button/customButton/customButton"
import LaunchIcon from '@material-ui/icons/Launch'
import CloseIcon from '@material-ui/icons/Close'
import {connect} from "react-redux";
import {
    addGroup,
    addSubgroup, deleteSubgroup, editGroup,
    editSubgroup,
    getAllGroup,
    getAllSubgroup,
    getGroup, getOnlySubgroupWithGroupId,
    getSubgroup,
    getSubgroupWithGroupId,
    searchHandler,
    setGroupValues,
    subGroupCollapses, subGroupModalCollapses,
    uploadImage
} from "../../../../Redux/characteristics/actions";
import ModalUI from "../../../../components/modalUI/modalUI";
import {setProductValues} from "../../../../Redux/products/actions";
import ModalContent from "./classificatorModals/modalContent/modalContent";
import ClassifiersActionModals from "./classificatorModals/addClassifiers/classifiersActionModals";
import Classifiers from "./classificatorModals/classifiers/classifiers";

class Filters extends Component {
    constructor(props) {
        super(props);
        this.props.getAllGroup();
        this.props.getAllSubgroup();
        this.state = {
            open: false
        }
    }

    openClassifiersWindowHandler = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleOpen = item => {
        this.props.setGroupValues('newGroup', {id: item.id, name: item.name, required_group: item.required_group});
        this.props.setGroupValues('changeStatus', false);
        this.props.setGroupValues('modalGroup', false);
        this.props.getGroup(item.id);
        this.props.getSubgroupWithGroupId(item.id);
        this.props.setProductValues('classifiersModal', true)
    };

    handleClose = () => {
        this.props.setProductValues('classifiersModal', false);
        this.props.setGroupValues('group', null);
        this.props.setGroupValues('customSubgroup', null);
        this.props.setGroupValues('collapsed', []);
        this.props.setGroupValues('toggleButtons', null);
        this.props.setGroupValues('movingStatus', false);
        this.props.setGroupValues('subgroup', null)
    };

    closeHandler = (type = 'close') => {
        this.props.setGroupValues('modalType', false);
        this.props.setGroupValues('groupType', null);
        this.props.setGroupValues('newSubgroup', {name: '', image: null});
        this.props.setGroupValues('error', null);

        if (type === 'back') {
            if (this.props.groupType === 'group') {
                this.props.setGroupValues('modalGroup', true)
            } else {
                this.props.setProductValues('classifiersModal', true)
            }
        } else if (type === 'close') {
            this.props.setGroupValues('subgroup', null);
            this.props.setGroupValues('group', null);
            this.props.setGroupValues('customSubgroup', null);
            this.props.setGroupValues('collapsedModalStatus', [])
        }
    };

    classifierOpenHandler = id => {
        this.props.getAllGroup();
        this.props.setGroupValues('newGroup', {
            name: '',
            required_group: false,
            group_type: '1'
        });
        this.props.setProductValues('classifiersModal', false);
        this.props.setGroupValues('groupActiveId', id);
        this.props.setGroupValues('modalGroup', true);
    };

    classifierCloseHandler = () => {
        this.props.setGroupValues('modalGroup', false);
        this.props.setGroupValues('groupActiveId', null);
        this.props.setGroupValues('classifiersSearch', '');
        this.props.setGroupValues('touched', false);
    };

    render() {

        return (
            <div className={classes.filters}>
                <CustomButton
                    className={`${classes.launchButton} ${this.state.open ? classes.launchButtonOpen : ''}`}
                    children={
                        this.state.open ?
                            <CloseIcon fontSize='small'/>
                            :
                            <LaunchIcon fontSize='small'/>
                    }
                    onClick={this.openClassifiersWindowHandler}
                />
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item xs={12} md={4} lg={3}
                          className={`${classes.gritItem} ${classes.gritItemClassifiers} ${this.state.open ? classes.gritItemClassifiersOpen : ''}`}>
                        <ClassifiersTree
                            // Methods
                            handleOpen={this.handleOpen}
                            classifierOpenHandler={this.classifierOpenHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} lg={9} className={classes.gritItem}>
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
                        collapsedStatus={this.props.collapsedStatus}
                        toggleButtons={this.props.toggleButtons}
                        movingStatus={this.props.movingStatus}
                        search={this.props.search}
                        searchResult={this.props.searchResult}
                        prevGroup={this.props.prevGroup}
                        nextGroup={this.props.nextGroup}
                        indexKey={this.props.indexKey}
                        changeStatus={this.props.changeStatus}
                        selectId={this.props.selectId}
                        modalType={this.props.modalType}
                        groupType={this.props.groupType}
                        newSubgroup={this.props.newSubgroup}
                        delete={this.props.delete}
                        newGroup={this.props.newGroup}
                        // Methods
                        handleClose={this.handleClose}
                        handleOpen={this.handleOpen}
                        classifierOpenHandler={this.classifierOpenHandler}
                        subGroupCollapses={this.props.subGroupCollapses}
                        setGroupValues={this.props.setGroupValues}
                        getSubgroup={this.props.getSubgroup}
                        getGroup={this.props.getGroup}
                        editSubgroup={this.props.editSubgroup}
                        searchHandler={this.props.searchHandler}
                        setProductValues={this.props.setProductValues}
                        deleteSubgroup={this.props.deleteSubgroup}
                        editGroup={this.props.editGroup}
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
                    open={this.props.modalGroup}
                    className={classes.modalGroup}
                    // Methods
                    // handleClose={this.classifierCloseHandler}
                >
                    <Classifiers
                        groups={this.props.groups}
                        groupActiveId={this.props.groupActiveId}
                        newGroup={this.props.newGroup}
                        classifiersSearch={this.props.classifiersSearch}
                        touched={this.props.touched}
                        // Methods
                        classifierCloseHandler={this.classifierCloseHandler}
                        handleOpen={this.handleOpen}
                        getGroup={this.props.getGroup}
                        setGroupValues={this.props.setGroupValues}
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
        classifiersModal: state.products.classifiersModal,
        group: state.characteristics.group,
        groups: state.characteristics.groups,
        customSubgroup: state.characteristics.customSubgroup,
        collapsedStatus: state.characteristics.collapsed,
        toggleButtons: state.characteristics.toggleButtons,
        movingStatus: state.characteristics.movingStatus,
        subgroup: state.characteristics.subgroup,
        search: state.characteristics.search,
        searchResult: state.characteristics.searchResult,
        prevGroup: state.characteristics.prevGroup,
        nextGroup: state.characteristics.nextGroup,
        indexKey: state.characteristics.indexKey,
        changeStatus: state.characteristics.changeStatus,
        selectId: state.characteristics.selectId,
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
        addGroup: data => dispatch(addGroup(data)),
        editGroup: data => dispatch(editGroup(data)),
        addSubgroup: data => dispatch(addSubgroup(data)),
        getOnlySubgroupWithGroupId: id => dispatch(getOnlySubgroupWithGroupId(id)),
        getAllSubgroup: () => dispatch(getAllSubgroup()),
        getGroup: id => dispatch(getGroup(id)),
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)