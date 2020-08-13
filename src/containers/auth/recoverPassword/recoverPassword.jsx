import React from 'react'
import classes from './recoverPassword.module.css'
import Alert from '@material-ui/lab/Alert'
import CustomInput from "../../../components/UI/input/customInput/customInput"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import CheckIcon from '@material-ui/icons/Check'
import {NavLink} from "react-router-dom"
import CustomButton from "../../../components/UI/button/customButton/customButton"
import LinearProgress from "@material-ui/core/LinearProgress"
import {connect} from "react-redux"
import {recover, setRecoverValues} from "../../../Redux/recoverPassword/action"
import is from 'is_js'
import Icons from "../../../components/Icons/icons";

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

    return (
        <div className={classes.main} style={{background: `url(${process.env.PUBLIC_URL}images/pic.jpg) no-repeat center`}}>
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
                        Վերականգնել գաղտնաբառը
                    </span>
                    {
                        props.error ?
                            <Alert className={classes.alertError} severity="error">Հարցումը չհաջողվեց</Alert>
                            :
                            null
                    }
                    {
                        props.success ?
                            <div className={classes.regSuccess}>
                                Դուք շուտով կստանաք էլ․ հաղորդագրություն, անցեք հաղորդագրությանը կից հղմամբ որպեսզի
                                վերականգնեք գաղտնաբառը, շնորհակալություն․․․
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
                                        placeholder={'Էլ․ հասցե'}
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
                                        children={'Ուղարկել'}
                                        // Methods
                                        onClick={onSubmit}
                                    />
                                </form>
                                <div className={classes.createAccount}>
                                    <NavLink className={classes.signUp} to={'/login'}>
                                        Մուտք գործել
                                    </NavLink>
                                    <span>
                                            կամ
                                        </span>
                                    <NavLink className={classes.signUp} to={'/registration'}>
                                        Գրանցվել
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
        recover: () => dispatch(recover())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)