import {combineReducers} from "redux"
import authReducer from "./auth/reducer";
import resetPasswordReducer from "./recoverPassword/reducer";
import registrationReducer from "./registration/reducer";
import pageReducer from "./pages/reducer";
import characteristicsReducer from "./characteristics/reducer";
import productsReducer from "./products/reducer";

export default combineReducers({
    auth: authReducer,
    resetPassword: resetPasswordReducer,
    registration: registrationReducer,
    page: pageReducer,
    characteristics: characteristicsReducer,
    products: productsReducer
})