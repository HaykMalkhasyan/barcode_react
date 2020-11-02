import React from "react";
import classes from "./section-body.module.css";
import Grid from "@material-ui/core/Grid";
import SpinnerForContent from "../../../../../../../../components/UI/spinners/spinerForContent/spinnerForContent";
import GroupItem from "./group-item/group-item";
import cookie from "../../../../../../../../services/cookies";

const SectionBody = props => {

    const editHandler = item => {
        props.editModalHandleOpen(item);
    };

    const contentRender = (groups, groupActiveId, classifierCloseHandler, searchValue) => {
        const result = [];

        if (groups && groups.length > 1) {

            for (let [index, item] of Object.entries(props.groups)) {
                if (searchValue.length > 0) {
                    if (item[`title_${cookie.get("language") || "am"}`].toLowerCase().search(searchValue.toLowerCase()) !== -1) {
                        result.push(
                            <GroupItem
                                key={`group-item-${item.id}`}
                                type={props.type}
                                groupsEditMode={props.groupsEditMode}
                                groupLoader={props.groupLoader}
                                selected={groupActiveId === item.id}
                                item={item}
                                index={index}
                                // Methods
                                editHandler={editHandler}
                                checkGroup={props.checkGroup}

                            />
                        )
                    }
                } else {
                    if (groupActiveId === item.id) {
                        result.unshift(
                            <GroupItem
                                key={`group-item-${item.id}`}
                                type={props.type}
                                groupsEditMode={props.groupsEditMode}
                                groupLoader={props.groupLoader}
                                selected={groupActiveId === item.id}
                                item={item}
                                index={index}
                                // Methods
                                editHandler={editHandler}
                                checkGroup={props.checkGroup}
                            />
                        )
                    } else {
                        result.push(
                            <GroupItem
                                key={`group-item-${item.id}`}
                                type={props.type}
                                groupsEditMode={props.groupsEditMode}
                                groupLoader={props.groupLoader}
                                item={item}
                                index={index}
                                // Methods
                                editHandler={editHandler}
                                checkGroup={props.checkGroup}
                            />
                        )
                    }
                }
            }
            return result
        } else {
            if (props.allError === null) {
                return (
                    <div className={classes.errorWindow}>
                        <h6>Դասակարգիչների ցանկը դատարկ է</h6>
                    </div>
                )
            } else {
                return (
                    <div className={classes.errorWindow}>
                        <SpinnerForContent className={classes.spinner} color={'secondary'}/>
                        <h6>
                            Հարցումը ձախողվեց, ստուգեք ձեր ինտերնետի կապը։ Ցանցի բացակայության դեպքում կարող եք դիմել
                            Ձեր ինտերնետ ծառայության մատակարարին (ISP), իսկ առկայության դեպքում դիմեք մեր սպասարկման
                            կենտրոնին, հայցում ենք Ձեր ներողամտությունը․ Շնորհակալություն,
                        </h6>
                    </div>
                )
            }

        }
    };

    return (
        <section className={classes.section}>
            <div className={classes.content}>
                <Grid container spacing={1}>
                    {contentRender(props.groups, props.groupActiveId, props.classifierCloseHandler, props.classifiersSearch)}
                </Grid>
            </div>
        </section>
    )
}

export default SectionBody