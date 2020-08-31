import React, {useState} from 'react'
import classes from './advancedSearchWindow.module.css'
import {Collapse} from "@material-ui/core";
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../components/Icons/icons";
import AsItem from "./asItem/asItem";
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";

const AdvancedSearchWindow = props => {
    const [open, setOpen] = useState(null);
    const [focus, setFocus] = useState(null);
    const [warehouse, salWarehouse] = useState('');
    const [price, setPrice] = useState('');
    const [supplier, setSupplier] = useState('');

    const clickHandler = (item, name) => {
        switch (name) {
            case 'warehouse': {
                salWarehouse(item.name);
                break;
            }
            case 'price': {
                setPrice(item.name);
                break;
            }
            case 'supplier': {
                setSupplier(item.name);
                break;
            }
            default: break
        }
        setFocus(null);
        setOpen(null)
    };

    const toggleFocus = name => {
        if (name === open) {
            setFocus(null)
        } else {
            setFocus(name)
        }
    };

    const toggleHandler = name => {
        if (name === open) {
            setOpen(null)
        } else {
            setOpen(name)
        }
    };

    return (
        <div className={classes.searchContainer}>
            <CustomHeader
                name={'Լրացուցիչ պարամետրեր'}
            />
            <Collapse in={props.open} timeout="auto" unmountOnExit>
                <div className={classes.advancedSearchContainer}>
                    <AsItem
                        open={open}
                        label={'Մնացորդի ֆիլտր'}
                        inputLabel={'Պահեստ'}
                        name={'warehouse'}
                        focus={focus}
                        value={warehouse}
                        minLabel={'Սկսած'}
                        minName={'warehouse-min'}
                        maxName={'warehouse-max'}
                        maxLabel={'Մինչև'}
                        data={
                            [
                                {id: 1,name: 'one', value: 1},
                                {id: 2,name: 'two', value: 2},
                                {id: 3,name: 'three', value: 3},
                                {id: 4,name: 'four', value: 4},
                            ]
                        }
                        // Methods
                        toggle={toggleHandler}
                        toggleFocus={toggleFocus}
                        clickHandler={clickHandler}
                    />
                    <hr className={classes.line}/>
                    <AsItem
                        open={open}
                        label={'Գնի ֆիլտր'}
                        inputLabel={'Գնի տեսակ'}
                        name={'price'}
                        focus={focus}
                        value={price}
                        minLabel={'Սկսած'}
                        minName={'price-min'}
                        maxName={'price-max'}
                        maxLabel={'Մինչև'}
                        data={[]}
                        // Methods
                        toggle={toggleHandler}
                        toggleFocus={toggleFocus}
                        clickHandler={clickHandler}
                    />
                    <hr className={classes.line}/>
                    <AsItem
                        open={open}
                        label={'Մատակարարի ֆիլտր'}
                        inputLabel={'Մատակարար'}
                        name={'supplier'}
                        focus={focus}
                        value={supplier}
                        minLabel={'Սկսած'}
                        minName={'supplier-min'}
                        maxName={'supplier-max'}
                        maxLabel={'Մինչև'}
                        data={
                            [
                                {id: 1,name: 'one', value: 1},
                                {id: 2,name: 'two', value: 2},
                                {id: 3,name: 'three', value: 3},
                                {id: 4,name: 'four', value: 4},
                            ]
                        }
                        // Methods
                        toggle={toggleHandler}
                        toggleFocus={toggleFocus}
                        clickHandler={clickHandler}
                    />
                </div>
            </Collapse>
            <div className={classes.collapseWindow}>
                <CustomButton
                    className={classes.collapseButton}
                    children={
                        <span className={props.open ? classes.collapseOpen : ''}>
                                    <Icons type={'bottom-angle'} width={11} height={6} className={classes.bottomAngle}/>
                                </span>
                    }
                    // Methods
                    onClick={props.collapse}
                />
            </div>
        </div>
    )
};

export default AdvancedSearchWindow;