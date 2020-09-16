import React from 'react'
import classes from './modalContent.module.css'
import CustomSearch from "../../../../../../../../components/customSearch/customSearch";
import Tree from "../../../../../../../../components/tree/tree";
import SpinnerForContent from "../../../../../../../../components/UI/spinners/spinerForContent/spinnerForContent";

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
                {
                    props.customSubgroup ?
                        <Tree
                            selectSub={props.initialSub ? props.initialSub[props.group.id] : null}
                            label={'Բոլորը'}
                            type={'select'}
                            group={props.group}
                            customSubgroup={props.customSubgroup}
                            collapsed={props.collapsed}
                            searchResult={props.searchResult}
                            // collapsedGroup={props.collapsedGroup}
                            // Methods
                            subCollapsed={props.subCollapsed}
                            // subCollapsedGroup={props.subCollapsedGroup}
                            select={props.select}
                        />
                        :
                        <SpinnerForContent/>
                }
            </div>
        </section>
    )
};

export default ModalContent;