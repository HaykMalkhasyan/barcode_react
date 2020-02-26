import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getLanguages,
    getTranslations,
    setLanguage
} from "../../redux/lang/actions";
import Localize from './localize';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getLanguages,
            getTranslations,
            setLanguage
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        languages: state.languages.languages,
        active: state.languages.active,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Localize);
