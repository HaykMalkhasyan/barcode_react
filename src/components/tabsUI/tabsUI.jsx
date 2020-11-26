import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function ScrollableTabsButtonAuto(props) {
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        props.setTabValue(newValue)
    };

    const contentRender = (tabContent, value) => {

        return tabContent.map(
            (Item, index) => {
                return (
                    <TabPanel
                        className={props.tabPanelRoot}
                        key={`tabs-${index}`}
                        value={value}
                        index={index}
                    >
                        <Item {...props}/>
                    </TabPanel>
                )

            }
        )
    };

    return (
        <>
            <AppBar
                classes={{root: props.root}}
                position="static"
            >
                <Tabs
                    value={props.activeTab}
                    onChange={handleChange}
                    classes={{
                        indicator: props.indicator,
                        root: props.TabScrollRoot,
                        scrollButtons: props.scrollButtonsDesktop,
                    }}
                    // indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    // orientation={"vertical"}
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        props.tabs && props.tabs.length ?
                            props.tabs.map(
                                (tab, index) => {

                                    return (
                                        <Tab
                                            classes={{selected: props.selected}}
                                            key={index}
                                            label={tab.name}
                                            {...a11yProps(index)}
                                        />

                                    )
                                }
                            )
                            :
                            null
                    }
                </Tabs>
            </AppBar>

            {
                props.tabContent && props.tabContent.length > 0 ?
                    contentRender(props.tabContent, props.activeTab)
                    :
                    null
            }
        </>
    );
}
