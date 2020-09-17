import React from 'react'
import {Route} from "react-router-dom";
import ErrorLayout from "../errorLayout";

const ErrorLayoutRoute = props => {
    
    return (
        <Route
            {...props.reset}
            render={
                matchprops => <ErrorLayout>{props.render(matchprops)}</ErrorLayout>
            }
        />
    )
};

export default ErrorLayoutRoute