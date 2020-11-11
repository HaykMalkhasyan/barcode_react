import React from 'react'
import classes from './header.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import Icons from "../../../../../../components/Icons/icons"
import SpringPopper from "../../../../../../components/popperUI/popperUI"
import CheckboxList from "../../../../../../components/listItemWithCheckbox/listItemWithCheckbox";

const Header = props => {

    return (
        <div className={classes.header}>
            <div className={classes.actionsButtonWindow}>
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'rectangle-add'} height={14} width={14} className={classes.rectangleAddIcon}/> <span>Ավելացնել</span>
                        </>
                    }
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'group-delete'} height={14} width={14} opacity={1} className={classes.deleteIcon}/> <span>Ջնջել</span>
                        </>
                    }
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'contained-print'}/> <span>Տպել</span>
                        </>
                    }
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'outline-list'}/> <span>Դասակարգել</span>
                        </>
                    }
                />
                <CustomButton
                    className={`${classes.actionsButton}`}
                    children={
                        <>
                            <Icons type={'contained-export'}/> <span>Արտահանել</span>
                        </>
                    }
                />
            </div>
            <div>
                <SpringPopper
                    dropWindow={props.products && props.products.length && props.tabs && props.tabs.length ? classes.dropWindow : classes.dropWindowEmpty}
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
            </div>
        </div>
    )
};

export default Header;