import React, {Component} from "react";
import cls from './registration.module.css';
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import {NavLink} from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Checkbox from '@material-ui/core/Checkbox';
import classes from "./mailVerification/mailVerification.module.css";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fetchRegistration} from '../../../redux/authReg/actions'

class Reagistration extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        usagerules: false,
        error: null,
        showPass: false,
        showConfPass: false,
        loginStatus: false,
        severity: null,
        text: null,
        emailStatus: null,
        selected: null,
        isEmpty: {}
    };

    usagerulesHandler = event => {
        this.setState({
            [event.target.name]: !this.state.usagerules,
            isEmpty: {}
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isEmpty: {}
        });
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.name === 'email') {
            if (regex.test(event.target.value)) {
                this.setState({
                    emailStatus: true
                })
            } else {
                this.setState({
                    emailStatus: false
                })
            }
        }
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


    onSubmit = event => {
        event.preventDefault();
        const usagerules = this.state.usagerules;
        const registration = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
        }
        const isEmpty = {};
        for (let item in registration) {
            if (registration[item].length === 0) {
                isEmpty[item] = true
            }
        }
        if (usagerules === false) {
            isEmpty['usagerules'] = true
        }
        if (registration.password !== registration.password_confirm) {
            isEmpty['password'] = true;
            isEmpty['password_confirm'] = true;
        }
        this.setState({
            isEmpty
        })
        if (Object.keys(isEmpty).length === 0) {
            registration['username'] = registration.email
            this.props.fetchRegistration(registration)
        }

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
            default:
                return null;
        }
    }

    clickHandler = name => {

        this.setState({
            selected: name
        })
    }

    errorRender = error => {
        let errorArray = [];
        let errorStatus = false;
        if (error) {
            for (let item in error) {
                errorArray.push(item)
            }
        }
        let errorFinish = errorArray.map(
            (item, index) => {
                switch (item) {

                    case 'email':
                    case 'username':

                        return (
                            <Alert className='my-1' key={index} severity="error">
                                Նշված էլ.հանցեն արդեն գոյություն ունի.
                            </Alert>
                        )
                    case 'first_name':
                        return (
                            <Alert className='my-1' key={index} severity="error">Մուտքագրված արժեքը սխալ է</Alert>
                        )
                    case 'last_name':
                        return (
                            <Alert className='my-1' key={index} severity="error">Մուտքագրված արժեքը սխալ է</Alert>
                        )
                    case 'password':
                    case 'password_confirm':
                        return (
                            <Alert className='my-1' key={index} severity="error">Դուք մուտքագրել եք սխալ
                                գաղտնաբառ</Alert>
                        )
                    default: {
                        errorStatus = true;
                        return null;
                    }
                }
            }
        )
        if (errorStatus) {
            return (
                <Alert className='my-1' severity="error">Գրանցումը չհաջողվեց</Alert>
            )
        } else {
            return errorFinish
        }
    }

    render() {

        return (
            <div className={cls.main}>
                <div className={cls.backdrop}>
                    <div className={`text-center ${cls.mainWindow}`}>
                        <span className={`${cls.name} ${this.props.success ? cls.nameSecond : ''}`}>Barcode.am</span>
                        <span className={cls.action}>
                                Գրանցվել
                            </span>
                        {
                            this.props.error ?
                                this.errorRender(this.props.error)
                                :
                                null
                        }
                        {
                            this.props.success ?
                                <div className={cls.regSuccess}>
                                    Դուք շուտով կստանաք էլ․ հաղորդագրություն, անցեք հաղորդագրությանը կից հղմամբ որպիսզի
                                    հաստատեք գրանցումը, շնորհակալություն․․․
                                </div>
                                :
                                <>
                                    <form onSubmit={event => this.onSubmit(event)}>
                                        <label
                                            htmlFor={'first_name'}
                                            className={
                                                `
                                                ${
                                                    cls.email
                                                }
                                                ${
                                                    this.state.selected === 'first_name' ?
                                                        cls.selected
                                                        :
                                                        null
                                                }
                                                ${
                                                    this.state.isEmpty['first_name'] ?
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                    `
                                            }
                                        >
                                <span className={cls.forIcon}>
                                    <svg width={16} height={13} viewBox="0 0 10.619 11.858">
                                        <defs>
                                           <style>{".statick1{fill: #444 !important;stroke:#545454;stroke-width:0.4px;}"}</style>
                                        </defs>
                                        <g transform="translate(-33.3 -31.3)">
                                          <g transform="translate(33.5 31.5)">
                                            <path
                                                className="statick1"
                                                d="M43.719,42.8a.155.155,0,1,1-.31,0,4.8,4.8,0,0,0-9.6,0,.155.155,0,0,1-.31,0,5.11,5.11,0,0,1,10.219,0Zm-5.11-5.419a2.942,2.942,0,1,1,2.942-2.942A2.942,2.942,0,0,1,38.61,37.384Zm0-.31a2.632,2.632,0,1,0-2.632-2.632A2.632,2.632,0,0,0,38.61,37.074Z"
                                                transform="translate(-33.5 -31.5)"
                                            />
                                          </g>
                                        </g>
                                    </svg>
                                </span>
                                            <input
                                                onFocus={this.clickHandler.bind(this, 'first_name')}
                                                onBlur={this.clickHandler.bind(this, null)}
                                                id={'first_name'}
                                                className={`border-0 ${cls.emailInput}`}
                                                type="text"
                                                required={true}
                                                name="first_name"
                                                placeholder={'Անուն'}
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label
                                            htmlFor={'last_name'}
                                            className={
                                                `
                                                ${
                                                    cls.email
                                                }
                                                ${
                                                    this.state.selected === 'last_name' ?
                                                        cls.selected
                                                        :
                                                        null
                                                }
                                                ${
                                                    this.state.isEmpty['last_name'] ?
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                    `
                                            }
                                        >
                                <span className={cls.forIcon}>
                                    <svg width={16} height={13} viewBox="0 0 15.866 11.658">
                                        <defs>
                                            <style>{".statick2{fill: #444 !important;stroke:#545454;stroke-width:0.4px;}"}</style>
                                        </defs>
                                        <g transform="translate(-1.9 -15.9)">
                                          <g transform="translate(2 16)">
                                            <g transform="translate(2.778 0)">
                                              <path
                                                  className="statick2"
                                                  d="M20.778,22.25C19.141,22.25,18,20.42,18,18.778A2.63,2.63,0,0,1,20.778,16a2.63,2.63,0,0,1,2.778,2.778C23.555,20.42,22.415,22.25,20.778,22.25Zm0-5.9a2.278,2.278,0,0,0-2.431,2.431c0,1.478,1,3.125,2.431,3.125s2.43-1.647,2.43-3.125A2.278,2.278,0,0,0,20.778,16.347Z"
                                                  transform="translate(-18 -16)"
                                              />
                                            </g>
                                            <g transform="translate(0 6.423)">
                                              <path
                                                  className="statick2"
                                                  d="M7.555,58.035C5.021,58.035,2,57.794,2,56.646,2,54.295,3.973,53,7.555,53s5.555,1.295,5.555,3.646C13.111,57.794,10.09,58.035,7.555,58.035Zm0-4.687c-1.945,0-5.208.428-5.208,3.3,0,.481,1.364,1.042,5.208,1.042s5.208-.561,5.208-1.042C12.764,53.776,9.5,53.347,7.555,53.347Z"
                                                  transform="translate(-2 -53)"
                                              />
                                            </g>
                                          </g>
                                          <g transform="translate(11.333 16.347)">
                                            <path
                                                className="statick2"
                                                d="M57.886,22.772a2.453,2.453,0,0,1-2.126-2.646,2.126,2.126,0,0,1,4.251,0A2.453,2.453,0,0,1,57.886,22.772Zm0-4.424a1.666,1.666,0,0,0-1.778,1.778c0,1.087.73,2.3,1.778,2.3s1.778-1.212,1.778-2.3A1.666,1.666,0,0,0,57.886,18.347Z"
                                                transform="translate(-55.76 -18)"
                                            />
                                          </g>
                                          <g transform="translate(11.796 21.509)">
                                            <path
                                                className="statick2"
                                                d="M60.964,51.579l-.012-.347c2.213-.078,3-.438,3-.723,0-1.108-.67-2.429-3.86-2.429a7.625,7.625,0,0,0-1.59.15l-.073-.339a7.97,7.97,0,0,1,1.663-.157c2.713,0,4.208.986,4.208,2.776C64.3,51.141,63.176,51.5,60.964,51.579Z"
                                                transform="translate(-58.427 -47.733)"
                                            />
                                          </g>
                                        </g>
                                    </svg>
                                </span>
                                            <input
                                                onFocus={this.clickHandler.bind(this, 'last_name')}
                                                onBlur={this.clickHandler.bind(this, null)}
                                                id={'last_name'}
                                                className={`border-0 ${cls.emailInput}`}
                                                type="text"
                                                name="last_name"
                                                placeholder={'Ազգանուն'}
                                                value={this.state.surname}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label
                                            htmlFor={'email'}
                                            className={
                                                `
                                    ${
                                                    cls.email
                                                }
                                    ${
                                                    this.state.selected === 'email' ?
                                                        cls.selected
                                                        :
                                                        null
                                                }
                                    ${
                                                    this.state.isEmpty['email'] ?
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                    `
                                            }
                                        >
                                <span className={cls.forIcon}>
                                    <svg width={16} height={13} viewBox="0 0 14.408 11.658">
                                        <defs>
                                            <style>{".statick3{fill: #444 !important;stroke:#545454;stroke-width:0.4px;}"}</style>
                                        </defs>
                                        <path
                                            className="statick3"
                                            d="M19.207,15.844a2.144,2.144,0,0,0-2.144-2.134H7.144A2.144,2.144,0,0,0,5,15.843v7.181a2.144,2.144,0,0,0,2.144,2.144h9.92a2.144,2.144,0,0,0,2.144-2.144v-7.18ZM5.952,14.662a1.679,1.679,0,0,1,1.192-.494h9.92a1.682,1.682,0,0,1,1.68,1.572l-5.7,4.1a1.6,1.6,0,0,1-1.874,0l-5.7-4.1A1.678,1.678,0,0,1,5.952,14.662Zm12.8,8.362a1.686,1.686,0,0,1-1.686,1.686H7.144a1.686,1.686,0,0,1-1.686-1.686V16.3L10.9,20.216a2.063,2.063,0,0,0,2.409,0L18.75,16.3Z"
                                            transform="translate(-4.9 -13.61)"
                                        />
                                    </svg>
                                </span>
                                            <input
                                                onFocus={this.clickHandler.bind(this, 'email')}
                                                onBlur={this.clickHandler.bind(this, null)}
                                                id={'email'}
                                                className={`border-0 ${cls.input}`}
                                                type="email"
                                                name="email"
                                                placeholder={'Էլ․ հասցե'}
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                            <span className={classes.forIcon}>
                                    {
                                        this.checkStatus(this.state.emailStatus)
                                    }
                                </span>
                                        </label>
                                        <label
                                            htmlFor={'password'}
                                            className={
                                                `
                                                ${
                                                    cls.password
                                                }
                                                ${
                                                    this.state.selected === 'password' ?
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
                                                    this.state.isEmpty['password'] ?
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                                `
                                            }
                                        >
                                <span className={cls.forIcon}>
                                    <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                        <g transform="translate(-2.072 -95.593)">
                                          <path
                                              className={`${cls.passwordFill} ${this.state.error === 'password' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                              d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                              transform="translate(-94.628)"
                                          />
                                          <path
                                              className={`${cls.passwordFill} ${this.state.error === 'password' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                              d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                              transform="translate(-203.285 -570.505)"
                                          />
                                          <rect
                                              className={`${cls.passwordFill} ${this.state.error === 'password' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
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
                                                placeholder={'Նոր գաղտնաբառ'}
                                                className={`border-0 ${cls.input}`}
                                                type={
                                                    this.state.showPass ?
                                                        'text'
                                                        :
                                                        'password'
                                                }
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
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
                                        </label>
                                        <label
                                            htmlFor={'password_confirm'}
                                            className={
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
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                                `
                                            }
                                        >
                                <span className={cls.forIcon}>
                                    <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                        <g transform="translate(-2.072 -95.593)">
                                          <path
                                              className={`${cls.passwordFill} ${this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                              d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                              transform="translate(-94.628)"
                                          />
                                          <path
                                              className={`${cls.passwordFill} ${this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.passwordFillError : '' : ''}`}
                                              d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                              transform="translate(-203.285 -570.505)"
                                          />
                                          <rect
                                              className={`${cls.passwordFill} ${this.state.error === 'password_confirm' ? cls.passwordFillError : ''} ${this.state.password && this.state.password_confirm ? this.state.password !== this.state.password_confirm ? cls.password_confirm : '' : ''}`}
                                              width={1.502}
                                              height={0.413}
                                              transform="translate(7.025 103.37) rotate(-135)"
                                          />
                                        </g>
                                    </svg>
                                </span>
                                            <input
                                                onFocus={this.clickHandler.bind(this, 'password_confirm')}
                                                onBlur={this.clickHandler.bind(this, null)}
                                                id={'password_confirm'}
                                                placeholder={'Կրկնել գաղտնաբառ'}
                                                className={`border-0 ${cls.input}`}
                                                type={
                                                    this.state.showConfPass ?
                                                        'text'
                                                        :
                                                        'password'
                                                }
                                                name="password_confirm"
                                                value={this.state.password_confirm}
                                                onChange={this.handleChange}
                                            />
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
                                            <VisibilityOffOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                            :
                                            <VisibilityOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                    }
                                </span>
                                        </label>
                                        <div
                                            className={
                                                `
                                    ${
                                                    cls.checkWindow
                                                }
                                    ${
                                                    this.state.isEmpty['usagerules'] ?
                                                        `${cls.error} ${cls.erroVerify}`
                                                        :
                                                        ''
                                                }
                                    `
                                            }
                                        >
                                            <Checkbox
                                                classes={{
                                                    root: cls.checkboxRoot
                                                }}
                                                checked={this.state.usagerules}
                                                id={'check'}
                                                size="small"
                                                name={'usagerules'}
                                                inputProps={{'aria-label': 'checkbox with small size'}}
                                                onChange={this.usagerulesHandler}
                                            />
                                            <label htmlFor="check" className={cls.checkLabel}>
                                    <span
                                        className={`${cls.check} mr-1`}
                                    >
                                        Ես համաձայն եմ
                                    </span>
                                                <NavLink
                                                    className={cls.checkLink}
                                                    to={'/usagerules'}
                                                >
                                                    Օգտագործման կանոններին
                                                </NavLink>
                                                <span>:</span>
                                            </label>
                                        </div>
                                        <button
                                            className={cls.signIn}
                                            onClick={event => this.onSubmit(event)}
                                        >
                                            Գրանցվել
                                        </button>
                                    </form>
                                    <div className={cls.createAccount}>
                            <span>
                                Գրանցվա՞ծ եք:
                            </span>
                                        <NavLink className={cls.signUp} to={'login'}>
                                            Մուտք
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
        error: state.signup.error,
        success: state.signup.success,
        progress: state.signup.progress,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchRegistration
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Reagistration)