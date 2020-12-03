import React, {Component} from "react"
import cls from './resetPassword.module.css'
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined"
import {NavLink, withRouter} from "react-router-dom"
import LinearProgress from "@material-ui/core/LinearProgress"
import {connect} from "react-redux"
import classes from "../recoverPassword/recoverPassword.module.css"
import Alert from "@material-ui/lab/Alert"
import {
    createNewPass,
    progressAction,
    sendMailError,
    sendMailSuccess,
    userInformation
} from "../../../Redux/recoverPassword/action"
import CustomInput from "../../../components/UI/input/customInput/customInput"
import CustomButton from "../../../components/UI/button/customButton/custom-button"
import Icons from "../../../components/Icons/icons";
import LanguagesMenu from "../../../controllers/languagesMenu/languagesMenu";
import {changeLanguage, setLanguageValue} from "../../../Redux/language/actions";
import {getLanguage} from "../../../controllers/languages/languages";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.search) {
            let obj = {
                user_id: '',
                timestamp: '',
                signature: ''
            };
            let objValue = this.props.location.search.slice(1, this.props.location.search.length).split('&').map(
                item => item.split('=')[1]
            );

            Object.keys(obj).forEach(
                (item, index) => {
                    obj[item] = objValue[index]
                }
            );

            if (typeof obj['user_id'] !== "undefined" && typeof obj['timestamp'] !== "undefined" && typeof obj['signature'] !== "undefined") {
                this.props.userInformation(obj)
            } else {
                this.props.history.push('/')
            }

        } else {
            this.props.history.push('/')
        }
    }

    state = {
        signature: '',
        timestamp: '',
        user_id: null,
        password: '',
        password_confirm: '',
        error: null,
        showPass: false,
        showConfPass: false,
        loginStatus: false,
        severity: null,
        text: null,
        selected: null,
        isEmpty: {}
    };

    onSubmit = event => {
        event.preventDefault();
        const object = {
            signature: this.props.signature,
            timestamp: this.props.timestamp,
            user_id: this.props.user_id,
            password: this.state.password,
        };
        const isEmpty = {};
        for (let item in object) {
            if (object[item].length === 0) {
                isEmpty[item] = true
            }
        }
        if (this.state.password_confirm.length === 0) {
            isEmpty['password_confirm'] = true;
        }
        if (object.password !== this.state.password_confirm) {
            isEmpty['password'] = true;
            isEmpty['password_confirm'] = true;
        }
        this.setState({
            isEmpty
        });
        if (this.state.password === this.state.password_confirm && Object.keys(isEmpty).length === 0) {
            this.props.createNewPass(object)
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isEmpty: {}
        });
        if (event.target.name === 'password' || event.target.name === 'password_confirm') {
            if (event.target.value.length < 6 || event.target.value.length > 32) {
                this.setState({
                    error: event.target.name
                })
            } else {
                this.setState({
                    error: null
                })
            }
        }
    };

    clickHandler = name => {

        this.setState({
            selected: name
        })
    };

    showPasswordHandler = place => {

        switch (place) {

            case 'password': {
                this.setState({
                    showPass: true
                });
                break;
            }
            case 'password_confirm': {
                this.setState({
                    showConfPass: true
                });
                break;

            }
            default:
                break;
        }
    };

    hidePasswordHandler = place => {

        switch (place) {

            case 'password': {
                this.setState({
                    showPass: false
                });
                break;
            }
            case 'password_confirm': {
                this.setState({
                    showConfPass: false
                });
                break;

            }
            default:
                break;
        }
    };

    changePage = () => {
        window.exitPage = setTimeout(
            () => this.props.history.push('/'),
            1000
        )
    };

    componentWillUnmount() {
        clearTimeout(window.exitPage);
        this.props.progressAction(false);
        this.props.sendMailSuccess(null);
        this.props.sendMailError(null)
    }

    handleClick = event => {
        this.props.setLanguageValue('open', event.currentTarget)
    };

    handleClose = () => {
        this.props.setLanguageValue('open', null)
    };

    setLanguage = lang => {
        this.props.changeLanguage(lang)
    };

    render() {

        return (
            <div className={cls.main} style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
                <LanguagesMenu
                    open={this.props.open}
                    lang={this.props.lang}
                    activeLanguage={this.props.activeLanguage}
                    // Methods
                    handleClick={this.handleClick}
                    handleClose={this.handleClose}
                    setLanguage={this.setLanguage}
                />
                <div className={cls.backdrop}>
                    <div className={`text-center ${cls.mainWindow}`}>
                        <span className={`${cls.name} ${this.props.success ? cls.nameSecond : ''}`}>Barcode.am</span>
                        <span className={`${cls.action} ${this.props.error ? cls.actionError : ''} ${this.props.success ? cls.actionSuccess : ''}`}>
                            {getLanguage(this.props.activeLanguage, 'reset_password')}
                            </span>
                        {
                            this.props.textRecover ?
                                <Alert className={classes.alertError} severity="error">{getLanguage(this.props.activeLanguage, this.props.textRecover)}</Alert>
                                :
                                null

                        }
                        {
                            this.props.success ?
                                <div className={cls.regSuccess}>
                                    {getLanguage(this.props.activeLanguage, 'recover_password_success')}
                                    {
                                        this.changePage()
                                    }
                                </div>
                                :
                                <>
                                    <form onSubmit={event => this.onSubmit(event)}>
                                        <CustomInput
                                            id={'password'}
                                            inputType={'inner'}
                                            // for label
                                            classNameLabel={
                                                `
                                                ${cls.password}
                                                ${this.state.selected === 'password' ? cls.selected : null}
                                                ${this.state.password !== this.state.password_confirm ? cls.error : ''}
                                                ${this.state.isEmpty['password'] ? `${cls.error} ${cls.errorVerify}` : ''}
                                                `
                                            }
                                            label={
                                                <span className={cls.forIcon}>
                                                    <Icons
                                                        type={'key'}
                                                        className={
                                                            `
                                                            ${cls.passwordFill}
                                                             ${this.state.error === 'password' || this.state.error === 'password_confirm' ?
                                                                cls.passwordFillError 
                                                                :
                                                                ''
                                                            } 
                                                            ${this.state.password && this.state.password_confirm ?
                                                                this.state.password !== this.state.password_confirm ?
                                                                    cls.passwordFillError 
                                                                    :
                                                                    ''
                                                                :
                                                                ''
                                                            }
                                                            `
                                                        }
                                                    />
                                                </span>
                                            }
                                            // for input
                                            placeholder={getLanguage(this.props.activeLanguage, 'new_password')}
                                            classNameInput={`background-transparent ${cls.input}`}
                                            type={
                                                this.state.showPass ?
                                                    'text'
                                                    :
                                                    'password'
                                            }
                                            name="password"
                                            value={this.state.password}
                                            // Methods
                                            onFocus={this.clickHandler.bind(this, 'password')}
                                            onBlur={this.clickHandler.bind(this, null)}
                                            onChange={this.handleChange}
                                            // status
                                            children={
                                                <span
                                                    className={cls.forIcon}
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={this.showPasswordHandler.bind(this, 'password')}
                                                    onMouseUp={this.hidePasswordHandler.bind(this, 'password')}
                                                    onMouseLeave={this.hidePasswordHandler.bind(this, 'password')}
                                                >
                                                    {
                                                        this.state.showPass ?
                                                            <VisibilityOffOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                                            :
                                                            <VisibilityOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
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
                                                ${cls.confirmPassword}
                                                ${this.state.selected === 'password_confirm' ?
                                                    cls.selected
                                                    :
                                                    null
                                                }
                                                ${this.state.password !== this.state.password_confirm ?
                                                    cls.error
                                                    :
                                                    ''
                                                }
                                                ${this.state.isEmpty['password_confirm'] ?
                                                    `${cls.error} ${cls.errorVerify}`
                                                    :
                                                    ''
                                                }
                                                `
                                            }
                                            label={
                                                <span className={cls.forIcon}>
                                                    <Icons
                                                        type={'key'}
                                                        className={
                                                            `
                                                            ${cls.passwordFill}
                                                             ${this.state.error === 'password' || this.state.error === 'password_confirm' ?
                                                                cls.passwordFillError 
                                                                :
                                                                ''
                                                            }
                                                            ${this.state.password && this.state.password_confirm ? 
                                                                this.state.password !== this.state.password_confirm ?
                                                                    cls.passwordFillError 
                                                                    :
                                                                    ''
                                                                :
                                                                ''
                                                            }
                                                            `
                                                        }
                                                    />
                                                </span>
                                            }
                                            // for input
                                            placeholder={getLanguage(this.props.activeLanguage, 'confirm_password')}
                                            classNameInput={cls.input}
                                            type={
                                                this.state.showConfPass ?
                                                    'text'
                                                    :
                                                    'password'
                                            }
                                            name="password_confirm"
                                            value={this.state.password_confirm}
                                            // Methods
                                            onFocus={this.clickHandler.bind(this, 'password_confirm')}
                                            onBlur={this.clickHandler.bind(this, null)}
                                            onChange={this.handleChange}
                                            // status
                                            children={
                                                <span
                                                    className={cls.forIcon}
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onMouseDown={this.showPasswordHandler.bind(this, 'password_confirm')}
                                                    onMouseUp={this.hidePasswordHandler.bind(this, 'password_confirm')}
                                                    onTouchStart={this.showPasswordHandler.bind(this, 'password_confirm')}
                                                    onMouseLeave={this.hidePasswordHandler.bind(this, 'password_confirm')}
                                                >
                                            {
                                                this.state.showConfPass ?
                                                    <VisibilityOffOutlinedIcon
                                                        fontSize='small'
                                                        style={{color: '#4198bf'}}
                                                    />
                                                    :
                                                    <VisibilityOutlinedIcon
                                                        fontSize='small'
                                                        style={{color: '#4198bf'}}
                                                    />
                                            }
                                            </span>
                                            }
                                        />
                                        <CustomButton
                                            className={cls.signIn}
                                            onClick={event => this.onSubmit(event)}
                                            children={getLanguage(this.props.activeLanguage, 'confirm')}
                                        />
                                    </form>
                                    <div className={cls.createAccount}>
                                        <NavLink className={classes.signUp} to={'/login'}>
                                            {getLanguage(this.props.activeLanguage, 'login_in')} &nbsp;
                                        </NavLink>
                                        <span>
                                            {getLanguage(this.props.activeLanguage, 'or')} &nbsp;
                                        </span>
                                        <NavLink className={classes.signUp} to={'/registration'}>
                                            {getLanguage(this.props.activeLanguage, 'register')}
                                        </NavLink>
                                    </div>

                                </>
                        }

                        {
                            this.props.progress ?
                                <LinearProgress
                                    classes={{
                                        root: cls.progres,
                                        colorPrimary: cls.progresBgColor
                                    }}
                                />
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.language.open,
        lang: state.language.lang,
        activeLanguage: state.language.activeLanguage,
        error: state.resetPassword.error,
        success: state.resetPassword.success,
        progress: state.resetPassword.progress,
        signature: state.resetPassword.signature,
        timestamp: state.resetPassword.timestamp,
        user_id: state.resetPassword.user_id,
        textRecover: state.resetPassword.textRecover,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        userInformation: dataObject => dispatch(userInformation(dataObject)),
        createNewPass: data => dispatch(createNewPass(data)),
        progressAction: status => dispatch(progressAction(status)),
        sendMailSuccess: data => dispatch(sendMailSuccess(data)),
        sendMailError: data => dispatch(sendMailError(data)),
        setLanguageValue: (name, value) => dispatch(setLanguageValue(name, value)),
        changeLanguage: language => dispatch(changeLanguage(language))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword))