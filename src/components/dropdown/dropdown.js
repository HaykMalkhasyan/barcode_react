import React, {useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, InputGroupButtonDropdown} from 'reactstrap';

const DropdownComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={props.style} split outline className='rounded-right btn-secondary'/>
            <DropdownMenu>
                {
                    props.types.map(
                        item => {

                            return (
                                <DropdownItem
                                    key={item.id}
                                    onClick={props.onClick.bind(this, item.name, item.id)}
                                >
                                    {item.name}
                                </DropdownItem>
                            )
                        }
                    )
                }
                {/*{props.data.map((value, index) => {*/}
                {/*    return <DropdownItem key={index} onClick={() => {*/}
                {/*        props.onChange(props.name, value.id)*/}
                {/*    }}>sASasA<Translate name={"generate"}/> {value.name}</DropdownItem>*/}
                {/*})}*/}
            </DropdownMenu>
        </InputGroupButtonDropdown>
    );
}

export default DropdownComponent;