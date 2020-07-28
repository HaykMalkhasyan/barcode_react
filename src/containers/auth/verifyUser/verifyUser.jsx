import React, {Component} from "react";
import cls from './verifyUser.module.css'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import {connect} from "react-redux";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ErrorIcon from '@material-ui/icons/Error';
import {fetchVerifyUser} from "../../../Redux/registration/action";
import {withRouter} from "react-router-dom";

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
            )

            Object.keys(obj).forEach(
                (item, index) => {
                    obj[item] = objValue[index]
                }
            )
            this.props.fetchVerifyUser(obj)
        } else {
            this.props.history.push('/')
        }
    }

    statusRender = (success, error) => {
        if (success === 'User verified successfully') {
            window.sTime = setTimeout(
                () => this.props.history.push('/'), 1000
            )
            return <VerifiedUserIcon className={cls.iconVerified} fontSize='large'/>
        }
        if (error) {
            return <><ErrorIcon className={cls.iconError} fontSize='default'/> Ստուգումը չհաջողվեց</>
        }
        return <RecordVoiceOverIcon className={cls.iconAnimated} fontSize='large'/>
    }

    componentWillUnmount() {
        clearTimeout(window.sTime)
    }

    render() {
        return (
            <div className={cls.main} style={{background: `url(${process.env.PUBLIC_URL}/images/pic.jpg) no-repeat center`}}>
                <div className={cls.backdrop}>
                    <div className={cls.mainWindow}>
                        <span className={cls.name}>Barcode.am</span>
                        <span className={cls.action}>
                            Օգտագործողի ստուգում
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