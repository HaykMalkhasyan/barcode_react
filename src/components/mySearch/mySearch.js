import React from "react";
import classes from './mySearch.module.css'
import SearchIcon from '@material-ui/icons/Search'
import ButtonUi from "../buttons/buttonUi";

const MySearch = props => {

    return (
        <div className={classes.mainWindow}>
            <ButtonUi
                borderRadius={'50%'}
                padding={2}
                width={'auto'}
                height={'auto'}
                color={'primary'}
                className={classes.icon}
            >
                <SearchIcon fontSize='small'/>
            </ButtonUi>
            {
                props.hasLabel ?
                    <label className='m-0 px-1' htmlFor={props.id}>
                        <h3 className='m-0'>
                            {props.label}
                        </h3>
                    </label>
                    :
                    null
            }
            <input
                className={classes.srchInput}
                id={props.id}
                type={props.type}
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default MySearch