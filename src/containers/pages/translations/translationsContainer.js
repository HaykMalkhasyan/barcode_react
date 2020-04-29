import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TranslationsPage from './translationsPage';
import {
    getTranslations,
    setTranslationsModal,
    translationActions,
    toggleTranslationModal,
    setCount,
    getTranslationsWithSize,
    getTranslationPage
} from '../../../redux/lang/actions'

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleTranslationModal,
            setTranslationsModal,
            translationActions,
            getTranslations,
            setCount,
            getTranslationsWithSize,
            getTranslationPage
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        translations: state.languages.translations,
        translation: state.languages.translation,
        translationsSize: state.languages.translationsSize,
        modal: state.languages.modal,
        errors: state.languages.errors,
        itemsCountPerPage: state.languages.itemsCountPerPage,
        pageRangeDisplayed: state.languages.pageRangeDisplayed,
        totalItemsCount: state.languages.totalItemsCount,
        activePage: state.languages.activePage,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationsPage);
