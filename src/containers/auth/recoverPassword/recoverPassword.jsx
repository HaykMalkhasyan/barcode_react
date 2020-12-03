import React from 'react'
import classes from './recoverPassword.module.css'
import Alert from '@material-ui/lab/Alert'
import CustomInput from "../../../components/UI/input/customInput/customInput"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import CheckIcon from '@material-ui/icons/Check'
import {NavLink} from "react-router-dom"
import CustomButton from "../../../components/UI/button/customButton/custom-button"
import LinearProgress from "@material-ui/core/LinearProgress"
import {connect} from "react-redux"
import {recover, setRecoverValues} from "../../../Redux/recoverPassword/action"
import is from 'is_js'
import Icons from "../../../components/Icons/icons";
import LanguagesMenu from "../../../controllers/languagesMenu/languagesMenu";
import {changeLanguage, setLanguageValue} from "../../../Redux/language/actions";
import {getLanguage} from "../../../controllers/languages/languages";

const RecoverPassword = props => {

    const handleChange = event => {
        props.setRecoverValues('failRecover', false);
        props.setRecoverValues(event.target.name, event.target.value);

        if (is.email(event.target.value)) {
            props.setRecoverValues('emailStatus', true)
        } else {
            props.setRecoverValues('emailStatus', false)
        }
    };

    const onSubmit = event => {
        event.preventDefault();
        props.recover()
    };

    const clickHandler = name => {
        props.setRecoverValues('selected', name)
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
        <div className={classes.main} style={{background: `url(${process.env.PUBLIC_URL}images/pic.jpg) no-repeat center`}}>
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
                <div className={classes.mainWindow}>
                    <span className={classes.name}>Barcode.am</span>
                    <span
                        className={
                            `
                            ${classes.action} 
                            ${
                                props.error ?
                                    classes.actionError 
                                    :
                                    ''
                            }
                            ${
                                props.success ?
                                    classes.actionSuccess 
                                    :
                                    ''
                            }
                            `
                        }
                    >
                        {getLanguage(props.activeLanguage, 'reset_password')}
                    </span>
                    {
                        props.error ?
                            <Alert className={classes.alertError} severity="error">
                                {getLanguage(props.activeLanguage, 'query_failed')}
                            </Alert>
                            :
                            null
                    }
                    {
                        props.success ?
                            <div className={classes.regSuccess}>
                                {getLanguage(props.activeLanguage, 'reset_password_success')}
                            </div>
                            :
                            <>
                                <form onSubmit={onSubmit}>
                                    <CustomInput
                                        id={'emailRecover'}
                                        inputType={'inner'}
                                        // for label
                                        classNameLabel={
                                            `                                            
                                            ${classes.email} 
                                            ${
                                                props.selected === 'email' ? 
                                                    classes.selected 
                                                    : 
                                                    ''
                                            } 
                                            ${
                                                props.failRecover ? 
                                                    classes.error 
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
                                        // for input
                                        classNameInput={classes.input}
                                        type="emailRecover"
                                        required={true}
                                        name="emailRecover"
                                        placeholder={getLanguage(props.activeLanguage, 'email')}
                                        value={props.emailRecover}
                                        // Methods
                                        onFocus={clickHandler.bind(this, 'email')}
                                        onBlur={clickHandler.bind(this, null)}
                                        onChange={handleChange}
                                        // status
                                        children={
                                            <span className={classes.forIcon}>
                                                {
                                                    checkStatus(props.emailStatus)
                                                }
                                            </span>
                                        }
                                    />
                                    <CustomButton
                                        className={classes.signIn}
                                        children={getLanguage(props.activeLanguage, 'send')}
                                        // Methods
                                        onClick={onSubmit}
                                    />
                                </form>
                                <div className={classes.createAccount}>
                                    <NavLink className={classes.signUp} to={'/login'}>
                                        {getLanguage(props.activeLanguage, 'login_in')}
                                    </NavLink>
                                    <span>
                                        {getLanguage(props.activeLanguage, 'or')}
                                    </span>
                                    <NavLink className={classes.signUp} to={'/registration'}>
                                        {getLanguage(props.activeLanguage, 'register')}
                                    </NavLink>
                                </div>
                            </>
                    }
                </div>
                {
                    props.progressRecover ?
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
        error: state.resetPassword.error,
        success: state.resetPassword.success,
        progressRecover: state.resetPassword.progressRecover,
        emailStatus: state.resetPassword.emailStatus,
        selected: state.resetPassword.selected,
        email: state.resetPassword.email,
        failRecover: state.resetPassword.failRecover,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setRecoverValues: (name, value) => dispatch(setRecoverValues(name, value)),
        recover: () => dispatch(recover()),
        setLanguageValue: (name, value) => dispatch(setLanguageValue(name, value)),
        changeLanguage: language => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)