import React from 'react'
import {Route} from "react-router-dom";
import MainLayout from "../mainLayout";

const MainLayoutRoute = props => {

    return (
        <Route
            {...props.rest}
            render={
                matchProps => (
                    <MainLayout>
                        {
                            props.render(matchProps)
                        }
                    </MainLayout>
                )
            }
        />
    )
};

export default MainLayoutRoute