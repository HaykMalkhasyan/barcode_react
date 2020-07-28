import React, {useState} from 'react'
import classes from './content.module.css'
import Grid from "@material-ui/core/Grid"
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput"
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";
import Alert from "@material-ui/lab/Alert";

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
        let newGroup = {...props.newGroup};
        newGroup[name] = value;
        props.setGroupValues('newGroup', newGroup)
    };

    const confirmHandler = () => {

        const data = {};

        if (file === null || file.type.split('/')[0] !== 'image') {
            setFileError(true)
        } else {
            setFileError(false)
        }

        if (props.newGroup.name.length === 0) {
            setDataError(true)
        } else {
            setDataError(false)
        }

        if (file !== null && props.newGroup.name.length > 0) {
            switch (props.groupType) {
                case 'group': {
                    if (props.modalType === 'edit') {
                        data.id = props.subgroup.id;
                    }
                    data.name = props.newGroup.name;
                    data.required_group = props.newGroup.required_group;
                    data.image = `${Date.now()}_${file.name}`;
                    data.group_type = '1';
                    break;
                }
                case 'subgroup': {
                    if (props.modalType === 'edit') {
                        data.id = props.subgroup.id;
                    }
                    data.name = props.newGroup.name;
                    let img = [];
                    img.push(`${Date.now()}_${file.name}`);
                    data.image = img;
                    if (props.subgroup.parent_id.length > 0 || props.subgroup.parent_id === "") {
                        data.parent_id = props.subgroup.id
                    } else if (props.subgroup.parent_id === undefined) {
                        data.parent_id = ""
                    }
                    props.subgroup.image.length > 0 ?
                        data.group_id = {
                            id: props.subgroup.id,
                            name: props.subgroup.name,
                            image: [props.subgroup.image],
                            group_type: "1",
                            required_group: props.subgroup.required_group
                        }
                        :
                        data.group_id = {
                            id: props.subgroup.id,
                            name: props.subgroup.name,
                            group_type: "1",
                            required_group: props.subgroup.required_group
                        };
                    break;
                }
                case 'inGroup': {
                    data.name = props.newGroup.name;
                    data.image = `${Date.now()}_${file.name}`;
                    data.parent_id = "";
                    data.group_id = {
                        id: props.group.id,
                        name: props.group.name,
                        image: props.group.image,
                        group_type: "1",
                        required_group: props.group.required_group
                    };
                    break;
                }
                default:
                    break;
            }
            props.uploadImage(props.groupType, file, data, props.modalType)
        }

    };

    return (
        <div className={classes.main}>
            <header>
                <div>
                    <CustomButton
                        className={`${classes.backButton} ${classes.modalButton}`}
                        children={
                            <svg width={22} height={12} viewBox="0 0 22.001 12.203">
                                <path
                                    className={classes.backButtonIcon}
                                    d="M143.761,42.5a.875.875,0,0,0-.876.876V61.522l-3.731-3.706a.875.875,0,1,0-1.232,1.242l5.221,5.19a.884.884,0,0,0,1.237,0l5.226-5.19a.875.875,0,0,0-1.232-1.242l-3.736,3.706V43.376A.879.879,0,0,0,143.761,42.5Z"
                                    transform="translate(64.501 -137.662) rotate(90)"
                                />
                            </svg>
                        }
                        // Methods
                        onClick={props.closeHandler.bind(this, 'back')}
                    />
                </div>
                <div>
                    <span className={classes.modalLabel}>{props.label}</span>
                </div>
                <div>
                    <CustomButton
                        className={`${classes.closeButton} ${classes.modalButton}`}
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
                <Grid container spacing={4}>
                    <Grid item md={5}>
                        <div className={classes.imageWindow}>
                            <CustomInput
                                id={'classifierImage'}
                                hidden={true}
                                accept={"image/*"}
                                type={'file'}
                                classNameLabel={classes.classNameLabel}
                                label={
                                    file ?
                                        <img src={URL.createObjectURL(file)} alt="upload"/>
                                        :
                                        <WallpaperIcon style={{fontSize: 100}}/>
                                }
                                onChange={event => imageChangeHandler(event.target.files[0])}
                            />
                        </div>
                    </Grid>
                    <Grid item md={7}>
                        <div className={classes.dataWindow}>
                            <div>
                                <CustomInput
                                    id={'name'}
                                    placeholder={'Անվանում'}
                                    name={'name'}
                                    classNameInput={classes.nameInput}
                                    value={props.newGroup.name}
                                    onChange={event => nameChangeHandler(event.target.name, event.target.value)}
                                />
                                {
                                    props.groupType === 'group' ?
                                        <CustomInput
                                            id={'group_type'}
                                            inputType={'inner'}
                                            checked={props.newGroup.required_group}
                                            value={props.newGroup.required_group}
                                            classNameLabel={classes.checkboxLabel}
                                            label={
                                                <div className={classes.checkBoxWindow}>
                                                    <div>Պարտադիր</div>
                                                    <div
                                                        className={props.newGroup.required_group ? `${classes.checkboxChecked} ${classes.checkbox}` : classes.checkbox}/>
                                                </div>
                                            }
                                            type={'checkbox'}
                                            hidden={true}
                                            onChange={event => checkboxChangeHandler(event.target.checked)}
                                        />
                                        :
                                        null
                                }
                                <Alert classes={{root: fileError ? classes.alertShow : classes.alertHidden}}
                                       variant="filled" severity="error">
                                    Նկարը ընտրված չե, որպիսզի կարողանաք ստեղծել նոր դասակարգիչ ընտրեք նկար և հաստատեք
                                </Alert>
                                <Alert classes={{root: dataError ? classes.alertShow : classes.alertHidden}}
                                       variant="filled" severity="error">
                                    Անվանման դաշտը լրացված չե, որպիսզի կարողանաք ստեղծել նոր դասակարգիչ լրացրեք անվանման
                                    դաշտը և հաստատեք
                                </Alert>
                                <Alert classes={{root: props.error ? classes.alertShow : classes.alertHidden}} variant="filled" severity="error">
                                    Մուտքագրված արժեքները սխալ են
                                </Alert>
                            </div>
                            <footer>
                                <ConfirmButton
                                    onClick={confirmHandler}
                                />
                            </footer>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default Content