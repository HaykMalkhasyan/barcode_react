import React from "react";
import classes from "./group-item.module.css";
import CustomButton from "../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../components/Icons/icons";
import cookies from "../../../../../../../../../services/cookies";
import Grid from "@material-ui/core/Grid";

const GroupItem = props => {

    const cls = [
        classes.editButton,
        props.selected ?
            classes.editButtonSelected
            :
            '',
        props.groupsEditMode ?
            classes.editModeTrue
            :
            ''
    ]

    return (
        <Grid key={'classifiers-search-modal-' + props.item.id} item xs={3}>
            <div
                className={props.selected ? `${classes.classifiersItem} ${classes.selected}` : classes.classifiersItem}
                // Methods
                onClick={
                    () => {
                        props.groupsEditMode ?
                            props.editHandler(props.item)
                            :
                            props.checkGroup(props.type, props.item, props.item.id, 'classifierSubgroup', +props.index)
                    }
                }
            >
                {
                    props.type === "edit" ?
                        <CustomButton
                            className={cls.join(' ')}
                            children={
                                <Icons type={'edit'} className={props.selected ? classes.activeIcon : classes.icon}/>
                            }
                        />
                        :
                        null
                }
                <p>
                    {props.item[`title_${cookies.get('language') || 'am'}`]}
                </p>
                {
                    props.groupLoader === props.item.id ?
                        <div className={classes.loading}/>
                        :
                        null
                }
            </div>
        </Grid>
    )
}

export default GroupItem