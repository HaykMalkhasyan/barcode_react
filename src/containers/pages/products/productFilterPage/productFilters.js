import React, {Component} from "react";
import classes from './productFilters.module.css';
import {Grid} from "@material-ui/core";
import CustomButton from "../../../../components/buttons/myButton";
import LeftBar from "./leftBar/leftBar";
import RightBar from "./RightBar/rightBar";
import ClassifaersTree from "../searchGroup/classifiersModal/classifiersTreeViewer/classifiersTreeViewverV2";

class ProductFilters extends Component {
    constructor(props) {
        super(props);
        this.props.productActions("getAll")
        this.props.groupActions("getAll")
        this.props.subGroupActions("getAll")
        this.props.barcodeActions("getTypes")
    }

    classifiersSelectHandler = (event, value, check, name) => {
        event.stopPropagation()
        this.props.toggleCheckBoxValue('classifier', check, +value, name)
    }

    render() {

        return (
            <div className={classes.filters}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <LeftBar
                            groups={this.props.groups}
                            subGroups={this.props.subGroups}
                            sectionFontColor={this.props.sectionFontColor}
                            collapsedStatus={this.props.collapsedStatus}
                            advancedSearchConfig={this.props.advancedSearchConfig}
                            // Methods
                            subGroupCollapses={this.props.subGroupCollapses}
                            classifiersSelectHandler={this.classifiersSelectHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <RightBar/>
                    </Grid>
                </Grid>
                <div className={classes.finishedBtns}>
                    <CustomButton
                        className={classes.addButton}
                    >
                        <svg width={12.997} height={12.997} viewBox="0 0 12.997 12.997">
                            <g transform="translate(12.497 0.5) rotate(90)">
                                <g transform="translate(0 5.759)">
                                    <g transform="translate(0 0)">
                                        <path
                                            className={classes.addBtnIcon}
                                            d="M.261.479A.251.251,0,0,1,0,.24.251.251,0,0,1,.261,0H11.736A.251.251,0,0,1,12,.24a.251.251,0,0,1-.261.24Z"
                                            transform="translate(0 0)"
                                        />
                                    </g>
                                </g>
                                <g transform="translate(6.238 0) rotate(90)">
                                    <g transform="translate(0)">
                                        <path
                                            className={classes.addBtnIcon}
                                            d="M.261.479A.251.251,0,0,1,0,.24.251.251,0,0,1,.261,0H11.736A.251.251,0,0,1,12,.24a.251.251,0,0,1-.261.24Z"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span>Ավելացնել</span>
                    </CustomButton>
                    <CustomButton
                        className={classes.searchButton}
                    >
                        <svg width={14.349} height={16.61} viewBox="0 0 14.349 16.61">
                            <path
                                className={classes.searchBtnIcon}
                                d="M260.887,202.2a5.857,5.857,0,1,0-5.857-5.857A5.863,5.863,0,0,0,260.887,202.2Zm0-10.905a5.048,5.048,0,1,1-5.048,5.048A5.054,5.054,0,0,1,260.887,191.3Z"
                                transform="translate(-255.03 -190.488)"
                            />
                            <rect
                                className={classes.searchBtnIcon}
                                width={0.808}
                                height={1.82}
                                transform="translate(10.733 11.472) rotate(142.971)"
                            />
                            <path
                                className={classes.searchBtnIcon}
                                d="M219.571,360.132a1.01,1.01,0,0,0,.806-1.618l-2.67-3.541a1.01,1.01,0,0,0-1.613,1.216l2.67,3.541A1.009,1.009,0,0,0,219.571,360.132Z"
                                transform="translate(-206.232 -343.522)"
                            />
                        </svg>
                        <span>
                            Փնտրել
                        </span>
                    </CustomButton>
                </div>
            </div>
        )
    }
}

export default ProductFilters