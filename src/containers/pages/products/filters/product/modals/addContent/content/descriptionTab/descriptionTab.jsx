import React from 'react'
import classes from './descriptionTab.module.css'
import CustomTextArea from "../../../../../../../../../components/UI/input/customTextArea/customTextArea";
import {connect} from "react-redux";
import {setDescriptionData} from "../../../../../../../../../Redux/products/actions";

const DescriptionTab = props => {

    const changeHandler = event => {
        props.setDescriptionData(event.target.name, event.target.value)
    };

    return (
        <div className={classes.descriptionTab}>
            <div className={classes.header}>
                <h3>Նկարագրություն</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Այստեղ կարող եք լրացնել ապրանքին վերաբերող ցանկացած ինֆորմացիա, որը Ձեզ կօգնի հեշտությամբ այն  տարբերակել նմանատիպ այլ ապրանքներից։
                </p>
                <div className={classes.textFieldWindow}>
                    <header>
                        Նկարագրություն
                    </header>
                    <CustomTextArea
                        className={classes.textArea}
                        placeholder={'Նկարագրության դաշտ․․․'}
                        name={'description'}
                        value={props.description.description}
                        // Methods
                        onChange={changeHandler}
                    />
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        description: state.products.description
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setDescriptionData: (name, value) => dispatch(setDescriptionData(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionTab);