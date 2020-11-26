import React, {Component} from 'react'
import classes from './pricesTab.module.css'
import {connect} from "react-redux";
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import CustomInput from "../../../../../../../../../components/UI/input/customInput/customInput";
import {getPriceTypeRequest, setPriceValue} from "../../../../../../../../../Redux/price/actions";
import LinearSpinner from "../../../../../../../../../components/UI/spinners/linearSpiner/linearSpinner";
import WarningIcon from '@material-ui/icons/Warning';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import is  from "is_js"

class PricesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            focus: null,
            dataLength: null
        };
        this.props.getPriceTypeRequest();
    }



    componentDidMount = () => {
        window.addEventListener("keydown", this.changeEventFocus);
    }

    changeEventFocus = (event) => {
        let focus = this.state.focus;
        let dataLength = this.state.dataLength;
        if (focus !== null && dataLength !== null) {
            switch (event.code) {
                case "ArrowDown": {
                    if (focus < dataLength -1) {
                        this.setState({focus: ++focus})
                    } else {
                        this.setState({focus: 0})
                    }
                    break;
                }
                case "ArrowUp": {
                    if (focus > 0) {
                        this.setState({focus: --focus})
                    } else {
                        this.setState({focus: (dataLength - 1)})
                    }
                    break;
                }
                default: break;
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.changeEventFocus);
    }

    focusHandler = (index, length) => {
        this.setState({
            focus: index,
            dataLength: length
        })
    }

    valueChangeHandler = (name, value) => {

        if (is.number(+value) && !value.startsWith('-') && ((parseInt(value[0]) + parseInt(value[1])) !== 0)) {
            if (value > 0 && value.startsWith(0) && value[1] !== ".") {
                this.setState({error: name})
                setTimeout(() => this.setState({error: null}), 100)
            } else {
                const values = {...this.props.values};
                values[name] = value.trim();
                this.props.setPriceValue("values", values);
            }

        } else {
            this.setState({error: name})
            setTimeout(() => this.setState({error: null}), 100)
        }
    }

    render() {

        return (
            <div className={classes.pricesTab}>
                <div className={classes.content}>
                    <p className={`color-888 font-size-12 ${classes.information}`}>
                        Այս բաժնում կարող եք փոփոխել ապրանքի գները և տեսնել գների պատմությունը։
                    </p>
                    <SectionWindow
                        label={'Գներ'}
                    >
                        {
                            this.props.progress ?
                                <LinearSpinner progres={`background-transparent ${classes.progress}`} barColorPrimary={classes.progresBgColor}/>
                                :
                                null
                        }
                        <div className={classes.priceContent}>
                            <div className={`color-666 font-size-11 ${classes.exchangeWindow}`}>
                                <span>Փոխարժեք:</span>
                                <b className="color-fff background-046086">ՀՀ Դրամ</b>
                            </div>
                            {
                                this.props.values && this.props.data && this.props.data.length ?
                                    this.props.data.map((item, index) => {

                                        return (
                                            <p key={`price-item-${item.id}`}>
                                                <CustomInput
                                                    checkRef={parseInt(this.state.focus) === parseInt(index)}
                                                    id={item.id}
                                                    name={item.id}
                                                    classNameLabel={this.props.values[item.id].length > 0 ? `color-024059 ${classes.label} ${ classes.active}` : `color-aaa ${classes.label}`}
                                                    classNameInput={parseInt(this.state.error) === item.id ? `background-transparent color-666 font-size-12 ${classes.input} ${classes.error}` : `background-transparent color-666 font-size-12 ${classes.input}`}
                                                    label={item.name}
                                                    placeholder={`[1-9]{1} / [0-9]`}
                                                    value={this.props.values[item.id]}
                                                    // Methods
                                                    onChange={event => {
                                                        this.valueChangeHandler(event.target.name, event.target.value)
                                                    }}
                                                    onFocus={() => {
                                                        this.focusHandler(index, this.props.data.length)
                                                    }}
                                                    onBlur={() => {
                                                        this.setState({
                                                            focus: null,
                                                            dataLength: null
                                                        })
                                                }}
                                                />
                                            </p>
                                        )
                                    })
                                    :
                                    !this.props.error ?
                                        <div className={`color-ccc font-size-12 ${classes.request}`}>
                                            <AutorenewIcon className={`font-size-40 color-66FF8927 ${classes.requestIcon}`}/>
                                            <span>Կատարվում է հարցում</span>
                                        </div>
                                        :
                                        <div className={`color-ccc font-size-12 ${classes.warning}`}>
                                            <WarningIcon className={`font-size-40 color-66FF39397 ${classes.warningIcon}`}/>
                                            <span>Հարցումը չհաջողվեց</span>
                                        </div>
                            }
                        </div>
                    </SectionWindow>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        progress: state.price.progress,
        error: state.price.error,
        data: state.price.data,
        values: state.price.values,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getPriceTypeRequest: () => dispatch(getPriceTypeRequest()),
        setPriceValue: (name, value) => dispatch(setPriceValue(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricesTab);