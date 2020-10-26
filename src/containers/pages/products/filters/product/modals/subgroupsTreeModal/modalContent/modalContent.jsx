import React from 'react'
import classes from './modalContent.module.css'
import CustomSearch from "../../../../../../../../components/customSearch/customSearch";

const ModalContent = props => {

    return (
        <section className={classes.modalContent}>
            <CustomSearch
                drop={false}
                withButton={false}
                id={'modalSearch'}
                type={'search'}
                name={'search'}
                value={props.search}
                placeholder={'Որոնում'}
                // Methods
                onChange={event => props.searchChangeHandler(event.target.name, event.target.value)}
            />
            <div className={classes.content}>

            </div>
        </section>
    )
};

export default ModalContent;