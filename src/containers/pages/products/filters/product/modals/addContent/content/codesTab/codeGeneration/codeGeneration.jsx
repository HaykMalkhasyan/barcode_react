import React from 'react'
import classes from './codeGeneration.module.css'
import CustomInput from "../../../../../../../../../../components/UI/input/customInput/customInput";
import FadeMenu from "../../../../../../../../../../components/UI/dropdownUI/dropdown";
import Icons from "../../../../../../../../../../components/Icons/icons";
import CounterInput from "../../../../../../../../../../components/UI/input/counterInput/counterInput";
import CustomButton from "../../../../../../../../../../components/UI/button/customButton/customButton";

const CodeGeneration = props => {

    return (
        <div className={classes.codeGeneration}>
            <div>
                <div>
                    <CustomInput
                        label={'Կոդ'}
                        classNameLabel={classes.codLabel}
                        classNameInput={classes.codInput}
                    />
                </div>
                <div>
                    <FadeMenu
                        buttonRoot={classes.buttonRoot}
                        label={
                            <>
                                <span className={classes.buttonRootName}>Գեներացնել</span>
                                <Icons type={'bottom-angle'} className={classes.buttonRootIcon}/>
                            </>
                        }
                    />
                </div>
            </div>
            <div>
                <div>
                    <CounterInput
                        label={'Քանակը փաթեթում'}
                        placeholder={'Քանակ'}
                        variant={'primary'}
                    />
                </div>
                <div>
                    <CustomButton
                        className={classes.deleteButton}
                        children={<Icons type={'delete'}/>}
                    />
                </div>
            </div>
        </div>
    )
};

export default CodeGeneration;