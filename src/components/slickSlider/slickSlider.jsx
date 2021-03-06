import React from "react";
import Slider from "react-slick";
import CustomButton from "../UI/button/customButton/custom-button";

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

class SlickSlider extends React.Component {

    render() {
        const settings = {
            dots: this.props.dots,
            arrows: this.props.arrows,
            infinite: this.props.infinite,
            speed: this.props.speed,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: this.props.slidesToScroll,
            responsive: this.props.responsive,
            centerMode: this.props.centerMode,
            nextArrow: <SampleNextArrow nextIcon={this.props.nextIcon} nextSlideIcon={this.props.nextSlideIcon} nextClassName={this.props.nextClassName} />,
            prevArrow: <SamplePrevArrow prevIcon={this.props.prevIcon} prevSlideIcon={this.props.prevSlideIcon} prevClassName={this.props.prevClassName} />
        };
        return (
            <Slider ref={c => (this.slider = c)} {...settings}>
                {this.props.children}
            </Slider>
        );
    }
}

export default SlickSlider