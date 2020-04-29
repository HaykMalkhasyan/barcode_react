import React, { Component } from "react";
import Pagination from "react-js-pagination";
import "bootstrap-less/bootstrap/bootstrap.less";

class PaginationS extends Component {

    render() {
        return (
            <div>
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.props.activePage}
                    itemsCountPerPage={+this.props.itemsCountPerPage}
                    totalItemsCount={+this.props.totalItemsCount}
                    pageRangeDisplayed={+this.props.pageRangeDisplayed}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default PaginationS