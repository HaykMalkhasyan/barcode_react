import React from 'react'
import classes from './classifiers.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../components/UI/input/customInput/customInput"
import Grid from "@material-ui/core/Grid"
import SpinnerForContent from "../../../../../../components/UI/spinerForContent/spinnerForContent"
import EditIcon from '@material-ui/icons/Edit'

const Classifiers = props => {
    // const [left, setLeft] = useState(0);
    // const [top, setTop] = useState(0);
    // const currentRef = useRef(null);
    // const itemRef = useRef(null);
    //
    // const mouseMoveHandler = event => {
    //     setLeft(event.clientX - currentRef.current.getBoundingClientRect().x);
    //     setTop(event.clientY - currentRef.current.getBoundingClientRect().y);
    // };

    const addHandler = () => {

        props.setGroupValues('modalType', 'add');
        props.setGroupValues('groupType', 'group');
        props.setGroupValues('modalGroup', false);
    };

    const editHandler = (event, item) => {

        event.stopPropagation();
        const newGroup = {...props.newGroup};
        props.getGroup(item.id);
        newGroup.name = item.name;
        newGroup.required_group = item.required_group;
        newGroup.image = item.image;
        props.setGroupValues('newGroup', newGroup);
        props.setGroupValues('modalType', 'edit');
        props.setGroupValues('groupType', 'group');
        props.setGroupValues('modalGroup', false);
    };

    const contentRender = (groups, groupActiveId, handleOpen, classifierCloseHandler) => {
        const result = [];

        if (groups && groups.length > 0) {

            for (let [index, item] of Object.entries(props.groups)) {
                result.push(
                    <Grid key={item.id} item xs={3}>
                        <div
                            className={groupActiveId === item.id ? `${classes.classifiersItem} ${classes.selected}` : classes.classifiersItem}
                            // Methods
                            onClick={
                                () => {
                                    classifierCloseHandler();
                                    handleOpen(item, index, groups[index - 1], groups[index + 1])
                                }
                            }
                        >
                            <CustomButton
                                className={groupActiveId === item.id ? `${classes.editButton} ${classes.editButtonSelected}` : classes.editButton}
                                children={
                                    <EditIcon fontSize='small'/>
                                }
                                // Methods
                                onClick={event => editHandler(event, item)}
                            />
                            <p>
                                {item.name}
                            </p>
                        </div>
                    </Grid>
                )
            }
            return result
        } else {
            return <SpinnerForContent color={'secondary'}/>
        }
    };

    return (
        <div className={classes.classifiers}>
            <header>
                <CustomButton
                    className={classes.closeButton}
                    children={
                        <svg width={9.196} height={9.169} viewBox="0 0 9.196 9.169">
                            <path
                                className={classes.closeButtonIcon}
                                d="M21.719,13.2l-3.661,3.672a.164.164,0,0,1-.237,0L14.149,13.2a.164.164,0,0,0-.237,0h0a.164.164,0,0,0,0,.237l3.672,3.672a.164.164,0,0,1,0,.237L13.9,21.019a.164.164,0,0,0,0,.237h0a.164.164,0,0,0,.237,0l3.672-3.672a.164.164,0,0,1,.237,0l3.672,3.683a.164.164,0,0,0,.237,0h0a.164.164,0,0,0,0-.237L18.3,17.359a.164.164,0,0,1,0-.237l3.672-3.672a.164.164,0,0,0,0-.237h0A.168.168,0,0,0,21.719,13.2Z"
                                transform="translate(-13.323 -12.65)"
                            />
                        </svg>
                    }
                    // Methods
                    onClick={props.classifierCloseHandler}
                />
                <span>Դասակարգիչների ցանկ</span>
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
                                <svg width={13.362} height={13.362} viewBox="0 0 13.362 13.362">
                                    <g transform="translate(6.691 0.727) rotate(45)">
                                        <path
                                            className={classes.newClassifierButtonIcon}
                                            d="M8.088.052,4.326,3.826a.168.168,0,0,1-.244,0L.308.052a.168.168,0,0,0-.244,0h0A.168.168,0,0,0,.064.3L3.838,4.07a.168.168,0,0,1,0,.244L.052,8.088a.168.168,0,0,0,0,.244h0a.168.168,0,0,0,.244,0L4.07,4.558a.168.168,0,0,1,.244,0L8.088,8.344a.168.168,0,0,0,.244,0h0a.168.168,0,0,0,0-.244L4.57,4.326a.168.168,0,0,1,0-.244L8.344.308a.168.168,0,0,0,0-.244h0A.173.173,0,0,0,8.088.052Z"
                                        />
                                    </g>
                                </svg>
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
                        label={
                            <span className={classes.searchIcon}>
                                <svg width={19} height={22} viewBox="0 0 19.939 23.047">
                                    <g transform="translate(0.101 0.1)">
                                      <g transform="translate(0 0)">
                                        <path
                                            className={classes.searchIconSvg}
                                            d="M17.238,22.294l-3.673-4.87a1.39,1.39,0,0,1-.1-1.519l-.892-1.182a8.084,8.084,0,1,1,.874-.687l.905,1.2a1.388,1.388,0,0,1,1.432.516l3.673,4.87a1.389,1.389,0,0,1-2.219,1.673ZM1.111,8.056A6.944,6.944,0,1,0,8.055,1.112,6.952,6.952,0,0,0,1.111,8.056Z"
                                        />
                                      </g>
                                    </g>
                                  </svg>
                            </span>
                        }
                        classNameLabel={classes.searchClassifiersLabel}
                        classNameInput={classes.searchClassifiersInput}
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
                            {contentRender(props.groups, props.groupActiveId, props.handleOpen, props.classifierCloseHandler)}
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