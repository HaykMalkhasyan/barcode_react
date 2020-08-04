import React from 'react'
import {Route} from "react-router-dom";
import FullPageLayout from "../fullPageLayout";

const FullPageLayoutRoute = props => {
    
    return (
        <Route
            {...props.rest}
            render={
                matchProps => (
                    <FullPageLayout>
                        {
                            props.render(matchProps)
                        }
                    </FullPageLayout>
                )
            }
        />
    )
};

export default FullPageLayoutRoute