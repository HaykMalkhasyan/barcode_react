import React from 'react'
import classes from './header.module.css'

const Header = props => {

    return (
        <header className={`background-fff ${classes.header}`}>
            <h1 className="color-024059 font-size-20">Ծանուցումներ</h1>
            <span className="color-ff8927">Դուք ունեք {props.count} նոր ծանուցում</span>
        </header>
    )
};

export default Header;