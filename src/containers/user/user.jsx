import React from 'react'
import classes from './user.module.css'
import {Redirect, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import SlickSlider from "../../components/slickSlider/slickSlider"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PieChartIcon from '@material-ui/icons/PieChart'
import PublicIcon from '@material-ui/icons/Public'
import BrushIcon from '@material-ui/icons/Brush'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import TuneIcon from '@material-ui/icons/Tune'

const User = props => {
    if (+props.location.pathname.split('/')[props.location.pathname.split('/').length-1] !== props.user.user_id) {
        return (
            <Redirect to='/'/>
        )
    } else {
        return (
            <div className={classes.user}>
                <div className={classes.userHeader}>
                    <div className={classes.userImageWindow}>
                        <img src={'https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg'} alt={'avatar'}/>
                    </div>
                </div>
                <div className={classes.configurations}>
                    <div className={classes.configurationsSliderWindow}>
                        <SlickSlider
                            dots={true}
                            arrows={true}
                            slidesToShow={4}
                            slidesToScroll={4}
                            speed={500}
                            infinite={true}
                            centerMode={false}
                            prevIcon={<ChevronLeftIcon style={{fontSize: 60}}/>}
                            nextIcon={<ChevronRightIcon style={{fontSize: 60}}/>}
                            nextClassName={classes.nextClassName}
                            prevClassName={classes.prevClassName}
                            responsive={
                                [
                                    {
                                        breakpoint: 576,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            infinite: true,
                                            dots: true
                                        }
                                    },
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            infinite: true,
                                            dots: true
                                        }
                                    },
                                    {
                                        breakpoint: 991,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 2,
                                            infinite: true,
                                            dots: true
                                        }
                                    },
                                    {
                                        breakpoint: 1200,
                                        settings: {
                                            slidesToShow: 3,
                                            slidesToScroll: 3,
                                            infinite: true,
                                            dots: true
                                        }
                                    }
                                ]
                            }
                        >
                            <div>
                                <div className={classes.slideItem}>
                                    <div className={classes.Category}>
                                        <h1>
                                            <PieChartIcon style={{fontSize: 100}} />
                                        </h1>
                                        <h4>Վիճակագրություն</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.slideItem}>
                                    <div className={classes.Category}>
                                        <h1>
                                            <PublicIcon style={{fontSize: 100}}/>
                                        </h1>
                                        <h4>Ցուցադրված ապրանքներ</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.slideItem}>
                                    <div className={classes.Category}>
                                        <h1>
                                            <BrushIcon style={{fontSize: 100}}/>
                                        </h1>
                                        <h4>Ձևավորում</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.slideItem}>
                                    <div className={classes.Category}>
                                        <h1>
                                            <RecordVoiceOverIcon style={{fontSize: 100}}/>
                                        </h1>
                                        <h4><span style={{marginRight: 10}}>12</span>արձագանք</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.slideItem}>
                                    <div className={classes.Category}>
                                        <h1>
                                            <TuneIcon style={{fontSize: 100}}/>
                                        </h1>
                                        <h4>Անցնական էջի կարգավորումներ</h4>
                                    </div>
                                </div>
                            </div>
                        </SlickSlider>
                    </div>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {

    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(User))