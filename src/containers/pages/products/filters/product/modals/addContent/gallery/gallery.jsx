import React from 'react'
import classes from './gallery.module.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Tooltip from "@material-ui/core/Tooltip"
import CustomInput from "../../../../../../../../components/UI/input/customInput/customInput"
import AsNavFor from "../../../../../../../../components/asNavFor/asNavFor"
import CustomButton from "../../../../../../../../components/UI/button/customButton/customButton"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const Gallery = props => {

    const checkImage = (item, product) => {
        switch (props.type) {
            case 'add':
                return false;
            case 'edit': {
                for (let i of product.pictures) {
                    if (item === i.image) {
                        return true
                    }
                }
                break;
            }
            default: break
        }

    };

    return (
        <div className={classes.galleryWindow}>
            <CustomInput
                classNameLabel={props.gallery && props.gallery.length === 0 ? `color-rgba_00008 ${classes.addPFirstPhoto}` : `background-rgba_00005 color-fff font-size-12 ${classes.addPhoto}`}
                inputType={'inner'}
                id={'addPhoto'}
                hidden={true}
                label={<WallpaperIcon/>}
                type={'file'}
                name={'gallery'}
                multiple={true}
                // Methods
                onChange={props.addPhoto}
            />
            <AsNavFor
                tabindex={-1}
                className={classes.asNavForClass}
                main={classes.main}
                second={classes.second}
                mainImg={classes.mainImage}
                subImg={classes.subImage}
                data={props.gallery}
                centerMode={true}
                focusOnSelect={true}
                swipeToSlide={true}
                subArrows={false}
                subDots={false}
                vertical={true}
                verticalSwiping={true}
                prevClassName={`background-59000000 color-fff font-size-30 ${classes.prevClassName} ${classes.arrowsBtn}`}
                nextIcon={<ChevronRightIcon fontSize='large'/>}
                prevIcon={<ChevronLeftIcon fontSize='large'/>}
                nextClassName={`background-59000000 color-fff font-size-30 ${classes.nextClassName} ${classes.arrowsBtn}`}
                mainData={
                    props.gallery.map(
                        (item, index) => {

                            return (
                                <div tabIndex={-1} key={index + Math.random()}>
                                    <div tabIndex={-1} className={classes.mainImage}>
                                        <div tabIndex={-1} className={checkImage(item, props.product) ? `background-rgba_00003 ${classes.galleryControllers}` : `background-rgba_00003 ${classes.galleryControllers} ${classes.galleryController}`}>
                                            <div tabIndex={-1} className={`background-rgba_00008 ${classes.setToMainImage}`}>
                                                <CustomButton
                                                    tabIndex={-1}
                                                    className={`color-39ff39 background-transparent ${classes.controllersBtn} ${classes.setToMainBtn}`}
                                                    children={
                                                        <Tooltip title="Ցուցադրել որպես գլխավոր նկար" placement="right">
                                                            <ArrowUpwardIcon style={{fontSize: 20}}/>
                                                        </Tooltip>
                                                    }
                                                />
                                            </div>
                                            {
                                                checkImage(item, props.product) ?
                                                    <div className={`background-rgba_00008 ${classes.deleteItemImage}`}>
                                                        <CustomButton
                                                            tabIndex={-1}
                                                            className={`color-f44336 background-transparent ${classes.controllersBtn} ${classes.deleteItemBtn}`}
                                                            children={
                                                                <Tooltip title="Ջնջել նկարը" placement="right">
                                                                    <DeleteOutlineIcon style={{fontSize: 20}}/>
                                                                </Tooltip>
                                                            }
                                                            // Methods
                                                            onClick={() => props.deleteImageHandler(item, index)}
                                                        />
                                                    </div>
                                                    :
                                                    <div className={`background-rgba_00008 ${classes.deleteItemImage}`}>
                                                        <CustomButton
                                                            tabIndex={-1}
                                                            className={`color-f44336 background-transparent ${classes.controllersBtn} ${classes.deleteItemBtn}`}
                                                            children={
                                                                <Tooltip title="Ջնջել ավելացռած նկարներըը" placement="right">
                                                                    <DeleteForeverIcon style={{fontSize: 20}}/>
                                                                </Tooltip>
                                                            }
                                                            // Methods
                                                            onClick={() => props.deleteUploadImagesHandler(item, index)}
                                                        />
                                                    </div>
                                            }
                                        </div>
                                        <img tabIndex={-1} src={item} alt={item.name}/>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
                subData={
                    props.gallery.map(
                        (item, index) => {

                            return (
                                <div key={index + Math.random()}>
                                    <div className={classes.subImage}>
                                        <img src={item} alt={item.name}/>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            />
        </div>
    )
};

export default Gallery