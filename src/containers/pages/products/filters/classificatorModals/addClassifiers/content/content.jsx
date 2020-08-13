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

        switch (props.groupType) {
            case 'group': {
                let newGroup = {...props.newGroup};
                newGroup[name] = value;
                props.setGroupValues('newGroup', newGroup);
                break;
            }
            case 'subgroup':
            case 'inGroup': {
                let newSubgroup = {...props.newSubgroup};
                newSubgroup[name] = value;
                props.setGroupValues('newSubgroup', newSubgroup);
                break;
            }
            default: break;
        }
    };

    const confirmHandler = event => {
        event.preventDefault();

        let data = {};

        if (file !== null && file.type.split('/')[0] !== 'image') {
            setFileError(true)
        } else {
            setFileError(false)
        }

            switch (props.groupType) {
                case 'group': {
                    if (props.newGroup.name.length === 0) {
                        setDataError(true)
                    } else {
                        setDataError(false);
                        data.name = props.newGroup.name;
                        data.required_group = props.newGroup.required_group;
                        if (file !== null && props.modalType === 'add') {
                            data.image = [{name: `${Date.now()}_${file.name}`}];
                        }
                        data.group_type = '1';
                    }
                    break;
                }
                case 'subgroup': {
                    if (props.newSubgroup.name.length === 0) {
                        setDataError(true)
                    } else {
                        setDataError(false);
                        if (props.modalType === 'edit') {
                            data = props.subgroup;
                            data.name = props.newSubgroup.name;
                            if (file !== null) {
                                data.image = [{name: `${Date.now()}_${file.name}`}];
                            }
                            data.group_id = {
                                group_type: "1",
                            };
                            data.active = 1;

                        } else if (props.modalType === 'add') {
                            data.name = props.newSubgroup.name;
                            if (file !== null) {
                                data.image = [{name: `${Date.now()}_${file.name}`}];
                            } else {
                                data.image = []
                            }
                            if (props.subgroup.parent_id.length > 0 || props.subgroup.parent_id === "") {
                                data.parent_id = +props.subgroup.id
                            } else if (props.subgroup.parent_id === undefined) {
                                data.parent_id = ""
                            }
                            data.group_id = {
                                id: props.group.id,
                                name: props.group.name,
                                group_type: "1",
                            };
                        }
                    }
                    break;
                }
                case 'inGroup': {
                    data.name = props.newSubgroup.name;
                    if (file !== null) {
                        data.image = [{name: `${Date.now()}_${file.name}`}];
                    }
                    data.parent_id = "";
                    data.group_id = {
                        id: props.group.id,
                        name: props.group.name,
                        group_type: "1",
                    };
                    break;
                }
                default:
                    break;
            }

            if (file !== null) {
                props.uploadImage(props.groupType, file, data, props.modalType);
            } else {
                if (props.groupType === 'group') {
                    delete data.image;
                    if (props.modalType === 'add') {
                        props.addGroup(data)
                    } else if (props.modalType === 'edit') {
                        props.editGroup(data)
                    }
                }
                if (props.groupType === 'inGroup' || props.groupType === 'subgroup') {
                    data.image = [];
                    if (props.modalType === 'add') {
                        props.addSubgroup(data)
                    } else if (props.modalType === 'edit') {
                        props.editSubgroup(data)
                    }
                }

            }
            props.closeHandler('back')

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
                        onClick={props.closeHandler.bind(this, 'back')}
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
                                <Grid item md={5}>
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
                                                        props.subgroup &&  props.subgroup.image.length > 0 ?
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
                        <Grid item md={props.groupType === "subgroup" || props.groupType === "inGroup" ? 7 : 12}>
                            <div className={classes.dataWindow}>
                                <div>
                                    <div className={classes.dataArea}>
                                        <CustomInput
                                            id={'name'}
                                            placeholder={'Անվանում'}
                                            name={'name'}
                                            classNameInput={classes.nameInput}
                                            value={props.groupType === 'group' ? props.newGroup.name : props.newSubgroup.name}
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
                                        <Alert classes={{root: fileError ? classes.alertShow : classes.alertHidden}}
                                               variant="filled" severity="error">
                                            Ընտրված ֆայլը չի հանդիսանում նկար
                                        </Alert>
                                        <Alert classes={{root: dataError ? classes.alertShow : classes.alertHidden}}
                                               variant="filled" severity="error">
                                            Անվանման դաշտը լրացված չե, որպիսզի կարողանաք ստեղծել նոր դասակարգիչ լրացրեք անվանման
                                            դաշտը և հաստատեք
                                        </Alert>
                                        <Alert classes={{root: props.error ? classes.alertShow : classes.alertHidden}}
                                               variant="filled" severity="error">
                                            Մուտքագրված արժեքները սխալ են
                                        </Alert>
                                    </div>
                                </div>
                                <footer>
                                    <ConfirmButton
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