import React from 'react'
import classes from './customSearchWindow.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../components/Icons/icons";
import CustomInput from "../../../../../../components/UI/input/customInput/customInput";
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";

const CustomSearchWindow = props => {

    return (
        <div className={classes.searchContainer}>
            <CustomHeader
                name={'Որոնել'}
            />
            <div className={classes.searchBorder}>
                <div className={classes.dropDownWindow}>
                    <CustomButton
                        className={classes.dropDownBtn}
                        children={
                            <>
                                <span>Բոլորը</span>
                                <Icons type={'bottom-angle'} className={classes.bottomAngle}/>
                            </>
                        }
                    />
                </div>
                <CustomInput
                    classNameInput={classes.searchInput}
                    type={'text'}
                />
                <div className={classes.searchSpecific}>
                    <CustomButton
                        className={classes.customSearchBtn}
                        children={<Icons type={'search'} className={classes.customSearchIcon}/>}
                    />
                </div>
            </div>
        </div>
    )
};

export default CustomSearchWindow;