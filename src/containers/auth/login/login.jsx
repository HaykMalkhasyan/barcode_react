import React from 'react'
import classes from './login.module.css'
import CustomInput from "../../../components/UI/input/customInput/customInput";
import {connect} from "react-redux";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import {NavLink} from "react-router-dom";
import CustomButton from "../../../components/UI/button/customButton/customButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import {login, setValues} from "../../../Redux/auth/actions";
import is from 'is_js'
import {Alert} from "@material-ui/core";
import Icons from "../../../components/Icons/icons";
import {changeLanguage, setLanguageValue} from "../../../Redux/language/actions";
import {getLanguage} from "../../../controllers/languages/languages";
import LanguagesMenu from "../../../controllers/languagesMenu/languagesMenu";

const Login = props => {

    const handleChange = event => {
        switch (event.target.name) {
            case 'email': {
                props.setValues(event.target.name, event.target.value);
                if (/*is.email(event.target.value)*/ true) {
                    props.setValues('emailStatus', true)
                } else {
                    props.setValues('emailStatus', false)
                }
                break;
            }
            case 'password': {
                props.setValues(event.target.name, event.target.value);
                if (event.target.value.length < 0 || event.target.value.length > 32) {
                    props.setValues('passwordStatus', true)
                } else {
                    props.setValues('passwordStatus', false)
                }
                break;
            }
            default: break;
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        props.login()
    };

    const clickHandler = name => {
        props.setValues('selected', name)
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
            default: return null;
        }
    };

    const showPasswordHandler = () => {
        props.setValues('showPassword', true)
    };

    const hidePasswordHandler = () => {
        props.setValues('showPassword', false)
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
        <div className={`background-5b86e5-36dadc ${classes.main}`} style={{background: `url(${process.env.PUBLIC_URL}images/pic.jpg) no-repeat center`}}>
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
                    <span className={`color-1B5985 font-size-34 ${classes.name}`}>Barcode.am</span>
                    <span className={`color-444 font-size-21 ${classes.action}`}>{getLanguage(props.activeLanguage, 'login')}</span>
                    {
                        props.text ?
                            <Alert className={`font-size-10 ${classes.alertError}`} severity="error">
                                {getLanguage(props.activeLanguage, props.text)}
                            </Alert>
                            :
                            null
                    }
                    <form
                        onSubmit={onSubmit}
                    >
                        <CustomInput
                            inputType={'inner'}
                            id={'email'}
                            // for label
                            classNameLabel={
                                `background-fff ${classes.email} ${props.selected === 'email' ? classes.selected : ''} ${props.fail ? classes.error : ''}`
                            }
                            label={
                                <span className={classes.forIcon}>
                                    <Icons type={'letter'}/>
                                </span>
                            }
                            // for input
                            classNameInput={`background-transparent ${classes.input}`}
                            type={'email'}
                            required={true}
                            name={'email'}
                            placeholder={getLanguage(props.activeLanguage, 'email')}
                            value={props.email}
                            // Methods
                            onFocus={clickHandler.bind(this, 'email')}
                            onBlur={clickHandler.bind(this, null)}
                            onChange={handleChange}
                            // Status
                            children={
                                <span className={classes.forIcon}>
                                    {
                                        checkStatus(props.emailStatus)
                                    }
                                </span>
                            }
                        />
                        <CustomInput
                            inputType={'inner'}
                            id={'password'}
                            // for label
                            classNameLabel={
                                `
                                background-fff
                                ${classes.password}
                                ${
                                    props.selected === 'password' 
                                        ? classes.selected 
                                        : 
                                        ''
                                } 
                                ${
                                    props.fail ? 
                                        classes.error 
                                        :
                                        ''
                                }
                                ${
                                    props.passwordStatus ?
                                        classes.passError
                                        :
                                        ''
                                }
                                `
                            }
                            label={
                                <span className={classes.forIcon}>
                                    <Icons type={'key'}/>
                                </span>
                            }
                            // for input
                            classNameInput={`background-transparent ${classes.input}`}
                            type={
                                props.showPassword ?
                                    'text'
                                    :
                                    'password'
                            }
                            required={true}
                            name={'password'}
                            placeholder={getLanguage(props.activeLanguage, 'password')}
                            value={props.password}
                            // Methods
                            onFocus={clickHandler.bind(this, 'password')}
                            onBlur={clickHandler.bind(this, null)}
                            onChange={handleChange}
                            // Status
                            children={
                                <span
                                    className={classes.forIcon}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onMouseDown={showPasswordHandler}
                                    onMouseUp={hidePasswordHandler}
                                    onTouchStart={showPasswordHandler}
                                    onMouseLeave={hidePasswordHandler}
                                >
                                    {
                                        props.showPassword ?
                                            <VisibilityOffOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                            :
                                            <VisibilityOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                    }
                                </span>
                            }
                        />
                        <NavLink to={'/recover-password'} className={`color-578EE4 font-size-12 ${classes.forgetPassword}`}>
                            {getLanguage(props.activeLanguage, 'forget_password')}
                        </NavLink>
                        <CustomButton
                            className={`background-F53803-F5D020 color-fff font-size-16 ${classes.signIn}`}
                            children={getLanguage(props.activeLanguage, 'login')}
                            //Methods
                            onClick={onSubmit}
                        />
                    </form>
                    <div className={classes.createAccount}>
                        <span className="color-878787 font-size-10">
                            {getLanguage(props.activeLanguage, 'registered')}
                        </span>
                        <NavLink to={'/registration'} className={`color-1790FF font-size-12 ${classes.signUp}`}>
                            {getLanguage(props.activeLanguage, 'register')}
                        </NavLink>
                    </div>
                </div>
                {
                    props.progress ?
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
        progress: state.auth.progress,
        fail: state.auth.fail,
        showPassword: state.auth.showPassword,
        text: state.auth.text,
        emailStatus: state.auth.emailStatus,
        passwordStatus: state.auth.passwordStatus,
        selected: state.auth.selected,
        email: state.auth.email,
        password: state.auth.password,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setValues: (name, value) => dispatch(setValues(name, value)),
        login: () => dispatch(login()),
        setLanguageValue: (name, value) => dispatch(setLanguageValue(name, value)),
        changeLanguage: language => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)