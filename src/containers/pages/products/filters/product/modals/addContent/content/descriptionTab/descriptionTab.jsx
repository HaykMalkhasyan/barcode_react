import React from 'react'
import classes from './descriptionTab.module.css'
import CustomTextArea from "../../../../../../../../../components/UI/input/customTextArea/customTextArea";
import {connect} from "react-redux";
import {setDescriptionData} from "../../../../../../../../../Redux/products/actions";
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";

const DescriptionTab = props => {

    const changeHandler = event => {
        props.setDescriptionData(event.target.name, event.target.value)
    };

    return (
        <div className={classes.descriptionTab}>
            <div className={classes.content}>
                <p className={`color-888 font-size-12 ${classes.information}`}>
                    Այստեղ կարող եք լրացնել ապրանքին վերաբերող ցանկացած ինֆորմացիա, որը Ձեզ կօգնի հեշտությամբ այն  տարբերակել նմանատիպ այլ ապրանքներից։
                </p>
                <div className={classes.textFieldWindow}>
                    <SectionWindow label={'Նկարագրություն'}>
                        <CustomTextArea
                            className={`color-666 ${classes.textArea}`}
                            placeholder={'Նկարագրության դաշտ...'}
                            name={'description'}
                            value={props.description.description}
                            // Methods
                            onChange={changeHandler}
                        />
                    </SectionWindow>
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