import React from 'react'
import classes from './header.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/custom-button"
import Icons from "../../../../../../components/Icons/icons"
import SpringPopper from "../../../../../../components/popperUI/popperUI"
import CheckboxList from "../../../../../../components/listItemWithCheckbox/listItemWithCheckbox";
import CallMergeIcon from '@material-ui/icons/CallMerge';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import {FiFilter} from "react-icons/fi";
import AppsIcon from '@material-ui/icons/Apps';
import TableChartIcon from '@material-ui/icons/TableChart';
import ListIcon from '@material-ui/icons/List';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';

const Header = props => {

    const changeView = windowNumber => {
        props.setActive(windowNumber)
    }

    return (
        <div className={classes.header}>
            <div className={classes.actionsButtonWindow}>
                {/* back to filter page */}
                <CustomButton
                    className={classes.actionsButton}
                    children={
                        <>
                            <Icons type={'back-page'} height={14} width={14} className={classes.rectangleAddIcon}/> <span className={classes.text}>Լրացուցիչ ֆիլտրեր</span>
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
                            <Icons type={'rectangle-add'} height={14} width={14} className={classes.rectangleAddIcon}/> <span className={classes.text}>Ավելացնել</span>
                        </>
                    }
                    // EVENTS
                    onClick={() => {
                        props.toggleAddModalHandler('open', 'add', 'body')
                    }}
                />
                {/* open table filters */}
                {
                    props.active === 3 ?
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
                                    <span className={classes.text}>Ֆիլտրեր</span>
                                </>
                            }
                            // Events
                            onClick={() => props.setFilters(!props.filters)}
                        />
                        :
                        null
                }
                {/* print products */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'contained-print'}/> <span className={classes.text}>Տպել</span>
                        </>
                    }
                />
                {/* sort products */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'outline-list'}/> <span className={classes.text}>Դասակարգել</span>
                        </>
                    }
                />
                {/* product export */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'contained-export'}/> <span className={classes.text}>Արտահանել</span>
                        </>
                    }
                />
                {/* filter status */}
                {
                    Object.keys(props.advancedSearchConfig).length ?
                        <CustomButton
                            className={classes.actionsButton}
                            children={
                                <>
                                    <FiFilter className={classes.filterStatus}/> <span className={classes.text}>Չեղարկել</span>
                                </>
                            }
                            // EVENTS
                            onClick={props.unfaltering}
                        />
                        :
                        null
                }
                {/* Full screen*/}
                <CustomButton
                    className={classes.actionsButton}
                    children={
                        props.screen ?
                            <>
                                <AspectRatioIcon className={classes.screenIcon} fontSize="small"/> <span className={classes.text}>Մեծացնել պատուհանը</span>
                            </>
                            :
                            <>
                                <RemoveFromQueueIcon className={classes.screenIcon} fontSize="small"/> <span className={classes.text}>Փոքրացնել պատուհանը</span>
                            </>
                    }
                    // EVENTS
                    onClick={() => {
                        props.setProductValues("screen", !props.screen)
                    }}
                />
                {/* delete products group */}
                <CustomButton
                    className={classes.actionsButton}
                    disabled={true}
                    children={
                        <>
                            <Icons type={'group-delete'} height={14} width={14} opacity={1} className={classes.deleteIcon}/> <span className={classes.text}>Ջնջել</span>
                        </>
                    }
                />
            </div>
            <div className={classes.viewWindow}>
                <CustomButton
                    className={props.active === 1 ? `${classes.viewButton} ${classes.viewButtonActive}` : classes.viewButton}
                    children={<ListIcon/>}
                    // EVENTS
                    onClick={() => changeView(1)}
                />
                <CustomButton
                    className={props.active === 2 ? `${classes.viewButton} ${classes.viewButtonActive}` : classes.viewButton}
                    children={<AppsIcon/>}
                    // EVENTS
                    onClick={() => changeView(2)}
                />
                <CustomButton
                    className={props.active === 3 ? `${classes.viewButton} ${classes.viewButtonActive}` : classes.viewButton}
                    children={<TableChartIcon fontSize="small"/>}
                    // EVENTS
                    onClick={() => changeView(3)}
                />
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