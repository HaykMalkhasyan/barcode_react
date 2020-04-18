import React, { useState } from 'react';
import { InputGroupButtonDropdown,DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Translate from "../../Translate";

const DropdownComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle split outline className='rounded-right' />
            <DropdownMenu>
                {props.data.map((value, index) => {
                    return <DropdownItem key={index} onClick={()=>{props.onChange(props.name,value.id)}}><Translate name={"generate"}/> {value.name}</DropdownItem>
                })}
            </DropdownMenu>
        </InputGroupButtonDropdown>
    );
}

export default DropdownComponent;