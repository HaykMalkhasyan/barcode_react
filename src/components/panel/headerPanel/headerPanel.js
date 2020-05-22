import React from "react";
import CollapseUi from "../../collapseUi/collapseUi";
import List from '@material-ui/core/List';
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ImageIcon from "@material-ui/icons/Image";
import AirplayIcon from '@material-ui/icons/Airplay';
import HeaderBackground from "./headerBackground/headerBackground";
import HeaderIcon from "./headerIcon/headerIcon";
import HeaderFont from "./headerFont/headerFont";

const HeaderPanel = props => {

    return (
        <div className="p-3">
            <CollapseUi
                icon={<BorderColorIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                btnName={'font'}
            >
                <HeaderFont
                    // Variables
                    headerFontColor={props.headerFontColor}
                    headerColorData={props.headerColorData}
                    // Methods
                    setColor={props.setColor}
                    restorColor={props.restorColor}
                />
            </CollapseUi>
            <CollapseUi
                icon={<ImageIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                btnName={'icon'}
            >
                <HeaderIcon
                    // Variables
                    headerIconColor={props.headerIconColor}
                    headerColorData={props.headerColorData}
                    // Methods
                    setColor={props.setColor}
                    restorColor={props.restorColor}
                />
            </CollapseUi>
            <CollapseUi
                icon={<AirplayIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                btnName={'background'}
            >
                <HeaderBackground
                    // Variables
                    headerBackgroundColor={props.headerBackgroundColor}
                    headerColorData={props.headerColorData}
                    // Methods
                    setColor={props.setColor}
                    restorColor={props.restorColor}
                />
            </CollapseUi>
        </div>
    )
}

export default HeaderPanel