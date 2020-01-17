import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ReactCountryFlag from "react-country-flag";


function ThemeNavbar(props) {
    return (
        <UncontrolledDropdown nav inNavbar className="pr-1">
            <DropdownToggle nav>
                <ReactCountryFlag code={props.activeLanguage} svg/> {props.activeLanguage.toUpperCase()}
            </DropdownToggle>
            <DropdownMenu right>
                {props.languages.map((value, index) =>
                    <DropdownItem key={value.code} onClick={() => {
                        props.setLanguage(value.code)
                    }}>
                        <ReactCountryFlag code={value.code} svg/> {value.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </UncontrolledDropdown>

    );
}


export default ThemeNavbar;