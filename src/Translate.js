import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTranslations, checkTranslation, getTranslations} from './redux/lang/actions'
import SessionStorage from "./services/SessionStorage";


const Translate = props => {


    const contentRender = name => {
        let lang = SessionStorage.get('lang') ? SessionStorage.get('lang') : 'am'
        if (name !== undefined) {
            if (props.translations.length > 0) {
                for (let item of props.translations) {
                    if (item.key === name.toLowerCase() && item.language === lang) {
                        return item.value
                    }
                }
                props.checkTranslation({key: name.toLowerCase(), value: name, language: SessionStorage.get('lang') || "am"})
                return name;
            } else {
                // props.checkTranslation({key: name.toLowerCase(), value: name, language: SessionStorage.get('lang') || "am"})
                return name
            }
        }
    }
    return (
        <span>
                {contentRender(props.name)}
        </span>
    );

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setTranslations,
            checkTranslation,
            getTranslations
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        translations: state.languages.translations,
        status: state.languages.status
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Translate);