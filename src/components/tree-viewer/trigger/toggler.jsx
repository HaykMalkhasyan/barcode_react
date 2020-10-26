import React from "react";
import styled from "styled-components";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Toggler = styled(({state, ...props}) => (
    <a {...props}>
        {(state === "closed") &&
            <ArrowRightIcon/>
        }
        {(state === "opened") &&
            <ArrowDropDownIcon/>
        }
    </a>
))`
    height 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
`;

export default Toggler;