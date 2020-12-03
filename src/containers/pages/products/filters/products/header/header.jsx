import React from 'react'
import classes from './header.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/custom-button"
import Icons from "../../../../../../components/Icons/icons"
import SpringPopper from "../../../../../../components/popperUI/popperUI"
import CheckboxList from "../../../../../../components/listItemWithCheckbox/listItemWithCheckbox";
import CallMergeIcon from '@material-ui/icons/CallMerge';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const Header = props => {

    return (
        <div className={classes.header}>
            <div className={classes.actionsButtonWindow}>
                {/* back to filter page */}
                <CustomButton
                    className={classes.actionsButton}
                    children={
                        <>
                            <Icons type={'back-page'} height={14} width={14} className={classes.rectangleAddIcon}/> <span>Լրացուցիչ ֆիլտրեր</span>
                        </>
                    }
                    // EVENTS
                    onClick={props.backFiltersPage}
                />
                {/* add product */}
                <CustomButton
                    className={classes.actionsButton}
                    children={
                        <>
                            <Icons type={'rectangle-add'} height={14} width={14} className={classes.rectangleAddIcon}/> <span>Ավելացնել</span>
                        </>
                    }
                    // EVENTS
                    onClick={() => {
                        props.toggleAddModalHandler('open', 'add', 'body')
                    }}
                />
                {/* open table filters */}
                <CustomButton
                    className={props.filters ? `${classes.actionsButton} ${classes.active}` : classes.actionsButton}
                    children={
                        <>
                            {
                                props.filters ?
                                    <CallSplitIcon className={classes.filters} fontSize="small"/>
                                    :
                                    <CallMergeIcon className={classes.filters} fontSize="small"/>
                            }
                            <span>Ֆիլտրեր</span>
                        </>
                    }
                    // Events
                    onClick={() => props.setFilters(!props.filters)}
                />
                {/* delete products group */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'group-delete'} height={14} width={14} opacity={1} className={classes.deleteIcon}/> <span>Ջնջել</span>
                        </>
                    }
                />
                {/* print products */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'contained-print'}/> <span>Տպել</span>
                        </>
                    }
                />
                {/* sort products */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'outline-list'}/> <span>Դասակարգել</span>
                        </>
                    }
                />
                {/* product export */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
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
                    label={<Icons type={'configuration'} width={18} height={18}/>}
                    // Methods
                    toggleBackdrop={props.toggleBackdrop}
                >
                    <CheckboxList
                        emptyStyle={classes.emptyStyle}
                        empty={'դատարկ է'}
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