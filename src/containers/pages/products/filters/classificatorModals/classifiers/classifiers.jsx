import React from 'react'
import classes from './classifiers.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import Grid from "@material-ui/core/Grid"
import SpinnerForContent from "../../../../../../components/UI/spinners/spinerForContent/spinnerForContent"
import Icons from "../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../components/UI/button/closeButton/closeButton";
import CustomSearch from "../../../../../../components/customSearch/customSearch";
import cookies from "../../../../../../services/cookies";

const Classifiers = props => {

    const addHandler = () => {

        props.setGroupValues('modalType', 'add');
        props.setGroupValues('groupType', 'group');
        props.setGroupValues('modalGroup', null);
        props.setGroupValues('initialModalGroup', props.type);
    };

    const editHandler = (event, item) => {
        event.stopPropagation();
        props.editModalHandleOpen(item);
    };

    const checkItem = (array, elem) => {
        for (let item of array) {
            if (item.id === elem.id && item.name === elem.name) {
                return false
            }
        }
        return true
    };

    const contentRender = (groups, groupActiveId, handleOpen, classifierCloseHandler, touched, searchValue) => {
        const result = [];

        if (groups && groups.length > 1) {

            for (let [index, item] of Object.entries(props.groups)) {
                if (touched) {
                    if (item.name.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
                        result.push(
                            <Grid key={'classifiers-search-modal-' + item.id} item xs={3}>
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
                                            } else if (props.type === 'select') {
                                                const classifiers = {...props.classifiers};
                                                const classifiersArray = [...classifiers.classifiers];
                                                if (checkItem(classifiersArray, item)) {
                                                    classifiersArray.push(item)
                                                }
                                                classifiers.classifiers = classifiersArray;
                                                props.setProductValues('classifiers', classifiers);
                                                props.importGroupInProduct(props.initialOpen, 'close');
                                                classifierCloseHandler();
                                            }
                                        }
                                    }
                                >
                                    {
                                        props.type === "edit" ?
                                            <CustomButton
                                                className={groupActiveId === item.id ? `${classes.editButton} ${classes.editButtonSelected}` : classes.editButton}
                                                children={
                                                    <Icons type={'edit'}
                                                           className={groupActiveId === item.id ? classes.activeIcon : classes.icon}/>
                                                }
                                                // Methods
                                                onClick={event => editHandler(event, item)}
                                            />
                                            :
                                            null
                                    }
                                    <p>
                                        {item[`title_${cookies.get('language') || 'am'}`]}
                                    </p>
                                </div>
                            </Grid>
                        )
                    }
                } else {
                    if (groupActiveId === item.id) {
                        result.unshift(
                            <Grid key={'classifiers--modal-' + item.id} item xs={3}>
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
                                            } else if (props.type === 'select') {
                                                console.log('select')
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
                                        {item[`title_${cookies.get('language') || 'am'}`]}
                                    </p>
                                </div>
                            </Grid>
                        )
                    } else {
                        result.push(
                            <Grid key={'classifiers-res-modal-' + item.id} item xs={3}>
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
                                            } else if (props.type === 'select') {
                                                const classifiers = {...props.classifiers};
                                                const classifiersArray = [...classifiers.classifiers];
                                                if (checkItem(classifiersArray, item)) {
                                                    classifiersArray.push(item)
                                                }
                                                classifiers.classifiers = classifiersArray;
                                                props.setProductValues('classifiers', classifiers);
                                                props.importGroupInProduct(props.initialOpen, 'close');
                                                classifierCloseHandler();
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
                                        {item[`title_${cookies.get('language') || 'am'}`]}
                                    </p>
                                </div>
                            </Grid>
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
                <CloseButton
                    onClick={
                        props.initialOpen === null ?
                            () => {
                                props.setGroupValues('initialModalGroup', null);
                                props.classifierCloseHandler()
                            }
                            :
                            () => {
                                props.importGroupInProduct(props.initialOpen, 'close');
                                props.classifierCloseHandler()
                            }
                    }
                />
            </header>
            <section>
                <header>
                    <div>
                        <CustomButton
                            className={classes.newClassifierButton}
                            children={
                                <Icons type={'add'} width={11} height={11} className={classes.newClassifierButtonIcon}/>
                            }
                            // Methods
                            onClick={addHandler}
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
                            onFocus={classifierSearchFocusHandler}
                            onChange={classifierSearchHandler}
                        />
                    </div>
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
                    children={'Փակել'}
                    // Methods
                    onClick={
                        props.initialOpen === null ?
                            () => {
                                props.setGroupValues('initialModalGroup', null);
                                props.classifierCloseHandler()
                            }
                            :
                            () => {
                                props.importGroupInProduct(props.initialOpen, 'close');
                                props.classifierCloseHandler()
                            }
                    }
                />
            </footer>
        </div>
    )
};

export default Classifiers