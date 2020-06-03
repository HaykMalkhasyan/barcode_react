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
    getTranslationPage,
    getTranslationWithLang,
    getTranslationAll,
    translationEditableToggle,
    resetActiveTranslationLang
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
            getTranslationPage,
            getTranslationWithLang,
            getTranslationAll,
            translationEditableToggle,
            resetActiveTranslationLang
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        translations: state.languages.translations,
        editabledStatus: state.languages.editabledStatus,
        translation: state.languages.translation,
        translationsSize: state.languages.translationsSize,
        modal: state.languages.modal,
        errors: state.languages.errors,
        itemsCountPerPage: state.languages.itemsCountPerPage,
        pageRangeDisplayed: state.languages.pageRangeDisplayed,
        totalItemsCount: state.languages.totalItemsCount,
        activePage: state.languages.activePage,
        activeTranslationLang: state.languages.activeTranslationLang,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationsPage);
