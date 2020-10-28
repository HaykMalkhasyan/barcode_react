import React, {useState} from 'react'
import classes from './content.module.css'
import Grid from "@material-ui/core/Grid"
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput"
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";
import Alert from "@material-ui/lab/Alert";
import CustomCheckbox from "../../../../../../../components/UI/input/customCheckbox/customCheckbox";
import Icons from "../../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../../components/UI/button/closeButton/closeButton";
import cookie from "../../../../../../../services/cookies";

const Content = props => {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [dataError, setDataError] = useState(null);

    const imageChangeHandler = file => {
        if (file) {
            setFile(file)
        } else {
            setFile(null)
        }
    };

    const checkboxChangeHandler = value => {
        let newGroup = {...props.newGroup};
        newGroup.required_group = value;
        props.setGroupValues('newGroup', newGroup)
    };

    const nameChangeHandler = (name, value) => {
        props.setGroupValues(name, value);
    }

    const confirmHandler = event => {
        event.preventDefault();

        let data = {};
        if (props.groupName && props.groupName.length > 0) {
            setDataError(false);
            if (props.groupType === "group") {
                data.title = props.groupName;
                // data.required_group = props.newGroup.required_group;
                props.groupAction(data);
            } else {
                data.name = props.groupName;
                if (props.modalType === "add") {
                    data.cat_id = props.group.id;
                    if (props.groupType === "inGroup") {
                        data.parent_id = "0";
                    } else if (props.groupType === "subgroup") {
                        data.parent_id = props.own_id;
                    }
                } else if (props.modalType === "edit") {
                    data.id = props.newSubgroup.id;
                    data.parent_id = props.newSubgroup.parent_id;
                    data.cat_id = props.newSubgroup.cat_id;
                }
                if (file !== null && file.type.split('/')[0] === 'image') {
                    setFileError(false)
                    data.image = `${Date.now()}_${file.name}`;
                } else if (file !== null && file.type.split('/')[0] !== 'image') {
                    setFileError(true)
                }
                if (file !== null && fileError === false) {
                    props.uploadImage(props.groupType, file, data, props.modalType);
                } else {
                    if (props.groupType === 'group') {
                        delete data.image;
                        props.groupAction(data)
                    }
                    if (props.groupType === 'inGroup' || props.groupType === 'subgroup') {
                        data.image = '';
                        props.subGroupAction(data)
                    }
                }
                // props.backPage(props.initialModalGroup, props.initialStatus)
            }
        } else {
            setDataError(true)
            if (file !== null && file.type.split('/')[0] !== 'image') {
                setFileError(true)
            } else {
                setFileError(false)
            }
        }
    };
    return (
        <div className={classes.main}>
            <header>
                <div>
                    <CustomButton
                        className={`${classes.backButton} ${classes.modalButton}`}
                        children={
                            <Icons type={'back-page'} className={classes.backButtonIcon}/>
                        }
                        // Methods
                        onClick={() => {
                            props.backPage(props.initialModalGroup, props.initialStatus)
                        }}
                    />
                </div>
                <div>
                    <span className={classes.modalLabel}>{props.label}</span>
                </div>
                <div>
                    <CloseButton
                        onClick={
                            () => {
                                setFile(null);
                                props.closeHandler()
                            }
                        }
                    />
                </div>
            </header>
            <div className={classes.mainContent}>
                <form onSubmit={confirmHandler}>
                    <Grid container spacing={4}>
                        {
                            props.groupType === "subgroup" || props.groupType === "inGroup" ?
                                <Grid item xs={12} md={5}>
                                    <div className={classes.imageWindow}>
                                        <CustomInput
                                            id={'classifierImage'}
                                            hidden={true}
                                            accept={"image/*"}
                                            type={'file'}
                                            classNameLabel={classes.classNameLabel}
                                            label={
                                                props.modalType === 'edit' ?
                                                    file ?
                                                        <img src={URL.createObjectURL(file)} alt="upload"/>
                                                        :
                                                        props.subgroup && props.subgroup.image.length > 0 ?
                                                            <img src={props.subgroup.image[0].image} alt="upload"/>
                                                            :
                                                            <WallpaperIcon style={{fontSize: 100}}/>
                                                    :
                                                    file ?
                                                        <img src={URL.createObjectURL(file)} alt="upload"/>
                                                        :
                                                        <WallpaperIcon style={{fontSize: 100}}/>
                                            }
                                            onChange={event => imageChangeHandler(event.target.files[0])}
                                        />
                                    </div>
                                </Grid>
                                :
                                null
                        }
                        <Grid item xs={12}
                              md={props.groupType === "subgroup" || props.groupType === "inGroup" ? 7 : 12}>
                            <div className={classes.dataWindow}>
                                <div>
                                    <div className={classes.dataArea}>
                                        <CustomInput
                                            id={'name'}
                                            placeholder={'Անվանում'}
                                            name={'groupName'}
                                            classNameInput={classes.nameInput}
                                            value={props.groupName}
                                            onChange={event => nameChangeHandler(event.target.name, event.target.value)}
                                        />
                                        {
                                            props.groupType === 'group' ?
                                                <CustomCheckbox
                                                    id={'group_type'}
                                                    checked={props.newGroup.required_group}
                                                    value={props.newGroup.required_group}
                                                    label={'Պարտադիր'}
                                                    status={props.newGroup.required_group}
                                                    // Methods
                                                    onChange={event => checkboxChangeHandler(event.target.checked)}
                                                />
                                                :
                                                null
                                        }
                                    </div>
                                    <div className={classes.errorWindow}>
                                        <div>
                                            <Alert classes={{root: fileError ? classes.alertShow : classes.alertHidden}}
                                                   variant="filled" severity="error">
                                                Ընտրված ֆայլը չի հանդիսանում նկար
                                            </Alert>
                                        </div>
                                        <div>
                                            <Alert classes={{root: dataError ? classes.alertShow : classes.alertHidden}}
                                                   variant="filled" severity="error">
                                                Անվանման դաշտը լրացված չե, որպիսզի կարողանաք ստեղծել նոր դասակարգիչ լրացրեք
                                                անվանման
                                                դաշտը և հաստատեք
                                            </Alert>
                                        </div>
                                        <Alert classes={{root: props.error ? classes.alertShow : classes.alertHidden}}
                                               variant="filled" severity="error">
                                            Մուտքագրված արժեքները սխալ են
                                        </Alert>
                                    </div>
                                </div>
                                <footer>
                                    <ConfirmButton
                                        className={classes.confirmButton}
                                        type={'submit'}
                                        onClick={confirmHandler}
                                    />
                                </footer>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
};

export default Content