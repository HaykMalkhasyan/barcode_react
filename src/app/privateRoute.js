import MainLayoutRoutes from "../containers/layouts/routes/mainRoutes";
import React, {Suspense} from "react";
import Spinner from "../components/spinner/spinner";
import FullPageLayout from "../containers/layouts/routes/fullpageRoutes";
import {Redirect} from "react-router-dom";

export default  ({auth,component: Component, ...rest}) => {
    if(auth){
        return (
            <MainLayoutRoutes
                {...rest}
                render={matchprops => (
                    <Suspense fallback={<Spinner/>}>
                        <Component {...matchprops} />
                    </Suspense>
                )}
            />
        )

    }else{
        return (
            <FullPageLayout
                {...rest}
                render={matchprops => (
                    <Redirect to="/login" />
                )}
            />
        );
    }

};