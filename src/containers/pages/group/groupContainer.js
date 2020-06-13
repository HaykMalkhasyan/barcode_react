import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    groupActions,
    subGroupActions,
    setModalValues,
    toggleModal,
    toggleSubModal,
    handleOpen,
    selectGroup,
    getSeletGroup,
    getSubGroup,
    setActionToggleSubModal,
    setSubModalName,
    startMovingGroup,
    endeMovingGroup,
    editPosition,
    searchGroups,
    alternativeShow,
    seteExpanded,
    toggleEditebled,
    subGroupsCollapseStatus,
    clearExpanded
} from "../../../redux/group/actions";
import {
    productActions
} from '../../../redux/products/actions'
import {
    toggleModalLanguage
} from "../../../redux/lang/actions";
import GroupPage from './groupPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            groupActions,
            subGroupActions,
            setModalValues,
            toggleModal,
            toggleSubModal,
            handleOpen,
            toggleModalLanguage,
            selectGroup,
            getSeletGroup,
            getSubGroup,
            setActionToggleSubModal,
            setSubModalName,
            startMovingGroup,
            endeMovingGroup,
            editPosition,
            searchGroups,
            alternativeShow,
            seteExpanded,
            toggleEditebled,
            subGroupsCollapseStatus,
            productActions,
            clearExpanded
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        groups: state.group.groups,
        group: state.group.group,
        subGroups: state.group.subGroups,
        subGroup: state.group.subGroup,
        modal: state.group.modal,
        subModal: state.group.subModal,
        perm: state.permission.data.group,
        selected: state.group.selected,
        lang: {
            languages:state.languages.languages,
            modalLang:state.languages.modalLang,
            active:state.languages.active
        },
        errors: state.group.errors,
        movingGroupStatus: state.group.movingGroupStatus,
        search: state.group.search,
        searchResult: state.group.searchResult,
        searchAltResult: state.group.searchAltResult,
        alternative: state.group.alternative,
        expanded: state.group.expanded,
        searchResItem: state.group.searchResItem,
        editabled: state.group.editabled,
        collapsedStatus: state.group.collapsedStatus,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
        products: state.products.products
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
