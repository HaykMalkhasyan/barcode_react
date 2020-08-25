import React, {Component} from 'react'
import classes from './productTable.module.css'
import CheckboxesUi from "../../../../../../../../components/UI/input/checkboxUI/checkboxUI";
import RemoveIcon from "@material-ui/icons/Remove";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

let move;

class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.ref_1 = React.createRef();
        this.ref_2 = React.createRef();
        this.ref_3 = React.createRef();
        this.ref_4 = React.createRef();
        this.ref_5 = React.createRef();
        this.ref_6 = React.createRef();
        this.ref_7 = React.createRef();
        this.ref_8 = React.createRef();
        this.ref_9 = React.createRef();
        this.ref_10 = React.createRef();
        this.ref_11 = React.createRef();
        this.ref_12 = React.createRef();
        this.ref_13 = React.createRef();
        this.ref_14 = React.createRef();
        this.ref_15 = React.createRef();
        this.ref_16 = React.createRef();
    }

    window = onmouseup = () => {
        this.endMoving()
    };

    startHandler = (event, elem) => {
        move = event => this.moveHandler(event, elem);
        window.addEventListener('mousemove', move);
    };

    endMoving() {window.removeEventListener('mousemove', move)}

    moveHandler(event, elem) {
        let left = event.clientX - elem.getBoundingClientRect().left;
        elem.style.width = left + 'px'
    }
    componentDidMount() {
        window.removeEventListener('mouseup', this.endMoving)
    }

    productSelectHandler = id => {
        this.props.selectProducts(id, 'item')
    };

    render() {

        return (
            <div className={classes.tableWindow}>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        {
                            this.props.activeTabs.indexOf(1) !== -1 ?
                                <th ref={this.ref_1}>
                                    <div ref={this.ref_1} className={classes.tHeadName}>
                                        <CheckboxesUi
                                            checked={this.props.selected_products.length === this.props.products.length}
                                            colorSecondary={classes.colorSecondary}
                                            // Methods
                                            onChange={() => this.props.selectProducts(null, 'all')}
                                        />
                                    </div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_1.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(2) !== -1 ?
                                <th ref={this.ref_2}>
                                    <div ref={this.ref_2} className={classes.tHeadName}>QR</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_2.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(3) !== -1 ?
                                <th ref={this.ref_3}>
                                    <div ref={this.ref_3} className={classes.tHeadName}>ԱՊՄ</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_3.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(4) !== -1 ?
                                <th ref={this.ref_4}>
                                    <div ref={this.ref_4} className={classes.tHeadName}>անվանում</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_4.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(5) !== -1 ?
                                <th ref={this.ref_5}>
                                    <div ref={this.ref_5} className={classes.tHeadName}>գին</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_5.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(6) !== -1 ?
                                <th ref={this.ref_6}>
                                    <div ref={this.ref_6} className={classes.tHeadName}>բարկոդ</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_6.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(7) !== -1 ?
                                <th ref={this.ref_7}>
                                    <div ref={this.ref_7} className={classes.tHeadName}>մատակարար</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_7.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(8) !== -1 ?
                                <th ref={this.ref_8}>
                                    <div ref={this.ref_8} className={classes.tHeadName}>կատեգորիա</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(9) !== -1 ?
                                <th ref={this.ref_9}>
                                    <div ref={this.ref_9} className={classes.tHeadName}>կարճ անվանում</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(10) !== -1 ?
                                <th ref={this.ref_10}>
                                    <div ref={this.ref_10} className={classes.tHeadName}>տեսակ</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(11) !== -1 ?
                                <th ref={this.ref_11}>
                                    <div ref={this.ref_11} className={classes.tHeadName}>չափման միավոր</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(12) !== -1 ?
                                <th ref={this.ref_12}>
                                    <div ref={this.ref_12} className={classes.tHeadName}>ակտիվ</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(13) !== -1 ?
                                <th ref={this.ref_13}>
                                    <div ref={this.ref_13} className={classes.tHeadName}>մուտքը թույլատրելի է</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(14) !== -1 ?
                                <th ref={this.ref_14}>
                                    <div ref={this.ref_14} className={classes.tHeadName}>վաճառքը թույլատրելի է</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(15) !== -1 ?
                                <th ref={this.ref_15}>
                                    <div ref={this.ref_15} className={classes.tHeadName}>գործընկերներ</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                        {
                            this.props.activeTabs.indexOf(16) !== -1 ?
                                <th ref={this.ref_16}>
                                    <div ref={this.ref_16} className={classes.tHeadName}>նկարագրություն</div>
                                    <div onMouseDown={event => this.startHandler(event, this.ref_8.current)} className={classes.door}/>
                                </th>
                                :
                                null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products.map(
                            (item, index) => {

                                return (
                                    <tr key={item.id + index + Math.random()} className={classes.content}>
                                        {
                                            this.props.activeTabs.indexOf(1) !== -1 ?
                                                <td className={classes.tBodyItems}>
                                                    <CheckboxesUi
                                                        value={item.id}
                                                        root={classes.chkRoot}
                                                        size="small"
                                                        colorSecondary={classes.colorSecondary}
                                                        checked={this.props.selected_products.indexOf(item.id) !== -1}
                                                        // Methods
                                                        onChange={() => this.productSelectHandler(item.id)}
                                                    />
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(2) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>QR</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(3) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        !item['sku'] || item['sku'] === "" ?
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                            :
                                                            item['sku']
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(4) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>{item['name']}</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(5) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        !item['price'] || item['price'] === "" ?
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                            :
                                                            item['price']
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(6) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        this.props['barcode'] && this.props['barcode'].length ?
                                                            this.props['barcode'][0].name
                                                            :
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(7) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        this.props['supplier'] ?
                                                            this.props['supplier']
                                                            :
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(8) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>Կատեգորիա</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(9) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>{item['short_name']}</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(10) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        !item['product_type'] || item['product_type'] === "" ?
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                            :
                                                            this.props.types.map(
                                                                type => {
                                                                    return type.value === parseInt(item['product_type']) ?
                                                                        type.name
                                                                        :
                                                                        null
                                                                }
                                                            )
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(11) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>Չափման միավոր</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(12) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        item['active'] ?
                                                            <RadioButtonCheckedIcon style={{color: '#2abc2b'}} fontSize='small'/>
                                                            :
                                                            <FiberManualRecordIcon style={{color: '#ff4a4a'}} fontSize='small'/>
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(13) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        item['can_in'] ?
                                                            <RadioButtonCheckedIcon style={{color: '#2abc2b'}} fontSize='small'/>
                                                            :
                                                            <FiberManualRecordIcon style={{color: '#ff4a4a'}} fontSize='small'/>
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(14) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        item['can_sale'] ?
                                                            <RadioButtonCheckedIcon style={{color: '#2abc2b'}} fontSize='small'/>
                                                            :
                                                            <FiberManualRecordIcon style={{color: '#ff4a4a'}} fontSize='small'/>
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(15) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>Գործընկերներ</td>
                                                :
                                                null
                                        }
                                        {
                                            this.props.activeTabs.indexOf(16) !== -1 ?
                                                <td className={`${classes.tBodyItems}`}>
                                                    {
                                                        !item['description'] || item['description'] === "" ?
                                                            <RemoveIcon style={{color: '#ccc'}} fontSize='small'/>
                                                            :
                                                            item['description']
                                                    }
                                                </td>
                                                :
                                                null
                                        }
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable;