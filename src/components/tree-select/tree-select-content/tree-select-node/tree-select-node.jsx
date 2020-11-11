import styled from 'styled-components';

const defaultRowHeight = "auto";

const TreeSelectNode = styled.div`
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
    border-left-color: #024059;
        .dropdown {
            visibility: inherit;
        }
    }
`;

export default TreeSelectNode;