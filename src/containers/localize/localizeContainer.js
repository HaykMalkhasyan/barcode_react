import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    setLanguage
} from "../../redux/lang/actions";
import Localize from './localize';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setLanguage
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        languages: state.locale.languages,
        activeLanguage: state.locale.activeLanguage,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Localize);
