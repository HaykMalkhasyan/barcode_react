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
    alternativeShow
} from "../../../redux/group/actions";
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
            alternativeShow
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
