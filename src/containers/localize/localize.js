import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ReactCountryFlag from "react-country-flag";
import {bindActionCreators} from "redux";
import {setLanguage} from "../../redux/lang/actions";
import {connect} from "react-redux";


function ThemeNavbar(props) {
    return (
        <UncontrolledDropdown nav inNavbar className="pr-1">
            <DropdownToggle nav>
                <ReactCountryFlag code={props.activeLanguage} svg/> {props.activeLanguage.toUpperCase()}
            </DropdownToggle>
            <DropdownMenu right>
                {props.languages.map((value, index) =>
                    <DropdownItem key={value.code} onClick={() => {
                        setLanguage(value.code)
                    }}>
                        <ReactCountryFlag code={value.code} svg/> {value.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </UncontrolledDropdown>

    );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setLanguage
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return state.locale
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeNavbar);