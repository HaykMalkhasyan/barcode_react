import React, {Component} from "react";
import cls from './resetPassword.module.css'
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import {NavLink, withRouter} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import {connect} from "react-redux";
import classes from "../recoverPassword/recoverPassword.module.css";
import Alert from "@material-ui/lab/Alert";
import {
    createNewPass,
    progressAction,
    sendMailError,
    sendMailSuccess,
    userInformation
} from "../../../Redux/recoverPassword/action";
import CustomInput from "../../../components/UI/input/customInput/customInput";
import CustomButton from "../../../components/UI/button/customButton/customButton";

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
            )

            Object.keys(obj).forEach(
                (item, index) => {
                    obj[item] = objValue[index]
                }
            )

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
        }
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
        })
        if (this.state.password === this.state.password_confirm && Object.keys(isEmpty).length === 0) {
            this.props.createNewPass(object)
        }
    }

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
    }

    showPasswordHandler = place => {

        switch (place) {

            case 'password': {
                this.setState({
                    showPass: true
                })
                break;
            }
            case 'password_confirm': {
                this.setState({
                    showConfPass: true
                })
                break;

            }
            default:
                break;
        }
    }

    hidePasswordHandler = place => {

        switch (place) {

            case 'password': {
                this.setState({
                    showPass: false
                })
                break;
            }
            case 'password_confirm': {
                this.setState({
                    showConfPass: false
                })
                break;

            }
            default:
                break;
        }
    }

    changePage = () => {
        window.exitPage = setTimeout(
            () => this.props.history.push('/'),
            1000
        )
    }

    componentWillUnmount() {
        clearTimeout(window.exitPage)
        this.props.progressAction(false)
        this.props.sendMailSuccess(null)
        this.props.sendMailError(null)
    }

    render() {

        return (
            <div className={cls.main} style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
                <div className={cls.backdrop}>
                    <div className={`text-center ${cls.mainWindow}`}>
                        <span className={`${cls.name} ${this.props.success ? cls.nameSecond : ''}`}>Barcode.am</span>
                        <span className={`${cls.action} ${this.props.error ? cls.actionError : ''} ${this.props.success ? cls.actionSuccess : ''}`}>
                                Վերականգնել գաղտնաբառը
                            </span>
                        {
                            this.props.textRecover ?
                                <Alert className={classes.alertError} severity="error">{this.props.textRecover}</Alert>
                                :
                                null

                        }
                        {
                            this.props.success ?
                                <div className={cls.regSuccess}>
                                    Գաղտնաբառը հաջողությամբ վերականգնված է, շնորհակալություն․․․
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
                                                    <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                                        <g transform="translate(-2.072 -95.593)">
                                                            <path
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                                                d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                                                transform="translate(-94.628)"
                                                            />
                                                            <path
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                                                d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                                                transform="translate(-203.285 -570.505)"
                                                            />
                                                            <rect
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                                                width={1.502}
                                                                height={0.413}
                                                                transform="translate(7.025 103.37) rotate(-135)"
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            }
                                            // for input
                                            placeholder={'Նոր գաղտնաբառ'}
                                            classNameInput={cls.input}
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
                                                ${
                                                    cls.confirmPassword
                                                }
                                                ${
                                                    this.state.selected === 'password_confirm' ?
                                                        cls.selected
                                                        :
                                                        null
                                                }
                                                ${
                                                    this.state.password !== this.state.password_confirm ?
                                                        cls.error
                                                        :
                                                        ''
                                                }
                                                ${
                                                    this.state.isEmpty['password_confirm'] ?
                                                        `${cls.error} ${cls.errorVerify}`
                                                        :
                                                        ''
                                                }
                                                `
                                            }
                                            label={
                                                <span className={cls.forIcon}>
                                                    <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                                        <g transform="translate(-2.072 -95.593)">
                                                            <path
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                                                d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                                                transform="translate(-94.628)"
                                                            />
                                                            <path
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                                                d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                                                transform="translate(-203.285 -570.505)"
                                                            />
                                                            <rect
                                                                className={`${cls.passwordFill} ${this.state.error === 'password' || this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.password_confirm : '' : ''}`}
                                                                width={1.502}
                                                                height={0.413}
                                                                transform="translate(7.025 103.37) rotate(-135)"
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            }
                                            // for input
                                            placeholder={'Կրկնել գաղտնաբառ'}
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
                                                    onClick={this.showPasswordHandler.bind(this, 'password_confirm')}
                                                    onMouseUp={this.hidePasswordHandler.bind(this, 'password_confirm')}
                                                    onMouseLeave={this.hidePasswordHandler.bind(this, 'password_confirm')}
                                                >
                                            {
                                                this.state.showConfPass ?
                                                    <VisibilityOffOutlinedIcon fontSize='small'
                                                                               style={{color: '#4198bf'}}/>
                                                    :
                                                    <VisibilityOutlinedIcon fontSize='small'
                                                                            style={{color: '#4198bf'}}/>
                                            }
                                            </span>
                                            }
                                        />
                                        <CustomButton
                                            className={cls.signIn}
                                            onClick={event => this.onSubmit(event)}
                                            children={'Հաստատել'}
                                        />
                                    </form>
                                    <div className={cls.createAccount}>
                                        <NavLink className={classes.signUp} to={'/login'}>
                                            Մուտք գործել &nbsp;
                                        </NavLink>
                                        <span>
                                            կամ &nbsp;
                                        </span>
                                        <NavLink className={classes.signUp} to={'/registration'}>
                                            Գրանցվել
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
        sendMailError: data => dispatch(sendMailError(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword))