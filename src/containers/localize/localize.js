import React, {Component} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ReactCountryFlag from "react-country-flag";

class ThemeNavbar extends Component{
    constructor(props) {
        super(props)
        this.props.getLanguages()
        this.props.getTranslations()
    }
    render() {
        return (
            <UncontrolledDropdown nav inNavbar className="pr-1">
                <DropdownToggle nav>
                    <ReactCountryFlag code={this.props.active} svg/> {this.props.active.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu right>

                    {this.props.languages.map((value, index) =>
                        <DropdownItem key={value.code} onClick={() => {
                            this.props.setLanguage(value.code);
                            this.props.getTranslations()
                        }}>
                            <ReactCountryFlag code={value.code} svg/> {value.name}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </UncontrolledDropdown>

        );
    }
}


export default ThemeNavbar;