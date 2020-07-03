// import external modules
import React, {PureComponent} from "react";
import classnames from "classnames";
// import internal(own) modules
import {FoldedContentConsumer, FoldedContentProvider} from "../../utility/context/toggleContentContext";
import Footer from "./components/footer/footer";
import templateConfig from "../../templateConfig";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sidebarSize} from "../../redux/customizer/actions";
import {getPermissions, getTools} from "../../redux/permission/actions";
import ProminentAppBar from "../../components/navbar/navbar";
import TemporaryDrawer from "../../components/panel/panel";
import {logout} from "../../redux/auth/actions";
import {setActiveMenu} from '../../redux/pages/actions';
// import {getPermissions} from "../../redux/permission/actions";

class MainLayout extends PureComponent {
    state = {
        width: window.innerWidth,
        sidebarState: "close",
        sidebarSize: localStorage.getItem('size'),
        layout: ''
    };


    updateWidth = () => {
        this.setState(prevState => ({
            width: window.innerWidth
        }));
    };

    handleSidebarSize = (sidebarSize) => {
        this.props.sidebarSize(sidebarSize);
        this.setState({
            sidebarSize
        });
    }

    handleLayout = (layout) => {
        this.setState({layout});
    }

    componentDidMount() {
        this.props.getPermissions()
        this.props.getTools()
        if (window !== "undefined") {
            window.addEventListener("resize", this.updateWidth, false);
        }
    }

    componentWillUnmount() {
        if (window !== "undefined") {
            window.removeEventListener("resize", this.updateWidth, false);
        }
    }

    toggleSidebarMenu(sidebarState) {
        this.setState({sidebarState});
    }

    render() {
        return (
            <>
                <TemporaryDrawer
                    type={'right'}
                />
                <FoldedContentProvider>

                    <ProminentAppBar
                        headerBackgroundColor={this.props.headerBackgroundColor}
                        headerIconColor={this.props.headerIconColor}
                        headerFontColor={this.props.headerFontColor}
                        logout={this.props.logout}
                        position={'sticky'}
                        name={'Barcode.am'}
                        searchIcon={false}
                        permissions={this.props.permissions}
                        menus={this.props.menus}
                        activeMenu={this.props.activeMenu}
                        // Methods
                        setActiveMenu={this.props.setActiveMenu}
                    />
                    <FoldedContentConsumer>
                        {context => (

                            <div
                                style={{backgroundColor: this.props.backgroundColor, transition: '500ms', padding: 8}}
                                className={classnames({
                                    "menu-collapsed": context.foldedContent || this.state.width < 991,
                                    "main-layout": !context.foldedContent,
                                    [`${templateConfig.sidebar.size}`]: (this.state.sidebarSize === ''),
                                    [`${this.state.sidebarSize}`]: (this.state.sidebarSize !== ''),
                                    //    "layout-dark": (this.state.layout === 'layout-dark'),
                                    //    " layout-dark": (this.state.layout === '' && templateConfig.layoutDark === true)
                                    [`${templateConfig.layoutColor}`]: (this.state.layout === ''),
                                    [`${this.state.layout}`]: (this.state.layout !== '')
                                })}
                            >

                                {/*<Sidebar*/}
                                {/*    toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}*/}
                                {/*    sidebarState={this.state.sidebarState}*/}
                                {/*    handleSidebarSize={this.handleSidebarSize.bind(this)}*/}
                                {/*    handleLayout={this.handleLayout.bind(this)}*/}
                                {/*/>*/}
                                {/*<Navbar*/}
                                {/*    toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}*/}
                                {/*    sidebarState={this.state.sidebarState}*/}
                                {/*/>*/}
                                <main>{this.props.children}</main>
                                {/*<Footer/>*/}
                            </div>
                        )}
                    </FoldedContentConsumer>
                </FoldedContentProvider>
            </>
        );
    }
}

const mapStateToProps = state => ({
    size: state.customizer.sidebarSize.size,
    backgroundColor: state.customizer.sidebarSize.backgroundColor,
    headerBackgroundColor: state.customizer.sidebarSize.headerBackgroundColor,
    headerIconColor: state.customizer.sidebarSize.headerIconColor,
    headerFontColor: state.customizer.sidebarSize.headerFontColor,
    permissions: state.permission.data,
    menus: state.pages.menus,
    activeMenu: state.pages.activeMenu,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            sidebarSize,
            getPermissions,
            getTools,
            logout,
            setActiveMenu
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
