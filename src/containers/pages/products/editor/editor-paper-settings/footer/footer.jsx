import React from 'react'
import classes from './footer.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";

const Footer = props => {

    return (
        <footer className={classes.footer}>
            <div>
                <CustomButton
                    className={classes.labels}
                    children={'Շաբլոններ'}
                />
            </div>
            <div className={classes.actionButtons}>
                <CustomButton
                    className={classes.actionButton}
                    children={'Ստեղծել պիտակ'}
                />
                <CustomButton
                    className={classes.actionButton}
                    children={'Չեղարկել'}
                />
            </div>
        </footer>
    )
};

export default Footer;