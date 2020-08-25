import React, { Component } from "react";
import Slider from "react-slick";
import CustomButton from "../UI/button/customButton/customButton";
import Icons from "../Icons/icons";

function SampleNextArrow(props) {
    const {onClick} = props;
    return (
        <CustomButton
            tabIndex={-1}
            onClick={onClick}
            className={props.nextClassName}
        >
            {
                props.nextIcon !== undefined ?
                    props.nextIcon
                    :
                    <Icons type={'right-angle'} className={props.nextSlideIcon}/>
            }
        </CustomButton>
    );
}

function SamplePrevArrow(props) {
    const {onClick} = props;
    return (
        <CustomButton
            tabIndex={-1}
            onClick={onClick}
            className={props.prevClassName}
        >
            {
                props.prevIcon !== undefined ?
                    props.prevIcon
                    :
                    <Icons type={'left-angle'} className={props.prevSlideIcon}/>
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
                        tabIndex={-1}
                        accessibility={false}
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
                        tabIndex={-1}
                        accessibility={false}
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