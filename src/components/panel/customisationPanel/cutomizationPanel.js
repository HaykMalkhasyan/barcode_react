import React from "react";
import CollapseUi from "../../collapseUi/collapseUi";
import List from '@material-ui/core/List';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CustomizationFont from "./cutomFont/customFont";
import ImageIcon from '@material-ui/icons/Image';
import CustomizationIcon from "./customIcon/customIcon";

const CustomizationPanel = props => {

    return (
        <div className='p-3'>
                <CollapseUi
                    icon={<BorderColorIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'font'}
                >
                    <CustomizationFont
                        // Variables
                        customColorData={props.customColorData}
                        customBackgroundColor={props.customBackgroundColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
                <CollapseUi
                    icon={<ImageIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'icon'}
                >
                    <CustomizationIcon
                        // Variables
                        customIconColorData={props.customIconColorData}
                        customIconColor={props.customIconColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
        </div>
    )
}

export default CustomizationPanel