import React from 'react'
import classes from './footer.module.css'
import CustomButton from "../../../../../../../components/UI/button/customButton/custom-button";
import Icons from "../../../../../../../components/Icons/icons";
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput";
import DropSmiles from "../../../../../../../components/dropSmiles/dropSmiles";
import CustomTextArea from "../../../../../../../components/UI/input/customTextArea/customTextArea";

const Footer = props => {

    return (
        <footer className={classes.footer}>
            <div className={classes.contentWindow}>
                <div className={classes.inputWindow}>
                    <CustomTextArea
                        className={classes.input}
                        placeholder={'Գրել նամակ'}
                    />
                    <div className={classes.pickerWindow}>
                        <DropSmiles/>
                        <CustomInput
                            id={'file'}
                            type={'file'}
                            label={<Icons type={'clip'}/>}
                            classNameInput={classes.inputFile}
                            classNameLabel={classes.pickerButton}
                            multiple={true}
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
                        />
                        <CustomInput
                            id={'image'}
                            type={'file'}
                            label={<Icons type={'picture'}/>}
                            classNameInput={classes.inputFile}
                            classNameLabel={classes.pickerButton}
                            multiple={true}
                            accept="image/*"
                        />
                    </div>
                </div>
                <CustomButton
                    children={<Icons type ='send' className={classes.sendIcon} width={19} height={19}/>}
                    className={classes.sendButton}
                />
            </div>
        </footer>
    )
};

export default Footer;