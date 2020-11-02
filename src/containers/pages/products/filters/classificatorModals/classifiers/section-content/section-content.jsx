import React from "react";
import classes from "./section-content.module.css";
import SectionHeader from "./section-header/section-header";
import SectionBody from "./section-body/section-body";

const SectionContent = props => {

    return (
        <section className={classes.section}>
            <SectionHeader
                classifiersSearch={props.classifiersSearch}
                groupsEditMode={props.groupsEditMode}
                // Methods
                addHandler={props.addHandler}
                classifierSearchHandler={props.classifierSearchHandler}
                setGroupValues={props.setGroupValues}
            />
            <SectionBody
                groups={props.groups}
                groupActiveId={props.groupActiveId}
                classifiersSearch={props.classifiersSearch}
                type={props.type}
                allError={props.allError}
                groupsEditMode={props.groupsEditMode}
                groupLoader={props.groupLoader}
                // Methods
                classifierCloseHandler={props.classifierCloseHandler}
                editModalHandleOpen={props.editModalHandleOpen}
                checkGroup={props.checkGroup}

            />
        </section>
    )
}

export default SectionContent