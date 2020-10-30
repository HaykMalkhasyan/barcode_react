import React from 'react'
import classes from './classifiers.module.css'
import HeaderContent from "./header-content/header-content";
import FooterContent from "./footer-content/footer-content";
import SectionContent from "./section-content/section-content";

const Classifiers = props => {

    const addHandler = () => {
        props.addGroup({title: 'Նոր Դասակարգիչ'})
    };

    const classifierSearchHandler = event => {
        props.setGroupValues(event.target.name, event.target.value)
    };

    return (
        <div className={classes.classifiers}>
            <HeaderContent
                label={"Դասակարգիչների ցանկ"}
                initialOpen={props.initialOpen}
                // Methods
                setGroupValues={props.setGroupValues}
                importGroupInProduct={props.importGroupInProduct}
                classifierCloseHandler={props.classifierCloseHandler}
            />
            <SectionContent
                classifiersSearch={props.classifiersSearch}
                groupsEditMode={props.groupsEditMode}
                // Methods
                groups={props.groups}
                groupActiveId={props.groupActiveId}
                type={props.type}
                allError={props.allError}
                addHandler={addHandler}
                classifierSearchHandler={classifierSearchHandler}
                classifierCloseHandler={props.classifierCloseHandler}
                editModalHandleOpen={props.editModalHandleOpen}
                checkGroup={props.checkGroup}
                setGroupValues={props.setGroupValues}
            />
            <FooterContent
                initialOpen={props.initialOpen}
                // Methods
                setGroupValues={props.setGroupValues}
                classifierCloseHandler={props.classifierCloseHandler}
                importGroupInProduct={props.importGroupInProduct}
            />
        </div>
    )
};

export default Classifiers