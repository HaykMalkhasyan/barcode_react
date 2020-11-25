import React from 'react'
import classes from './footer.module.css'
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput";
import DropSmiles from "../../../../../../../components/dropSmiles/dropSmiles";
import CustomTextArea from "../../../../../../../components/UI/input/customTextArea/customTextArea";

const Footer = props => {

    return (
        <footer className={classes.footer}>
            <div className={`background-fff ${classes.contentWindow}`}>
                <div className={classes.inputWindow}>
                    <CustomTextArea
                        className={`color-2B2B2B font-size-14 ${classes.input}`}
                        placeholder={'Գրել նամակ'}
                    />
                    <div className={`background-fff ${classes.pickerWindow}`}>
                        <DropSmiles/>
                        <CustomInput
                            id={'file'}
                            type={'file'}
                            label={<Icons type={'clip'}/>}
                            classNameInput={classes.inputFile}
                            classNameLabel={`background-transparent ${classes.pickerButton}`}
                            multiple={true}
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
                        />
                        <CustomInput
                            id={'image'}
                            type={'file'}
                            label={<Icons type={'picture'}/>}
                            classNameInput={classes.inputFile}
                            classNameLabel={`background-transparent ${classes.pickerButton}`}
                            multiple={true}
                            accept="image/*"
                        />
                    </div>
                </div>
                <CustomButton
                    children={<Icons type ='send' className={`fill-fff ${classes.sendIcon}`} width={19} height={19}/>}
                    className={`background-FF6F00 ${classes.sendButton}`}
                />
            </div>
        </footer>
    )
};

export default Footer;