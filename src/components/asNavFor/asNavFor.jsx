import React, { Component } from "react";
import Slider from "react-slick";
import CustomButton from "../UI/button/customButton/customButton";

function SampleNextArrow(props) {
    const {onClick} = props;
    return (
        <CustomButton
            onClick={onClick}
            className={props.nextClassName}
        >
            {
                props.nextIcon !== undefined ?
                    props.nextIcon
                    :
                    <svg width={5} height={9} viewBox="0 0 5.182 9.675">
                        <g transform="translate(0 9.675) rotate(-90)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.nextSlideIcon}
                                    d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                                />
                            </g>
                        </g>
                    </svg>
            }
        </CustomButton>
    );
}

function SamplePrevArrow(props) {
    const {onClick} = props;
    return (
        <CustomButton
            onClick={onClick}
            className={props.prevClassName}
        >
            {
                props.prevIcon !== undefined ?
                    props.prevIcon
                    :
                    <svg width={5} height={9} viewBox="0 0 5.182 9.675">
                        <g transform="translate(5.182) rotate(90)">
                            <path
                                className={props.prevSlideIcon}
                                d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                            />
                        </g>
                    </svg>
            }
        </CustomButton>
    );
}

export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div>
                    <Slider
                        className={this.props.main}
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}
                        nextArrow={<SampleNextArrow nextIcon={this.props.nextIcon} nextSlideIcon={this.props.nextSlideIcon} nextClassName={this.props.nextClassName} />}
                        prevArrow={<SamplePrevArrow prevIcon={this.props.prevIcon} prevSlideIcon={this.props.prevSlideIcon} prevClassName={this.props.prevClassName}/>}
                    >
                        {this.props.mainData}
                    </Slider>
                </div>
                <div>
                    <Slider
                        className={this.props.second}
                        arrows={this.props.subArrows}
                        dots={this.props.subDots}
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        slidesToShow={Math.min(this.props.data.length, 4)}
                        swipeToSlide={this.props.swipeToSlide}
                        focusOnSelect={this.props.focusOnSelect}
                        centerMode={this.props.centerMode}
                        vertical={this.props.vertical}
                        verticalSwiping={this.props.verticalSwiping}
                    >
                        {this.props.subData}
                    </Slider>
                </div>
            </div>
        );
    }
}