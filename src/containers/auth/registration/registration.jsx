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
import AlertDialogSlide from "./dialog/dialog";
import CustomButton from "../../../components/UI/button/customButton/customButton";
import {NavLink} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import {registrationHandler, setRegValues} from "../../../Redux/registration/action";
import is from 'is_js'

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
                            <Alert className={classes.alertError} key={index} severity="error">
                                Նշված էլ.հանցեն արդեն գոյություն ունի.
                            </Alert>
                        )
                    case 'regName':
                        return (
                            <Alert className={classes.alertError} key={index} severity="error">
                                Մուտքագրված արժեքը սխալ է
                            </Alert>
                        )
                    case 'regLastName':
                        return (
                            <Alert className={classes.alertError} key={index} severity="error">
                                Մուտքագրված արժեքը սխալ է
                            </Alert>
                        )
                    case 'regPassword':
                    case 'regPassword_confirm':
                        return (
                            <Alert className={classes.alertError} key={index} severity="error">
                                Դուք մուտքագրել եք սխալ գաղտնաբառ
                            </Alert>
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

    const clickHandler = name => {

        props.setRegValues('regSelected', name)
    }

    const handleChange = event => {

        props.setRegValues(event.target.name, event.target.value)
        props.setRegValues('isEmpty', {})

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
    }

    const usagerulesHandler = event => {

        props.setRegValues(event.target.name, !props.usagerules)
        props.setRegValues('isEmpty', {})
    }

    const usagerulesHandlerAgree = status => {

        props.setRegValues('usagerules', status)
        props.setRegValues('isEmpty', {})
    }

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
    }

    const showPasswordHandler = place => {

        switch (place) {
            case 'regPassword': {
                props.setRegValues('showRegPass', true)
                break;
            }
            case 'regPassword_confirm': {
                props.setRegValues('showRegConfPass', true)
                break;
            }
            default: break
        }
    }

    const hidePasswordHandler = place => {

        switch (place) {
            case 'regPassword': {
                props.setRegValues('showRegPass', false)
                break;
            }
            case 'regPassword_confirm': {
                props.setRegValues('showRegConfPass', false)
                break;
            }
            default: break
        }
    }

    const onSubmit = event => {

        event.preventDefault()
        props.registrationHandler()
    }

    return (
        <div className={classes.main} style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
            <div className={classes.backdrop}>
                <div className={classes.mainWindow}>
                    <span className={`${classes.name} ${props.regSuccess ? classes.nameSecond : ''}`}>Barcode.am</span>
                    <span className={classes.action}>Գրանցվել</span>
                    {
                        props.regText ?
                            <Alert className={classes.alertError} severity="error">{props.regText}</Alert>
                            :
                            null

                    }
                    {
                        props.regError ?
                            errorRender(props.regError)
                            :
                            null
                    }
                    {
                        props.regSuccess ?
                            <div className={classes.regSuccess}>
                                Դուք շուտով կստանաք էլ․ հաղորդագրություն, անցեք հաղորդագրությանը կից հղմամբ որպեսզի
                                հաստատեք գրանցումը, շնորհակալություն․․․
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
                                        }
                                        //for input
                                        classNameInput={classes.emailInput}
                                        type="text"
                                        required={true}
                                        name="regName"
                                        placeholder={'Անուն'}
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
                                        }
                                        //for input
                                        classNameInput={classes.emailInput}
                                        type="text"
                                        required={true}
                                        name="regLastName"
                                        placeholder={'Ազգանուն'}
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
                                        }
                                        //for input
                                        classNameInput={classes.input}
                                        type="email"
                                        name="regEmail"
                                        placeholder={'Էլ․ հասցե'}
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
                                                <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                                    <g transform="translate(-2.072 -95.593)">
                                                      <path
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.passwordFillError : '' : ''}`}
                                                          d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                                          transform="translate(-94.628)"
                                                      />
                                                      <path
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.passwordFillError : '' : ''}`}
                                                          d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                                          transform="translate(-203.285 -570.505)"
                                                      />
                                                      <rect
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.passwordFillError : '' : ''}`}
                                                          width={1.502}
                                                          height={0.413}
                                                          transform="translate(7.025 103.37) rotate(-135)"
                                                      />
                                                    </g>
                                                </svg>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={classes.input}
                                        placeholder={'Նոր գաղտնաբառ'}
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
                                                onClick={showPasswordHandler.bind(this, 'regPassword')}
                                                onMouseUp={hidePasswordHandler.bind(this, 'regPassword')}
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
                                                <svg width={22} height={19} viewBox="0 0 11.664 11.665">
                                                    <g transform="translate(-2.072 -95.593)">
                                                      <path
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword_confirm' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.passwordFillError : '' : ''}`}
                                                          d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                                                          transform="translate(-94.628)"
                                                      />
                                                      <path
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword_confirm' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.passwordFillError : '' : ''}`}
                                                          d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                                                          transform="translate(-203.285 -570.505)"
                                                      />
                                                      <rect
                                                          className={`${classes.passwordFill} ${props.wrongRegError === 'regPassword_confirm' ? classes.passwordFillError : ''} ${props.regPassword && props.regPassword_confirm ? props.regPassword !== props.regPassword_confirm ? classes.password_confirm : '' : ''}`}
                                                          width={1.502}
                                                          height={0.413}
                                                          transform="translate(7.025 103.37) rotate(-135)"
                                                      />
                                                    </g>
                                                </svg>
                                            </span>
                                        }
                                        //for input
                                        classNameInput={classes.input}
                                        placeholder={'Կրկնել գաղտնաբառ'}
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
                                                onClick={showPasswordHandler.bind(this, 'regPassword_confirm')}
                                                onMouseUp={hidePasswordHandler.bind(this, 'regPassword_confirm')}
                                                onMouseLeave={hidePasswordHandler.bind(this, 'regPassword_confirm')}
                                            >
                                                {
                                                    props.showRegConfPass ?
                                                        <VisibilityOffOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
                                                        :
                                                        <VisibilityOutlinedIcon fontSize='small' style={{color: '#4198bf'}}/>
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
                                            <span className={classes.check}>
                                                Ես համաձայն եմ
                                            </span>
                                            <AlertDialogSlide
                                                type={'button'}
                                                className={classes.checkLink}
                                                text={'Օգտագործման կանոններին'}
                                                agree={'Համաձայն եմ'}
                                                disagree={'Համաձայն չեմ'}
                                                usagerulesHandlerAgree={usagerulesHandlerAgree}
                                            />
                                            <span>:</span>
                                        </label>
                                    </div>
                                    <CustomButton
                                        className={classes.signIn}
                                        children={'Գրանցվել'}
                                        // Methods
                                        onClick={onSubmit}
                                    />
                                </form>
                                <div className={classes.createAccount}>
                                    <span>Գրանցվա՞ծ եք:</span>
                                    <NavLink to='/login' className={classes.signUp}>Մուտք</NavLink>
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
}

function mapStateToProps(state) {

    return {
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
        registrationHandler: () => dispatch(registrationHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)