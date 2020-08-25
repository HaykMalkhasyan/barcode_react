import React from 'react'
import {connect} from "react-redux";
import Filters from "./filters/filters";
import Products from "./products/products";

const FiltersContainer = props => {

    switch (props.type) {
        case 'filters':
            return (
                <Filters/>
            );
        case 'products':
            return (
                <Products/>
            );
        default: return null;
    }
};

function mapStateToProps(state) {

    return {
        type: state.filters.type,
    }
}


export default connect(mapStateToProps)(FiltersContainer);