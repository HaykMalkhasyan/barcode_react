import React from 'react'
import classes from './customSearchWindow.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import CustomSearch from "../../../../../../components/customSearch/customSearch";
import CustomButton from "../../../../../../components/UI/button/customButton/custom-button";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const CustomSearchWindow = props => {

    return (
        <div className={classes.searchContainer}>
            <CustomButton
                className={classes.screenButton}
                children={
                    props.screen ?
                        <ArrowLeftIcon className={classes.screenIcon}/>
                        :
                        <ArrowRightIcon className={classes.screenIcon}/>
                }
                // EVENTS
                onClick={() => {
                    props.setProductValues("screen", !props.screen)
                }}
            />
            <CustomHeader
                name={'Որոնել'}
            />
            <CustomSearch
                drop={true}
                withButton={props.type === "products"}
                name={"item_name"}
                value={props.search}
                onChange={event => {
                    props.nameFiltered(event.target.value)
                }}
                onClick={props.onClick}
            />
        </div>
    )
};

export default CustomSearchWindow;