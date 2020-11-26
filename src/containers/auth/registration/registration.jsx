import React from 'react'
import classes from './registration.module.css'
import Alert from "@material-ui/lab/Alert"
import CustomInput from "../../../components/UI/input/customInput/customInput"
import {connect} from "react-redux"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import CheckIcon from '@material-ui/icons/Check'
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined"
import Checkbox from '@material-ui/core/Checkbox'
import AlertDialogSlide from "./dialog/dialog"
import CustomButton from "../../../components/UI/button/customButton/customButton"
import {NavLink} from "react-router-dom"
import LinearProgress from "@material-ui/core/LinearProgress"
import {registrationHandler, setRegValues} from "../../../Redux/registration/action"
import is from 'is_js'
import Icons from "../../../components/Icons/icons";
import LanguagesMenu from "../../../controllers/languagesMenu/languagesMenu";
import {changeLanguage, setLanguageValue} from "../../../Redux/language/actions";
import {getLanguage} from "../../../controllers/languages/languages";

const Registration = props => {

    const errorRender = error => {
        let errorArray = [];
        let errorStatus = false;
        if (error) {
            for (let item in error) {
                if (error.hasOwnProperty(item)) {
                    errorArray.push(item)
                }
            }
        }
        let errorFinish = errorArray.map(
            (item, index) => {
                switch (item) {

                    case 'regEmail':
                    case 'username':

                        return (
                            <Alert className={`font-size-11 ${classes.alertError}`} key={index} severity="error">
                                {getLanguage(props.activeLanguage, 'email_exists')}
                            </Alert>
                        );
                    case 'regName':
                        return (
                            <Alert className={`font-size-11 ${classes.alertError}`} key={index} severity="error">
                                {getLanguage(props.activeLanguage, 'incorrect_value')}
                            </Alert>
                        );
                    case 'regLastName':
                        return (
                            <Alert className={`font-size-11 ${classes.alertError}`} key={index} severity="error">
                                {getLanguage(props.activeLanguage, 'incorrect_value')}
                            </Alert>
                        );
                    case 'regPassword':
                    case 'regPassword_confirm':
                        return (
                            <Alert className={classes.alertError} key={index} severity="error">
                                {getLanguage(props.activeLanguage, 'incorrect_password')}
                            </Alert>
                        );
                    default: {
                        errorStatus = true;
                        return null;
                    }
                }
            }
        );
        if (errorStatus) {
            return (
                <Alert className='my-1' severity="error">
                    {getLanguage(props.activeLanguage, 'registration_failed')}
                </Alert>
            )
        } else {
            return errorFinish
        }
    };

    const clickHandler = name => {

        props.setRegValues('regSelected', name)
    };

    const handleChange = event => {

        props.setRegValues(event.target.name, event.target.value);
        props.setRegValues('isEmpty', {});

        if (event.target.name === 'regEmail') {
            if (is.email(event.target.value)) {
                props.setRegValues('RegEmailStatus', true)
            } else {
                props.setRegValues('RegEmailStatus', false)
            }
        }

        if (event.target.name === 'regPassword' || event.target.name === 'regPassword_confirm') {
            if (event.target.value.length < 6 || event.target.value.length > 32) {
                props.setRegValues('wrongRegError', event.target.name)
            } else {
                props.setRegValues('wrongRegError', null)
            }
        }
    };

    const usagerulesHandler = event => {

        props.setRegValues(event.target.name, !props.usagerules);
        props.setRegValues('isEmpty', {})
    };

    const usagerulesHandlerAgree = status => {

        props.setRegValues('usagerules', status);
        props.setRegValues('isEmpty', {})
    };

    const checkStatus = status => {

        switch (status) {

            case true:
                return (
                    <CheckIcon fontSize='small' style={{color: '#578DE4'}}/>
                );
            case false:
                return (
                    <ErrorOutlineOutlinedIcon fontSize='small' style={{color: '#ff3939'}}/>
                );
            default:
                return null;
        }
    };

    const showPasswordHandler = place => {

        switch (place) {
            case 'regPassword': {
                props.setRegValues('showRegPass', true);
                break;
            }
            case 'regPassword_confirm': {
                props.setRegValues('showRegConfPass', true);
                break;
            }
            default:
                break
        }
    };

    const hidePasswordHandler = place => {

        switch (place) {
            case 'regPassword': {
                props.setRegValues('showRegPass', false);
                break;
            }
            case 'regPassword_confirm': {
                props.setRegValues('showRegConfPass', false);
                break;
            }
            default:
                break
        }
    };

    const onSubmit = event => {

        event.preventDefault();
        props.registrationHandler()
    };

    const handleClick = event => {
        props.setLanguageValue('open', event.currentTarget)
    };

    const handleClose = () => {
        props.setLanguageValue('open', null)
    };

    const setLanguage = lang => {
        props.changeLanguage(lang)
    };

    return (
        <div className={`background-5b86e5-36dadc ${classes.main}`}
             style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
            <LanguagesMenu
                open={props.open}
                lang={props.lang}
                activeLanguage={props.activeLanguage}
                // Methods
                handleClick={handleClick}
                handleClose={handleClose}
                setLanguage={setLanguage}
            />
            <div className={classes.backdrop}>
                <div className={`background-fff ${classes.mainWindow}`}>
                    <span
                        className={`color-1B5985 font-size-34 ${classes.name} ${props.regSuccess ? classes.nameSecond : ''}`}>Barcode.am</span>
                    <span className={classes.action}>{getLanguage(props.activeLanguage, 'register')}</span>
                    {
                        props.regText ?
                            <Alert className={`font-size ${classes.alertError}`} severity="error">
                                {getLanguage(props.activeLanguage, props.regText)}
                            </Alert>
                            :
                            null

                    }
                    <div className={classes.errorField}>
                        {
                            props.regError ?
                                errorRender(props.regError)
                                :
                                null
                        }
                    </div>
                    {
                        props.regSuccess ?
                            <div className={classes.regSuccess}>
                                {getLanguage(props.activeLanguage, 'registration_susses')}
                            </div>
                            :
                            <>
                                <form onSubmit={onSubmit}>
                                    <CustomInput
                                        id={'first_name'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `
                                            ${
                                                classes.email
                                            }
                                                ${
                                                props.regSelected === 'regName' ?
                                                    classes.selected
                                                    :
                                                    null
                                            }
                                                ${
                                                props.isEmpty['regName'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                            `
                                        }
                                        label={
                                            <span className={classes.forIcon}>
                                                <Icons type={'user'}/>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={`background-transparent ${classes.emailInput}`}
                                        type="text"
                                        required={true}
                                        name="regName"
                                        placeholder={getLanguage(props.activeLanguage, 'name')}
                                        value={props.regName}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'regName')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                    />
                                    <CustomInput
                                        id={'last_name'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `
                                            ${
                                                classes.email
                                            }
                                                ${
                                                props.regSelected === 'regLastName' ?
                                                    classes.selected
                                                    :
                                                    null
                                            }
                                                ${
                                                props.isEmpty['regLastName'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                            `
                                        }
                                        label={
                                            <span className={classes.forIcon}>
                                                <Icons type={'users'}/>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={`background-transparent ${classes.emailInput}`}
                                        type="text"
                                        required={true}
                                        name="regLastName"
                                        placeholder={getLanguage(props.activeLanguage, 'last_name')}
                                        value={props.regLastName}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'regLastName')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                    />
                                    <CustomInput
                                        id={'email'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `
                                                ${
                                                classes.email
                                            }
                                                ${
                                                props.regSelected === 'regEmail' ?
                                                    classes.selected
                                                    :
                                                    null
                                            }
                                                ${
                                                props.isEmpty['regEmail'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                                `
                                        }
                                        label={
                                            <span className={classes.forIcon}>
                                                <Icons type={'letter'}/>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={`background-transparent ${classes.input}`}
                                        type="email"
                                        name="regEmail"
                                        placeholder={getLanguage(props.activeLanguage, 'email')}
                                        value={props.regEmail}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'regEmail')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                        //status
                                        children={
                                            <span className={classes.forIcon}>
                                            {
                                                checkStatus(props.RegEmailStatus)
                                            }
                                        </span>
                                        }
                                    />
                                    <CustomInput
                                        id={'password'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `
                                            background-fff
                                            ${
                                                classes.password
                                            }
                                            ${
                                                props.regSelected === 'regPassword' ?
                                                    classes.selected
                                                    :
                                                    null
                                            }
                                            ${
                                                props.regPassword !== props.regPassword_confirm ?
                                                    classes.error
                                                    :
                                                    ''
                                            }
                                            ${
                                                props.isEmpty['regPassword'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                            `
                                        }
                                        label={
                                            <span className={classes.forIcon}>
                                                <Icons type={'key'}
                                                       className={`fill-444 stroke-444 ${classes.passwordFill} ${props.wrongRegError === 'regPassword' ? `fill-ff3939 stroke-ff3939 ${classes.passwordFillError}` : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? `fill-ff3939 stroke-ff3939 ${classes.passwordFillError}` : '' : ''}`}/>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={classes.input}
                                        placeholder={getLanguage(props.activeLanguage, 'new_password')}
                                        type={
                                            props.showRegPass ?
                                                'text'
                                                :
                                                'password'
                                        }
                                        name="regPassword"
                                        value={props.regPassword}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'regPassword')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                        //status
                                        children={
                                            <span
                                                className={classes.forIcon}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onMouseDown={showPasswordHandler.bind(this, 'regPassword')}
                                                onMouseUp={hidePasswordHandler.bind(this, 'regPassword')}
                                                onTouchStart={showPasswordHandler.bind(this, 'regPassword')}
                                                onMouseLeave={hidePasswordHandler.bind(this, 'regPassword')}
                                            >
                                                {
                                                    props.showRegPass ?
                                                        <VisibilityOffOutlinedIcon fontSize='small'
                                                                                   style={{color: '#4198bf'}}/>
                                                        :
                                                        <VisibilityOutlinedIcon fontSize='small'
                                                                                style={{color: '#4198bf'}}/>
                                                }
                                            </span>
                                        }
                                    />
                                    <CustomInput
                                        id={'password_confirm'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `
                                            background-fff
                                            ${
                                                classes.confirmPassword
                                            }
                                                ${
                                                props.regSelected === 'regPassword_confirm' ?
                                                    classes.selected
                                                    :
                                                    null
                                            }
                                                ${
                                                props.regPassword !== props.regPassword_confirm ?
                                                    classes.error
                                                    :
                                                    ''
                                            }
                                                ${
                                                props.isEmpty['regPassword_confirm'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                            `
                                        }
                                        label={
                                            <span className={classes.forIcon}>
                                                <Icons type={'key'}
                                                       className={`fill-444 stroke-444 ${classes.passwordFill} ${props.wrongRegError === 'regPassword_confirm' ? `fill-ff3939 stroke-ff3939 ${classes.passwordFillError}` : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? `fill-ff3939 stroke-ff3939 ${classes.passwordFillError}` : '' : ''}`}/>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={`background-transparent ${classes.input}`}
                                        placeholder={getLanguage(props.activeLanguage, 'confirm_password')}
                                        type={
                                            props.showRegConfPass ?
                                                'text'
                                                :
                                                'password'
                                        }
                                        name="regPassword_confirm"
                                        value={props.regPassword_confirm}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'regPassword_confirm')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                        //status
                                        children={
                                            <span
                                                className={classes.forIcon}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onMouseDown={showPasswordHandler.bind(this, 'regPassword_confirm')}
                                                onMouseUp={hidePasswordHandler.bind(this, 'regPassword_confirm')}
                                                onTouchStart={showPasswordHandler.bind(this, 'regPassword_confirm')}
                                                onMouseLeave={hidePasswordHandler.bind(this, 'regPassword_confirm')}
                                            >
                                                {
                                                    props.showRegConfPass ?
                                                        <VisibilityOffOutlinedIcon fontSize='small'
                                                                                   style={{color: '#4198bf'}}/>
                                                        :
                                                        <VisibilityOutlinedIcon fontSize='small'
                                                                                style={{color: '#4198bf'}}/>
                                                }
                                            </span>
                                        }
                                    />
                                    <div
                                        className={
                                            `
                                                ${
                                                classes.checkWindow
                                            }
                                                ${
                                                props.isEmpty['usagerules'] ?
                                                    `${classes.error} ${classes.errorVerify}`
                                                    :
                                                    ''
                                            }
                                            `
                                        }
                                    >
                                        <Checkbox
                                            classes={{
                                                root: classes.checkboxRoot
                                            }}
                                            checked={props.usagerules}
                                            id={'check'}
                                            size="small"
                                            name={'usagerules'}
                                            inputProps={{'aria-label': 'checkbox with small size'}}
                                            onChange={usagerulesHandler}
                                        />
                                        <label htmlFor="check" className={classes.checkLabel}>
                                            <span className={`font-size-11 ${classes.check}`}>
                                                {getLanguage(props.activeLanguage, 'agree')}
                                            </span>
                                            <AlertDialogSlide
                                                dialogTitle={getLanguage(props.activeLanguage, 'terms_use')}
                                                type={'button'}
                                                className={`background-transparent color-5B86E5 font-size-11 ${classes.checkLink}`}
                                                text={getLanguage(props.activeLanguage, 'terms_of_use')}
                                                agree={getLanguage(props.activeLanguage, 'agree')}
                                                disagree={getLanguage(props.activeLanguage, 'not_agree')}
                                                usagerulesHandlerAgree={usagerulesHandlerAgree}
                                            />
                                            <span>:</span>
                                        </label>
                                    </div>
                                    <CustomButton
                                        className={`background-F53803 color-fff font-size-16 ${classes.signIn}`}
                                        children={getLanguage(props.activeLanguage, 'register')}
                                        // Methods
                                        onClick={onSubmit}
                                    />
                                </form>
                                <div className={classes.createAccount}>
                                    <span className="color-878787 font-size-10">{getLanguage(props.activeLanguage, 'registered')}</span>
                                    <NavLink to='/login' className={`color-1790FF font-size-12 ${classes.signUp}`}>
                                        {getLanguage(props.activeLanguage, 'login')}
                                    </NavLink>
                                </div>
                            </>
                    }
                </div>
                {
                    props.regProgress ?
                        <LinearProgress
                            classes={{
                                root: classes.progres,
                                colorPrimary: classes.progresBgColor
                            }}
                        />
                        :
                        null
                }
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        open: state.language.open,
        lang: state.language.lang,
        activeLanguage: state.language.activeLanguage,
        regName: state.registration.regName,
        regLastName: state.registration.regLastName,
        regEmail: state.registration.regEmail,
        regPassword: state.registration.regPassword,
        showRegPass: state.registration.showRegPass,
        usagerules: state.registration.usagerules,
        wrongRegError: state.registration.wrongRegError,
        showRegConfPass: state.registration.showRegConfPass,
        regPassword_confirm: state.registration.regPassword_confirm,
        RegEmailStatus: state.registration.RegEmailStatus,
        isEmpty: state.registration.isEmpty,
        regSuccess: state.registration.regSuccess,
        regError: state.registration.regError,
        regProgress: state.registration.regProgress,
        regText: state.registration.regText,
        regSelected: state.registration.regSelected,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setRegValues: (name, value) => dispatch(setRegValues(name, value)),
        registrationHandler: () => dispatch(registrationHandler()),
        setLanguageValue: (name, value) => dispatch(setLanguageValue(name, value)),
        changeLanguage: language => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)