import React from 'react'
import classes from './paper-sizes.module.css'
import CustomButton from "../../../../../../../../../../../../../components/UI/button/customButton/custom-button";

const PaperSizes = props => {

    return (
        <div className={classes.paperSizes}>
            {
                props.data && props.data.length ?
                    props.data.map(
                        item => {

                            return (
                                <CustomButton
                                    key={`paper-size-${item.id}`}
                                    className={
                                        props.width === item.width && props.height === item.height ?
                                            `${classes.paperButton} ${classes.active}`
                                            :
                                            classes.paperButton
                                    }
                                    children={
                                        <>
                                            <div
                                                style={
                                                    {
                                                        width: item.width + 'px',
                                                        height: item.height + 'px',
                                                        backgroundColor: '#fff'
                                                    }
                                                }
                                            />
                                            <span>
                                                {item.name}
                                            </span>
                                        </>
                                    }
                                    // Methods
                                    onClick={() => props.setPaperSize(item.width, item.height)}
                                />
                            )
                        }
                    )
                    :
                    null
            }
        </div>
    )
};

export default PaperSizes;