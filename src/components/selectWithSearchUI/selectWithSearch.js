import React, {useState} from 'react';
import {ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import Translate from "../../Translate";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const SearchSelectUI = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <ButtonGroup
            style={{width: '100%'}}
        >
            <div
                className="form-control"
                type={props.type}
                name={props.name}
                id={props.id}
                disabled={true}
                defaultValue={props.defaultValue}
                style={{
                    borderRadius: '5px 0 0 5px',
                    height: '40px',
                    boxSizing: 'border-box'
                }}
            >
                <Translate name={props.defaultValue}/>
            </div>
            <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
            >
                <DropdownToggle
                    style={{
                        borderRadius: ' 0 5px 5px 0',
                        padding: '6px 0',
                        height: '40px',
                        boxSizing: 'border-box'
                    }}
                    color={'primary'}
                >
                    <KeyboardArrowDownIcon/>
                </DropdownToggle>
                <DropdownMenu>
                    {
                        props.data ?
                            props.data.map(
                                item => {

                                    return (
                                        <DropdownItem
                                            onClick={props.onClick.bind(this, props.name, item)}
                                            key={item.id}
                                        >
                                            <Translate name={item.name}/>
                                        </DropdownItem>
                                    )
                                }
                            )
                            :
                            <DropdownItem>
                                <Translate name={'empty'}/>
                            </DropdownItem>

                    }
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
}

export default SearchSelectUI;