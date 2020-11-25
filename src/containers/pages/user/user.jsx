import React, {useState} from 'react'
import classes from './user.module.css'
import {Redirect, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import UserHeader from "./user-header/user-header";
import UserContent from "./user-content/user-content";
import UserMain from "./user-content/user-main/user-main";
import UserDocuments from "./user-content/user-documents/user-documents";

const User = props => {
    const [active, setActive] = useState({id: 1, name: "Գլխավոր", component: UserMain});
    const navigation_data = [
        {id: 1, name: "Գլխավոր", component: UserMain},
        {id: 2, name: "Փաստաթղթեր", component: UserDocuments},
        {id: 3, name: "Վաճառքներ", component: "UserSails"},
        {id: 4, name: "Նշումներ", component: "UserNotes"},
        {id: 5, name: "Հանձնարարություններ", component: "UserAssignments"},
    ]
    const feedback = [
        {
            id: 1,
            feedback: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա: Lorem\n" +
                "                Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ թե շատ իրականի նման, ի տարբերություն\n" +
                "                «Բովանդակություն, բովանդակություն» սովորական կրկննության, ինչը ընթերցողի համար հասկանալի է: Շատ\n" +
                "                համակարգչային տպագրական ծրագրեր և ինտերնետային էջերի խմբագրիչներ այն օգտագործում են որպես իրենց ստանդարտ\n" +
                "                տեքստային մոդել, և հետևապես, ինտերնետում Lorem Ipsum-ի որոնման արդյունքում կարելի է հայտնաբերել էջեր,\n" +
                "                որոնք դեռ նոր են կերտվում: Ժամանակի ընթացքում ձևավորվել են Lorem Ipsum-ի տարբեր վերսիաներ` երբեմն\n" +
                "                ներառելով պատահական տեքստեր, երբեմն էլ հատուկ իմաստ (հումոր և նմանատիպ բովանդակություն):",
            date: "25.11.2020"
        },
        {
            id: 2,
            feedback: "Հայտնի է, որ ընթերցողը, կարդալով հասկանալի տեքստ, չի կարողանա կենտրոնանալ տեքստի ձևավորման վրա: Lorem\n" +
                "                Ipsum օգտագործելը բացատրվում է նրանով, որ այն բաշխում է բառերը քիչ թե շատ իրականի նման, ի տարբերություն\n" +
                "                «Բովանդակություն, բովանդակություն» սովորական կրկննության, ինչը ընթերցողի համար հասկանալի է: Շատ\n" +
                "                համակարգչային տպագրական ծրագրեր և ինտերնետային էջերի խմբագրիչներ այն օգտագործում են որպես իրենց ստանդարտ\n" +
                "                տեքստային մոդել, և հետևապես, ինտերնետում Lorem Ipsum-ի որոնման արդյունքում կարելի է հայտնաբերել էջեր,\n" +
                "                որոնք դեռ նոր են կերտվում: Ժամանակի ընթացքում ձևավորվել են Lorem Ipsum-ի տարբեր վերսիաներ` երբեմն\n" +
                "                ներառելով պատահական տեքստեր, երբեմն էլ հատուկ իմաստ (հումոր և նմանատիպ բովանդակություն):",
            date: "15.10.2020"
        }
    ]

    const selectTabHandler = item => setActive(item);

    if (props.user && +props.location.pathname.split('/')[props.location.pathname.split('/').length-1] !== props.user.user_id) {
        return (
            <Redirect to='/'/>
        )
    } else {
        return (
            <div className={classes.user}>
                <UserHeader
                    navigation_data={navigation_data}
                    active={active}
                    // Methods
                    selectTabHandler={selectTabHandler}
                />
                <UserContent
                    active={active}
                    component={active.component}
                    feedback={feedback}
                />
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