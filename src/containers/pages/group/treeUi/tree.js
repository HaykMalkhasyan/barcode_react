import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import {fade, makeStyles, withStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import {useSpring, animated} from 'react-spring/web.cjs';
import ContextMenu from "./contextMenu/contextMenu";
import * as Icon from 'react-feather'
import styls from './tree.module.css'
import ButtonUi from "../../../../components/buttons/buttonUi";
import Tooltip from '@material-ui/core/Tooltip';
import Translate from "../../../../Translate";

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"/>
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z"/>
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"/>
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: {opacity: 0, transform: 'translate3d(20px,0,0)'},
        to: {opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)`},
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.1,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent}/>);

const useStyles = makeStyles({
    root: {
        height: 'auto',
        flexGrow: 1,
        maxWidth: '100%',
        fontSize: '2rem !important'
    },
});


export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const [menu, setMenu] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [id, setId] = useState(null)
    const [group_id, setGroup_id] = useState(null)


    useEffect(
        () => {
            window.onclick = () => {
                setMenu(false)
                if (props.movingGroupStatus) {
                    props.endeMovingGroup()
                }
            }

            window.onscroll = () => setMenu(false)
            // window.onmousedown = () => setMenu(false)
        }, [props.movingGroupStatus]
    )

    const myContextMenu = (event, group_id, id) => {
        event.stopPropagation();
        event.preventDefault()
        setMenu(!menu)
        setX(event.clientX)
        setY(event.clientY)
        setGroup_id(group_id)
        setId(id)
    }

    const onClickHandler = (type, group_id, id) => {

        switch (type) {
            case 'add': {
                props.setActionToggleSubModal(type, group_id, id);
                break;
            }
            case 'edit': {
                props.subGroupActions('get', id);
                props.setActionToggleSubModal(type);
                break;
            }
            case 'move': {
                props.subGroupActions('get', id);
                props.startMovingGroup(id)
                break;
            }
            default: {
                props.subGroupActions('get', id);
                props.subGroupActions('delete', id);
                break;
            }
        }
    }

    const treeItemRender = (group_id, id, movingGroupStatus) => {
        let statusId = movingGroupStatus
        let x =  props.data.map(
            item => {
                if (parseInt(item.parent_id) === parseInt(id)) {
                    let groupId = item.group_id ? item.group_id.id : false
                    if (parseInt(groupId) === parseInt(group_id)) {
                        return (
                            <div
                                className={styls.block}
                                key={item.id}
                            >
                                {
                                    statusId ?
                                        (statusId !== +item.parent_id) ?
                                            <ButtonUi
                                                onClick={event => movingHandler(event, item.id)}
                                            >
                                                <Icon.ArrowRight className={styls.leftArrow}/>
                                            </ButtonUi>
                                            :
                                            statusId === +item.parent_id ?
                                                statusId = false
                                                :
                                                null
                                        :
                                        null
                                }
                                <StyledTreeItem
                                    onContextMenu={event => myContextMenu(event, item.group_id.id, item.id)}
                                    key={item.id}
                                    nodeId={`"${item.id}"`}
                                    label={item.name}
                                    fontSize={'20px'}
                                >
                                    {
                                        treeItemRender(item.group_id.id, item.id, statusId)
                                    }
                                </StyledTreeItem>
                            </div>
                        )
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        )
        let arr = []
        x.map(
            (item, index) => {
                if (item !== null) {
                    arr.push(item)
                }
                return x;
            }
        )
        return arr
    }


    const movingHandler = (event, id) => {
        event.stopPropagation()
        props.editPosition(id)
    }

    return (

        <>
            {
                menu ?
                    <ContextMenu
                        onClick={onClickHandler}
                        left={x}
                        top={y}
                        id={id}
                        group_id={group_id}
                    />
                    :
                    null
            }
            <Tooltip title={<Translate name={'right click to open the context menu'}/>} placement="left-start">
                <TreeView
                    style={{marginBottom: 100}}
                    className={classes.root}
                    defaultExpanded={['1']}
                    defaultCollapseIcon={<MinusSquare/>}
                    defaultExpandIcon={<PlusSquare/>}
                    defaultEndIcon={<CloseSquare/>}
                >
                    <StyledTreeItem
                        // onContextMenu={event => myContextMenu(event, props.mainId)}
                        nodeId={`${props.mainId}`}
                        label={props.mainName}
                    >
                        {
                            props.data.length ?
                                props.data.map(
                                    item => {

                                        return item.group_id && !item.parent_id ?

                                            props.mainId === item.group_id.id ?
                                                <div
                                                    className={styls.block}
                                                    key={item.id}
                                                >
                                                    {
                                                        props.movingGroupStatus ?
                                                            <ButtonUi
                                                                onClick={event => movingHandler(event, item.id)}
                                                            >
                                                                <Icon.ArrowRight className={styls.leftArrow}/>
                                                            </ButtonUi>
                                                            :
                                                            null
                                                    }
                                                    <StyledTreeItem
                                                        onContextMenu={event => myContextMenu(event, item.group_id.id, item.id)}
                                                        key={item.id}
                                                        nodeId={`"${item.id}"`}
                                                        label={item.name}
                                                        fontSize={'20px'}
                                                    >
                                                        {
                                                            treeItemRender(item.group_id.id, item.id, props.movingGroupStatus)
                                                        }
                                                    </StyledTreeItem>
                                                </div>
                                                :
                                                null
                                            :
                                            null
                                    }
                                )
                                :
                                null
                        }
                    </StyledTreeItem>
                </TreeView>
            </Tooltip>
        </>
    );
}
