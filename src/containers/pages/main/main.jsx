import React, {useState} from 'react'
import classes from './main.module.css'
import Grid from "@material-ui/core/Grid"
import Tooltip from '@material-ui/core/Tooltip'
import WaterWave from 'react-water-wave';
import IconButtonUI from "../../../components/UI/button/icon-button-ui/icon-button-ui";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

const MainPage = props => {
    const [active, setActive] = useState("play")

    return (
        <div className={classes.main}>
            <div
                className={classes.header}
                // style={{background: `url(${process.env.PUBLIC_URL}/images/main.png) no-repeat center bottom fixed #eee`}}
            >
                <WaterWave
                    style={{width: "inherit", height: "inherit"}}
                    imageUrl={`${process.env.PUBLIC_URL}/images/main.png`}
                >
                    {({pause, play}) => (
                        <>
                            <div className={classes.waterWaveControlWindow}>
                                <IconButtonUI
                                    className={active === "play" ? `${classes.iconButtons} ${classes.active}` : classes.iconButtons}
                                    title={"Play"}
                                    icon={<PlayCircleFilledIcon/>}
                                    onClick={() => {
                                        setActive("play");
                                        play();
                                    }}
                                />
                                <IconButtonUI
                                    className={active === "pause" ? `${classes.iconButtons} ${classes.active}` : classes.iconButtons}
                                    title={"Pause"}
                                    icon={<PauseCircleFilledIcon/>}
                                    onClick={() => {
                                        setActive("pause");
                                        pause();
                                    }}
                                />
                            </div>
                            <h1 className={classes.name}>Barcode</h1>
                        </>
                    )}
                </WaterWave>
            </div>
            <div className={classes.info}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <div className={classes.infoItem}>
                            <h1>Ինչո՞ւ ենք այն օգտագործում</h1>
                            <p>
                                Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի
                                ձևավորման վրա: Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ
                                թե շատ իրականի նման, ի տարբերություն «Բովանդակություն, բովանդակություն» սովորական
                                կրկննության, ինչը ընթերցողի համար հասկանալի է:
                            </p>
                            <div className={classes.circleCount}>76</div>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        <div className={classes.infoItem}>
                            <h1>Ի՞նչ ծագում ունի այն</h1>
                            <p>
                                Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի
                                ձևավորման վրա: Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ
                                թե շատ իրականի նման, ի տարբերություն «Բովանդակություն, բովանդակություն» սովորական
                                կրկննության, ինչը ընթերցողի համար հասկանալի է:
                            </p>
                            <div className={classes.circleCount}>25</div>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        <div className={classes.infoItem}>
                            <h1>Որտեղի՞ց վերցնել նման տեքստ</h1>
                            <p>
                                Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի
                                ձևավորման վրա: Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ
                                թե շատ իրականի նման, ի տարբերություն «Բովանդակություն, բովանդակություն» սովորական
                                կրկննության, ինչը ընթերցողի համար հասկանալի է:
                            </p>
                            <div className={classes.circleCount}>149</div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.otherInfo}>
                <div className={classes.blur}/>
                <div className={classes.content}>
                    <h1>Որ համակարգի միջոցով կարող եք օգտվել տվյալ կայքից ?</h1>
                    <Grid container spacing={0}>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.google}`}>
                                <Tooltip title="Google Chrome" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/chrome--v1.png" alt={'chrome'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.mozilla}`}>
                                <Tooltip title="Mozilla" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/firefox.png" alt={'mozilla'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.opera}`}>
                                <Tooltip title="Opera" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/opera--v1.png" alt={'opera'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.safari}`}>
                                <Tooltip title="Safari" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/safari--v1.png" alt={'safari'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.ios}`}>
                                <Tooltip title="iOS" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/ios-logo.png" alt={'ios'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.android}`}>
                                <Tooltip title="Android" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/android-os.png" alt={'android'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.mobile}`}>
                                <Tooltip title="Mobile" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/two-smartphones.png" alt={'mobile'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className={`${classes.otherInfoItem} ${classes.tablet}`}>
                                <Tooltip title="Tablet" placement="right">
                                    <img className={classes.browserImage}
                                         src="https://img.icons8.com/color/96/000000/ipad.png" alt={'tablet'}/>
                                </Tooltip>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default MainPage