import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTranslations, checkTranslation} from './redux/lang/actions'
import SessionStorage from "./services/SessionStorage";


const Translate = props => {

    // useEffect(
    //     () => {
    //         if (props.name !== undefined && props.translations.length > 0) {
    //             console.log('Yraaaaaaaaaaaaaaaaaaaaaa');
    //             let lang = SessionStorage.get('lang') || "am";
    //             if (3) {
    //                 let index = false;
    //                 for (let item of props.translations) {
    //                     if (item.value === props.name) {
    //                         index = true;
    //                     }
    //                 }
    //                 if (index === false) {
    //                     // props.setTranslations(props.name.toLowerCase(), props.name, lang);
    //                 }
    //             } /*else obj.push({'key': props.name.toLowerCase(), 'name': props.name, 'lnag': lang});*/
    //         }
    //     }, []
    // )


    // if (!props.translations[props.name.toLowerCase()]) {
    //     if (props.status) {
    //         let lang = SessionStorage.get('lang') || "am";
    //         if (props.translations.length > 0) {
    //             let index = false;
    //             for (let item of props.translations) {
    //                 if (item.value === props.name) {
    //                     index = true;
    //                 }
    //             }
    //             if (index === false) {
    //                 console.log('key: ', props.name.toLowerCase(), 'name: ', props.name, 'lnag: ', lang)
    //                 // props.setTranslations(props.name, props.name, lang);
    //             }
    //         } else {
    //             // props.setTranslations(props.name, props.name, lang);
    //         }
    //     }
    // }


    const contentRender = name => {
        if (name !== undefined) {
            if (props.translations.length > 0) {
                for (let item of props.translations) {
                    if (item.key === name.toLowerCase()) {
                        return item.value
                    }
                }
                props.checkTranslation({key: name.toLowerCase(), value: name, language: SessionStorage.get('lang') || "am"})
                return name;
            } else {
                props.checkTranslation({key: name.toLowerCase(), value: name, language: SessionStorage.get('lang') || "am"})
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
            checkTranslation
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