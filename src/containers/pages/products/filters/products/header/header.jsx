import React from 'react'
import classes from './header.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import Icons from "../../../../../../components/Icons/icons"
import SpringPopper from "../../../../../../components/popperUI/popperUI"
import CheckboxList from "../../../../../../components/listItemWithCheckbox/listItemWithCheckbox";

const Header = props => {

    return (
        <div className={classes.header}>
            <div>
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'left-arrow'} height={15} className={classes.sendIcon}/>
                        </>
                    }
                    // Methods
                />
            </div>
            <div className={classes.actionsButtonWindow}>
                <SpringPopper
                    dropWindow={props.products.length && props.tabs && props.tabs.length ? classes.dropWindow : classes.dropWindowEmpty}
                    className={classes.actionsButton}
                    open={props.open}
                    label={<Icons type={'configuration'} className={classes.sendIcon} width={18} height={18}/>}
                    // Methods
                    toggleBackdrop={props.toggleBackdrop}
                >
                    <CheckboxList
                        emptyStyle={classes.emptyStyle}
                        empty={'դատարկ է'}
                        data={props.tabs}
                        activeTabs={props.activeTabs}
                        products={props.products}
                        colorSecondary={classes.colorSecondary}
                        // Methods
                        onClick={props.onClick}
                    />
                </SpringPopper>
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={<Icons type={'send'} height={15} className={classes.sendIcon}/>}
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={<Icons type={'print'} height={15} className={classes.printIcon}/>}
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={<Icons type={'paper-list'} height={15} className={classes.paperListIcon}/>}
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={<Icons type={'edit'} height={15} className={classes.editIcon}/>}
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={<Icons type={'export'} height={15} className={classes.exportIcon}/>}
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'delete'} height={15}/> <span>Ջնջել</span>
                        </>
                    }
                />
            </div>
        </div>
    )
};

export default Header;