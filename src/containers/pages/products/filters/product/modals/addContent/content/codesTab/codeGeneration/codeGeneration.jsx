import React from 'react'
import classes from './codeGeneration.module.css'
import CustomInput from "../../../../../../../../../../components/UI/input/customInput/customInput";
import Icons from "../../../../../../../../../../components/Icons/icons";
import CounterInput from "../../../../../../../../../../components/UI/input/counterInput/counterInput";
import ConfirmButton from "../../../../../../../../../../components/UI/button/confirmButton/confirmButton";
import MenuItem from "@material-ui/core/MenuItem";
import CustomDropDown from "../../../../../../../../../../components/UI/customDropDown/customDropDown";
import Backdrop from "../../../../../../../../../../components/UI/backdrop/backdrop";
import {Barcode} from "../../../../../../../../../../services/services";

const CodeGeneration = props => {

    const handleClick = () => {
        props.setBarcodeValue('open', !props.open)
    };

    const changeHandler = event => {
       props.setDataValues(event.target.name, event.target.value)
    };

    const selectCodeType = (code) => {
        props.setDataValues('barcode', Barcode.random(code.name));
        props.setDataValues('barcode_type', code)
    };

    const handleClose = () => {
        props.setBarcodeValue('open', false)
    };

    const changeValue = (name) => {
        props.setDataValues(name, 1)

    };

    const checkCodeType = (code, codeType) => {
        for (let item of codeType) {
            if (item.id === code.barcode_type) {
                return item.name
            }
        }

        return false
    };

    const checkStatus = (code, errorFields) => {
        for (let key in code) {
            if (code.hasOwnProperty(key)) {
                if (code[key] === "" || errorFields.length > 0) {
                    return true
                }
            }
        }
        return false
    };

    const addBarcodeHandler = () => {
        const barcode = [...props.barcode];
        let index = true;
        for (let item of barcode) {
            console.log(item)
            if (item.barcode === props.code.barcode) {
                index = false;
                break
            }
        }
        if (index) {
            barcode.push(props.code)
            props.setBarcode("barcode", barcode)
        } else {
            const errorFields = [...props.errorFields];
            errorFields.push("barcode")
            props.setBarcodeValue("errorFields", errorFields)
        }
    };

    return (
        <div className={classes.codeGeneration}>
            {
                props.open ?
                    <Backdrop onClick={handleClose} className={`background-transparent ${classes.backDrop}`}/>
                    :
                    null
            }
            <div className={classes.generateWindow}>
                <div className={classes.codArea}>
                    <div className={classes.codeWindow}>
                        <CustomInput
                            readOnly={true}
                            label={'Կոդ'}
                            classNameLabel={`color-8F8F8F font-size-12 ${classes.codLabel}`}
                            classNameInput={props.errorFields.indexOf('barcode') === -1 ? `color-373737 font-size-14 ${classes.codInput}` : `color-373737 font-size-14 ${classes.codInput} ${classes.errorFields}`}
                            name={'barcode'}
                            value={props.code.barcode}
                            // Methods
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.dropWindow}>
                        <CustomDropDown
                            open={props.open}
                                className={`background-024059 color-fff font-size-12 ${classes.buttonRoot}`}
                            label={
                                <>
                                <span className={classes.buttonRootName}>
                                    {
                                        checkCodeType(props.code, props.codeTypes) || 'Գեներացնել'
                                    }
                                </span>
                                    <Icons type={'bottom-angle'} className={`fill-fff stroke-fff{classes.buttonRootIcon}`}/>
                                </>
                            }
                            // Methods
                            handleClick={handleClick}
                        >
                            {
                                props.codeTypes.length ?
                                    props.codeTypes.map(
                                        codeType => {

                                            return (
                                                <MenuItem key={`barcode-${codeType.id}`} onClick={() => selectCodeType(codeType)}>
                                                    {codeType.name}
                                                </MenuItem>
                                            )
                                        }
                                    )
                                    :
                                    null
                            }
                        </CustomDropDown>
                    </div>
                </div>
                <div className={classes.minMaxInp}>
                    <CounterInput
                        label={'Քանակը փաթեթում'}
                        placeholder={'Քանակ'}
                        variant={props.errorFields.indexOf('count') === -1 ? 'success' : 'error'}
                        value={props.code.count}
                        name={'count'}
                        // Methods
                        onChange={changeHandler}
                        changeValue={changeValue}
                    />
                </div>
            </div>
            <div className={classes.createBarcodeWindow}>
                <ConfirmButton
                    className={checkStatus(props.code, props.errorFields) ? classes.disabled : classes.addButton}
                    children={'Ավելացնել'}
                    disabled={checkStatus(props.code, props.errorFields)}
                    // Methods
                    onClick={addBarcodeHandler}
                />
            </div>
        </div>
    )
};

export default CodeGeneration;