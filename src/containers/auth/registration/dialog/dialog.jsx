import React from 'react';
import cls from './dialog.module.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseAgree = event => {
        props.usagerulesHandlerAgree(true)
        setOpen(false);
    };

    const handleCloseDisagree = event => {
        props.usagerulesHandlerAgree(false)
        setOpen(false);
    };

    return (
        <div>
            <button type={props.type} variant={props.variant} className={props.className} onClick={handleClickOpen}>
                {props.text}
            </button>
            <Dialog
                classes={{
                    paper: cls.changeRoot
                }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDisagree}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Օգտագործման կանոններ"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className={cls.textStyle}>
                        Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա:
                        Lorem Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ թե շատ իրականի նման, ի
                        տարբերություն «Բովանդակություն, բովանդակություն» սովորական կրկննության, ինչը ընթերցողի համար
                        հասկանալի է: Շատ համակարգչային տպագրական ծրագրեր և ինտերնետային էջերի խմբագրիչներ այն
                        օգտագործում են որպես իրենց ստանդարտ տեքստային մոդել, և հետևապես, ինտերնետում Lorem Ipsum-ի
                        որոնման արդյունքում կարելի է հայտնաբերել էջեր, որոնք դեռ նոր են կերտվում: Ժամանակի ընթացքում
                        ձևավորվել են Lorem Ipsum-ի տարբեր վերսիաներ` երբեմն ներառելով պատահական տեքստեր, երբեմն էլ
                        հատուկ իմաստ (հումոր և նմանատիպ բովանդակություն):
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCloseDisagree} type={'button'} className={cls.disagreeBtn}>
                        {props.disagree}
                    </button>
                    <button onClick={handleCloseAgree} type={'button'} className={cls.agreeBtn}>
                        {props.agree}
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
