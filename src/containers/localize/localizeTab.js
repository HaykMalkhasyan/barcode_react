import React  from "react";
import {Badge} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setModalLanguage} from "../../redux/lang/actions";

function LocalizeTab(props){
        return (
                <div className="badge-toolbar">
                    {props.languages.map(function (lang) {
                        return <Badge
                            key = {lang.id}
                            className={`cursor-pointer ${props.modalLang === lang.code? `bg-primary text-white`:`bg-white font-weight-normal text-secondary`}`}
                            onClick = {()=>props.setModalLanguage(lang.code)}
                        >
                            {lang.name}
                        </Badge>
                    })}
                </div>
        );
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setModalLanguage
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        languages: state.languages.languages,
        modalLang: state.languages.modalLang

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LocalizeTab);