import React from 'react'
import classes from './customSearchWindow.module.css'
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";
import CustomSearch from "../../../../../../components/customSearch/customSearch";

const CustomSearchWindow = props => {

    return (
        <div className={classes.searchContainer}>
            <CustomHeader
                name={'Որոնել'}
            />
            <CustomSearch
                drop={true}
                withButton={true}
                name={"item_name"}
                value={props.search}
                onChange={event => {
                    props.nameFiltered(event.target.value)
                }}
            />
        </div>
    )
};

export default CustomSearchWindow;