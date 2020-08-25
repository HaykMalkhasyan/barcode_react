import React, {Suspense} from 'react'
import {Redirect} from "react-router-dom";
import Spinner from "../../components/UI/spinners/spinner/spinner";
import MainLayoutRoute from "../../containers/hoc/layouts/routs/mainRoutes";
import FullPageLayoutRoute from "../../containers/hoc/layouts/routs/fullPageRoutes";

const PrivateRoute = ({auth,component: Component, ...rest}) => {
    if (auth) {
        return (
            <MainLayoutRoute
                {...rest}
                render={
                    matchprops => (
                        <Suspense fallback={<Spinner color='secondary'/>}>
                            <Component {...matchprops}/>
                        </Suspense>
                    )
                }
            />
        )
    } else {
        return (
            <FullPageLayoutRoute
                {...rest}
                render={
                    () => (
                        <Redirect to='/login'/>
                    )
                }
            />
        )

    }
}

export default PrivateRoute