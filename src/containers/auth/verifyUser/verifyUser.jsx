import React, {Component} from "react"
import cls from './verifyUser.module.css'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import {connect} from "react-redux"
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ErrorIcon from '@material-ui/icons/Error'
import {fetchVerifyUser} from "../../../Redux/registration/action"
import {withRouter} from "react-router-dom"
import {getLanguage} from "../../../controllers/languages/languages";

class VerifyUser extends Component {
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
            this.props.fetchVerifyUser(obj)
        } else {
            this.props.history.push('/')
        }
    }

    statusRender = (success, error) => {
        if (success === 'User verified successfully') {
            window.sTime = setTimeout(
                () => this.props.history.push('/'), 1000
            );
            return <VerifiedUserIcon className={cls.iconVerified} fontSize='large'/>
        }
        if (error) {
            return <><ErrorIcon className={cls.iconError} fontSize='default'/> {getLanguage(this.props.activeLanguage, 'verification_failed')}</>
        }
        return <RecordVoiceOverIcon className={cls.iconAnimated} fontSize='large'/>
    };

    componentWillUnmount() {
        clearTimeout(window.sTime)
    }

    render() {
        return (
            <div className={`background-5b86e5-36dadc ${cls.main}`} style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
                <div className={cls.backdrop}>
                    <div className={`background-fff ${cls.mainWindow}`}>
                        <span className={`color-1B5985 font-size-34 ${cls.name}`}>Barcode.am</span>
                        <span className={`color-444 font-size-21 ${cls.action}`}>
                            {getLanguage(this.props.activeLanguage, 'user_check')}
                        </span>
                        <div className={cls.statusView}>
                            {
                                this.statusRender(this.props.verifySuccess, this.props.verifyError)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeLanguage: state.language.activeLanguage,
        verifySuccess: state.registration.verifySuccess,
        verifyError: state.registration.verifyError,
    }
}

function mapDispatchToProps(dispatch) {

    return  {
        fetchVerifyUser: data => dispatch(fetchVerifyUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyUser))