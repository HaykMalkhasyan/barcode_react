import React, {Suspense} from 'react'
import {Redirect} from "react-router-dom";
import Spinner from "../../components/UI/spinner/spinner";
import FullPageLayoutRoute from "../../containers/hoc/layouts/routs/fullPageRoutes";

const PublicRoute = ({auth, component: Component, ...rest}) => {

    return (
        <FullPageLayoutRoute
            {...rest}
            render={
                matchprops => (
                    auth ?
                        <Redirect to='/'/>
                        :
                        <Suspense fallback={<Spinner color='secondary'/>}>
                            <Component {...matchprops}/>
                        </Suspense>
                )
            }
        />
    )
}

export default PublicRoute