import React from "react";
import styled from "styled-components";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Icons from "../../../Icons/icons";

const TreeSelectToggler = styled(({state, ...props}) => (
    <a {...props}>
        {(state === "closed") &&
        <ArrowRightIcon/>
        }
        {(state === "opened") &&
        <ArrowDropDownIcon/>
        }
        {(state !== "opened" && state !== "closed") &&
        <Icons type={'tree-arrow-right-empty'}/>
        }
    </a>
))`
    height 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    cursor: pointer;
`;

export default TreeSelectToggler;