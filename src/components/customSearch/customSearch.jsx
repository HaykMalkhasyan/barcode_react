import React from 'react'
import classes from './customSearch.module.css'
import CustomButton from "../UI/button/customButton/customButton";
import Icons from "../Icons/icons";
import CustomInput from "../UI/input/customInput/customInput";

const CustomSearch = props => {

    return (
        <div className={props.className || classes.searchBorder}>
            {
                !props.withButton && !props.drop ?
                    <span className={classes.searchIcon}>
                        <Icons type={'search'}/>
                    </span>
                    :
                    null
            }

            {
                props.drop ?
                    <div className={classes.dropDownWindow}>
                        <CustomButton
                            className={`background-F9F9F9 color-5A5A5A font-size-9 ${classes.dropDownBtn}`}
                            children={
                                <>
                                    <span>Բոլորը</span>
                                    <Icons type={'bottom-angle'} className="fill-5A5A5A"/>
                                </>
                            }
                        />
                    </div>
                    :
                    null
            }
            <CustomInput
                id={props.id}
                classNameInput={`${props.withButton ? `background-fff color-483A3A font-size-15 ${classes.searchInput}` : `background-fff color-483A3A font-size-15 ${classes.searchInput} ${classes.fullWidth}`} ${props.drop ? '' : classes.withoutDrop} ${props.withButton && props.drop ? '' : classes.without}`}
                name={props.name}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                // Methods
                onFocus={props.onFocus}
                onChange={props.onChange}
            />
            {
                props.withButton ?
                    <div className={classes.searchSpecific}>
                        <CustomButton
                            className={`background-fff ${classes.customSearchBtn}`}
                            children={<Icons type={'search'} className={`fill-ff8927 stroke-fff ${classes.customSearchIcon}`}/>}
                        />
                    </div>
                    :
                    null
            }
        </div>
    )
};

export default CustomSearch;