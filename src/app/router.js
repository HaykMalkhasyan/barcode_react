// import external modules
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import Spinner from "../components/spinner/spinner";
// import internal(own) modules
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import ErrorLayoutRoute from "../containers/layouts/routes/errorRoutes";

// const LazyAnalyticsDashboard = lazy(() => import("../containers/pages/positions/positionContainer"));
const LazyMainPage = lazy(() => import("../containers/pages/main/mainContainer"));
const LazyUsers = lazy(() => import("../containers/pages/users/userContainer"));
const LazyMenu = lazy(() => import("../containers/pages/menu/menuContainer"));
const LazyImport = lazy(() => import("../containers/pages/import/importContainer"));
const LazyTranslations = lazy(() => import("../containers/pages/translations/translationsContainer"));
const LazyCurrency = lazy(() => import("../containers/pages/currency/currencyContainer"));
const LazySuppliers = lazy(() => import("../containers/pages/suppliers/supplierContainer"));
const LazyPositions = lazy(() => import("../containers/pages/positions/positionContainer"));
const LazyProducts = lazy(() => import("../containers/pages/products/productContainer"));
const LazySearchResult = lazy(() => import("../containers/pages/products/searchResult/searchResultContainer"));
const LazyGroup = lazy(() => import("../containers/pages/group/groupContainer"));
const LazyLogin = lazy(() => import("../containers/auth/loginContainer"));
// const LazyVerification = lazy(() => import("../containers/auth/registration/mailVerification/mailVerification"));
const LazySignUp = lazy(() => import("../containers/auth/registration/registration"));
const LazyCompany = lazy(() => import("../containers/pages/company/companyContainer"));
const LazyRecoverPassword = lazy(() => import("../containers/auth/forgotPassword/foegotPassword"));
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
                    component={LazyMainPage}
                />
                <PrivateRoute
                    exact
                    path="/menu"
                    auth={props.auth}
                    component={LazyMenu}
                />
                <PrivateRoute
                    exact
                    path="/import"
                    auth={props.auth}
                    component={LazyImport}
                />
                <PrivateRoute
                    exact
                    path="/currency"
                    auth={props.auth}
                    component={LazyCurrency}
                />
                <PrivateRoute
                    exact
                    path="/translations"
                    auth={props.auth}
                    component={LazyTranslations}
                />
                <PrivateRoute
                    exact
                    path="/groups"
                    auth={props.auth}
                    component={LazyGroup}
                />{/*
                <PrivateRoute
                    exact
                    path="/"
                    auth={props.auth}
                    component={LazyAnalyticsDashboard}
                />*/}
                <PrivateRoute
                    exact
                    path="/users"
                    auth={props.auth}
                    component={LazyUsers}
                />
                <PrivateRoute
                    exact
                    path="/suppliers"
                    auth={props.auth}
                    component={LazySuppliers}
                />
                <PrivateRoute
                    exact
                    path="/positions"
                    auth={props.auth}
                    component={LazyPositions}
                />
                <PrivateRoute
                    exact
                    path="/products"
                    auth={props.auth}
                    component={LazyProducts}
                />
                <PrivateRoute
                    exact
                    path="/company"
                    auth={props.auth}
                    component={LazyCompany}
                />
                <PrivateRoute
                    exact
                    path="/search"
                    auth={props.auth}
                    component={LazySearchResult}
                />
                <PublicRoute
                    exact
                    path="/login"
                    auth={props.auth}
                    component={LazyLogin}
                />
                <PublicRoute
                    exact
                    path="/registration"
                    auth={props.auth}
                    component={LazySignUp}
                />
                <PublicRoute
                    exact
                    path="/recover-password"
                    auth={props.auth}
                    component={LazyRecoverPassword}
                />
                {/*<PublicRoute*/}
                {/*    exact*/}
                {/*    path="/signup"*/}
                {/*    auth={props.auth}*/}
                {/*    component={LazyVerification}*/}
                {/*/>*/}

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
