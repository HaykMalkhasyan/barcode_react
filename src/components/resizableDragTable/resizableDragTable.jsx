import React, {Component} from 'react'
import classes from './resizableDragTable.module.css'
import CheckboxesUi from "../UI/input/checkboxUI/checkboxUI";
import RemoveIcon from "@material-ui/icons/Remove";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Tooltip from "@material-ui/core/Tooltip";

let move;

class ResizableDragTable extends Component {
    constructor(props) {
        super(props);
        this.props.tabs.forEach(
            (item, index) => {
                this[`ref_${index}`] = React.createRef()
            }
        );
    }

    window = onmouseup = () => {
        this.endMoving()
    };

    startHandler = (event, elem, index) => {
        move = event => this.moveHandler(event, elem, index);
        window.addEventListener('mousemove', move);
    };

    endMoving = () => {
        window.removeEventListener('mousemove', move)
    };

    moveHandler(event, elem, index) {
        let left = event.clientX - elem.getBoundingClientRect().left;
        elem.style.width = left + 'px';
        if (left >= 30) {
            localStorage.setItem(`block_${index}`, JSON.stringify(left));
        } else {
            localStorage.setItem(`block_${index}`, JSON.stringify(30));
        }
    }

    componentDidMount() {
        window.removeEventListener('mouseup', this.endMoving)
    }

    productSelectHandler = id => {
        this.props.selectData(id, 'item')
    };

    toggleEditableModal = (id) => {
        this.props.setValues('productLoadingStatus', true);
        this.props.getData(id)
    };

    drag = (event, index) => {
        event.stopPropagation();
        event.dataTransfer.setData('index', index);
        event.target.style.opacity = '.3'
    };

    dragend = event => {
        event.stopPropagation();
        event.target.style.opacity = ''
    };

    dragEnter = (event, i) => {
        event.preventDefault();
        this[`ref_${i}`].current.style.borderRight = '2px solid #4E97F8';
    };

    dragLeave = (event, i) => {
        event.preventDefault();
        this[`ref_${i}`].current.style.borderRight = '';
    };

    drop = (event, in_index, i) => {
        event.preventDefault();
        this[`ref_${i}`].current.style.borderRight = '';

        let out_index = event.dataTransfer.getData('index');
        this.props.sortTableTabs(in_index, +out_index)
    };

    tableRender = () => {
        return this.props.tabs.map(
            (item, i) => {
                return this.props.activeTabs.indexOf(item.id) !== -1 ?
                    <div
                        style={{width: JSON.parse(localStorage.getItem(`block_${i}`)) || 'auto'}}
                        key={item.id + Math.random()}
                        ref={this[`ref_${i}`]} className={classes.productTableTab}
                        onDragOver={event => this.dragEnter(event, i)}
                        onDragLeave={event => this.dragLeave(event, i)}
                        onDrop={event => this.drop(event, i, i)}
                    >
                        {
                            item.type === 'checkbox' ?
                                <header>
                                    <CheckboxesUi
                                        checked={this.props.selected_products.length === this.props.products.length}
                                        colorSecondary={classes.colorSecondary}
                                        root={classes.chkRoot}
                                        size={'small'}
                                        // Methods
                                        onChange={() => this.props.selectData(null, 'all')}
                                    />
                                </header>
                                :
                                <header>
                                    <span
                                        className={classes.draggableWindow}
                                        draggable={"true"}
                                        onDragStart={
                                            event => this.drag(event, this.props.tabs.indexOf(item))
                                        }
                                        onDragEnd={this.dragend}
                                    >
                                        {item.name}
                                    </span>
                                    <div
                                        className={classes.resizing}
                                        // Methods
                                        onMouseDown={
                                            event => this.startHandler(event, this[`ref_${i}`].current, i)
                                        }
                                    />
                                </header>
                        }
                        {this.contentRender(item)}
                    </div>
                    :
                    null
            }
        )
    };

    contentRender = (section) => {

        if (this.props.products.length) {
            let contentArray = [];

            for (let item of this.props.products) {
                if (item.hasOwnProperty(section.key_name)) {
                    switch (section.type) {
                        case 'checkbox': {
                            contentArray.push(
                                <div className={classes.tBodyItems} key={item.id + Math.random()}>
                                    <CheckboxesUi
                                        value={item.id}
                                        root={classes.chkRoot}
                                        size="small"
                                        colorSecondary={classes.colorSecondary}
                                        checked={this.props.selected_products.indexOf(item.id) !== -1}
                                        // Methods
                                        onChange={() => this.productSelectHandler(item.id)}
                                    />
                                </div>
                            );
                            break;
                        }
                        case 'string': {
                            contentArray.push(
                                <div
                                    className={`${classes.tBodyItems} ${classes.tBodySelectedItems}`}
                                    key={item.id + Math.random()}
                                    // Methods
                                    onClick={() => this.toggleEditableModal(item.id)}
                                >
                                    <span>
                                        {
                                            item[section.key_name] === "" ?
                                                <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                :
                                                item[section.key_name]
                                        }
                                    </span>
                                </div>
                            );
                            break;
                        }
                        case 'in_string': {
                            contentArray.push(
                                <div
                                    className={`${classes.tBodyItems} ${classes.tBodySelectedItems}`}
                                    key={item.id + Math.random()}
                                    // Methods
                                    onClick={() => this.toggleEditableModal(item.id)}
                                >
                                <span>
                                    {
                                        !item[section.key_name] || item[section.key_name] === "" ?
                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                            :
                                            this.props[`in_data_${section['in_data']}`].map(
                                                type => {
                                                    return type.value === parseInt(item['product_type']) ?
                                                        type.name
                                                        :
                                                        null
                                                }
                                            )
                                    }
                                </span>
                                </div>
                            );
                            break;
                        }
                        case 'array': {
                            contentArray.push(
                                <div
                                    className={`${classes.tBodyItems} ${classes.tBodySelectedItems}`}
                                    key={item.id + Math.random()}
                                    // Methods
                                    onClick={() => this.toggleEditableModal(item.id)}
                                >
                                    <span>
                                        {
                                            !item[section.key_name] || item[section.key_name].length === 0 ?
                                                <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                :
                                                <Tooltip
                                                    title={
                                                        item[section.key_name].map(
                                                            (i, index) => {

                                                                return (
                                                                    <div key={index + Math.random()}>{i.name}</div>
                                                                )
                                                            }
                                                        )
                                                    }
                                                    placement="right"
                                                >
                                                    {item[section.key_name][0].name}
                                                </Tooltip>
                                        }
                                    </span>
                                </div>
                            );
                            break;
                        }
                        case 'boolean': {
                            contentArray.push(
                                <div
                                    className={`${classes.tBodyItems} ${classes.tBodySelectedItems}`}
                                    key={item.id + Math.random()}
                                    // Methods
                                    onClick={() => this.toggleEditableModal(item.id)}
                                >
                                <span>
                                    {
                                        item[section.key_name] ?
                                            <RadioButtonCheckedIcon style={{color: '#2abc2b', fontSize: 14}}/>
                                            :
                                            <FiberManualRecordIcon style={{color: '#ff4a4a', fontSize: 14}}/>
                                    }
                                </span>
                                </div>
                            );
                            break;
                        }
                        default:
                            break;
                    }
                }
            }
            return contentArray;
        }
    };

    render() {

        return (
            <div className={classes.tableWindow}>
                <div className={classes.productTable}>
                    {
                        this.tableRender()
                    }
                </div>
            </div>
        )
    }
}

export default ResizableDragTable;