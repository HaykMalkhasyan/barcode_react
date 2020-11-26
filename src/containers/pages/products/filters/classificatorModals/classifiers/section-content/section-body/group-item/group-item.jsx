import React from "react";
import classes from "./group-item.module.css";
import Icons from "../../../../../../../../../components/Icons/icons";
import cookies from "../../../../../../../../../services/cookies";
import Grid from "@material-ui/core/Grid";

const GroupItem = props => {

    const cls = [
        `background-transparent color-FF9D52 fill-747ad5 ${classes.editButton}`,
        props.selected ?
            `fill-fff ${classes.editButtonSelected}`
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
                className={props.selected ? `background-024059 color-fff font-size-12 ${classes.classifiersItem} ${classes.selected}` : `background-fff color-656565 font-size-12 ${classes.classifiersItem}`}
                // Methods
                onClick={
                    props.groupsEditMode ?
                        () => props.editHandler(props.item)
                        :
                        ()=> props.checkGroup(props.type, props.item, props.item.id, 'filter_subgroups', +props.index)
                }
            >
                {
                    props.type === "edit" ?
                        <span className={cls.join(" ")}>
                            <Icons type={'edit'} className={props.selected ? `fill-fff ${classes.activeIcon}` : `fill-024059 ${classes.icon}`}/>
                        </span>
                        :
                        null
                }
                <p>
                    {props.item[`title_${cookies.get('language') || 'am'}`]}
                </p>
                <div className={props.groupLoader === props.item.id ? `background-ff8927 ${classes.loading}` : classes.hide}/>
            </div>
        </Grid>
    )
}

export default GroupItem