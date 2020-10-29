import styled from 'styled-components';

const defaultRowHeight = "auto";

const TreeNode = styled.div`
    cursor: default;
    position: relative;
    display: flex;
    align-items: center;
    color: #024059;
    transition: 300ms;
    line-height: ${({ rowHeight = defaultRowHeight }) => rowHeight - 2}px;
    background: ${props => props.selected ? '#deecfd' : 'transparent'};
    border-left: ${props => props.selected ? '2px solid #024059' : '2px solid transparent'};
    padding-left: ${props => props.depth * 22}px;
    .dropdown {
        visibility: hidden;
    }
    &:hover {
        background: #024059;
        color: #fff;
        .dropdown {
            visibility: inherit;
        }
    }
`;

export default TreeNode;