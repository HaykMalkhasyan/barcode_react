import React from "react";
import classes from "./user-information.module.css";
import ListInfo from "../../../../../../components/list-info/list-info";

const UserInformation = props => {

    return (
        <div className={classes.userInformation}>
            <ListInfo
                label={"Կոնտակտային տվյալներ"}
                id={1}
                data={[
                    {id: 1, key: "Էլ. փոստարկղ", value: 'test@mail.ru'},
                    {id: 2, key: "Հեռախոսհամար", value: '+374 (98) ** ** **'},
                ]}
            />
            <ListInfo
                label={"Ընդհանուր տեղեկություն"}
                id={2}
                data={[
                    {id: 1, key: "Ծննդյան օր/ամիս/տարի", value: '16/07/1993'},
                    {id: 2, key: "Կազմակերպություն", value: 'Ծիրան սուպերմարկետ'},
                    {id: 3, key: "Պաշտոն", value: 'Մենեջեր'},
                ]}
            />
            <ListInfo
                label={"Պրոֆիլ"}
                id={3}
                data={[
                    {id: 1, key: "Ստեղծվել է", value: '02/03/2012'},
                    {id: 2, key: "Կարգավիճակ", value: 'Ադմին'},
                    {id: 3, key: "Մակարդակ", value: 1},
                ]}
            />
            <ListInfo
                label={"Կայքի վարկանիշ"}
                id={3}
                data={[
                    {id: 1, key: "Ծրագրային", value: 5},
                    {id: 2, key: "Հարմարավետություն", value: 4},
                    {id: 3, key: "Դիզայն", value: 5},
                ]}
            />
        </div>
    )
}

export default UserInformation