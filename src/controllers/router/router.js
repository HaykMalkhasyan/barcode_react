import React, {lazy, Suspense} from 'react'
import {Switch} from "react-router-dom";
import PublicRoute from "../publicRoute/publicRoute";
import PrivateRoute from "../privateRoute/privateRoute";
import ErrorLayoutRoute from "../../containers/hoc/layouts/routs/errorRoutes";
import Spinner from "../../components/UI/spinners/spinner/spinner";
// Lazy imports

// Authentications
const LazyLogin = lazy(
    () => import('../../containers/auth/login/login')
);
const LazyRegistration = lazy(
    () => import('../../containers/auth/registration/registration')
);
const LazyVerifyUser = lazy(
    () => import('../../containers/auth/verifyUser/verifyUser')
);
const LazyRecoverPassword = lazy(
    () => import('../../containers/auth/recoverPassword/recoverPassword')
);
const LazyResetPassword = lazy(
    () => import('../../containers/auth/resetPassword/resetPassword')
);
// For user
const LazyUserPage = lazy(
    () => import('../../containers/user/user')
);
// Pages
const LazyMainPage = lazy(
    () => import('../../containers/pages/main/main')
);
const LazyErrorPage = lazy(
    () => import('../../containers/pages/error')
);
// Products and characteristics
const LazyFiltersContainer = lazy(
    () => import('../../containers/pages/products/filters/filtersContainer')
);
const LazyPrices = lazy(
    () => import('../../containers/pages/products/prices/prices')
);
const LazyCharacteristics = lazy(
    () => import('../../containers/pages/products/characteristics/characteristics')
);
const LazyLabelEditor = lazy(
    () => import('../../containers/pages/products/editor/editor')
);
const LazyOutlets = lazy(
    () => import('../../containers/pages/outlets/outlets/outlets')
);
const LazyIncome = lazy(
    () => import('../../containers/pages/income/income/income')
);

const Router = props => {

    return (
        <Switch>
            {/* MainTab page */}
            <PrivateRoute
                exact
                path='/'
                auth={props.auth}
                component={LazyMainPage}
            />
            {/* User page */}
            <PrivateRoute
                exact
                path='/user/:id'
                auth={props.auth}
                component={LazyUserPage}
            />
            {/* Filters */}
            <PrivateRoute
                exact
                path='/products/filters'
                auth={props.auth}
                component={LazyFiltersContainer}
            />
            {/* Prices */}
            <PrivateRoute
                exact
                path='/products/prices'
                auth={props.auth}
                component={LazyPrices}
            />
            {/* Characteristics */}
            <PrivateRoute
                exact
                path='/products/characteristics'
                auth={props.auth}
                component={LazyCharacteristics}
            />
            {/* Label editor */}
            <PrivateRoute
                exact
                path='/products/editor'
                auth={props.auth}
                component={LazyLabelEditor}
            />
             {/* outlets */}
             <PrivateRoute
                exact
                path='/outlets'
                auth={props.auth}
                component={LazyOutlets}
            />
              {/* Income */}
              <PrivateRoute
                exact
                path='/income'
                auth={props.auth}
                component={LazyIncome}
            />
            {/* Login */}
            <PublicRoute
                exact
                path='/login'
                auth={props.auth}
                component={LazyLogin}
            />
            {/* Registration */}
            <PublicRoute
                exact
                path='/registration'
                auth={props.auth}
                component={LazyRegistration}
            />
            {/* Verify user */}
            <PublicRoute
                exact
                path='/verify-user'
                auth={props.auth}
                component={LazyVerifyUser}
            />
            {/* Recover password */}
            <PublicRoute
                exact
                path='/recover-password'
                auth={props.auth}
                component={LazyRecoverPassword}
            />
            {/* Reset password */}
            <PublicRoute
                exact
                path='/reset-password'
                auth={props.auth}
                component={LazyResetPassword}
            />
            {/* Not found*/}
            <ErrorLayoutRoute
                render={
                    matchprops => (
                        <Suspense fallback={<Spinner color={'secondary'}/>}>
                            <LazyErrorPage {...matchprops}/>
                        </Suspense>
                    )
                }
            />
        </Switch>
    )
}

export default Router