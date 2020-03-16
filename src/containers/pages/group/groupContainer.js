import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    groupActions,
    subGroupActions,
    setModalValues,
    toggleModal,
    toggleSubModal,
    handleOpen,
    selectGroup
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
            selectGroup
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        groups: state.group.groups,
        group: state.group.group,
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
