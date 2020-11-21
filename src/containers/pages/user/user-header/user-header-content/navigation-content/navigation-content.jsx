import React from "react";
import classes from "./navigation-content.module.css";
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";

const NavigationContent = props => {

    return (
        <nav className={classes.tabs}>
            <ul>
                {
                    props.data.length ?
                        props.data.map(item => {

                            return (
                                <li key={`user-navigation-${item.id}`}>
                                    <CustomButton
                                        className={props.active === item.id ? `${classes.tabsButton} ${classes.active}` : classes.tabsButton}
                                        children={item.name}
                                        // Methods
                                        onClick={() => {
                                            props.selectTab(item.id)
                                        }}
                                    />
                                </li>
                            )
                        })
                        :
                        null
                }
            </ul>
        </nav>
    )
}

export default NavigationContent