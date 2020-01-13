// import external modules
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import Spinner from "../components/spinner/spinner";
// import internal(own) modules
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import ErrorLayoutRoute from "../containers/layouts/routes/errorRoutes";

const LazyAnalyticsDashboard = lazy(() => import("../containers/pages/positions/positionContainer"));
const LazyUsers = lazy(() => import("../containers/pages/users/userContainer"));
const LazyPositions = lazy(() => import("../containers/pages/positions/positionContainer"));
const LazyLogin = lazy(() => import("../containers/auth/loginContainer"));
// Error Pages
const LazyErrorPage = lazy(() => import("../containers/pages/error"));

function Router(props) {
    return (
        <BrowserRouter basename="/">
            <Switch>

                <PrivateRoute
                    exact
                    path="/"
                    auth={props.auth}
                    component={LazyAnalyticsDashboard}
                />
                <PrivateRoute
                    exact
                    path="/users"
                    auth={props.auth}
                    component={LazyUsers}
                />
                <PrivateRoute
                    exact
                    path="/positions"
                    auth={props.auth}
                    component={LazyPositions}
                />
                <PublicRoute
                    exact
                    path="/login"
                    auth={props.auth}
                    component={LazyLogin}
                />

                <ErrorLayoutRoute
                    exact
                    path="/pages/error"
                    render={matchprops => (
                        <Suspense fallback={<Spinner/>}>
                            <LazyErrorPage {...matchprops} />
                        </Suspense>
                    )}
                />

                <ErrorLayoutRoute
                    render={matchprops => (
                        <Suspense fallback={<Spinner/>}>
                            <LazyErrorPage {...matchprops} />
                        </Suspense>
                    )}
                />
            </Switch>
        </BrowserRouter>
    );

}

export default Router;
