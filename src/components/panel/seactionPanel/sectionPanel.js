import React from "react";
import CollapseUi from "../../collapseUi/collapseUi";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import SectionFont from "./sectionFont/sectionFont";

const SectionPanel = props => {

    return (
        <div className="p-3">
            <CollapseUi
                icon={<BorderColorIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                btnName={'font'}
            >
                <SectionFont
                    // Variables
                    sectionFontColor={props.sectionFontColor}
                    sectionColorData={props.sectionColorData}
                    // Methods
                    setColor={props.setColor}
                    restorColor={props.restorColor}
                />
            </CollapseUi>
        </div>
    )
}

export default SectionPanel