import React  from "react";

class LocalizeInput extends React.Component {
    render() {
        let props = this.props
        return (
            <div>
                {props.lang.languages.map(function (lang) {

                    return <input
                        className={`form-control  ${props.errors ? 'is-invalid' : ''} ${lang.code !== props.lang.modalLang ? 'd-none' : ''}`}
                        key = {lang.id}
                        type="text"
                        value={props.name && props.name[props.lang.modalLang] ? props.name[props.lang.modalLang] : ""}
                        onChange={event => props.setValue("name", event.target.value, props.lang.modalLang)}

                    />
                })}
            </div>
        );
    }
}


export default LocalizeInput;