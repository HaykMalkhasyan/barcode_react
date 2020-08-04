import React from 'react'
import classes from './descriptionTab.module.css'
import CustomTextArea from "../../../../../../../../../components/UI/input/customTextArea/customTextArea";

const DescriptionTab = props => {

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
                    />
                </div>
            </div>
        </div>
    )
};

export default DescriptionTab;