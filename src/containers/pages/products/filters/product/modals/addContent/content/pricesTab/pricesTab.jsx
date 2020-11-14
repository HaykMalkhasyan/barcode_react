import React, {Component} from 'react'
import classes from './pricesTab.module.css'
import {connect} from "react-redux";
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import CustomInput from "../../../../../../../../../components/UI/input/customInput/customInput";
import {setPriceValue} from "../../../../../../../../../Redux/price/actions";
import is  from "is_js"

class PricesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    valueChangeHandler = (name, value) => {
        if (is.number(+value)) {
            this.props.setPriceValue(name, value);
        } else {
            this.setState({error: name})
            setTimeout(() => this.setState({error: null}), 100)
        }
    }

    render() {

        return (
            <div className={classes.pricesTab}>
                <div className={classes.content}>
                    <p className={classes.information}>
                        Այս բաժնում կարող եք փոփոխել ապրանքի գները և տեսնել գների պատմությունը։
                    </p>
                    <SectionWindow
                        label={'Գներ'}
                    >
                        <div className={classes.priceContent}>
                            <div className={classes.exchangeWindow}>
                                <span>Փոխարժեք:</span>
                                <b>ՀՀ Դրամ</b>
                            </div>
                            {
                                this.props.data && this.props.data.length ?
                                    this.props.data.map(item => {

                                        return (
                                            <p key={`price-item-${item.id}`}>
                                                <CustomInput
                                                    id={item.id}
                                                    name={item.name}
                                                    classNameLabel={classes.label}
                                                    classNameInput={this.state.error === item.name ? `${classes.input} ${classes.error}` : classes.input}
                                                    label={item.label}
                                                    placeholder={item.placeholder}
                                                    value={this.props[item.name]}
                                                    // Methods
                                                    onChange={event => {
                                                        this.valueChangeHandler(event.target.name, event.target.value)
                                                    }}
                                                />
                                            </p>
                                        )
                                    })
                                    :
                                    null
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
        data: state.price.data,
        supplier_price: state.price.supplier_price,
        buy_price: state.price.buy_price,
        sell_price: state.price.sell_price,
        wholesale_price: state.price.wholesale_price,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setPriceValue: (name, value) => dispatch(setPriceValue(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricesTab);