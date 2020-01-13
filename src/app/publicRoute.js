import FullPageLayout from "../containers/layouts/routes/fullpageRoutes";
import {Redirect} from "react-router-dom";
import React, {Suspense} from "react";
import Spinner from "../components/spinner/spinner";

export default ({auth,component: Component, ...rest}) => {
    return (
        <FullPageLayout
            {...rest}
            render={matchprops => (auth?
                    <Redirect to="/" />:
                    <Suspense fallback={<Spinner/>}>
                        <Component {...matchprops} />
                    </Suspense>
            )}
        />
    )


}
