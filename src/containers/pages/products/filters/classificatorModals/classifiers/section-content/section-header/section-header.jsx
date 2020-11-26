import React from "react";
import classes from "./section-header.module.css";
import CustomButton from "../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../components/Icons/icons";
import CustomSearch from "../../../../../../../../components/customSearch/customSearch";

const SectionHeader = props => {

    const cls_editMode = [
        `background-transparent ${classes.editMode}`,
        props.groupsEditMode ?
            classes.editModeTrue:
            ''
    ]

    return (
        <header className={classes.header}>
            <div>
                <CustomButton
                    className={`background-3EC300 ${classes.newClassifierButton}`}
                    children={
                        <Icons type={'add'} width={11} height={11} className={`fill-fff stroke-fff ${classes.newClassifierButtonIcon}`}/>
                    }
                    // Methods
                    onClick={props.addHandler}
                />
                <CustomButton
                    className={cls_editMode.join(' ')}
                    children={
                        <Icons type={'contained-edit'} opacity={1} className={`fill-7b7979 stroke-transparent ${classes.editModeButtonIcon}`}/>
                    }
                    // Methods
                    onClick={() => {
                        props.setGroupValues('groupsEditMode', !props.groupsEditMode)
                    }}
                />
            </div>
            <div>
                <CustomSearch
                    drop={true}
                    withButton={false}
                    id={'classifier-search'}
                    type={'search'}
                    name={'classifiersSearch'}
                    value={props.classifiersSearch}
                    // Methods
                    onChange={props.classifierSearchHandler}
                />
            </div>
        </header>
    )
}

export default SectionHeader