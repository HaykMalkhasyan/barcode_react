import React from "react";
import styled from "styled-components";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Icons from "../../Icons/icons";

const Toggler = styled(({state, ...props}) => {

    const contentRender = (togglerState) => {

        switch (togglerState) {
            case "closed":
                return (
                    <ArrowRightIcon/>
                )
            case "opened":
                return (
                    <ArrowDropDownIcon/>
                )
            default:
                return (
                    <Icons type={'tree-arrow-right-empty'}/>
                )
        }
    }

    return (
        <a {...props}>
            {contentRender(state)}
        </a>
    )
})`
    height 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
`;

export default Toggler;