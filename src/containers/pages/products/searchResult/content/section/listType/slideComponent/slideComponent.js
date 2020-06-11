import React from "react";
import classes from './slideComponent.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SlideComponent = props => {

    const renderThumbs = (children: React.ReactChild[]) => null

    return (
        <>
            {
                props.images.length ?
                    <Carousel
                        renderThumbs={renderThumbs}
                    >
                        {
                            props.images.map(
                                (image, index) => {

                                    return (
                                        <div key={index} className={classes.slider}>
                                            <img src={image.image} align={image.name} />
                                        </div>
                                    )
                                }
                            )
                        }
                    </Carousel>
                    :
                    <div className={classes.slider}>
                        <img src={process.env.PUBLIC_URL + 'Box_Empty.png'}/>
                    </div>
            }
        </>
    )
}

export default SlideComponent