import React from "react";
import classes from "../productFilters.module.css";
import CustomButton from "../../../../../components/buttons/myButton";

const RightBar = props => {

    return (
        <div className={classes.searchWindow}>
            <img className={classes.searchImage} src={process.env.PUBLIC_URL + '674561.png'} alt=""/>
            <div className={classes.searchBorder}>
                <div
                    className={classes.searchSpanIcon}
                >
                    <svg width={12} height={12} viewBox="0 0 12.668 12.399">
                        <defs>
                            <style>{".searchIcon{fill:#3a3a3a;stroke:#3a3a3a;stroke-width:0.5px;}"}</style>
                        </defs>
                        <path
                            className="searchIcon"
                            d="M13.65,12.832,10.414,9.668a4.814,4.814,0,0,0-.269-6.637,5.087,5.087,0,0,0-7.081,0,4.819,4.819,0,0,0,0,6.923,5.088,5.088,0,0,0,6.788.263l3.236,3.164a.4.4,0,0,0,.562,0A.383.383,0,0,0,13.65,12.832ZM6.6,10.611A4.233,4.233,0,0,1,3.627,9.4a4.054,4.054,0,0,1,0-5.824,4.279,4.279,0,0,1,5.956,0,4.054,4.054,0,0,1,0,5.824A4.234,4.234,0,0,1,6.6,10.611Z"
                            transform="translate(-1.348 -1.347)"
                        />
                    </svg>
                </div>
                <input
                    className={classes.searchInput}
                    type="text"
                />
                <div
                    className={classes.searchSpecific}
                >
                    <CustomButton className={classes.specBtn}>
                        <svg width={20} height={13} viewBox="0 0 20.634 13.084">
                            <defs>
                                <style>{".text{fill:none;stroke:#000;stroke-width:0.5px;}"}</style>
                            </defs>
                            <g transform="translate(0.25 0.25)">
                                <g transform="translate(0 0)">
                                    <path
                                        className="text"
                                        d="M14.067,9H5.258A1.259,1.259,0,0,0,4,10.258v1.888a1.258,1.258,0,1,0,2.517,0v-.629H8.4v7.55H7.775a1.258,1.258,0,0,0,0,2.517H11.55a1.258,1.258,0,0,0,0-2.517h-.629v-7.55h1.888v.629a1.258,1.258,0,1,0,2.517,0V10.258A1.259,1.259,0,0,0,14.067,9Z"
                                        transform="translate(-4 -9)"
                                    />
                                </g>
                                <g transform="translate(13.842 0)">
                                    <path
                                        className="text"
                                        d="M20.033,11.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                        transform="translate(-15 -9)"
                                    />
                                </g>
                                <g transform="translate(13.842 5.033)">
                                    <path
                                        className="text"
                                        d="M20.033,15.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                        transform="translate(-15 -13)"
                                    />
                                </g>
                                <g transform="translate(13.842 10.067)">
                                    <path
                                        className="text"
                                        d="M20.033,19.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                        transform="translate(-15 -17)"
                                    />
                                </g>
                            </g>
                        </svg>
                    </CustomButton>
                    <CustomButton className={classes.specBtn}>
                        <svg width={20} height={13} viewBox="0 0 19.005 13.084">
                            <defs>
                                <style>{".barcode{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                            </defs>
                            <g transform="translate(0.25 0.25)">
                                <g transform="translate(0 0)">
                                    <path
                                        className="barcode"
                                        d="M21.3,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,21.3,17.7Z"
                                        transform="translate(-17.155 -17.7)"
                                    />
                                    <path
                                        className="barcode"
                                        d="M36.754,17.7h-1.87a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.87a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,36.754,17.7Z"
                                        transform="translate(-28.106 -17.7)"
                                    />
                                    <path
                                        className="barcode"
                                        d="M57.9,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.6.6,0,0,0,57.9,17.7Z"
                                        transform="translate(-46.625 -17.7)"
                                    />
                                    <path
                                        className="barcode"
                                        d="M71.6,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,71.6,17.7Z"
                                        transform="translate(-57.657 -17.7)"
                                    />
                                    <path
                                        className="barcode"
                                        d="M86.528,17.7H85.184a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.344a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,86.528,17.7Z"
                                        transform="translate(-68.608 -17.7)"
                                    />
                                    <path
                                        className="barcode"
                                        d="M4.019,17.7H3.084a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h.935A.586.586,0,0,0,4.6,29.7V18.284A.586.586,0,0,0,4.019,17.7Z"
                                        transform="translate(-2.5 -17.7)"
                                    />
                                </g>
                            </g>
                        </svg>
                    </CustomButton>
                    <CustomButton className={classes.specBtn}>
                        <svg width={20} height={13} viewBox="0 0 15.158 13.087">
                            <defs>
                                <style>{".code{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                            </defs>
                            <g transform="translate(0.33 0.253)">
                                <g transform="translate(0 0)">
                                    <path
                                        className="code"
                                        d="M57.221,58.578a1.069,1.069,0,0,1-.755-1.825l1.581-1.584-1.581-1.584a1.069,1.069,0,1,1,1.512-1.512l2.339,2.34a1.069,1.069,0,0,1,0,1.512l-2.339,2.34A1.064,1.064,0,0,1,57.221,58.578Z"
                                        transform="translate(-46.053 -48.547)"
                                    />
                                    <path
                                        className="code"
                                        d="M38.3,58.584a1.072,1.072,0,0,1-.757-.313l-2.339-2.344a1.07,1.07,0,0,1,0-1.51l2.339-2.337a1.069,1.069,0,0,1,1.512,1.512l-1.584,1.581,1.584,1.587a1.069,1.069,0,0,1-.757,1.825Z"
                                        transform="translate(-34.895 -48.551)"
                                    />
                                    <path
                                        className="code"
                                        d="M46.191,57.583a1.067,1.067,0,0,1-1.035-1.337L47.878,45.8a1.069,1.069,0,1,1,2.068.539L47.224,56.782A1.07,1.07,0,0,1,46.191,57.583Z"
                                        transform="translate(-40.262 -44.999)"
                                    />
                                </g>
                            </g>
                        </svg>
                    </CustomButton>
                </div>
            </div>
            <div className={classes.searchCollapseWindow}>
                <div className={classes.searchCollapseWindowHeader}>
                    <CustomButton
                        className={classes.advancedSearchBtn}
                    >
                        <svg width={11.275} height={6.039} viewBox="0 0 11.275 6.039">
                            <path
                                className={classes.advancedSearchArrow}
                                d="M27.591,993.328a.6.6,0,0,0,.332-.163l5.011-4.81a.6.6,0,1,0-.827-.871l-4.6,4.416-4.6-4.416a.6.6,0,1,0-.827.871l5.011,4.81A.6.6,0,0,0,27.591,993.328Z"
                                transform="translate(-21.872 -987.294)"
                            />
                        </svg>
                        <span>Ընդլայնված որոնում</span>
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default RightBar