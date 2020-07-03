import React from "react";
import classes from "../productFilters.module.css";
import SimpleSlider from "../../../../../components/ReactSlick/reactSlick";
import ClassifaersTree from "../../searchGroup/classifiersModal/classifiersTreeViewer/classifiersTreeViewverV2";

const LeftBar = props => {

    return (
        <div className={classes.classifiersWindow}>
            <SimpleSlider
                dots={false}
                arrows={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                nextClassName={classes.nextSlideBtn}
                nextSlideIcon={classes.nextSlideIcon}
                prevClassName={classes.prevSlideBtn}
                prevSlideIcon={classes.prevSlideIcon}
            >
                {
                    props.groups && props.groups.length ?
                        props.groups.map(
                            (item, index) => {

                                return (
                                    <div>
                                        <header>{item.name}</header>
                                        <div className={classes.classifBody}>
                                            <ul
                                                style={{
                                                    listStyle: 'none',
                                                    // padding: 0
                                                }}
                                            >
                                                <li>
                                                    <span>
                                                        <svg width={22} height={21} viewBox="0 0 23.249 22.828">
                                                            <defs>
                                                              <style>
                                                                {
                                                                    ".fa,.fc{fill:#fff;}.fa{stroke:#fd8087;}.fb{fill:#fe646f;}.fc{stroke:#8ac9fe;}.fd{fill:#60b7ff;}.fe{fill:#fcfbf4;stroke:#fed402;}.ff{fill:#fac600;}.fg{fill:#b5adb6;}"
                                                                }
                                                              </style>
                                                            </defs>
                                                            <g transform="translate(0.5 0.5)">
                                                              <path
                                                                  className="fa"
                                                                  d="M492.119,216.355h20.01a1.131,1.131,0,0,0,1.119-1.142V203.879a1.131,1.131,0,0,0-1.119-1.142H498.353l-.64-1.956a1.121,1.121,0,0,0-1.061-.78h-4.532A1.131,1.131,0,0,0,491,201.142v14.071a1.131,1.131,0,0,0,1.119,1.142Zm0,0"
                                                                  transform="translate(-491 -200)"
                                                              />
                                                              <path
                                                                  className="fb"
                                                                  d="M505.484,247.061a.857.857,0,0,1-.813.586H491v11.11a1.142,1.142,0,0,0,1.142,1.142h20.421a1.142,1.142,0,0,0,1.142-1.142V247.423a1.142,1.142,0,0,0-1.142-1.142h-6a1.142,1.142,0,0,0-1.083.78Zm0,0"
                                                                  transform="translate(-491 -243.544)"
                                                              />
                                                              <path
                                                                  className="fc"
                                                                  d="M512.106,262.636H492.142A1.142,1.142,0,0,1,491,261.494V250.159a1.142,1.142,0,0,1,1.142-1.142H506.2l.653-1.956a1.142,1.142,0,0,1,1.083-.78h4.168a1.142,1.142,0,0,1,1.142,1.142v14.07a1.142,1.142,0,0,1-1.142,1.142Zm0,0"
                                                                  transform="translate(-491 -243.544)"
                                                              />
                                                              <path
                                                                  className="fd"
                                                                  d="M513.706,261.494a1.142,1.142,0,0,1-1.142,1.142H492.142A1.142,1.142,0,0,1,491,261.494v-11.11h20.193a1.142,1.142,0,0,0,1.142-1.142v-1.818a1.142,1.142,0,0,0-1.142-1.142h1.371a1.142,1.142,0,0,1,1.142,1.142Zm0,0"
                                                                  transform="translate(-491 -243.544)"
                                                              />
                                                              <path
                                                                  className="fe"
                                                                  d="M492.142,308.913h19.964a1.142,1.142,0,0,0,1.142-1.142V296.436a1.142,1.142,0,0,0-1.142-1.142H498.5l-.653-1.956a1.142,1.142,0,0,0-1.083-.781h-4.625A1.142,1.142,0,0,0,491,293.7v14.071a1.142,1.142,0,0,0,1.142,1.142Zm0,0"
                                                                  transform="translate(-491 -287.085)"
                                                              />
                                                              <path
                                                                  className="ff"
                                                                  d="M833.875,338.836H832.5a1.142,1.142,0,0,1,1.142,1.142v11.334a1.142,1.142,0,0,1-1.142,1.142h1.37a1.142,1.142,0,0,0,1.142-1.142V339.978a1.142,1.142,0,0,0-1.142-1.142Zm0,0"
                                                                  transform="translate(-812.311 -330.627)"
                                                              />
                                                              <path
                                                                  className="fg"
                                                                  d="M602,510.422"
                                                                  transform="translate(-595.437 -492.067)"
                                                              />
                                                            </g>
                                                        </svg>
                                                        <span className={classes.classifMainName}>
                                                            {item.name}
                                                        </span>
                                                    </span>
                                                    {
                                                        props.subGroups ?
                                                            <ClassifaersTree
                                                                // DATA
                                                                fonstStyale={classes.fonstStyale}
                                                                chckClassName={classes.chckClassName}
                                                                group={item}
                                                                data={props.subGroups}
                                                                sectionFontColor={props.sectionFontColor}
                                                                collapsedStatus={props.collapsedStatus}
                                                                advancedSearchConfig={props.advancedSearchConfig}
                                                                // METHODS
                                                                subGroupCollapses={props.subGroupCollapses}
                                                                onChange={props.classifiersSelectHandler}
                                                            />
                                                            :
                                                            null
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        )
                        :
                        null
                }
            </SimpleSlider>
        </div>
    )
}

export default LeftBar