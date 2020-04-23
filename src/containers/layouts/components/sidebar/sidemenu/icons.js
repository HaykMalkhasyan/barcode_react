import React, { Component } from "react";
import * as Icon from "react-feather";
class InstarProducts extends Component {
    components = {
        User: Icon.User,
        ShoppingBag: Icon.ShoppingBag,
        Layers: Icon.Layers,
        UserCheck: Icon.UserCheck,
        Truck:Icon.Truck,
        Menu: Icon.Menu,
        Shield: Icon.Shield
    };
    render() {
        const TagName = this.components[this.props.tag || ''];
        return TagName?<TagName/>:<div></div>
    }
}
export default InstarProducts;