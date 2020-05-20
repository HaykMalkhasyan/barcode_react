// import external modules
import React, {PureComponent} from "react";
import classnames from "classnames";

// import internal(own) modules
import {FoldedContentConsumer, FoldedContentProvider} from "../../utility/context/toggleContentContext";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import templateConfig from "../../templateConfig";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    // sidebarBgColor,
    // sidebarCollapsed,
    // sidebarImage,
    // sidebarImageUrl,
    sidebarSize
} from "../../redux/customizer/actions";
import classes from './mainLay.module.css'
import SideMenu from "./components/sidebar/sidemenuHelper";
import {NavLink} from "react-router-dom";
import Icon from "./components/sidebar/sidemenu/icons";
import Translate from "../../Translate";
import {getPages} from "../../redux/pages/actions";
import {getPermissions, getTools} from "../../redux/permission/actions";
import ProminentAppBar from "../../components/navbar/navbar";
// import {getPages} from "../../redux/pages/actions";
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
        this.props.getPages()
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
            <FoldedContentProvider>
                <ProminentAppBar
                    position={'sticky'}
                    name={'Barcode.am'}
                    searchIcon={false}
                    data={this.props.pages}
                    permissions={this.props.permissions}
                />
                <FoldedContentConsumer>
                    {context => (

                        <div
                            className={classnames("wrapper ", {
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
                            <Footer/>
                        </div>
                    )}
                </FoldedContentConsumer>
            </FoldedContentProvider>
        );
    }
}

const mapStateToProps = state => ({
    size: state.customizer.sidebarSize.size,
    pages: state.pages.data,
    permissions: state.permission.data
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            sidebarSize,
            getPages,
            getPermissions,
            getTools
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
