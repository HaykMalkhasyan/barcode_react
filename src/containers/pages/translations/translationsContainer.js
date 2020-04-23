import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TranslationsPage from './translationsPage';
import {
    getTranslations,
    setTranslationsModal,
    translationActions,
    toggleTranslationModal
} from '../../../redux/lang/actions'

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleTranslationModal,
            setTranslationsModal,
            translationActions,
            getTranslations
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        translations: state.languages.translations,
        translation: state.languages.translation,
        modal: state.languages.modal,
        errors: state.languages.errors
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationsPage);
