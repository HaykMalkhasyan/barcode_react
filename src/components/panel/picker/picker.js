import React, {useState} from "react";
import Translate from "../../../Translate";
import ColorPicker from "material-ui-color-picker";
import classes from "./picker.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import ButtonUi from "../../buttons/buttonUi";
import BrushIcon from "@material-ui/icons/Brush";
import RestoreIcon from "@material-ui/icons/Restore";
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const Picker = props => {
    const [idRandom] = useState(Math.random)

    return (
        <>
            <h6><Translate name={'Choose color'}/></h6>
            <ColorPicker
                style={{backgroundColor: props.pickerValue}}
                name={props.name}
                variant='standard'
                defaultValue={props.pickerValue}
                value={props.pickerValue}
                onChange={color => props.checkColor(color)}
            />
            <h5 className='my-2 mt-3'><Translate name={'Secondary colors'}/></h5>
            <div className={classes.colorArea}>
                {
                    props.data ?
                        props.data.map(
                            item => {

                                return (
                                    <div
                                        key={item.id}
                                        className={classes.colorWindow}
                                        style={{background: item.color}}
                                    >
                                        <input
                                            type="radio"
                                            name={props.name}
                                            value={item.color}
                                            id={`color-${item.forItem + idRandom}`}
                                            onChange={event => props.checkColor(event.target.value)}
                                            hidden
                                        />
                                        <label htmlFor={`color-${item.forItem + idRandom}`}>
                                            <Tooltip title={item.name} placement="right">
                                                <span
                                                    className={`${classes.radioCheked} ${props.backgroundColor === item.color ? classes.checkedBefore : ''} ${props.active === item.color ? classes.checked : ''}`}>
                                                    {
                                                        props.active === item.color ?
                                                            item.color === props.backgroundColor ?
                                                                <DoneAllIcon/>
                                                                :
                                                                <CheckIcon/>
                                                            :
                                                            item.color === props.backgroundColor ?
                                                                <DoneAllIcon/>
                                                                :
                                                                null
                                                    }
                                                </span>
                                            </Tooltip>
                                        </label>
                                    </div>
                                )
                            }
                        )
                        :
                        null
                }
            </div>
            <ButtonUi
                className='pull-right mt-1 mr-2'
                padding={'0 10px'}
                width={'auto'}
                height={'auto'}
                color='primary'
                variant='contained'
                onClick={props.createColor}
            >
                <BrushIcon/>
            </ButtonUi>
            <ButtonUi
                className='pull-right mt-1 mr-1'
                padding={'0 10px'}
                width={'auto'}
                height={'auto'}
                color='secondary'
                variant='outlined'
                onClick={props.restorColor}
            >
                <RestoreIcon/>
            </ButtonUi>
        </>
    )
}

export default Picker