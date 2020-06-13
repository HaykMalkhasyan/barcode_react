import React, {Component} from "react";
// import jwt from 'jwt-simple';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeNotification, login, loginIsEmpty, passwordIsEmpty, resetPage} from "../../redux/auth/actions";
import {getTranslations} from "../../redux/lang/actions"
import {getPages} from '../../redux/pages/actions'
import classes from './login.module.css'
import {NavLink} from "react-router-dom";
import CustomizedSnackbars from "../../components/snachbarsUI/snachbarsUi";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

class LoginContainer extends Component {
    state = {
        // rememberMe: false
        showPass: false,
        text: null,
        emailStatus: null,
        selected: null
    };
    handleChange = event => {
        this.setState({...this.state, [event.target.name]: event.target.value});
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.name === 'username') {
            if (regex.test(event.target.value))
            {
                this.setState({
                    emailStatus: true
                })
            } else {
                this.setState({
                    emailStatus: false
                })
            }
        }
    };


    onSubmit = event => {
        event.preventDefault();
        // let data = [this.state.username,jwt.encode(this.state.password, "password")];
        let data = this.state;
        this.props.login(data, 'index')
        this.props.getTranslations()
        this.props.getPages()

    }

    showPasswordHandler = () => {
        this.setState({
            showPass: true
        })
    }

    hidePasswordHandler = () => {
        this.setState({
            showPass: false
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            loginStatus: false,
            text: null
        })
    };
    handleSecondClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeNotification()
    };

    checkStatus = status => {

        switch (status) {

            case true:
                return (
                    <ErrorOutlineOutlinedIcon fontSize='small' style={{color: '#578DE4'}}/>
                );
            case false:
                return (
            <ErrorOutlineOutlinedIcon fontSize='small' style={{color: '#ff3939'}}/>
                );
            default: return null;
        }
    }

    clickHandler = name => {

        this.setState({
            selected: name
        })
    }

    componentWillUnmount() {
        this.props.resetPage()
    }

    render() {

        return (
            <div className={classes.main} style={{background: `url(${process.env.PUBLIC_URL}pic.jpg) no-repeat center`}}>
                <div className={classes.backdrop}>
                    <div className={`text-center ${classes.mainWindow}`}>
                        <span className={classes.name}>Barcode.am</span>
                        <span className={classes.action}>
                                Մուտք
                            </span>
                        <form onSubmit={event => this.onSubmit(event)}>
                            <label htmlFor={'email'} className={`${classes.email} ${this.state.selected === 'email' ? classes.selected : null} ${this.props.fail ? classes.error : ''} ${this.props.fail ? classes.passwordError : ''}`}>
                                <span className={classes.forIcon}>
                                    <svg width={16} height={13} viewBox="0 0 14.408 11.658">
                                        <defs>
                                            <style>{".statick{fill: #444 !important;}"}</style>
                                        </defs>
                                        <path
                                            className="statick"
                                            d="M19.207,15.844a2.144,2.144,0,0,0-2.144-2.134H7.144A2.144,2.144,0,0,0,5,15.843v7.181a2.144,2.144,0,0,0,2.144,2.144h9.92a2.144,2.144,0,0,0,2.144-2.144v-7.18ZM5.952,14.662a1.679,1.679,0,0,1,1.192-.494h9.92a1.682,1.682,0,0,1,1.68,1.572l-5.7,4.1a1.6,1.6,0,0,1-1.874,0l-5.7-4.1A1.678,1.678,0,0,1,5.952,14.662Zm12.8,8.362a1.686,1.686,0,0,1-1.686,1.686H7.144a1.686,1.686,0,0,1-1.686-1.686V16.3L10.9,20.216a2.063,2.063,0,0,0,2.409,0L18.75,16.3Z"
                                            transform="translate(-4.9 -13.61)"
                                        />
                                    </svg>
                                </span>
                                <input
                                    onFocus={this.clickHandler.bind(this, 'email')}
                                    onBlur={this.clickHandler.bind(this, null)}
                                    id={'email'}
                                    className={`border-0 ${classes.input}`}
                                    type="email"
                                    required={true}
                                    name="username"
                                    placeholder={'Էլ. հասցե'}
                                    onChange={this.handleChange}
                                />
                                <span className={classes.forIcon}>
                                    {
                                        this.checkStatus(this.state.emailStatus)
                                    }
                                </span>
                            </label>
                            <label htmlFor={'password'} className={`${classes.password} ${this.state.selected === 'password' ? classes.selected : null} ${this.props.fail ? classes.error : ''} ${this.props.fail ? classes.passwordError : ''}`}>
                                <span className={classes.forIcon}>
                                    <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                        <defs>
                                            <style>{".statick{fill: #444 !important;}"}</style>
                                        </defs>
                                        <g transform="translate(-2.072 -95.593)">
                                          <path
                                              className="statick"
                                              d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                              transform="translate(-94.628)"
                                          />
                                          <path
                                              className="statick"
                                              d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                              transform="translate(-203.285 -570.505)"
                                          />
                                          <rect
                                              className="statick"
                                              width={1.502}
                                              height={0.413}
                                              transform="translate(7.025 103.37) rotate(-135)"
                                          />
                                        </g>
                                    </svg>
                                </span>
                                <input
                                    onFocus={this.clickHandler.bind(this, 'password')}
                                    onBlur={this.clickHandler.bind(this, null)}
                                    id={'password'}
                                    placeholder={'Գաղտնաբառ'}
                                    className={`border-0 ${classes.input}`}
                                    type={
                                        this.state.showPass ?
                                            'text'
                                            :
                                            'password'
                                    }
                                    required={true}
                                    name="password"
                                    onChange={this.handleChange}
                                />
                                <span
                                    className={classes.forIcon}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={this.showPasswordHandler}
                                    onMouseUp={this.hidePasswordHandler}
                                    onMouseLeave={this.hidePasswordHandler}
                                >
                                    {
                                        this.state.showPass ?
                                            <VisibilityOffOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                            :
                                            <VisibilityOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                    }
                                </span>
                            </label>
                            <NavLink to={'/recover-password'} className={classes.forgetPassword}>
                                Մոռացե՞լ եք գաղտնաբառը
                            </NavLink>
                            <button
                                className={classes.signIn}
                                onClick={event => this.onSubmit(event)}
                            >
                                Մուտք
                            </button>
                        </form>
                        <div className={classes.createAccount}>
                            <span>
                                Գրանցվա՞ծ եք:
                            </span>
                            <NavLink className={classes.signUp} to={'registration'}>
                                Գրանցվել
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authError: state.auth.authError,
        fail: state.auth.fail,
        emptyLogin: state.auth.emptyLogin,
        emptyPassword: state.auth.emptyPassword,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            login,
            getTranslations,
            getPages,
            loginIsEmpty,
            passwordIsEmpty,
            closeNotification,
            resetPage
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
