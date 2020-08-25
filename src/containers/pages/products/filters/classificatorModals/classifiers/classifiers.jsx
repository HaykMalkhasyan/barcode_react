import React from 'react'
import classes from './classifiers.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../components/UI/input/customInput/customInput"
import Grid from "@material-ui/core/Grid"
import SpinnerForContent from "../../../../../../components/UI/spinners/spinerForContent/spinnerForContent"
import Icons from "../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../components/UI/button/closeButton/closeButton";

const Classifiers = props => {

    const addHandler = () => {

        props.setGroupValues('modalType', 'add');
        props.setGroupValues('groupType', 'group');
        props.setGroupValues('modalGroup', false);
    };

    const editHandler = (event, item) => {
        event.stopPropagation();
        props.editModalHandleOpen(item);
    };

    const contentRender = (groups, groupActiveId, handleOpen, classifierCloseHandler, touched, searchValue) => {
        const result = [];

        if (groups && groups.length > 0) {

            for (let [index, item] of Object.entries(props.groups)) {
                if (item.id !== 0) {
                    if (touched) {
                        if (item.name.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
                            result.push(
                                <Grid key={item.id} item xs={3}>
                                    <div
                                        className={groupActiveId === item.id ? `${classes.classifiersItem} ${classes.selected}` : classes.classifiersItem}
                                        // Methods
                                        onClick={
                                            event => {
                                                event.stopPropagation();
                                                if (props.type === "edit") {
                                                    classifierCloseHandler();
                                                    props.getOnlySubgroupWithGroupId(item.id, 'classifierSubgroup');
                                                    props.setGroupValues('active', +index);
                                                    props.setGroupValues('open', `collapse-${item.id}`);
                                                }
                                            }
                                        }
                                    >
                                        {
                                            props.type === "edit" ?
                                                <CustomButton
                                                    className={groupActiveId === item.id ? `${classes.editButton} ${classes.editButtonSelected}` : classes.editButton}
                                                    children={
                                                        <Icons type={'edit'}/>
                                                    }
                                                    // Methods
                                                    onClick={event => editHandler(event, item)}
                                                />
                                                :
                                                null
                                        }
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                </Grid>
                            )
                        }
                    } else {
                        if (groupActiveId === item.id) {
                            result.unshift(
                                <Grid key={item.id} item xs={3}>
                                    <div
                                        className={`${classes.classifiersItem} ${classes.selected}`}
                                        // Methods
                                        onClick={
                                            event => {
                                                event.stopPropagation();
                                                if (props.type === "edit") {
                                                    classifierCloseHandler();
                                                    props.getOnlySubgroupWithGroupId(item.id, 'classifierSubgroup');
                                                    props.setGroupValues('active', +index);
                                                    props.setGroupValues('open', `collapse-${item.id}`);
                                                }
                                            }
                                        }
                                    >
                                        {
                                            props.type === "edit" ?
                                                <CustomButton
                                                    className={groupActiveId === item.id ? `${classes.editButton} ${classes.editButtonSelected}` : classes.editButton}
                                                    children={
                                                        <Icons type={'edit'}/>
                                                    }
                                                    // Methods
                                                    onClick={event => editHandler(event, item)}
                                                />
                                                :
                                                null
                                        }
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                </Grid>
                            )
                        } else {
                            result.push(
                                <Grid key={item.id} item xs={3}>
                                    <div
                                        className={classes.classifiersItem}
                                        // Methods
                                        onClick={
                                            event => {
                                                event.stopPropagation();
                                                if (props.type === "edit") {
                                                    classifierCloseHandler();
                                                    props.getOnlySubgroupWithGroupId(item.id, 'classifierSubgroup');
                                                    props.setGroupValues('active', +index);
                                                    props.setGroupValues('open', `collapse-${item.id}`);
                                                }
                                            }
                                        }
                                    >
                                        {
                                            props.type === "edit" ?
                                                <CustomButton
                                                    className={groupActiveId === item.id ? `${classes.editButton} ${classes.editButtonSelected}` : classes.editButton}
                                                    children={
                                                        <Icons type={'edit'}/>
                                                    }
                                                    // Methods
                                                    onClick={event => editHandler(event, item)}
                                                />
                                                :
                                                null
                                        }
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                </Grid>
                            )
                        }
                    }
                }
            }
            return result
        } else {
            return <SpinnerForContent color={'secondary'}/>
        }
    };

    const classifierSearchFocusHandler = () => {
        if (props.classifiersSearch.length > 0) {
            props.setGroupValues('touched', true)
        } else {
            props.setGroupValues('touched', true)
        }
    };

    const classifierSearchHandler = event => {
        props.setGroupValues(event.target.name, event.target.value)
    };

    return (
        <div className={classes.classifiers}>
            <header>
                <span>Դասակարգիչների ցանկ</span>
                <CloseButton onClick={props.classifierCloseHandler}/>
            </header>
            <div className={classes.description}>
                Սեղմելով ցանկի որևէ դասակարգչի վրա կարող եք տեսնել տվյալ դասակարգչի ենթախմբերը և կարող եք ավելացնել նոր դասակարգիչ։
            </div>
            <section>
                <header>
                    <CustomButton
                        className={classes.newClassifierButton}
                        children={
                            <>
                                <Icons type={'add'} className={classes.newClassifierButtonIcon}/>
                                <span className={classes.newClassifierButtonName}>Նոր դասակարգիչ</span>
                            </>
                        }
                        // Methods
                        onClick={addHandler}
                    />
                    <CustomInput
                        id={'classifier-search'}
                        inputType={'inner'}
                        type={'search'}
                        name={'classifiersSearch'}
                        label={
                            <span className={classes.searchIcon}>
                                <Icons type={'search'} className={classes.searchIconSvg}/>
                            </span>
                        }
                        classNameLabel={classes.searchClassifiersLabel}
                        classNameInput={classes.searchClassifiersInput}
                        value={props.classifiersSearch}
                        // Methods
                        onFocus={classifierSearchFocusHandler}
                        onChange={classifierSearchHandler}
                    />
                </header>
                <section /*ref={currentRef} onMouseMove={props.groups && props.groups.length > 0 ? mouseMoveHandler : null}*/>
                    <div className={classes.section}>
                        {/*{
                            props.groups && props.groups.length > 0 ?
                                <div ref={itemRef} className={classes.light} style={{left: left, top: top}}/>
                                :
                                null
                        }*/}
                        <Grid container spacing={1}>
                            {contentRender(props.groups, props.groupActiveId, props.handleOpen, props.classifierCloseHandler, props.touched, props.classifiersSearch)}
                        </Grid>
                    </div>
                </section>
            </section>
            <footer>
                <CustomButton
                    className={classes.footerButton}
                    children={
                        <>
                            <svg width={22.432} height={22.432} viewBox="0 0 22.432 22.432">
                                <path
                                    className={classes.footerButtonIcon}
                                    d="M22.892,15.161a.363.363,0,0,0-.363-.363h-7v-7a.363.363,0,0,0-.726,0v7h-7a.363.363,0,0,0,0,.726h7v7a.363.363,0,0,0,.726,0v-7h7A.363.363,0,0,0,22.892,15.161Z"
                                    transform="translate(11.216 -10.225) rotate(45)"
                                />
                            </svg>
                            <span className={classes.footerButtonName}>Փակել</span>
                        </>
                    }
                    // Methods
                    onClick={props.classifierCloseHandler}
                />
            </footer>
        </div>
    )
};

export default Classifiers