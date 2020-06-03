import React from 'react';
import cls from './panel.module.css'
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import CollapseUi from "../collapseUi/collapseUi";
import AirplayIcon from '@material-ui/icons/Airplay';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import customizationImage from './image/customz-image.png'
import Background from "./background/background";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    setColor,
    restorColor
} from '../../redux/customizer/actions'
import CustomizationPanel from "./customisationPanel/cutomizationPanel";
import HeaderPanel from "./headerPanel/headerPanel";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SectionPanel from "./seactionPanel/sectionPanel";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const TemporaryDrawer = props => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            style={{width: '400px'}}
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        >
            <div className={cls.imgWindow}>
                <img className={cls.customizationImage} src={customizationImage} alt="customization"/>
            </div>
            <List>
                <CollapseUi
                    customBackgroundColor={props.customBackgroundColor}
                    icon={<AirplayIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'Background'}
                >
                    <Background
                        // Variables
                        colorData={props.colorData}
                        customIconColor={props.customIconColor}
                        backgroundColor={props.backgroundColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
            </List>
            {/*
                CUSTOMIZATION PANEL
            */}
            {/*<List>
                <CollapseUi
                    customBackgroundColor={props.customBackgroundColor}
                    icon={<BorderRightIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'Config panel'}
                >
                    <CustomizationPanel
                        // Variables
                        customColorData={props.customColorData}
                        customIconColorData={props.customIconColorData}
                        customBackgroundColor={props.customBackgroundColor}
                        customIconColor={props.customIconColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
            </List>*/}
            <List>
                <CollapseUi
                    customBackgroundColor={props.customBackgroundColor}
                    icon={<BorderTopIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'Header panel'}
                >
                    <HeaderPanel
                        // Variables
                        customIconColor={props.customIconColor}
                        headerBackgroundColor={props.headerBackgroundColor}
                        headerColorData={props.headerColorData}
                        headerFontColor={props.headerFontColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
            </List>
            <List>
                <CollapseUi
                    customBackgroundColor={props.customBackgroundColor}
                    icon={<BorderClearIcon style={props.customIconColor ? {color: props.customIconColor} : null} color='primary'/>}
                    btnName={'Section panel'}
                >
                    <SectionPanel
                        // Variables
                        customIconColor={props.customIconColor}
                        sectionColorData={props.sectionColorData}
                        sectionFontColor={props.sectionFontColor}
                        // Methods
                        setColor={props.setColor}
                        restorColor={props.restorColor}
                    />
                </CollapseUi>
            </List>
        </div>
    );

    return (
        <div>
            {
                ['left', 'right', 'top', 'bottom'].map(
                    (anchor) => {
                        return props.type === anchor ?
                            <React.Fragment key={anchor}>
                                <div
                                    className={`${cls.backDrop} ${state[anchor] ? cls.backDropOpened : null}`}
                                    onClick={toggleDrawer(anchor, !state[anchor])}
                                />
                                <Button
                                    color={'primary'}
                                    variant='contained'
                                    className={cls.anchorBtn}
                                    onClick={toggleDrawer(anchor, !state[anchor])}
                                >
                                    {
                                        state[anchor] ?
                                            <ExitToAppIcon fontSize={'small'}/>
                                            :
                                            <PhonelinkSetupIcon fontSize={'small'}/>
                                    }
                                </Button>
                                <Drawer variant={'persistent'} anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                            :
                            null
                    }
                )
            }
        </div>
    );
}

const mapStateToProps = state => ({
    // MAIN BACKGROUND
    colorData: state.customizer.sidebarSize.colorData,
    backgroundColor: state.customizer.sidebarSize.backgroundColor,
    // CUSTOMIZATION PANEL
    customBackgroundColor: state.customizer.sidebarSize.customBackgroundColor,
    customColorData: state.customizer.sidebarSize.customColorData,
    customIconColorData: state.customizer.sidebarSize.customIconColorData,
    customIconColor: state.customizer.sidebarSize.customIconColor,
    // HEADER
    headerColorData: state.customizer.sidebarSize.headerColorData,
    headerBackgroundColor: state.customizer.sidebarSize.headerBackgroundColor,
    headerIconColor: state.customizer.sidebarSize.headerIconColor,
    headerFontColor: state.customizer.sidebarSize.headerFontColor,
    // SECTION
    sectionColorData: state.customizer.sidebarSize.sectionColorData,
    sectionBackgroundColor: state.customizer.sidebarSize.sectionBackgroundColor,
    sectionIconColor: state.customizer.sidebarSize.sectionIconColor,
    sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setColor,
            restorColor
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer)