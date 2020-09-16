import React from 'react'
import classes from './languagesMenu.module.css'
import FadeMenu from "../../components/UI/dropdownUI/dropdown";
import Lang from "./lang/lang";
import MenuItem from "@material-ui/core/MenuItem";

const LanguagesMenu = props => {

    return (
        <div className={classes.languageWindow}>
            <FadeMenu
                open={props.open}
                label={
                    <Lang
                        name={props.lang[props.activeLanguage].name}
                        image={`${process.env.PUBLIC_URL}/images/flags/${props.lang[props.activeLanguage].image}`}
                    />
                }
                // Methods
                handleClick={props.handleClick}
                handleClose={props.handleClose}
            >
                {
                    props.lang ?
                        Object.keys(props.lang).map(
                            item => {

                                return (
                                    <MenuItem key={`languages-${props.lang[item].id}`} onClick={() => props.setLanguage(item)}>
                                        <Lang
                                            type={'in'}
                                            name={props.lang[item].name}
                                            image={`${process.env.PUBLIC_URL}/images/flags/${props.lang[item].image}`}
                                        />
                                    </MenuItem>
                                )
                            }
                        )
                        :
                        null
                }
            </FadeMenu>
        </div>
    )
};

export default LanguagesMenu;