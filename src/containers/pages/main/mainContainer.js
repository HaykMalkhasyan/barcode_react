import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MainPage from "./mainPage";

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch
    )
}

const mapStateToProps = state => {

    return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)