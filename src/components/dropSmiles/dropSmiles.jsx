import React, {useState} from 'react'
import classes from './dropSmiles.module.css'
import CustomButton from "../UI/button/customButton/custom-button";
import Icons from "../Icons/icons";
import Backdrop from "../UI/backdrop/backdrop";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const DropSmiles = props => {
    const [open, setOpen] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const toggleHandler = () => {
        setOpen(!open)
    };

    return (
        <div className={classes.smileWindow}>
            {
                open ?
                    <>
                        <div className={classes.smileContainer}>
                            <div>
                                <Picker  onEmojiClick={onEmojiClick} disableAutoFocus={true} skinTone={SKIN_TONE_MEDIUM_DARK} groupNames={{smileys_people:"PEOPLE"}}/>
                                {/*{ chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}*/}
                            </div>
                        </div>
                        <Backdrop
                            className={classes.backdrop}
                            // Methods
                            onClick={toggleHandler}
                        />
                    </>
                    :
                    null
            }
            <CustomButton
                className={open ? `${classes.pickerButton} ${classes.opened}` : classes.pickerButton}
                children={<Icons type={'smile'} className={open ? classes.smileIcon : ""}/>}
                // Methods
                onClick={toggleHandler}
            />
        </div>
    )
};

export default DropSmiles;