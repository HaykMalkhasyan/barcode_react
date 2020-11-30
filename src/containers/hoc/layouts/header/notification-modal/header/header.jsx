import React from 'react'
import classes from './header.module.css'

const Header = props => {

    return (
        <header className={classes.header}>
            <h1>Ծանուցումներ</h1>
            <span>Դուք ունեք {props.count} նոր ծանուցում</span>
        </header>
    )
};

export default Header;